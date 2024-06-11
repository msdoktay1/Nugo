const { Telegraf } = require('telegraf');

const BOT_TOKEN = '7442648171:AAGL_JtyXx6XGXNCKnOIcJF-ITXud8alFTo';
const bot = new Telegraf(BOT_TOKEN);

// Oyunun short_name'ini ve URL'sini tanımlayın
const GAME_SHORT_NAME = 'nugocoin';
const GAME_URL = 'https://msdoktay1.github.io/Nugo/index.html?';

bot.command('start', (ctx) => {
    // Oyunu kullanıcıya gönder
    ctx.replyWithGame(GAME_SHORT_NAME);
});
bot.command('start', (ctx) => {
    ctx.reply('Oyunu başlatmak için aşağıdaki butona tıklayın:', {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Nugo Oyna', url: 'https://msdoktay1.github.io/Nugo/' }]
            ]
        }
    });
});


// CallbackQuery'yi yakala ve oyunu başlat
bot.on('callback_query', (ctx) => {
    const callbackQueryId = ctx.callbackQuery.id;
    const gameShortName = ctx.callbackQuery.game_short_name;
    console.log(gameShortName);
    console.log(GAME_SHORT_NAME);
    if (gameShortName === GAME_SHORT_NAME) {
        // Oyun URL'sine yönlendir
        ctx.answerCbQuery(callbackQueryId, undefined, false, { url: GAME_URL });
    }
});

// Botu başlat
bot.launch();
