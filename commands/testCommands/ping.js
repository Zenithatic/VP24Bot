const Discord = require('discord.js')
const client = require('../../index.js')

const data = {
    data: new Discord.SlashCommandBuilder()
        .setName('ping')
        .setDescription('replies with pong'),
    async execute(interaction){
        await interaction.reply({content: `Pong! The bot latency is ${Math.abs(interaction.createdTimestamp - Date.now())}ms`, ephemeral: false})
    }
}

module.exports = data