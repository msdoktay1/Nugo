const { Telegraf } = require('telegraf');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const bot = new Telegraf('7442648171:AAGL_JtyXx6XGXNCKnOIcJF-ITXud8alFTo');

app.use(bodyParser.json());

// Skorları alacak endpoint
app.post('/submit-score', (req, res) => {
  const { score, chatId } = req.body;
  
  // Burada skoru Telegram botuna gönderme işlemi yapılır
  bot.telegram.sendMessage(chatId, `Yeni skorunuz: ${score}`);
  
  res.status(200).send('Skor kaydedildi');
});

// Express sunucusunu başlat
app.listen(3000, () => {
  console.log('Sunucu 3000 portunda çalışıyor');
});

// Botu başlat
bot.launch();
