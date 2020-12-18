/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'product',
    {
      id: {
        type: DataTypes.STRING(255),
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(10, 0),
        allowNull: false,
      },
      quantityInStock: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'category',
          key: 'id',
        },
      },
      image: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      description: {
        type: Sequelize.STRING(255),
        defaultValue: 'Description is not available for this product',
      },
    },
    {
      sequelize,
      tableName: 'product',
      timestamps: true,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'id' }],
        },
        {
          name: 'fk_product_category1_idx',
          using: 'BTREE',
          fields: [{ name: 'categoryId' }],
        },
      ],
    }
  );
};
