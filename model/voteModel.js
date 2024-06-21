module.exports = (sequelize, DataTypes) => {
  const Vote = sequelize.define(
    "Vote",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {}
  );
  return Vote;
};
