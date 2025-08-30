const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');


module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('Kicking user')
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator || PermissionsBitField.Flags.KickMembers)
        .addUserOption(option => option.setName('target').setDescription('The member to kick').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('The reason why you want to kick')),
	async execute(interaction) {
		const member = interaction.options.getMember('target');
        if (!member) {
            return interaction.reply("Can't find that member")
        }
        const reason = interaction.options.getString('reason') || 'No reason provided'
        const user = member.user;
        const userId = member.id;

		try {
      await member.kick();
      await interaction.reply(`${member.user.tag} was kicked for: ${reason}`);
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: "An error occurred while trying to ban the member.", ephemeral: true });
    }
  }
};