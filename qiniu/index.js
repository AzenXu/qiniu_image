import upload from "./src/qiniu_upload";
import download from "./src/image_download";
import clip from './src/write_to_clip';
import write_image_from_clip from "./src/clip_image_save";

const upload_type = process.argv[2]; // 1从网络下载 2本地上传 3剪贴板图片
var image_url = process.argv[3]; // 1网络url 2桌面下路径 3不需要

var load_desktop_image_path = () => {
    if (image_url === undefined) {
        console.log('no imagename, so use default tmp.png');
        image_url = 'tmp.png';
    }
    return '/Users/azen/Desktop/' + image_url;
}

var download_to_save = () => {
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
}

var native_to_upload = () => {
    let image_desktop_path = load_desktop_image_path();
    console.log('准备上传' + image_desktop_path);
    upload(image_desktop_path, (qiniu_url) => {
        console.log('上传完成');
        console.log(qiniu_url);
        //  将上传后的图片url添加到剪切板
        clip(qiniu_url);
    });
}

var clip_to_upload = () => {
    let image_desktop_path = load_desktop_image_path();
    write_image_from_clip(image_desktop_path, () => {
        console.log('剪切板图片写入完毕，准备上传');
        native_to_upload()
    })
}

if (upload_type === '1') {
    download_to_save()
} else if (upload_type === '2') {
    native_to_upload()
} else if (upload_type === '3') {
    clip_to_upload()
}