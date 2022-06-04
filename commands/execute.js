const util = require('node:util');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const exec = util.promisify(require('node:child_process').exec);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('execute')
		.setDescription('Execute shell code inside a Docker container.')
		.addStringOption(option =>
			option.setName('input')
				.setDescription('The code you want to execute')
				.setRequired(true)),
	async execute(interaction) {
		try {
			const input = await interaction.options.getString('input');
			const { stdout } = await exec(input);
			const output = new MessageEmbed()
				.setColor('#0099ff')
				.setTitle('Some title')
				.setURL('https://discord.js.org/')
				.setAuthor({ name: 'Some name', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
				.setDescription('Some description here')
				.setThumbnail('https://i.imgur.com/AfFp7pu.png')
				.addFields(
					{ name: 'Output', value: stdout },
					{ name: '\u200B', value: '\u200B' },
				)
				.setTimestamp()
				.setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });
			await interaction.reply({ embeds: [ output ] });
		}
		catch (error) {
			console.log(error);
			await interaction.reply('Something went wrong while executing the command.');
		}
	},
};