const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder()
    .setName('say')
    .setDescription('Repeats what you say')
    .addStringOption(option => option.setName('message').setDescription('The message you want the bot to say').setRequired(true)),
  async execute(interaction) {
    const channel = interaction.options.getChannel("channel")
    const message = interaction.options.getString('message');
    interaction.reply ({ content: "Finish", ephemeral: true})

    if(channel) {
      channel.send ({
        messages: [message]
      })
    } else
    await interaction.channel.send(message);
    await interaction.deleteReply()
  },
};
