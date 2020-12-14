/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'review',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.STRING(255),
        allowNull: false,
        references: {
          model: 'user',
          key: 'id',
        },
      },
      productId: {
        type: DataTypes.STRING(255),
        allowNull: false,
        references: {
          model: 'product',
          key: 'id',
        },
      },
      rate: {
        type: DataTypes.INTEGER,
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
      tableName: 'review',
      timestamps: true,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'id' }],
        },
        {
          name: 'fk_review_product1_idx',
          using: 'BTREE',
          fields: [{ name: 'productId' }],
        },
        {
          name: 'fk_review_user1_idx',
          using: 'BTREE',
          fields: [{ name: 'userId' }],
        },
      ],
    }
  );
};
