const axios = require("axios");
require("dotenv").config();

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN; // ใส่ใน .env
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;     // ใส่ใน .env

const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

module.exports = {
  async notify(user) {
    const message = `🚨🚨 มีคนพยาบาล login เข้าสู่โปรแกรม User: ${user} 🚨🚨\nhttps://thph.detudomhospital.org`;

    const data = {
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: "HTML", // รองรับการขึ้นบรรทัดใหม่และ emoji
    };

    try {
      const response = await axios.post(url, data);
      console.log("ส่งข้อความไป Telegram สำเร็จ:", response.data);
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการส่งข้อความไป Telegram:", error.response?.data || error.message);
    }
  },
};