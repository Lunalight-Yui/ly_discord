const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	cooldwon : 5,
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Provides information about the user.')
		.addUserOption(option => 
			option.setName('user')
			.setDescription('Target of the user')
			.setRequired(true)
		),
	async execute(interaction) {
		const user = interaction.options.getUser("user") || interaction.user;
		const member = await interaction.guild.members.fetch(user.id)
		const tag = user.tag
		const embed = new EmbedBuilder()
         .setDescription(`${user}`)
		 .setThumbnail(`${member.displayAvatarURL()}`)
		 .setAuthor({ name: tag, iconURL: `${member.displayAvatarURL()}`})
         .addFields(
			{ name: 'ID', value: `${member.id}`},
			{ name: 'Joined this server', value: `${member.joinedAt}`},
			{ name: 'Join discord', value: `${user.createdAt}`},
			{ name: 'Role', value: `${member.roles.cache.map(r => r).join('')}`}
        )
        .setColor('Random')
		.setTimestamp()
        .setFooter({text: `This is the user information`});
        await interaction.reply({ embeds: [embed] })
		}
	}