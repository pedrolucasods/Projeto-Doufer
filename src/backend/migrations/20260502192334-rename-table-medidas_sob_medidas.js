'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.renameTable('medidas_sob_medida', 'medidas_sob_medidas')
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.renameTable('medidas_sob_medidas', 'medidas_sob_medida')
    }
};
