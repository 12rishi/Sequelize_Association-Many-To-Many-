const { movies, actors } = require(".");

module.exports = (sequelize, DataTypes) => {
  const ActorMovie = sequelize.define("actormovie", {
    actorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: actors,
        key: "id",
      },
    },
    movieId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: movies,
        key: "id",
      },
    },
  });
  return ActorMovie;
};
