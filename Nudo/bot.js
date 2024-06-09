const { Telegraf } = require('telegraf');

const BOT_TOKEN = '7442648171:AAGL_JtyXx6XGXNCKnOIcJF-ITXud8alFTo';
const bot = new Telegraf(BOT_TOKEN);

// Oyunun short_name'ini ve URL'sini tanımlayın
const GAME_SHORT_NAME = 'Nugo';
const GAME_URL = 'https://telegram.org/js/games.js';

bot.command('start', (ctx) => {
  // Oyunu kullanıcıya gönder
  ctx.replyWithGame(GAME_SHORT_NAME);
});

// CallbackQuery'yi yakala ve oyunu başlat
bot.on('callback_query', (callbackQuery) => {
  const gameShortName = callbackQuery.game_short_name;
  if (gameShortName === GAME_SHORT_NAME) {
    // Oyun URL'sine yönlendir
    bot.answerCallbackQuery(callbackQuery.id, { url: GAME_URL });
  }
});

// Botu başlat
bot.launch();
