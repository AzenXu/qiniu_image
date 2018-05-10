import upload from "./src/qiniu_upload";
import download from "./src/image_download";

var clip = (content) => {
    var exec = require('child_process').exec;
    var shell = 'echo ' + content + ' | pbcopy';
    console.log(shell);
    exec(shell, function (err, stdout, stderr) {
        if (err) throw err;
        console.log(stdout);
    })
}

const image_url = process.argv[2];
download(image_url, '/tmp/qiniu.png', (image_cache_path) => {
    console.log('下载完成');
    console.log(image_cache_path);
    upload(image_cache_path, (qiniu_url) => {
        console.log('上传完成');
        console.log(qiniu_url);
        //  将上传后的图片url添加到剪切板
        clip(qiniu_url);
    });
});