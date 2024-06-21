module.exports = (sequelize, DataTypes) => {
  const Vote = sequelize.define("Vote", {
    vote_id: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    votee: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        return this.getDataValue("votee").split(";");
      },
      set(val) {
        this.setDataValue("votee", val.join(";"));
      },
    },
  });
  return Vote;
};
