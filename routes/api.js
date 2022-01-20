const router = require("express").Router()
const {Instance} = require("../schema");

router.get("/instances", async (req, res) => {
  const instances = await Instance.findAll();
  res.json(instances);
});

router.get("/env", (req, res) => {
  res.json(process.env);
})

module.exports = router;
