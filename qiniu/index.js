import upload from "./src/qiniu_upload";
import download from "./src/image_download";
import clip from './src/write_to_clip';

const upload_type = process.argv[2]; // 1从网络下载 2本地上传
const image_url = process.argv[3]; // 1网络url 2桌面下路径

if (upload_type === '1') {
    //下载网络图，存到私有云
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
} else if (upload_type === '2') {
    let image_desktop_path = '/Users/azen/Desktop/' + image_url;
    console.log('准备上传' + image_desktop_path);
    upload(image_desktop_path, (qiniu_url) => {
        console.log('上传完成');
        console.log(qiniu_url);
        //  将上传后的图片url添加到剪切板
        clip(qiniu_url);
    });
}