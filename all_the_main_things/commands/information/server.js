const { SlashCommandBuilder, EmbedBuilder, VoiceChannel, TextChannel } = require('discord.js');

module.exports = {
	cooldown : 5,
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Provides information about the server.'),
	async execute(interaction) {
		const embed = new EmbedBuilder()
		 .setAuthor({name: `${interaction.guild.name}`, iconURL: `${interaction.guild.iconURL()}`})
		 .setThumbnail(`${interaction.guild.iconURL()}`)
		 .setDescription(`${interaction.guild.id}`)
		 .setColor('Random')
		 .setTimestamp()
		 .setFooter({ text: 'This is server information' })
		 .addFields(
			{name: "owner", value: `${await interaction.guild.fetchOwner()}`, inline: true},
			{name: "Owner ID", value: `${interaction.guild.ownerId}`, inline: true},
			{name: "Total member", value: `${interaction.guild.memberCount}`, inline: true},
			{name: "text Channels", value: `${interaction.guild.channels.cache.filter((c) => c.type === 0).toJSON().length}`, inline: true},
			{name: "Voice Channels", value: `${interaction.guild.channels.cache.filter((c) => c.type === 2).toJSON().length}`, inline: true},
			{name: "Role", value: `${interaction.guild.roles.cache.size}`, inline: true},
			{name: "Role list", value: `${interaction.guild.roles.cache.toJSON().join(', ')}`},
			{name: "Time create", value: `${await interaction.guild.createdAt.toDateString()}`}
		)
		// interaction.guild is the object representing the Guild in which the command was run
		// await interaction.reply(`This server is ${interaction.guild.name} and has ${interaction.guild.memberCount} members.`);
		await interaction.reply({ embeds: [embed]})
	},
};