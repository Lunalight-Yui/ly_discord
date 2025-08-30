const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');
const { setMaintenance, isMaintenance } = require('../maintenance.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('maintenance')
        .setDescription('Toggle maintenance mode.')
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator || PermissionsBitField.Flags.ManageChannels)
        .addBooleanOption((option) =>
            option
                .setName('status')
                .setDescription('Enable or disable maintenance mode.')
                .setRequired(true)
        )
        .addStringOption((option) =>
            option
                .setName('duration')
                .setDescription('Optional duration for maintenance mode in anything.')
        ),
    async execute(interaction) {
        const status = interaction.options.getBoolean('status');
        const duration = interaction.options.getString('duration');

        setMaintenance(status, duration);

        await interaction.reply({
            content: `Maintenance mode is now ${status ? 'enabled' : 'disabled'}${
                duration ? ` for ${duration} seconds.` : '.'
            }`,
            ephemeral: true,
        });
    },
};
