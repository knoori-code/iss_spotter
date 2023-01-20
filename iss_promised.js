const request = require('request-promise-native')

const fetchMyIP = function () {
  return request('https://api.ipify.org/?format=json')
}

const fetchCoordsByIP = function (body) {
  const ipAddress = JSON.parse(body).ip
  return request(`http://ipwho.is/${ipAddress}`)
}

const fetchISSFlyOverTimes = function (body) {
  const { latitude, longitude } = JSON.parse(body)
  return request(`https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`)
}

const nextISSTimesForMyLocation = function () {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const times = JSON.parse(data).response;
      return times
    })
}

module.exports = { nextISSTimesForMyLocation }

