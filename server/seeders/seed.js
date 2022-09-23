const db = require("../config/connection");
const { Restroom } = require("../models");
const restroomSeeds = require("./restroomSeeds.json");
const fetch = require("node-fetch");

let apiRestrooms;

db.once("open", async () => {
  await Restroom.deleteMany({});
  await Restroom.create(restroomSeeds);

  var url =
    "https://www.refugerestrooms.org/api/v1/restrooms/by_location?page=1&per_page=10&offset=0&ada=false&unisex=false&lat=37.3387&lng=-121.8853";
  // fetching restroom api data, returned as array of objects
  try {
    const response = await fetch(url);
    const json = await response.json();
    apiRestrooms = [...json];
    // creating new instance of Restroom in database for each restroom object returned in array
    for (let i = 0; i < apiRestrooms.length; i++) {
      await Restroom.create({
        areaDescription: apiRestrooms[i].name,
        changingStation: apiRestrooms[i].changing_table,
        keyRequired: apiRestrooms[i].unisex,
        adaAccessible: apiRestrooms[i].accessible,
        location: {
          type: "Point",
          coordinates: [apiRestrooms[i].longitude, apiRestrooms[i].latitude],
        },
      });
    }
  } catch (error) {
    console.log(error);
  }

  console.log("all done!");
  process.exit(0);
});
