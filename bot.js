const { Telegraf } = require("telegraf");
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start( (ctx) => {
    ctx.reply("Hello! Banjix Dictionary is alive");
});

bot.on("text", (ctx) => {
    const input = ctx.message.text.toLowerCase().trim();
    console.log("User searched: ", input);
})

bot.launch();

console.log("Bot started");