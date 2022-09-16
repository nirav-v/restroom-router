export function getRestroomApi() {
  var requestUrl =  'https://www.refugerestrooms.org/api/v1/restrooms/by_location?page=1&per_page=10&offset=0&ada=false&unisex=false&lat=37.3387&lng=-121.8853';

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
    });
 }
