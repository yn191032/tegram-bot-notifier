const fs = require('fs');
const path = require('path');

const rand = max => Math.floor(Math.random() * max);

module.exports = {
  get: () => {
    const raw = fs.readFileSync(path.resolve(__dirname, './mockData.json'));
    const apartments = (JSON.parse(raw)).apartments;
    const newNumber = rand(2);
    const newApartments = apartments.map(
      (a, i) => {
        if (i <= newNumber) {
          a.id = Math.random()
        }
        return a;
      });

    return Promise.resolve(newApartments);
  }
};