/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'order',
    {
      id: {
        type: DataTypes.STRING(255),
        allowNull: false,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      total_price: {
        type: DataTypes.DECIMAL(10, 0),
        allowNull: false,
        defaultValue: 0,
      },
      status_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'order_status',
          key: 'id',
        },
      },
      payment_id: {
        type: DataTypes.STRING(255),
        allowNull: true,
        references: {
          model: 'payment',
          key: 'id',
        },
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    },
    {
      sequelize,
      tableName: 'order',
      timestamps: false,
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
          fields: [{ name: 'status_id' }],
        },
        {
          name: 'fk_order_payment1_idx',
          using: 'BTREE',
          fields: [{ name: 'payment_id' }],
        },
      ],
    }
  );
};
