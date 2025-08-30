const { EmbedBuilder } = require("@discordjs/builders")
const { SlashCommandBuilder } = require("discord.js")

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
     .setName('role')
     .setDescription('Giving information about role in this server'),

     async execute(interaction) {
        const embed = new EmbedBuilder()
        const server = interaction.guild.name
         .setDescription('All role list in this server')
		 .setAuthor({ name: server, iconURL: `${interaction.guild.iconURL()}`})
         .addFields(
			{ name: "Role list", value: `${interaction.guild.roles.cache.toJSON().join(', ')}`}
        )
        .setColor('Random')
		.setTimestamp()
        .setFooter({text: `This is role list information`});
        await interaction.reply({ embeds: [embed] })
     }
}