const router = require("express").Router()
const {Instance} = require("../schema");

router.get("/instances", async (req, res) => {
  const instances = await Instance.findAll();
  return res.json(instances);
});

module.exports = router;
