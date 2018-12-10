const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const sequelize = new Sequelize('database', 'root','',{
  host: 'localhost',
  dialect: 'sqlite',
  //operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  // SQLite only
  storage: 'myDb'
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  const User = sequelize.define('users', {
    nickname: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
  });


let userSession;

class userModel {

  static create(user,res){
    User.create({
     nickname: `${user.nickname}`,
     password: `${user.password}`,
   });
   res.send(`The user ${user.nickname} successfully created !`);
  }

  static getAll(res) {

    User.findAll({
      attributes: ['nickname', 'password']
      }).then(users => {
      res.send(users);

    })
  }

  static login(data,req,res) {
    userSession = req.session;

    if(userSession.username){
      res.render('../view/logged.ejs');
    }else {
      User.findOne({
        where:{
          nickname: `${data.nickname}`,
          password: {
            [Op.and]: [
               `${data.password}`
            ]
          }

        }
      }).then(users => {
        if (users) {
          userSession.username = users.nickname;
          res.render('../view/logged.ejs');

        }else {
          res.redirect('/login');
        }
       })
    }
  }

    static register(data,req,res){
    userSession = req.session;

    if(userSession.username){
      res.send("You'r logged in, please logout to register");
    }else{
      User.create({
       nickname: `${data.nickname}`,
       password: `${data.password}`,

     });
     res.send(`The user ${data.nickname} successfully created !`);
    }
  }

  static delete(data, res) {

    User.destroy({
      where:{
        nickname:`${data.nickname}`
      },
      truncate: true /* this will ignore where and truncate the table instead */
    });
    // db.get(`DELETE  from user where id = ${id}`, (err, row) => {
    //   if (err) res.send(err);
    //   else res.send(`User has been successfully deleted :{"id" : ${id}`);
    // });
  }


    static loginPage(req,res){
      if (req.session.username) {
        res.render('../view/logged.ejs')
      }else {
        res.render('../view/singUp.ejs')
      }

    }

    static loggedPage(req, res) {
      if (!req.session.username) {
        res.redirect('/login')
        return;
      }
      res.render('../view/logged.ejs')
    }

      static logoutPage(req, res) {
        if (req.session.username) {
          req.session.username = null;
          res.send('You are successfully deconnected')
        }else {
          res.render('../view/logout.ejs')
        }
      }

      static registerPage(req,res){
        if (req.session.username) {
          res.redirect('/logged');
        }else {
          res.render('../view/singnIn.ejs')
        }
      }

}

module.exports = userModel;
