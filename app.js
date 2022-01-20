var debug = require("debug")("exam-express-server:app");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const axios = require("axios");
const { Instance, db_init, sequelize } = require("./schema");
const api = require("./routes/api");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", api);

const getInstanceId = async () => {
  if (process.env.NODE_ENV === "development") {
    return "LOCAL DEV";
  } else {
    try {
      const tokenResponse = await axios.put(
        "http://169.254.169.254/latest/api/token",
        {
          headers: { "X-aws-ec2-metadata-token-ttl-seconds": "21600" },
        }
      );
      const token = tokenResponse.data;
      debug(`AWS API token: ${token}`);
      const metadataResponse = await axios.get(
        "http://169.254.169.254/latest/meta-data/instance-id",
        {
          headers: { "X-aws-ec2-metadata-token": token },
        }
      );
      return metadataResponse.data;
    } catch (error) {
      console.error(error);
    }
  }
};

(async () => {
  await db_init();
  app.set("sequelize", sequelize);
  const instanceId = await getInstanceId();
  debug(`Instance id: ${instanceId}`);
  const [instance, created] = await Instance.findOrCreate({
    where: { instanceId },
  });
  debug(`Instance primary key: ${instance.id}, created: ${created}`);

  const ping = () => {
    Instance.increment("pingReceived", { where: { instanceId } });
  };
  const timer = setInterval(ping, 20000);
  app.set("timer", timer);
})();

module.exports = app;
