const db = require('../db')

module.exports = {
	name: 'currentgp',
	description: 'Shows the amount of GP currently in the gold pile.',
	async execute(message, args) {
		let money = Number(await db.getGold())
		message.channel.send(`Amount of GP: ${money}m`);
	},
};