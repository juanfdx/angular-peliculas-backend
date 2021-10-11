const User = require('../models/User');
const Movie = require('../models/Movie');
const Comment = require('../models/Comment');



Movie.hasMany(Comment, {
  onDelete: 'CASCADE'
});
Comment.belongsTo(Movie);


