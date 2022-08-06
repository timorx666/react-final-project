const express = require("express");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, validate, validateCards } = require("../models/user");
const { Card } = require("../models/card");
const auth = require("../middleware/auth");
const router = express.Router();

const getCards = async (cardsArray) => {
  const cards = await Card.find({ bizNumber: { $in: cardsArray } });
  return cards;
};

router.get("/cards", auth, async (req, res) => {
  if (!req.query.numbers) res.status(400).send("Missing numbers data");

  let data = {};
  data.cards = req.query.numbers.split(",");

  const cards = await getCards(data.cards);
  res.send(cards);
});

router.patch("/cards", auth, async (req, res) => {
  const { error } = validateCards(req.body);
  if (error) res.status(400).send(error.details[0].message);

  const cards = await getCards(req.body.cards);
  if (cards.length != req.body.cards.length)
    res.status(400).send("Card numbers don't match");

  let user = await User.findById(req.user._id);
  user.cards = req.body.cards;
  user = await user.save();
  res.send(user);
});

router.put("/addToFav", auth, async (req, res) => {
  let user = await User.findById(req.user._id);
  //check if card is already in favs
  let isExist = user.favorites?.find((fav) => {
    return fav === req.body.cardId;
  });
  if (isExist)
    res.status(400).send("The card is already in your favorites");

  user.favorites.push(req.body.cardId);
  user.save();
  res.send();
});

//get favorites cards
router.get("/favorites", auth, async (req, res) => {
  const user = await User.findById(req.user._id);
  let cards = await Card.find({ _id: { $in: user.favorites } });

  res.send(cards);
});

router.delete("/removeFromFav", auth, async (req, res) => {
  const user = await User.findById(req.user._id);
  let index = user.favorites.findIndex((cardId) => cardId === req.query.cardId);
  if (index > -1) {
    user.favorites.splice(index, 1);
    user.save();
  }
  res.send();
});

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) return res.status(404);
  res.send(user);
});

router.put("/edit", auth, async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  //check if the email is already taken by other user
  if (user && req.user._id != user._id) {
    res.status(400).send("This email is already in use.");
  }

  user = await User.findById(req.user._id);
  user.name = req.body.name;
  user.email = req.body.email;
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(req.body.password, salt);
  user = await user.save();
  res.send(user);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  user = new User(
    _.pick(req.body, ["name", "email", "password", "biz", "cards"])
  );
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  res.send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;
