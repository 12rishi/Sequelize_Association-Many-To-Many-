module.exports = (sequelize, DataTypes) => {
  const Actor = sequelize.define("actor", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Actor;
};
