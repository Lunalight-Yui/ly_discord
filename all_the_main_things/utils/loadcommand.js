import fs from'node:fs';
import path from'node:path';
import { pathToFileURL } from 'url';

const __dirname = import.meta.dirname;

export async function loadCommands(client) {
    const commandsData = [];
    const foldersPath = path.join(__dirname, '../commands');
    const commandFolders = fs.readdirSync(foldersPath);

    for (const folder of commandFolders) {
        const commandsPath = path.join(foldersPath, folder);
        if (!fs.lstatSync(commandsPath).isDirectory) continue;
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const fileUrl = pathToFileURL(filePath).href;
            const module = await import(fileUrl);
            const command = module.default || module;

            if (command.data && command.execute) {
                client.commands.set(command.data.name, command);
                commandsData.push(command.data.toJSON());
            } else {
                console.warn(`[WARNING] The command at ${filePath} is missing "data" or "execute".`);
            }
        }
    }
    return commandsData;
}

