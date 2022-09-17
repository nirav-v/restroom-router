import React from "react";
import { useMutation } from "@apollo/client";
import { CREATE_RESTROOM } from "../util/mutations";

export default function GetRestroomApi() {
  const [
    createRestroom,
    { data, loading: loadingRestroom, error: errorRestroom },
  ] = useMutation(CREATE_RESTROOM);

  var requestUrl =
    "https://www.refugerestrooms.org/api/v1/restrooms/by_location?page=1&per_page=10&offset=0&ada=false&unisex=false&lat=37.3387&lng=-121.8853";

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(async (restrooms) => {
      console.log(restrooms);
      try {
        for (let i = 0; i < restrooms.length; i++) {
          console.log(restrooms[i].name, restrooms[i].changing_table, restrooms[i].unisex, restrooms[i].accessible, restrooms[i].latitude, restrooms[i].longitude)
          // await createRestroom({
          //   variables: {
          //     areaDescription: restrooms[i].name,
          //     changingStation: restrooms[i].changing_table,
          //     keyRequired: restrooms[i].unisex,
          //     adaAccessible: restrooms[i].accessible,
          //     lat: restrooms[i].latitude,
          //     lon: restrooms[i].longitude,
          //   },
          // });
        }
      } catch (error) {console.log(error)}
    });
    return null
}
