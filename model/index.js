const { FOREIGNKEYS } = require("sequelize/lib/query-types");
const dbConfig = require("../config/dbConfig");
const { Sequelize, DataTypes } = require("sequelize");

// la sequelize yo config haru lag ani database connect gardey vaneko hae
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("CONNECTED!!");
  })
  .catch((err) => {
    console.log("Error" + err);
  });

const db = {};

db.actors = require("./actorModel")(sequelize, DataTypes);
db.actormovies = require("./actorMovieModel")(sequelize, DataTypes);
db.movies = require("./movieModel")(sequelize, DataTypes);
db.actors.belongsToMany(db.movies, { through: db.actormovies });
db.movies.belongsToMany(db.actors, { through: db.actormovies });

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// importing model files

db.sequelize.sync({ force: false }).then(() => {
  console.log("yes re-sync done");
});

module.exports = db;
