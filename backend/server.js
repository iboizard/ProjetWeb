const express = require('express');
const { sequelize, Project, User, Employee, Team, Purchase, Document } = require('./models'); // Use CommonJS require
const bodyparser = require('body-parser');
const cors = require('cors');


// JWT
const jwt = require('jsonwebtoken');
// get the env file variables
require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET;

// Initialisation serveur
const app = express();
const port = 3000;
app.use(bodyparser.json());
app.use(cors());

// ----------------------
// ----- API ROUTES -----
// ----------------------

// Synchronize the database and start the server
// ----- IMPORTANT NOTE -----
// Using { force: true } only if we want to drop and recreate tables
// --------------------------
sequelize.sync({ force: true })
  .then(() => {
    console.log('Feeding the database with seed data...');
    feedDBwithSeedData();
  })
  .then(() => {
    const serveur = app.listen(port, () => {
      console.log(`Server listening at http://localhost:${port}`);
    });

    // ---------------------
    // ----- SOCKET.IO -----
    // ---------------------

    const { Server } = require("socket.io");
    const io = new Server(serveur, { cors: { origin: ['http://localhost:8080', 'http://127.0.0.1:8080'] } });

    io.on('connection', (socket) => {
      console.log('a user connected');
      socket.on('disconnect', () => {
        console.log('user disconnected');
      });

      // Handle chat message
      socket.on('chat message', (msg) => {
        io.emit('chat message', msg); // Broadcasts to all clients
      });
    });
  })
  .catch(err => {
    console.error('Unable to sync database:', err);
  });

// ----- JWT -----
const authenticateToken = (req, res, next) => {
  // Get the token from the headers
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (token == null) {
    return res.sendStatus(401); // If no token, return unauthorized
  }

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) {
      return res.sendStatus(403); // If token is not valid, return forbidden
    }

    req.user = user;
    next(); // Token is valid, continue to the next middleware or the route handler
  });
};

// define protected routes
app.use('/employees', authenticateToken);
app.use('/teams', authenticateToken);
app.use('/projects', authenticateToken);
app.use('/users', authenticateToken);

// Define your routes and middleware below this
app.get('/', (req, res) => {
  res.status(418).send('I\'m a teapot');
});

// ------ TEAMS ------

//TESTED toutes les teams
app.get('/teams', async (req, res) => {
  try {
    const teams = await Team.findAll();
    res.json(teams);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//TESTED team par id
app.get('/teams/:id', async (req, res) => {
  try {
    const teams = await Team.findAll({
      where: { team_id: req.params.id }
    });
    res.json(teams);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//TESTED all employees
app.get('/employees', async (req, res) => {
  try {
    const employees = await Employee.findAll();
    res.json(employees);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//TESTED ajouter un employé à une team
app.post('/teams/:teamId/employees/:employeeId', async (req, res) => {
  try {
    const team = await Team.findByPk(req.params.teamId);
    if (!team) {
      return res.status(404).send('Team not found');
    }
    const employee = await team.addEmployee(req.params.employeeId);
    res.status(201).json(employee);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//TESTED Employés d'une team
app.get('/teams/:teamId/employees', async (req, res) => {
  try {
    const employees = await Employee.findAll({
      where: { team_id: req.params.teamId }
    });

    res.json(employees);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// ------ USER ------

//TESTED all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
});


//TESTED projects d'un user
app.get('/users/:userId/projects', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.userId, {
      include: [Project]
    });

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.json(user.Projects);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// ------ PROJETS ------

//TESTED Tous les projets
app.get('/projects', async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.json(projects);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//TESTED Projet par id
app.get('/projects/:id', async (req, res) => {
  try {
    const projects = await Project.findAll({
      where: { project_id: req.params.id }
    });
    res.json(projects);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//TESTED la team d'un projet
app.get('/projects/:id/teams', async (req, res) => {
  try {
    const teams = await Team.findAll({
      include: [{
        model: Project,
        where: { project_id: req.params.id }
      }]
    });

    res.json(teams);

  } catch (error) {
    res.status(500).send(error.message);
  }
});

//TESTED purchases d'un projet
app.get('/projects/:projectId/purchases', async (req, res) => {
  try {
    const purchases = await Purchase.findAll({
      where: { project_id: req.params.projectId }
    });

    res.json(purchases);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//TESTED documents d'un projet
app.get('/projects/:projectId/documents', async (req, res) => {
  try {
    const documents = await Document.findAll({
      where: { project_id: req.params.projectId }
    });

    res.json(documents);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// ajouter un projet
app.post('/projects', async (req, res) => {
  try {
    const newProject = await Project.create(req.body);
    res.status(201).json(newProject);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

//TESTED ajouter une purchase à un projet
/* SAMPLE
{"title": "Test from api",
    "description": "HelloThere",
    "price": 23094032,
    "invoice_number": "GeneralKenobi?"}
*/
app.post('/projects/:projectId/purchases', async (req, res) => {
  try {

    const project = await Project.findByPk(req.params.projectId);
    if (!project) {
      return res.status(404).send('Project not found');
    }
    // create purchase
    const newPurchase = await project.createPurchase(req.body);

    res.status(201).json(newPurchase);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//TESTED ajouter un document à un projet
/*SAMPLE
{"title": "Document test",
    "description": "Description test",
    "link": "https://google.com"}
*/
app.post('/projects/:projectId/documents', async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.projectId);
    if (!project) {
      return res.status(404).send('Project not found');
    }
    const document = await project.createDocument(req.body);
    res.status(201).json(document);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

const bcrypt = require('bcrypt');
const saltRounds = 10;

// POST /register - Register a new user
app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).send('Username and password are required');
    }

    // Check if user already exists
    const userExists = await User.findOne({ where: { username } });
    if (userExists) {
      return res.status(409).send('Username is already taken');
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await User.create({ username, password: hashedPassword });

    res.status(201).json({
      id: newUser.id,
      username: newUser.username,
      // DONT SEND BACK THE PASSWORD YOU DUMMY
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});


// POST /signin - Authenticate a user
app.post('/signin', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).send('Username and password are required');
    }

    // Find user by username
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).send('Invalid username or password');
    }

    // Compare submitted password with hashed password in database
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).send('Invalid username or password');
    }

    const token = jwt.sign({ id: user.id, username: username }, jwtSecret, { expiresIn: '1h' });

    res.json({
      message: 'User signed in successfully',
      token
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});



module.exports = app;
