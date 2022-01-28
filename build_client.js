const child_process = require("child_process");

let args = ["ci", "--production"];
const opts = { stdio: "inherit", cwd: "client", shell: true };
child_process.spawn("npm", args, opts);

args = ["run", "build"];
child_process.spawn("npm", args, opts);
