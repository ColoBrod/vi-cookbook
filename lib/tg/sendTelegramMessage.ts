const { TG_BOT_CHAT_ID, TG_BOT_API_KEY } = process.env

export async function sendTelegramMessage(message: string) {
  const url = `https://api.telegram.org/bot${TG_BOT_API_KEY}/sendMessage`;
  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: TG_BOT_CHAT_ID,
      text: message,
      parse_mode: "Markdown"
    })
  });
}
