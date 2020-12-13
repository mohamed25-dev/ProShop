/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  const OrderItems = sequelize.define(
    'order_items',
    {
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      productId: {
        type: DataTypes.STRING(255),
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'product',
          key: 'id',
        },
      },
      orderId: {
        type: DataTypes.STRING(255),
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'order',
          key: 'id',
        },
      },
      unitPrice: {
        type: DataTypes.DECIMAL(10, 0),
        allowNull: false,
        defaultValue: 0,
      },
      comment: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'order_items',
      timestamps: false,
      indexes: [
        {
          name: 'fk_order_items_product1_idx',
          using: 'BTREE',
          fields: [{ name: 'productId' }],
        },
        {
          name: 'fk_order_items_order1_idx',
          using: 'BTREE',
          fields: [{ name: 'orderId' }],
        },
      ],
    }
  );

  OrderItems.associate = function (models) {
    // associations can be defined here
    OrderItems.belongsTo(models.order, {
      foreignKey: 'orderId',
      as: 'order',
    });

    OrderItems.belongsTo(models.product, {
      foreignKey: 'productId',
      as: 'product',
    });
  };

  return OrderItems;
};
