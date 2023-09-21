const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Amenity", {
      
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      svg:{
        type: DataTypes.STRING
      }
    },
    { timestamps: false }
  );
};

