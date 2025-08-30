const {SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const { ownerId } = require('C:/Users/ACER/Desktop/Other/coding bot/Discord bot/config.json')

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
     .setName('lybot')
     .setDescription('Giving information about lybot'),

     async execute(interaction) {
        const url = 'https://discord.gg/RvBwTmjQkX';
        const uptime = Math.floor(interaction.client.uptime / 1000);
        const embed = new EmbedBuilder()
        .setDescription(`This bot is made by <@604960307181256724> since 2021`)
        .addFields(
           {name: 'Owner bot', value: `<@604960307181256724>`, inline: true},
           {name: 'Id', value: '604960307181256724', inline: true},
           {name: 'uptime', value: `${uptime} seconds`, inline: true},
           {name: 'Servers', value: `${interaction.client.guilds.cache.size}`, inline: true}
        )
        .setFooter({ text: `Click aku ${url}`})
        .setAuthor({ name: `${interaction.client.user.username}`, iconURL: `${interaction.client.user.displayAvatarURL()}`})
        .setColor('Random')
        .setTimestamp()
        await interaction.reply({ embeds: [embed]})
     }
}