import axios from "axios";
import path from "path";
import fs from 'fs'
import FormData from "form-data";

const { TG_BOT_CHAT_ID, TG_BOT_API_KEY } = process.env

export async function sendTelegramMessage(message: string, image: string) {

  const url = `https://api.telegram.org/bot${TG_BOT_API_KEY}/sendPhoto`

  const formData = new FormData();
  const fullPath = path.join(process.cwd(), "public", image);
  const imageReadStream = fs.createReadStream(fullPath);

  formData.append("chat_id", TG_BOT_CHAT_ID!);
  formData.append("caption", message);
  formData.append("parse_mode", "Markdown");
  formData.append("photo", imageReadStream);

  await axios.post(url, formData, { headers: formData.getHeaders() })

  // const body = {
  //   chat_id: TG_BOT_CHAT_ID,
  //   photo: image,
  //   caption: message,
  //   parse_mode: "Markdown"
  // };
  //
  // const headers = { "Content-Type": "application/json" };
  //
  // await axios.post(url, body, { headers });

}

  // const url = `https://api.telegram.org/bot${TG_BOT_API_KEY}/sendMessage`;
  // await fetch(url, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({
  //     chat_id: TG_BOT_CHAT_ID,
  //     text: message,
  //     parse_mode: "Markdown"
  //   })
  // });
