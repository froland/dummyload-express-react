const crypto = require("crypto");

const spendTime = () => {
  crypto.pbkdf2("secret", "salt", 100000, 512, "sha512", (err, derivedKey) => {
    setImmediate(spendTime);
  });
};

spendTime();
