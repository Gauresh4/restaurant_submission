const Restaurant = require("../model/restaurant.model");

exports.addRestaurant = async (req, res) => {
  try {
    const { name, description, category, imageURL, location, phone, rating } =
      req.body;

    if (
      !name ||
      !description ||
      !category ||
      !imageURL ||
      !location ||
      !phone ||
      !rating
    )
      return res.status(500).send({ message: "Content cannot be empty" });

    const restaurantDetails = {
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      imageURL: req.body.imageURL,
      location: req.body.location,
      phone: req.body.phone,
      rating: req.body.rating,
    };

    const restaurantDetailsCreated = await Restaurant.create(restaurantDetails);

    const postResponse = {
      name: restaurantDetailsCreated.name,
      description: restaurantDetailsCreated.description,
      category: restaurantDetailsCreated.category,
      imageURL: restaurantDetailsCreated.imageURL,
      location: restaurantDetailsCreated.location,
      phone: restaurantDetailsCreated.phone,
      rating: restaurantDetailsCreated.rating,
      _id: restaurantDetailsCreated._id,
      createdAt: restaurantDetailsCreated.createdAt,
      updatedAt: restaurantDetailsCreated.updatedAt,
    };

    res.status(201).send(postResponse);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Some error occurred while creating the Restaurant",
    });
  }
};

exports.getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({});

    res.status(200).send({
      restaurants,
      message: "Restaurants fetched successfully.",
    });
  } catch (error) {
    res.status(500).send({
      message: "Some error occured while fetching the Restaurants",
    });
  }
};

exports.getRestaurantCategories = async (req, res) => {
  try {
    const categories = await Restaurant.distinct("category");
    res.status(200).send(categories);
  } catch (error) {
    res.status(500).send({
      message: "Some error occured while fetching Categories",
    });
  }
};

exports.getRestaurantsByCategoryName = async (req, res) => {
  try {
    const category = req.params.category;
    const restuarants = await Restaurant.find({ category });
    res.status(200).send(restuarants);
  } catch (error) {
    res.status(500).send({
      message: "Some error occured while fetching the Restaurant",
    });
  }
};

exports.getRestaurantById = async (req, res) => {
  try {
    const id = req.params.id;
    const restaurant = await Restaurant.findById(id);

    if (!restaurant)
      return res.status(404).send({
        message: "No Restaurant found with the given ID",
      });

    res.status(200).send(restaurant);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Some error occured while fetching the Restaurant",
    });
  }
};

exports.getRestaurantsByRating = async (req, res) => {
  try {
    const rating = req.params.rating;
    const restaurants = await Restaurant.find({
      rating: { $gte: parseFloat(rating) },
    });

    res.status(200).send(restaurants);
  } catch (error) {
    res.status(500).send({
      message: "Some error occured while fetching the Restaurant",
    });
  }
};

exports.updateRestaurant = async (req, res) => {
  try {
    if (!req.body)
      return res.status(400).send({ message: "Restaurant Data is required" });

    const id = req.params.id;
    const restaurant = await Restaurant.findByIdAndUpdate(id, req.body);
    if (!restaurant)
      return res
        .status(200)
        .send({ message: "No Restaurant found for given ID" });

    res.status(200).send({ message: "Restaurant updated successfully." });
  } catch (error) {
    res.status(500).send({
      message: "Some error occured while fetching the Restaurant",
    });
  }
};

exports.deleteRestaurant = async (req, res) => {
  try {
    const id = req.params.id;
    const restaurant = await Restaurant.findByIdAndDelete(id);

    res.status(200).send({
      restaurant,
      message: "Restaurant deleted successfully.",
    });
  } catch (error) {
    res.status(500).send({
      message: "Some error occured while deleting the Restaurant",
    });
  }
};

exports.deleteRestaurants = async (req, res) => {
  try {
    const deletedResult = await Restaurant.deleteMany({});

    if (deletedResult.deletedCount === 0) {
      return res
        .status(200)
        .send({ restaurants: null, message: "No restaurants deleted." });
    }

    res.status(200).send({
      restaurants: {
        acknowledged: deletedResult.acknowledged,
        deletedCount: deletedResult.deletedCount,
      },
      message: "Restaurants deleted successfully.",
    });
  } catch (error) {
    res.status(500).send({
      message: "Some error occured while deleting the Restaurant",
    });
  }
};
