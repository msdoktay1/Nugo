const express = require('express');
const TelegramBot = require('node-telegram-bot-api');

const app = express();
const port = 3000;

// Telegram bot tokeninizi buraya girin
const token = '7442648171:AAGL_JtyXx6XGXNCKnOIcJF-ITXud8alFTo';
const bot = new TelegramBot(token, { polling: true });

// JSON gövde işleyici middleware'ini kullan
app.use(express.json());

// Skor güncelleme endpoint'i
app.post('/update-score', (req, res) => {
  const { chatId, score } = req.body;
  bot.sendMessage(chatId, `Yeni skorunuz: ${score}`);
  res.status(200).send('Skor güncellendi');
});

// Sunucuyu başlat
app.listen(port, () => {
  console.log(`Sunucu http://localhost:${port} adresinde çalışıyor`);
});
