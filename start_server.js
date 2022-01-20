const args = ["run", "debug"];
const opts = { stdio: "inherit", cwd: ".", shell: true };
require("child_process").spawn("npm", args, opts);
