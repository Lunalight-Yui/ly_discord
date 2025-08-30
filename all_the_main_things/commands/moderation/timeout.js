// const { SlashCommandBuilder } = require('discord.js');

// module.exports = {
//   cooldown: 5,
//   data: new SlashCommandBuilder()
//     .setName('timeout')
//     .setDescription('Timeout a member by their user ID')
//     .addStringOption(option => option.setName('target').setDescription('User ID of the member to timeout').setRequired(true))
//     .addIntegerOption(option => option.setName('duration').setDescription('Duration in seconds').setRequired(true)),
//   async execute(interaction) {
//     const commandType = interaction.commandType;
//       const userId = interaction.options.getString('target');
//       const member = interaction.guild.members.cache.get(userId);

//       if (member) {
//         const duration = interaction.options.getInteger('duration') * 1000;
//         // Lakukan tindakan sesuai kebutuhan Anda
//         member.timeout(duration);
//         return interaction.reply({ content: `You wanted to timeout: ${member.user.userId} for ${duration / 1000} seconds`, ephemeral: true });
//       } else {
//         return interaction.reply({ content: 'Member not found or invalid user ID.', ephemeral: true });
//       }
//     }
//  }
//     // }else {
//     //   return interaction.reply({ content: 'Invalid command type.', ephemeral: true });
//     // }
