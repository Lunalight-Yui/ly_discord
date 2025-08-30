const { Client, Collection, Events, GatewayIntentBits, ActivityType, PermissionsBitField } = require('discord.js');
const { token } = require('./config.json');
const loadCommands = require('./utils/loadcommands');
const { setMaintenance, isMaintenance } = require('./utils/maintenance'); // Maintenance utils
const cooldowns = new Collection()

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMembers,
    ],
});

client.commands = new Collection();

// Load commands
loadCommands(client);

client.once(Events.ClientReady, () => {
    console.log('Your bot is Ready!');
    client.user.setPresence({
        activities: [{ name: 'Your movement!', type: ActivityType.Watching }],
        status: 'idle',
    });
});

client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    // Skip maintenance check for admins or the maintenance command
    const adminUser = interaction.member.permissions.has(PermissionsBitField.Flags.Administrator);
    if (isMaintenance() && interaction.commandName !== 'maintenance' && !adminUser) {
        return interaction.reply({
            content: 'Bot is currently under maintenance. Please try again later!',
            ephemeral: true,
        });
    }

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    if (command.requirePermissions) {
        const missingPermissions = command.requiredPermissions.filter(perm => !interaction.member.permissions.has(PermissionsBitField.FLAGS[perm]));
        if (missingPermissions.length > 0) {
            return interaction.reply({
                content: `You are missing the following permissions to run this command: ${missingPermissions.join(', ')}`,
                ephemeral: true
            })
    }
}

    const { cooldown = 5 } = command; // Default cooldown 5 detik jika tidak didefinisikan
const now = Date.now();

if (!cooldowns.has(command.data.name)) {
    cooldowns.set(command.data.name, new Collection());
}

const timestamps = cooldowns.get(command.data.name);
const cooldownAmount = cooldown * 1000;

if (timestamps.has(interaction.user.id)) {
    const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;

    if (now < expirationTime) {
        const timeLeft = ((expirationTime - now) / 1000).toFixed(1);
        return interaction.reply({
            content: `Please wait ${timeLeft} more seconds before reusing the \`${command.data.name}\` command.`,
            ephemeral: true,
        }), setTimeout(() => {
            interaction.deleteReply().catch(console.error);
        }, timeLeft * 1000)
    }
    return;
}

timestamps.set(interaction.user.id, now);
setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);


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

client.login(token);
