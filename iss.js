/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const request = require('request')

const fetchMyIP = function (callback) {
  request(`https://api.ipify.org/?format=json`, (error, response, body) => {
    if (error) {
      return callback(error, null)
    }

    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const ip = JSON.parse(body).ip;
    if (ip) {
      return callback(null, ip)
    }
  });

}

const fetchCoordsByIP = function (ip, callback) {
  request(`http://ipwho.is/${ip}`, (error, response, body) => {
    if (error) {
      return callback(error, null)
    }
    const obj = JSON.parse(body)
    if (obj) {
      return callback(null, { "latitude": obj.latitude, "longitude": obj.longitude })
    }

    // check if "success" is true or not
    if (!obj.success) {
      const message = `Success status was ${obj.success}. Server message says: ${obj.message} when fetching for IP ${obj.ip}`;
      callback(Error(message), null);
      return;
    }
  });
}

const fetchISSFlyOverTimes = function (coords, callback) {
  request(`https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when getting ISS pass times: ${body}`), null);
      return;
    }
    const obj = JSON.parse(body);
    const timesArray = obj.response;
    if (timesArray) {
      callback(null, timesArray);
      return
    }

  });

}

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }
    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        return callback(error, null);
      }
      fetchISSFlyOverTimes(coords, (error, times) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, times)
      })
    })

  })
}


module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };