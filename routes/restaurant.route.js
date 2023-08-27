const restaurantController = require("../controller/restaurant.controller");

module.exports = function (app) {
  app.post("/api/restaurant/add", restaurantController.addRestaurant);
};
