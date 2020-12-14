module.exports = function (sequelize, DataTypes) {
  const ShippingAddress = sequelize.define('shipping_address', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    orderId: {
      type: DataTypes.STRING(255),
      allowNull: false,
      references: {
        model: 'order',
        key: 'id',
      },
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    postalCode: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  });

  ShippingAddress.associate = function (models) {
    // associations can be defined here
    ShippingAddress.belongsTo(models.order, {
      foreignKey: 'orderId',
      as: 'order',
    });
  };

  return ShippingAddress;
};
