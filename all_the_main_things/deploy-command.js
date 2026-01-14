import { REST, Routes } from 'discord.js';
import 'dotenv/config'
import { loadCommands } from './utils/loadcommands.js';

export async function deploy(client) {

    const commandsJson = await loadCommands(client);

    const rest = new REST({ version: '10' }).setToken(process.env.token);

    try {
        console.log(`Deploying ${commandsJson.length} commands...`);
        const data = await rest.put(
            Routes.applicationCommands(process.env.client_id), 
            { body: commandsJson }
        );
        console.log(`Successfully deployed ${data.length} commands.`);
    } catch (error) {
        console.error('Error deploying commands:', error);
    }
};
