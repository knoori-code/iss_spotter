const { nextISSTimesForMyLocation } = require("./iss_promised")


nextISSTimesForMyLocation()
  .then((passTimes) => {
    console.log(passTimes);
  })
  .catch((error) => {
    console.log("It failed: ", error);
  })

