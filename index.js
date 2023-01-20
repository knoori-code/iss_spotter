const { timeStamp } = require("console");
const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require("./iss")
// const { fetchMyIP } = require("./iss")

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("The attempt failed", error);
//     return;
//   }

//   console.log("The attempt failed. Returned IP:", ip);
// })


// fetchCoordsByIP("123", (error, data) => {
//   if (error) {
//     console.log(error)
//   }
//   if (data) {
//     console.log(data)
//   }

// })

// fetchISSFlyOverTimes({ latitude: '45.4215296', longitude: '-75.6971931' }, (error, data) => {
//   if (error) {
//     console.log("The attempt failed", error)
//     return
//   }
//   if (data) {
//     console.log("Success! Returned flyover data: ", data)
//   }
// })

nextISSTimesForMyLocation((error, times) => {
  if (error) {
    return console.log("The attempt failed", error);
  }
  console.log(times);
})