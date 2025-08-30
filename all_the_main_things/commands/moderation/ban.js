const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('To ban a member')
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator || PermissionsBitField.Flags.BanMembers)
    .addUserOption(option => 
      option
        .setName('member')
        .setDescription('The member to ban')
        .setRequired(true))
    .addStringOption(option =>
      option
        .setName('reason')
        .setDescription('Reason for the ban')),
  async execute(interaction) {
    // Mencoba untuk mendapatkan member dari opsi
    const member = interaction.options.getUser('member');

    if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator | PermissionsBitField.Flags.BanMembers)) {
      return interaction.reply({ content: "You do not have permission to ban!", ephemeral: true });
  }

    if (!member) {
        return interaction.reply("Can't find that member")
    }
    //   const user = interaction.options.getUser('member');
    //   if (!user) {
    //     return interaction.reply({ content: "User not found!", ephemeral: true });
    //   }
    //   try {
    //     member = await interaction.guild.members.fetch(user.id);
    //     if (!member) {
    //       return interaction.reply({ content: "Member not found in the guild!", ephemeral: true });
    //     }
    //   } catch (error) {
    //     console.error(error);
    //     return interaction.reply({ content: "An error occurred while fetching the member.", ephemeral: true });
    //   }
    // } (still of fix)

    const reason = interaction.options.getString('reason') || 'No reason provided';

    if (member.permissions.has(PermissionsBitField.Flags.Administrator)) {
      return interaction.reply({ content: "You cannot ban an administrator!", ephemeral: true });
    }
    
    const user = member.user;
    const userId = member.id;

    try {
      await member.ban();
      await interaction.reply(`${member.user.tag} was banned for: ${reason}`);
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: "An error occurred while trying to ban the member.", ephemeral: true });
    }
  }
};
