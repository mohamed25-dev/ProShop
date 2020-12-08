/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'order_items',
    {
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      product_id: {
        type: DataTypes.STRING(255),
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'product',
          key: 'id',
        },
      },
      order_id: {
        type: DataTypes.STRING(255),
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'order',
          key: 'id',
        },
      },
      unit_price: {
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
          fields: [{ name: 'product_id' }],
        },
        {
          name: 'fk_order_items_order1_idx',
          using: 'BTREE',
          fields: [{ name: 'order_id' }],
        },
      ],
    }
  );
};
