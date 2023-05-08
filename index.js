// Import necessary modules
const Discord = require('discord.js')
const Tokens = require('./token.js')
const Path = require('node:path')
const FileSystem = require('node:fs')

// Instantiate client
const client = new Discord.Client({
    intents: [ 
        Discord.IntentsBitField.Flags.Guilds,
        Discord.IntentsBitField.Flags.GuildMembers,
        Discord.IntentsBitField.Flags.GuildMessages,
        Discord.IntentsBitField.Flags.MessageContent,
        Discord.IntentsBitField.Flags.GuildMessageReactions,
        Discord.IntentsBitField.Flags.GuildModeration
    ]
})

// Skeleton command registration from discord.js guide
client.commands = new Discord.Collection()
const foldersPath = Path.join(__dirname, 'commands')
const commandFolders = FileSystem.readdirSync(foldersPath)

for (const folder of commandFolders) {
	const commandsPath = Path.join(foldersPath, folder);
	const commandFiles = FileSystem.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = Path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

// Ready callback function
client.once('ready', (vp24bot) => {
    console.log(vp24bot.user.tag + ' is online')
})

// Skeleton interaction handler  taken from discord.js guide
client.on('interactionCreate', async interaction => {
    // Return if the interaction is not chat based
    if (!interaction.isChatInputCommand()) return;

    // Get command from client command collection
    const command = interaction.client.commands.get(interaction.commandName);

    // If command doesn't exist, return and log error
    if (!command){
        console.error(`No command matching ${interaction.commandName} was found.`);
		return;
    }

    // Try to execute command
	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
})

client.login(Tokens.token)

module.exports = client