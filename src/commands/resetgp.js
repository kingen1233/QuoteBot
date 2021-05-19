const db = require('../db')

module.exports = {
	name: 'resetgp',
	description: 'Sets the amount of GP in the gold pile to 0.',
	async execute(message, args) {
		await db.resetGold()
		message.channel.send(`Gold pile reset.\nAmount of GP: 0m`);
	},
};