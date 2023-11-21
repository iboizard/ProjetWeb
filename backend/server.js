const express = require('express');
const { sequelize, Project, User, Employee, Team, Purchase, Document } = require('./models'); // Use CommonJS require

// Initialisation serveur
const app = express();
const port = 3000;

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
    app.listen(port, () => {
      console.log(`Server listening at http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error('Unable to sync database:', err);
  });


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
  try{
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

// ajouter une purchase à un projet
app.post('/projects/:projectId/purchases', async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.projectId);
    if (!project) {
      return res.status(404).send('Project not found');
    }
    const purchase = await project.createPurchase(req.body);
    res.status(201).json(purchase);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// ajouter un document à un projet
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




// --- sécu ---
// S'inscrire
// Se connecter
// Se déconnecter


module.exports = app;
