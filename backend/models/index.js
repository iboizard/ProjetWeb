const sequelize = require('../database');
const Project = require('./project')(sequelize);
const User = require('./user')(sequelize);
const Employee = require('./employee')(sequelize);
const Team = require('./team')(sequelize);
const Purchase = require('./purchase')(sequelize);
const Document = require('./document')(sequelize);

// One-to-Many Associations
Project.hasMany(Purchase, { foreignKey: 'project_id' });
Purchase.belongsTo(Project, { foreignKey: 'project_id' });

Project.hasMany(Document, { foreignKey: 'project_id' });
Document.belongsTo(Project, { foreignKey: 'project_id' });

Team.hasMany(Employee, { foreignKey: 'team_id' });
Employee.belongsTo(Team, { foreignKey: 'team_id' });

// Many-to-Many Associations
Project.belongsToMany(Employee, { through: 'ProjectEmployees', foreignKey: 'project_id' });
Employee.belongsToMany(Project, { through: 'ProjectEmployees', foreignKey: 'employee_id' });

Project.belongsToMany(User, { through: 'ProjectUsers', foreignKey: 'project_id' });
User.belongsToMany(Project, { through: 'ProjectUsers', foreignKey: 'user_id' });

Project.belongsToMany(Team, { through: 'ProjectTeams', foreignKey: 'project_id' });
Team.belongsToMany(Project, { through: 'ProjectTeams', foreignKey: 'team_id' });

feedDBwithSeedData = async () => {
  require('../test_docs/seedData')(Project, Team, Purchase, Employee, Document, User);
}

module.exports = {
  sequelize,
  Project,
  User,
  Employee,
  Team,
  Purchase,
  Document,
  feedDBwithSeedData
};
