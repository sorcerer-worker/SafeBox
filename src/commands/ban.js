const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Ban a user.')
		.addUserOption(option =>
			option.setName('user')
				.setDescription('The user you want to ban.')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('reason')
				.setDescription('The reason the user was banned for.'),
		),
	async execute(interaction) {
		if (interaction.options.getUser('user').id === process.env.CLIENT_ID) {
			const errorEmbed = new MessageEmbed()
				.setColor('#ff5555')
				.setThumbnail('https://raw.githubusercontent.com/classy-giraffe/SafeBox/main/assets/img/error.png')
				.addFields(
					{ name: 'Error', value: 'You can\'t ban this bot recursively, please do it manually.' },
				)
				.setTimestamp();
			await interaction.reply({ embeds: [ errorEmbed ], ephemeral: true });
			return;
		}
		if (interaction.guild.me.roles.highest.position <= interaction.options.getMember('user').roles.highest.position) {
			const errorEmbed = new MessageEmbed()
				.setColor('#ff5555')
				.setThumbnail('https://raw.githubusercontent.com/classy-giraffe/SafeBox/main/assets/img/error.png')
				.addFields(
					{ name: 'Error', value: 'You can\'t ban somebody who has an equal or higher role than the bot.' },
				)
				.setTimestamp();
			await interaction.reply({ embeds: [ errorEmbed ], ephemeral: true });
			return;
		}
		if (interaction.options.getMember('user').id === interaction.guild.ownerId) {
			const errorEmbed = new MessageEmbed()
				.setColor('#ff5555')
				.setThumbnail('https://raw.githubusercontent.com/classy-giraffe/SafeBox/main/assets/img/error.png')
				.addFields(
					{ name: 'Error', value: 'You can\'t ban the server owner.' },
				)
				.setTimestamp();
			await interaction.reply({ embeds: [ errorEmbed ], ephemeral: true });
			return;
		}
		try {
			const user = await interaction.options.getUser('user');
			await interaction.guild.members.ban(user);
			const successEmbed = new MessageEmbed()
				.setColor('#55ff55')
				.setThumbnail('https://raw.githubusercontent.com/classy-giraffe/SafeBox/main/assets/img/tick.png')
				.addFields(
					{ name: 'Success', value: 'User banned correctly!' },
				)
				.setTimestamp();
			await interaction.reply({ embeds: [ successEmbed ] });
			await interaction.deleteReply();
		}
		catch (err) {
			const errorEmbed = new MessageEmbed()
				.setColor('#ff5555')
				.setThumbnail('https://raw.githubusercontent.com/classy-giraffe/SafeBox/main/assets/img/error.png')
				.addFields(
					{ name: 'Error', value: err.message },
				)
				.setTimestamp();
			await interaction.reply({ embeds: [ errorEmbed ], ephemeral: true });
		}

	},
};