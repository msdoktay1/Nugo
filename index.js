import * as  TelegramBot from '../node_modules/node-telegram-bot-api';
const token = '7442648171:AAGL_JtyXx6XGXNCKnOIcJF-ITXud8alFTo'; // Gerçek tokeninizi buraya girin.
const telegramBot = new TelegramBot(token, { polling: true });

// Kullanıcı skorlarını saklamak için bir nesne
const userScores = {};

telegramBot.onText(/\/start/, (msg) => {
    const chat_id = msg.chat.id;
    telegramBot.sendMessage(chat_id, 'Oyun başladı! Skorunuzu artırmak için hedefe tıklayın.');
    // Kullanıcının skorunu başlat
    userScores[chat_id] = 0;
});

telegramBot.on('callback_query', (callbackQuery) => {
    const chat_id = callbackQuery.message.chat.id;
    // Skoru güncelle
    if (callbackQuery.data === 'increase_score') {
        userScores[chat_id]++;
        telegramBot.answerCallbackQuery(callbackQuery.id, {
            text: `Skorunuz: ${userScores[chat_id]}`
        });
    }
});