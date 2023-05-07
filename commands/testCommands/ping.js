const Discord = require('discord.js')
const client = require('../../index.js').bot
const data = {
    data: new Discord.SlashCommandBuilder()
        .setName('ping')
        .setDescription('replies with pong'),
    async execute(interaction){
        await interaction.reply({content: `Pong! The API latency is ${client.ws.ping}ms and the bot latency is ${Date.now() - interaction.createdTimestamp}ms`, ephemeral: false})
    }
}

module.exports = data