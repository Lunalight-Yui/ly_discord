const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');
const fs = require('fs')
const path = require('path')

const warnsFilePath = path.join(__dirname, '../warns.json');

// Helper function to read warnings from the file
const readWarns = () => {
    if (!fs.existsSync(warnsFilePath)) {
        fs.writeFileSync(warnsFilePath, JSON.stringify({}, null, 2));
    }
    const data = fs.readFileSync(warnsFilePath);
    return JSON.parse(data);
};

// Helper function to write warnings to the file
const writeWarns = (data) => {
    fs.writeFileSync(warnsFilePath, JSON.stringify(data, null, 2));
};

module.exports = {
    data: new SlashCommandBuilder()
        .setName('warn')
        .setDescription('To count warn member')
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
        .addUserOption(option => 
            option.setName('member')
                .setDescription('The member to warn')
                .setRequired(true))
        .addStringOption(option => 
            option.setName('reason')
                .setDescription('Reason for the warning')),
    async execute(interaction) {
        let member = interaction.options.getMember('member');
        
        if (!member) {
            const user = interaction.options.getUser('member');
            if (!user) {
                return interaction.reply({ content: "Member not found!", ephemeral: true });
            }
            try {
                member = await interaction.guild.members.fetch(user.id);
                if (!member) {
                    return interaction.reply({ content: "Member not found in the guild!", ephemeral: true });
                }
            } catch (error) {
                console.error(error);
                return interaction.reply({ content: "An error occurred while fetching the member.", ephemeral: true });
            }
        }

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return interaction.reply({ content: "You do not have permission to warn!", ephemeral: true });
        }

        const reason = interaction.options.getString('reason') || 'no provided'

        if (member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return interaction.reply({ content: "You cannot warn an administrator!", ephemeral: true });
        }

        const userId = member.id;
        const user = member.user;
        const warns = readWarns();
        
        if (!warns[userId]) {
            warns[userId] = { username: user.username, warnings: 0 };
        }

        warns[userId].warnings += 1;
        writeWarns(warns);

        await interaction.reply(`${user.username} has been warned with the reason ${reason} (warn: ${warns[userId].warnings}).`);
    },
};