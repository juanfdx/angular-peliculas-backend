require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./database/config');
const associations = require('./database/associations');
const path = require('path');


//1 EXPRESS SERVER
const app = express();

// DIRECTORIO publico (para producción con Angular)
app.use(express.static('public'));

//5 CORS
app.use(cors());


//2 SETTING
const PORT = process.env.PORT || 3000;


//MIDDLEWARE - lectura y parseo de req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//4 ROUTES
app.use('/api/login', require('./routes/auth'));
app.use('/api/search', require('./routes/searchs'));
app.use('/api/users', require('./routes/users'));
app.use('/api/movies', require('./routes/movies'));
app.use('/api/comments', require('./routes/comments'));
app.use('/api/upload', require('./routes/uploads'));


// MANEJAR DEMAS RUTAS (para producción con Angular)
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public/index.html'));
});


//3 START SERVER
app.listen(PORT, () => {
  console.log(`app listening at http://localhost:${PORT}`);

  //CONNECT TO DB
  //Force true: DROP TABLES revisada
  sequelize.sync({ force: false }).then( () => {
    console.log('DB Online.');

  }).catch(error => {
    console.error('Unable to connect to the database:', error);

  }) 

});