const db = require("../config/connection");
const { User, Reactions } = require("../models");
const userSeeds = require("./userSeeds.json");
const reactionSeeds = require("./reactionSeeds.json");

db.once("open", async () => {
  await User.deleteMany({});
  await User.create(userSeeds);
  await Reactions.deleteMany({});
  await Reactions.create(reactionSeeds);
  console.log("Data has been seeded!");
  process.exit(0);
});
