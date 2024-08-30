const axios = require("axios");
require("dotenv").config();

const url = 'https://notify-api.line.me/api/notify';
const token = process.env.LINE_TOKEN;

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/x-www-form-urlencoded",
  },
};
module.exports = {
  async notify(user) { 
    let message = `🚨🚨มีคนพยาบาล login เข้าสูู่โปรแกรม User:${user}🚨🚨 \nhttps://thph.detudomhospital.org`;
    axios
      .post(url, `message=${encodeURIComponent(message)}`, config)
      .then((response) => {
        console.log("ส่งข้อความสำเร็จ:", response.data);
      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการส่งข้อความ:", error);
      });
  },
};
