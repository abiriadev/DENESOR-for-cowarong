const discord = require('discord.js')

const bot = new discord.Client({
    intents: [
        discord.Intents.FLAGS.GUILDS,
        discord.Intents.FLAGS.GUILD_MESSAGES,
        discord.Intents.FLAGS.GUILD_MEMBERS,
        discord.Intents.FLAGS.GUILD_PRESENCES,
    ],
})

bot.on('ready', () => {
    console.log(`logined as ${bot.user.username}`)
})

bot.on('messageCreate', async msg => {
    if (msg.author.id === '662201438621138954') {
        if (msg.content === 'hey?') {
            msg.reply('yeh?')
        }
    }
})

bot.on('guildMemberAdd', member => {
    member.guild.channels
        .resolve('751056203299291196')
        .send(`${member} 님이 오셨어요!`)

    if (member.user.bot) return

    const r = member.guild.roles.resolve('882591881115103232')

    member.roles.add(r)
})

bot.login()
