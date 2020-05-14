const Telegraf = require('telegraf');
const { Extra, session } = require('telegraf');
const { log } = require('../logger')('bot');

const messages = require('./messages');
const { onlinerKeyboard, apartmentKeyboard } = require('./keyboards');

const config = require('config');
const queue = require('../queue');
const User = require('../models/User');

const bot = new Telegraf(config.botToken);

queue.consume(config.notificationsQueue, ({ chatId, data }) => {
  data.map(a => bot.telegram.sendPhoto(
      chatId, 
      a.photo, 
      Extra.caption(`${a.address}\n*$${a.price}* _${a.rentType}_`)
        .markdown()
        .markup(apartmentKeyboard(a.url))
    ));
});

bot.use(session());
// bot.use(Telegraf.log());
bot.use(Telegraf.log(update => {
  const { message } = JSON.parse(update);
  log(`${message.from.first_name} ${message.from.last_name}(${message.from.id}): ${message.text}`);
}));

bot.start(async (ctx) => {
  const isUserExists = await User.exists({ chatId: ctx.from.id });
  
  if (!isUserExists) {
    const newUser = new User({
      chatId: ctx.from.id,
      firstName: ctx.from.first_name,
      lastName: ctx.from.last_name,
    });
    await newUser.save();
  }

  ctx.reply(messages.start, Extra.markdown());
});

bot.help(ctx => {
  ctx.reply(messages.help, Extra.markdown().markup(onlinerKeyboard));
});

bot.command('price', async ctx => {
  const [command, min, max] = ctx.message.text.split(' ');
  await User.setPrice(ctx.from.id, min, max);
  ctx.reply(messages.price);
});

bot.command('rooms', async ctx => {
  const [command, min, max] = ctx.message.text.split(' ');
  await User.setRooms(ctx.from.id, min, max);
  ctx.reply(messages.rooms);
});

bot.command('stop', async ctx => {
  await User.remove({ chatId: ctx.from.id })
  ctx.reply(messages.stop);
});

bot.launch();