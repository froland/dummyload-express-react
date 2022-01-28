const router = require("express").Router();
const { Flag, Instance, sequelize } = require("../schema");

router.get("/instances", async (req, res) => {
  const instances = await Instance.findAll();
  res.json(instances);
});

router.get("/env", (req, res) => {
  res.json(process.env);
});

router.get("/flags/:name", async (req, res) => {
  const flagName = req.params.name;
  const flag = await Flag.findOne({ where: { flagName } });
  if (flag) {
    res.json(flag);
  } else {
    res.sendStatus(404);
  }
});

router.put("/flags/:name", async (req, res, next) => {
  const flagName = req.params.name;
  const flagDesiredValue = req.body.value;
  const transaction = await sequelize.transaction();
  try {
    const [flag, created] = await Flag.findOrCreate({
      where: { flagName },
      defaults: { isSet: flagDesiredValue },
      transaction,
    });
    if (created) {
      res.set("Location", req.originalUrl);
      res.sendStatus(201);
    } else {
      flag.isSet = flagDesiredValue;
      await flag.save({ transaction });
      res.sendStatus(204);
    }
    await transaction.commit();
  } catch (e) {
    console.error(e);
    await transaction.rollback();
    res.sendStatus(500);
  }
});

module.exports = router;
