const router = require("express").Router();
const Pin = require("../models/Pin");

router.post("/", async (req, res) => {
  const newPin = new Pin(req.body);
  try {
    const savePin = await newPin.save();
    res.status(200).json(savePin);
  } catch (error) {
    res.status(500).json(error);
  }
});
// get all pins

router.get("/", async (req, res) => {
  try {
    const pins = await Pin.find();
    res.status(200).json(pins);
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;
