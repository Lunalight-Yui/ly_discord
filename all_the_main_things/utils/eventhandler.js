import { Events, MessageFlags, ActivityType, PermissionFlagsBits } from 'discord.js';

export function setupEventHandlers(client) {
    client.once(Events.ClientReady, () => {
        console.log(`Ready! Logged in as ${client.user.tag}`);
        client.user.setPresence({
            activities: [{ name: 'Watching you~', type: ActivityType.Watching }],
            status: 'idle',
        });
    });
    
    client.on(Events.InteractionCreate, async (interaction) => {
        if (!interaction.isChatInputCommand()) return;
    
        const command = client.commands.get(interaction.commandName);
        if (!command) return;
    
        // Permission Check Fix
        if (command.requiredPermissions) {
            const missingPermissions = command.requiredPermissions.filter(
                perm => !interaction.member.permissions.has(PermissionFlagsBits[perm])
            );
            
            if (missingPermissions.length > 0) {
                return interaction.reply({
                    content: `You need these permissions: ${missingPermissions.join(', ')}`,
                    flags: [MessageFlags.Ephemeral] 
                });
            }
        }
    
        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'Error executing command!', flags: [MessageFlags.Ephemeral] });
            } else {
                await interaction.reply({ content: 'Error executing command!', flags: [MessageFlags.Ephemeral] });
            }
        }
    });
}

