const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('../config.json');

const client = new Discord.Client();

// Collection (Map) containing all the commands and their code
client.commands = new Discord.Collection();

// Read all the files from "command" folder
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

// To add any roles that should be allowed to use the bot, simply add the roleid to the "allowedRoles" array.
//                       Karl dev role      Baod Channel staff role   Senior staff            Owner                 Head staff             co-owner
 const allowedRoles = ['844504510528225301', '778254713682264064', '778254712877088798', '778254710456451082', '778254708270956575', '778254708837449739']

client.once('ready', () => {
	console.log('Ready!');
});

client.login(token);

client.on('message', async message => {	
	
	if (!message.content.startsWith(prefix) || message.author.bot) return;
	
	if(!userIsAllowed(message.member, allowedRoles)) return
	
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();
	console.log('COMMAND', commandName, args);
	
	// Check if command exists in the command collection
	if (!client.commands.has(commandName)) return;

	const command = client.commands.get(commandName)

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}

});

Number.prototype.countDecimals = function () {
	if (Math.floor(this.valueOf()) === this.valueOf()) return 0;
	return this.toString().split(".")[1].length || 0;
}

function userIsAllowed(member, allowedRoles){
	for(const roleId of allowedRoles){
		if(member.roles.cache.has(roleId)){
			return true
		}
	}
	return false
}