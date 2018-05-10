import request from "request";
import fs from "fs";

export default (imageurl, cache_path = '/tmp/qiniu.png', success_handler) => {
    // var imageurl = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525937302833&di=e7e524afe2789fa1f2d93aafa91e5275&imgtype=0&src=http%3A%2F%2Fimg5.duitang.com%2Fuploads%2Fblog%2F201308%2F19%2F20130819132414_csjyr.thumb.700_0.png';
    request(imageurl).pipe(fs.createWriteStream(cache_path)).on('finish', function () {
        success_handler(cache_path);
    });
    return cache_path;
}
