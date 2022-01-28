const args = ["ci", "--production"];
const opts = { stdio: "inherit", cwd: ".", shell: true };
require("child_process").spawn("npm", args, opts);
