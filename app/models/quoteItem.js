module.exports = (sequelize, Sequelize) => {
    const QuoteItems = sequelize.define("quote_items", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      quoteId: {
        type: Sequelize.INTEGER
      },
      product_name: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.STRING
      },
      quantity: {
        type: Sequelize.STRING
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
  
    return QuoteItems;
  };