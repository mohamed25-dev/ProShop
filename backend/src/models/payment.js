/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  const Payment = sequelize.define(
    'payment',
    {
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
      userId: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      paymentMethodId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'payment_method',
          key: 'id',
        },
      },
      amount: {
        type: DataTypes.DECIMAL(10, 0),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'payment',
      timestamps: true,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'id' }],
        },
        {
          name: 'fk_payment_payment_method1_idx',
          using: 'BTREE',
          fields: [{ name: 'paymentMethodId' }],
        },
      ],
    }
  );

  Payment.associate = function (models) {
    // associations can be defined here
    Payment.belongsTo(models.payment_method, {
      foreignKey: 'paymentMethodId',
      as: 'paymentMethod',
    });
  };

  return Payment;
};
