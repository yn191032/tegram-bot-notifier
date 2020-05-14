const start = `
Welcome!
Get notifications about new apartments in Minsk!
Set the number of rooms and the price.
Send /help for info.
`;

const help = `
/start to get notifications
/price max min - to set up the price
/rooms max min -  to set up the number of rooms
/stop to remove notifications
`;

const stop = `
Notifications stoped.
`;

const rooms = `
Rooms configured.
`;

const price = `
Price configured.
`;

module.exports = {
  start,
  stop,
  help,
  rooms,
  price,
};

