const Discord = require('discord.js')

const data = {
    data: new Discord.SlashCommandBuilder()
        .setName('ping')
        .setDescription('notifies you if the bot is online'),
    async execute(interaction){
        // Reply to interaction
        interaction.reply({content:'pong', ephemeral: false})
    }
}

module.exports = data