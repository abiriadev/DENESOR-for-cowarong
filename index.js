const discord = ({
    Intents: { FLAGS },
} = require('discord.js'))
const express = require('express')
const morgan = require('morgan')

const app = express()

const CHID = '751056203299291196'

let log = []
let owner = null

const getTimeTag = (d = new Date()) =>
    `<t:${d.getTime().toString().slice(0, 10)}>`

const getLink = (g, c, m) => `https://discord.com/channels/${g}/${c}/${m}`

app.use(morgan('dev'))
// app.use()

app.get('/', (req, res) => {
    res.end('Im alive')
})

app.get('/log', (req, res) => {
    res.end(log.join('\n'))
})

app.listen(process.env.PORT || 8080)

const bot = new discord.Client({
    intents: [
        FLAGS.GUILDS,
        FLAGS.GUILD_MEMBERS,
        FLAGS.GUILD_BANS,
        FLAGS.GUILD_EMOJIS_AND_STICKERS,
        FLAGS.GUILD_INTEGRATIONS,
        FLAGS.GUILD_WEBHOOKS,
        FLAGS.GUILD_INVITES,
        FLAGS.GUILD_VOICE_STATES,
        FLAGS.GUILD_PRESENCES,
        FLAGS.GUILD_MESSAGES,
        FLAGS.GUILD_MESSAGE_REACTIONS,
        FLAGS.GUILD_MESSAGE_TYPING,
        FLAGS.DIRECT_MESSAGES,
        FLAGS.DIRECT_MESSAGE_REACTIONS,
        FLAGS.DIRECT_MESSAGE_TYPING,
    ],
})

bot.on('ready', async () => {
    console.log(`😀 logined as ${bot.user.username}`)

    owner = (await bot.application.fetch()).owner
    owner.send(
        `${getTimeTag()}\nMESSAGE: I'm awake!\nto check logs, head over to https://abiria-denesor-cowarong.azurewebsites.net/ and https://portal.azure.com/?websitesextension_ext=asd.featurePath%3Ddetectors%2FLinuxLogViewer#@63f4d0db-d42f-4d30-b20a-cc339a3d5477/resource/subscriptions/1bfa9837-304a-40d5-9a43-2d9c59a18b41/resourceGroups/appsvc_linux_centralus/providers/Microsoft.Web/sites/abiria-denesor-cowarong/logStream`,
    )
})

bot.on('messageCreate', async msg => {
    console.log(`${msg.author.tag}: ${msg.content}`)

    if (msg.author.id === '662201438621138954') {
        if (msg.content === 'hey?') {
            msg.reply('yeh?')

            log.push(`[${new Date().toUTCString()}]: ${msg.content}`)
        }
    }
})

bot.on('guildMemberAdd', async member => {
    const ch = member.guild.channels.resolve(CHID)

    const m = await ch.send(`${member} 님이 오셨어요!`)

    owner.send(
        `<@${member.id}> 가 왔다 이놈아!\n${getLink(
            member.guild.id,
            CHID,
            m.id,
        )}`,
    )

    log.push(`[${new Date().toUTCString()}]: JOIN ${member.user.tag}`)

    if (member.user.bot) return

    const r = member.guild.roles.resolve('882591881115103232')

    member.roles.add(r)
})

bot.login().catch(err => {
    console.log('fail to login!')
})
