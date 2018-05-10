import { exec } from "child_process";

export default (content) => {
    var shell = 'echo ' + content + ' | pbcopy';
    console.log(shell);
    exec(shell, function (err, stdout, stderr) {
        if (err) throw err;
        console.log(stdout);
    })
}