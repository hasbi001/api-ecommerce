module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("products", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING
      },
      sku :{
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.STRING,
        defaultValue: 0
      },
      Stock:{
        type: Sequelize.STRING,
        defaultValue: 0
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      }
    });
  
    return Product;
  };