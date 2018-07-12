import {
    exec
} from "child_process";

export default (image_path, handler) => {
    var shell = 'pngpaste ' + image_path;
    console.log(shell);
    exec(shell, function (err, stdout, stderr) {
        if (err) throw err;
        console.log(stdout);
        handler()
    })
}