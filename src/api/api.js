const qs = require('qs');
const axios = require('axios');
const config = require('config');
const { log, error } = require('../logger')('api');

const params = {
  price: { min: 50, max: 1000 },
  only_owner: true,
  currency: 'usd',
  page: 1,
  order: 'created_at:desc',
  v: '0.1747795014574709',
  bounds: {
    lb: { lat: '53.86279928659702', long: '27.41070341216823' },
    rt: { lat: '53.9294010314176', long: '27.69904878977987' },
  },
  rent_type: ['1_room', '2_rooms', '3_rooms', '4_rooms'],
};

const paramsSerializer = (params) => qs.stringify(
  params, { 
    encode: false, 
    arrayFormat: 'brackets', 
  }
);

const get = async () => {
  try {
    const res = await axios({
      baseURL: config.apiUrl,
      method: 'get',
      params,
      paramsSerializer,
    });

    log(`HTTP GET ${res.status} ak.api.onliner.by`);

    return res.data.apartments.map(a => ({
      id: a.id,
      photo: a.photo,
      address: a.location.address,
      price: a.price.converted.USD.amount,
      rentType: a.rent_type.replace(/_/g, ' '),
      url: a.url,
    }));

  } catch (err) {
    error(err);
  }
};

module.exports = { get }