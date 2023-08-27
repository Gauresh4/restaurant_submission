const restaurantController = require("../controller/restaurant.controller");

module.exports = function (app) {
  app.post("/api/restaurant/add", restaurantController.addRestaurant);
  app.get("/api/restaurant", restaurantController.getRestaurants);
  app.get(
    "/api/restaurant/categories",
    restaurantController.getRestaurantCategories
  );
  app.get(
    "/api/restaurant/categories/:category",
    restaurantController.getRestaurantsByCategoryName
  );
  app.get("/api/restaurant/:id", restaurantController.getRestaurantById);
  app.get(
    "/api/restaurant/rating/:rating",
    restaurantController.getRestaurantsByRating
  );
};
