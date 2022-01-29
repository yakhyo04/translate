const { Telegraf } = require('telegraf');
const translator = require('translation-google');
const config = require('./config.json');

const bot = new Telegraf(config.BOT_TOKEN);

bot.start((ctx) => {
    const chatId = ctx.from.first_name 
    ctx.reply(`Hello ${chatId} send me a text ...\n This bot can perform the following commands\n - /enuz English-Uzbek\n - /uzen Uzbek-English`)
})

bot.command('enuz', (ctx) => {
    ctx.reply('You are in English-Uzbek')
    bot.on('text', async (ctx) => {
        const text = ctx.update.message.text
    
        const translation = await translator(text, {from: 'en', to: 'uz'})
    
        ctx.reply(translation.text)
    })
})

bot.command('uzen', (ctx) => {
    ctx.reply('You are in Uzbek-English')
    bot.on('text', async (ctx) => {
        const text = ctx.update.message.text
    
        const translation = await translator(text, {from: 'uz', to: 'en'})
    
        ctx.reply(translation.text)
    })
})

bot.launch()