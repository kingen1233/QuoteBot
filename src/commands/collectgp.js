const db = require('../db')

module.exports = {
	name: 'collectgp',
	description: 'Adds GP to the gold pile.',
	async execute(message, args) {
		if (args[0] === 'undefined') {
			message.channel.send(`No amount specified.`);
			return;
		}

		let money = Number(await db.getGold())

		argument = args[0];
		lastChar = argument.length - 1;

		amount = Number(argument.substring(0, lastChar));
		suffix = argument[lastChar];

		if(Number.isNaN(amount)){
			message.channel.send(`\"${argument}\" is not a valid amount.`);
			return
		}
		
		if (amount.countDecimals() === 1 || amount.countDecimals() === 0) {
			if (suffix === 'm') {

				money += amount
				money = Math.round(money * 10) / 10
				await db.updateGold(money)
				message.channel.send(`Adding ${argument}to the gold pile.\nAmount of GP: ${money}m.`);
			} else {
				message.channel.send(`\"${argument}\" is not a valid amount, amount must be in millions and end with \'m\'`);
				return;
			}

		} else {
			message.channel.send(`Only one decimal is allowed, round to the nearest 100k mark.`);
			return;
		}
	},
};