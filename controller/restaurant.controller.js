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
      message: "Some error occurred while creating the Restaurant.",
    });
  }
};
