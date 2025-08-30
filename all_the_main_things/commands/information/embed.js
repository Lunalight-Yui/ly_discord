const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  cooldown : 5,
    data: new SlashCommandBuilder()
        .setName('embed')
        .setDescription('Just testing first!'),
    async execute(interaction, client) {
      const channel = interaction.options.getChannel("channel")
      const title = interaction.options.getString("title")
      const description = interaction.options.getString("description")
      const image = interaction.options.getString("image")
      const color = interaction.options.getString("color")
      const author = interaction.options.getString("author")
      const url = interaction.options.getString("url")
      const thumbnail = interaction.options.getString("thumbnail")
      const footer = interaction.options.getString("footer")
      const footerImage = interaction.options.getString("footer-image")
      const exampleEmbed = new EmbedBuilder()
        .setTitle("Wait a minute!")
        .setDescription('How about?')
        .addFields(
          { name: 'Testing1', value: 'I just want to test first' },
          { name: '`Testing 2 ', value: 'Wait a sec'}
        )
        .setColor("#57ff00")
        .setFooter({text: `Created by someone`});
        interaction.reply({ content: "Done!", ephemeral: true }) // When /command, it will work! not the apps message application error
        
        if(channel) {
          channel.send({
            embeds: [exampleEmbed]
          })
        } else {
        interaction.channel.send({ embeds: [exampleEmbed] });
        }
    },
};
