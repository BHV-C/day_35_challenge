const bcrypt = require("bcrypt"); // Library for password hashing
const saltRounds = 10; 


const usersDB = [
    { id: 1, username: 'user1', passwordHash: bcrypt.hashSync('password1', saltRounds) ,role: 'user' },  
    { id: 2, username: 'user2', passwordHash: bcrypt.hashSync('password2', saltRounds) ,role: 'user'  },
    { id: 3, username: 'admin', passwordHash: bcrypt.hashSync('admin', saltRounds),role: 'admin'  },
    { id: 4, username: 'alice', passwordHash: bcrypt.hashSync('admin123', saltRounds) ,role: 'user'  }
];

module.exports = usersDB;