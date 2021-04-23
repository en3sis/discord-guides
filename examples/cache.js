const { promisify } = require('util');
const axios = require('axios');
const redis = require('redis');
const client = redis.createClient();

/* Promisfy so we can have promise base functionality */
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);
const setexAsync = promisify(client.setex).bind(client);
const ttlAsync = promisify(client.ttl).bind(client);

client.on('error', function (error) {
  console.error(error);
});

/**
 * Writes strigify data to cache
 * @param {string} key key for the cache entry
 * @param {*} value any object/string/number */
const cacheSet = async (key, value) => {
  return await setAsync(key, JSON.stringify(value));
};

/**
 * Writes strigify data to cache
 * @param {string} key key for the cache entry
 * @param {*} value any object/string/number
 * @param {number} ttl cache duration in seconds, default 3600 (1h) */
const cacheSetTTL = async (key, value, ttl = 3600) => {
  return await setexAsync(key, ttl, JSON.stringify(value));
};

/** Retrieves data for a given key
 * @param {string} key key of the cached entry */
const cacheGet = async (key) => {
  const data = await getAsync(key);

  return JSON.parse(data);
};

/**
 * Fetch for the Weather API endpoint
 * @param {string} city - City to be fetched
 */
const fetchData = async (city) => {
  const isCached = await cacheGet(city);

  if (isCached) {
    console.log('⚡️  From cache');

    return isCached;
  } else {
    // Fetch data
    const { data } = await axios.get(`https://goweather.herokuapp.com/weather/${city}`);

    // Save data to cache
    await cacheSetTTL(city, data);

    return data;
  }
};

module.exports = async (msg, key) => {
  const currentWeather = await fetchData(key);

  return msg.channel.send({
    embed: {
      title: `Weather in ${key}`,
      fields: [
        {
          name: ' 🌡 Temp:',
          value: `**${currentWeather.temperature}**`,
          inline: true,
        },
        {
          name: '🍃  Wind:',
          value: `**${currentWeather.wind}**`,
          inline: true,
        },
      ],
      color: 0x03a9f4,
    },
  });
};
