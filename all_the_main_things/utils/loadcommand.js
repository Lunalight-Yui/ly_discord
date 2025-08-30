const fs = require('node:fs');
const path = require('node:path');

function loadCommands(client) {
    const commands = new Map();
    const foldersPath = path.join(__dirname, '../commands');
    const commandFolders = fs.readdirSync(foldersPath);

    for (const folder of commandFolders) {
        const commandsPath = path.join(foldersPath, folder);
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const command = require(filePath);

            if (command.data && command.execute) {
                client.commands.set(command.data.name, command);
                commands.set(command.data.name, command.data.toJSON());
            } else {
                console.warn(`[WARNING] The command at ${filePath} is missing "data" or "execute".`);
            }
        }
    }

    return commands;
}

module.exports = loadCommands;
