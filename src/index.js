const Discord = require('discord.js');
const { prefix, token } = require('../config.json');
const db = require('./db')
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!');
});

client.login(token);


client.on('message', async message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();
	console.log('COMMAND', command, args);

	if (command === 'collectgp') {

		if (args[0] === 'undefined') {
			message.channel.send(`No amount specified.`);
			return;
		}

		let money = Number(await db.getGold())

		argument = args[0];
		lastChar = argument.length - 1;

		amount = Number(argument.substring(0, lastChar));
		suffix = argument[lastChar];

		if (amount.countDecimals() === 1 || amount.countDecimals() === 0) {
			if (suffix === 'm') {

				money += amount
				money = Math.round(money * 10) / 10

				await db.updateGold(money)
				message.channel.send(`Adding ${amount}${suffix} to the gold pile.\nAmount of GP: ${money}m.`);
			} else {
				message.channel.send(`${amount}${suffix} is not a valid amount, command must end with \'m\'`);
			}

		} else {
			message.channel.send(`Only one decimal is allowed, round to the nearest 100k mark.`);
			return;
		}

	
	
	} else if (command === 'removegp') {	

		if (args[0] === 'undefined') {
			message.channel.send(`No amount specified.`);
			return;
		}

		let money = Number(await db.getGold())

		argument = args[0];
		lastChar = argument.length - 1;

		amount = Number(argument.substring(0, lastChar));
		suffix = argument[lastChar];

		if (amount.countDecimals() === 1 || amount.countDecimals() === 0) {
			if (suffix === 'm') {
				if (money - amount < 0) {
					message.channel.send(`You can't remove ${amount}${suffix} from the gold pile as it only consists of ${money}m.`);
					return;
				}
				money -= amount
				money = Math.round(money * 10) / 10
				await db.updateGold(money)
				message.channel.send(`Removing ${amount}${suffix} from the gold pile.\nAmount of GP: ${money}m.`);
			} else {
				message.channel.send(`${amount}${suffix} is not a valid amount, command must end with \'m\'`);
			}

		} else {
			message.channel.send(`Only one decimal is allowed, round to the nearest 100k mark.`);
			return;
		}
	}
	else if (command === 'currentgp') {
		let money = Number(await db.getGold())
		message.channel.send(`Amount of GP: ${money}m`);
	}
	else if (command === 'resetgp') {
		await db.resetGold()
		message.channel.send(`Gold pile reset.\nAmount of GP: 0m`);
	}

});

Number.prototype.countDecimals = function () {
	if (Math.floor(this.valueOf()) === this.valueOf()) return 0;
	return this.toString().split(".")[1].length || 0;
}