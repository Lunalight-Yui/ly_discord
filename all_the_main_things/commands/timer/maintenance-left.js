const { SlashCommandBuilder } = require('discord.js');
const { getMaintenanceTimeLeft } = require('../maintenance.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mt')
        .setDescription('Check remaining time for maintenance.'),
    async execute(interaction) {
        const timeLeft = getMaintenanceTimeLeft();
        await interaction.reply(timeLeft);
    },
};
