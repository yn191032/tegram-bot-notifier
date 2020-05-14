const { Markup } = require('telegraf');

const onlinerKeyboard = (markup = Markup) => {
  return markup.inlineKeyboard([
    markup.urlButton('Go to onliner.by', 'https://r.onliner.by/ak')
  ])
}

const apartmentKeyboard = (url) => (markup = Markup) => {
  return markup.inlineKeyboard([
    markup.urlButton('More', url)
  ])
}

module.exports = {
  onlinerKeyboard,
  apartmentKeyboard,
};