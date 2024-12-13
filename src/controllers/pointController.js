const Point = require("./models/Point");

exports.getAllPoints = async (req, res) => {
  try {
    const points = await Point.find({});
    res.json(points);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createPoint = async (req, res) => {
  try {
    const pointData = {
      name: req.body.name,
      description: req.body.description,
      eventTime: req.body.eventTime,
      price: req.body.price,
      location: {
        type: "Point",
        coordinates: [req.body.longitude, req.body.latitude],
      },
      address: req.body.address,
    };

    const point = new Point(pointData);
    await point.save();
    res.status(201).json(point);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updatePoint = async (req, res) => {
  try {
    const pointData = {};
    if (req.body.name) pointData.name = req.body.name;
    if (req.body.description) pointData.description = req.body.description;
    if (req.body.eventTime) pointData.eventTime = req.body.eventTime;
    if (req.body.price) pointData.price = req.body.price;
    if (req.body.longitude && req.body.latitude) {
      pointData.location = {
        type: "Point",
        coordinates: [req.body.longitude, req.body.latitude],
      };
    }
    if (req.body.address) pointData.address = req.body.address;

    const point = await Point.findByIdAndUpdate(req.params.id, pointData, {
      new: true,
    });
    if (!point) return res.status(404).json({ error: "Point not found" });
    res.json(point);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.findWithinRadius = async (req, res) => {
  const { longitude, latitude, radiusInMiles } = req.query;

  try {
    const points = await Point.find({
      location: {
        $nearSphere: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)],
          },
          $maxDistance: radiusInMiles * 1609.34, // Convert miles to meters
        },
      },
    });
    res.json(points);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
