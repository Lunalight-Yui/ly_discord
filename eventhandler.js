const { Events, PermissionsBitField } = require('discord.js');

function setupEventHandlers(client) {
    client.on(Events.ClientReady, () => {
        console.log('Bot is ready!');
        client.user.setPresence({
            activities: [{ name: 'Your movement!', type: 'WATCHING' }],
            status: 'idle',
        });
    });

    client.on(Events.InteractionCreate, async interaction => {
        if (!interaction.isChatInputCommand()) return;

        const command = client.commands.get(interaction.commandName);
        if (!command) return;

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({
                content: 'There was an error while executing this command!',
                ephemeral: true,
            });
        }
    });
}

module.exports = { setupEventHandlers };
