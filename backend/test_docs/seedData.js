const project = require("../models/project");
const team = require("../models/team");
const user = require("../models/user");
const { use } = require("../server");

module.exports = async (Project, Team, Purchase, Employee, Document, User) => {
    
    // ----- USERS -----
    user1 = await User.create({
        username: 'John Doe',
        password: 'password'

    });
    console.log('user1 created', user1.toJSON());

    user2 = await User.create({
        username: 'Jane Doe',
        password: 'password'
    });
    console.log('user2 created', user2.toJSON());

    user3 = await User.create({
        username: 'John Smith',
        password: 'password'
    });
    console.log('user3 created', user3.toJSON());

    // ----- TEAMS -----
    team1 = await Team.create({
        name: 'Team 1',
    });
    console.log('team1 created', team1.toJSON());

    team2 = await Team.create({
        name: 'Team 2',
    });
    console.log('team2 created', team2.toJSON());

    // ----- PROJECTS -----
    project1 = await Project.create({
        name: 'Project 1',
        description: 'Description 1',
        objectif: 'Objectif 1',
        deadline: '2020-12-31',
        budget: 100000,
    });
    console.log('project1 created', project1.toJSON());

    project2 = await Project.create({
        name: 'Project 2',
        description: 'Description 2',
        objectif: 'Objectif 2',
        deadline: '2020-12-31',
        budget: 100000,
    });
    console.log('project2 created', project2.toJSON());

    project3 = await Project.create({
        name: 'Project 3',
        description: 'Description 3',
        objectif: 'Objectif 3',
        deadline: '2020-12-31',
        budget: 100000,
    });
    console.log('project3 created', project3.toJSON());

    // ----- PURCHASES -----
    purchase1 = await Purchase.create({
        title: 'Purchase 1',
        description: 'Description 1',
        price: 10000,
        invoice_number: 'INV-001',
    });
    console.log('purchase1 created', purchase1.toJSON());

    purchase2 = await Purchase.create({
        title: 'Purchase 2',
        description: 'Description 2',
        price: 20000,
        invoice_number: 'INV-002',
    });
    console.log('purchase2 created', purchase2.toJSON());

    purchase3 = await Purchase.create({
        title: 'Purchase 3',
        description: 'Description 3',
        price: 30000,
        invoice_number: 'INV-003',
    });
    console.log('purchase3 created', purchase3.toJSON());

    // ----- EMPLOYEES -----
    employee1 = await Employee.create({
        first_name: 'Employee 1',
        last_name: 'Employee 1',
        skills: 'Skill 1',
        status: 'Junior',
    });
    console.log('employee1 created', employee1.toJSON());

    employee2 = await Employee.create({
        first_name: 'Employee 2',
        last_name: 'Employee 2',
        skills: 'Skill 2',
        status: 'Senior',
    });
    console.log('employee2 created', employee2.toJSON());

    employee3 = await Employee.create({
        first_name: 'Employee 3',
        last_name: 'Employee 3',
        skills: 'Skill 3',
        status: 'Junior',
    });
    console.log('employee3 created', employee3.toJSON());

    // ----- DOCUMENTS -----
    document1 = await Document.create({
        title: 'Document 1',
        description: 'Description 1',
        link: 'File 1',
    });
    console.log('document1 created', document1.toJSON());

    document2 = await Document.create({
        title: 'Document 2',
        description: 'Description 2',
        link: 'File 2',
    });
    console.log('document2 created', document2.toJSON());

    document3 = await Document.create({
        title: 'Document 3',
        description: 'Description 3',
        link: 'File 3',
    });
    console.log('document3 created', document3.toJSON());

    // add employees to projects
    await project1.addEmployee(employee1);
    await project1.addEmployee(employee2);
    await project2.addEmployee(employee2);
    await project2.addEmployee(employee3);
    await project3.addEmployee(employee1);

    // add users to projects
    await project1.addUser(user1);
    await project1.addUser(user2);
    await project2.addUser(user2);
    await project2.addUser(user3);
    await project3.addUser(user3);

    // add purchases to projects
    await project1.addPurchase(purchase1);
    await project1.addPurchase(purchase2);
    await project2.addPurchase(purchase3);

    // add documents to projects
    await project1.addDocument(document1);
    await project2.addDocument(document2);
    await project3.addDocument(document3);

    // add employees to teams
    await team1.addEmployee(employee1);
    await team1.addEmployee(employee2);
    await team2.addEmployee(employee3);

    // add projects to teams
    await team1.addProject(project1);
    await team1.addProject(project2);
    await team2.addProject(project2);
    await team2.addProject(project3);
    await project1.addTeam(team1);
    // await project2.addTeam(team1);
    // await project2.addTeam(team2);
    // await project3.addTeam(team2);
    


    console.log('seed data added to database');
};
