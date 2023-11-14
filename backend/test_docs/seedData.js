const { use } = require("../server");

module.exports = async (Project, Team, Purchase, Employee, Document, User) => {
    
    user1 = await User.create({
        username: 'John Doe',
        password: 'password'

    });
    console.log('user1 created', user1.toJSON());

};
