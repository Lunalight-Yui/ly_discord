const { REST, Routes } = require('discord.js');
const { clientId, token } = require('./config');
const fs = require('node:fs');
const path = require('node:path');

(async () => {
    const commands = [];
    const foldersPath = path.join(__dirname, 'commands');

    // Baca semua file command
    fs.readdirSync(foldersPath).forEach(folder => {
        const commandsPath = path.join(foldersPath, folder);
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

        commandFiles.forEach(file => {
            const command = require(path.join(commandsPath, file));
            if (command.data && command.execute) {
                commands.push(command.data.toJSON());
            } else {
                console.warn(`[WARNING] Missing "data" or "execute" in ${file}`);
            }
        });
    });

    // Deploy commands
    const rest = new REST({ version: '10' }).setToken(token);

    try {
        console.log(`Deploying ${commands.length} commands...`);
        const data = await rest.put(Routes.applicationCommands(clientId), { body: commands });
        console.log(`Successfully deployed ${data.length} commands.`);
    } catch (error) {
        console.error('Error deploying commands:', error);
    }
})();
