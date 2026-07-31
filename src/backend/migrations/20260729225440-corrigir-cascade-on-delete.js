'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('item_pedido_medidas', 'item_pedido_id',{
      type: Sequelize.INTEGER,
      references:{
          model:"itens_pedidos",
          key:"id"
      },
      onDelete:"CASCADE",
      hooks:true
    });
     
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('item_pedido_medidas','item_pedido_id',{
      type: Sequelize.INTEGER,
      references:{
          model:"itens_pedidos",
          key:"id"
      },
      onDelete:"RESTRICT"
    })
  }
};
