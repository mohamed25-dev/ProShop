/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  const Order = sequelize.define(
    'order',
    {
      id: {
        type: DataTypes.STRING(255),
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.STRING(255),
        allowNull: false,
        references: {
          model: 'user',
          key: 'id',
        },
      },
      shippingPrice: {
        type: DataTypes.DECIMAL(10, 0),
        allowNull: false,
        defaultValue: 0,
      },
      taxPrice: {
        type: DataTypes.DECIMAL(10, 0),
        allowNull: false,
        defaultValue: 0,
      },
      statusId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'order_status',
          key: 'id',
        },
      },
      paymentId: {
        type: DataTypes.STRING(255),
        allowNull: true,
        references: {
          model: 'payment',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      tableName: 'order',
      timestamps: true,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'id' }],
        },
        {
          name: 'fk_order_order_status1_idx',
          using: 'BTREE',
          fields: [{ name: 'statusId' }],
        },
        {
          name: 'fk_order_payment1_idx',
          using: 'BTREE',
          fields: [{ name: 'paymentId' }],
        },
      ],
    }
  );

  Order.associate = function (models) {
    // associations can be defined here
    Order.belongsTo(models.user, {
      foreignKey: 'userId',
      as: 'customer',
    });

    Order.belongsTo(models.order_status, {
      foreignKey: 'statusId',
      as: 'status',
    });

    Order.belongsTo(models.payment, {
      foreignKey: 'paymentId',
      as: 'payment',
    });

    Order.hasMany(models.order_items, {
      foreignKey: 'orderId',
      as: 'items',
    });
  };

  return Order;
};
