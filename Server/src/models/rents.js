const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Rent",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      tenant: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      landlord: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      asset: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      stay: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      bookingCode: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      // checkIn: {
      //   type: DataTypes.DATEONLY,
      //   allowNull: true,
      // },
      // checkOut: {
      //   type: DataTypes.DATEONLY,
      //   allowNull: false,
      // },
      // onSale: {
      //   type: DataTypes.BOOLEAN,
      //   allowNull: true,
      // },
      // checkInTime: {
      //   type: DataTypes.DATE,
      //   allowNull: true,
      // },
      // checkOutTime: {
      //   type: DataTypes.DATE,
      //   allowNull: true,
      // },
      // termCon: {
      //   type: DataTypes.BOOLEAN,
      //   allowNull: true,
      // },
      // paymentMethod: {
      //   type: DataTypes.ENUM("Card", "Cash"),
      //   allowNull: true,
      // },
      // guest: {
      //   type: DataTypes.BOOLEAN,
      //   allowNull: true,
      // },
      // guestName: {
      //   type: DataTypes.STRING,
      //   allowNull: true,
      // },
      // guestPhoneNumber: {
      //   type: DataTypes.STRING,
      //   allowNull: true,
      // },
    },
    { timestamps: false }
  );
};
