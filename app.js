require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./database/config');


//1 EXPRESS SERVER
const app = express();

//5 CORS
app.use(cors());


//2 SETTING
const PORT = process.env.PORT || 3000;


//MIDDLEWARE - lectura y parseo de req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//4 ROUTES
app.use('/api/login', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/movies', require('./routes/movies'));



//3 START SERVER
app.listen(PORT, () => {
  console.log(`app listening at http://localhost:${PORT}`);

  //CONNECT TO DB
  //Force true: DROP TABLES
  sequelize.sync({ force: false }).then( () => {
    console.log('DB Online.');

  }).catch(error => {
    console.error('Unable to connect to the database:', error);

  }) 

});