const config = require('config')
const { Client } = require('discord.js')

const wxapi = require('./jobs/wxapi')

const client = new Client()

async function main () {
  try {
    client.on('ready', () => {
      console.log(`Logged in as ${client.user.tag}!`)
    })

    client.on('message', async msg => {
      if (msg.content === 'update') {
        msg.reply('update start')
        await wxapi()
        msg.reply('update finished')
      }
    })

    await client.login(config.get('resource.discord.bot.token'))
  } catch (error) {
    console.error(error)
  }
}

main()
