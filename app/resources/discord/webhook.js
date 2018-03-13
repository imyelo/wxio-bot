const config = require('config')
const { WebhookClient } = require('discord.js')

module.exports = new WebhookClient(config.get('resource.discord.webhook.id'), config.get('resource.discord.webhook.token'))
