const { Telegraf } = require('telegraf');

const BOT_TOKEN = '7442648171:AAGL_JtyXx6XGXNCKnOIcJF-ITXud8alFTo';
const bot = new Telegraf(BOT_TOKEN);

// Oyunun short_name'ini ve URL'sini tanımlayın
const GAME_SHORT_NAME = 'nugo';
const GAME_URL = 't.me/Nugo_Coin_Bot/nugo';

//bot.command('play', (ctx) => {
// Oyunu kullanıcıya gönder
//ctx.replyWithGame(GAME_SHORT_NAME);
//});
bot.command('openurl', (ctx) => {
    const callbackQueryId = ctx.message.chat.id;
    console.log(callbackQueryId);
    // Oyununuzun fotoğrafını burada gönderin
    ctx.replyWithPhoto({ source: 'photo.jpg' }).then((result) => {
        const file_id = result.photo[result.photo.length - 1].file_id;
        console.log('Fotoğrafın file_id:', file_id);
    }).catch((err) => {
        console.log('Fotoğraf gönderilirken bir hata oluştu:', err);
    });
});
bot.command('play', (ctx) => {
    const telegramUserId = ctx.message.from.id;
    console.log("asdfasdfasd : ",telegramUserId);
    ctx.replyWithPhoto('AgACAgQAAxkDAAIBOGZo0d3WAhmkLouvkS6Ybp-15kbgAAK1wTEbTPZAU4bPAmyq91X7AQADAgADeAADNQQ', {
        caption: 'Nugo\nOyunu oynamak açmak için butona tıklayın:',
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Play', url: `${GAME_URL}?userId=${telegramUserId}` }]
            ]
        }
    });
});

// CallbackQuery'yi yakala ve oyunu başlat
bot.gameQuery(async (ctx) => {
    const callbackQueryId = ctx.callbackQuery.message.chat.id;
    const gameShortName = ctx.callbackQuery.game_short_name;
    const gameUrl = ctx.callbackQuery.url;
    console.log(gameShortName);
    console.log(gameUrl);
    console.log(GAME_SHORT_NAME);
    if (gameShortName === GAME_SHORT_NAME) {
        // Oyun URL'sine yönlendir
        await ctx.answerGameQuery("t.me/Nugo_Coin_Bot/nugo");
    }
});

// Botu başlat
bot.launch();
//https://t.me/Nugo_Coin_Bot/nugo