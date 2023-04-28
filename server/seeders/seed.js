const db = require("../config/connection");
const { User, Reactions, BlogPosts } = require("../models");
const userSeeds = require("./userSeeds.json");
const blogPostSeeds = require("./blogPostSeeds.json");

db.once("open", async () => {
  await User.deleteMany({});
  await User.create(userSeeds);
  await BlogPosts.deleteMany({});
  // await BlogPosts.create(blogPostSeeds);
  console.log("Data has been seeded!");
  process.exit(0);
});
