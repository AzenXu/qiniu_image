import qiniu from "qiniu";

var uptoken = (bucket, accessKey, secretKey) => {
    //构建上传策略函数
    var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    var options = {
        scope: bucket,
    };
    var putPolicy = new qiniu.rs.PutPolicy(options);
    return putPolicy.uploadToken(mac);
}

var generage_image_path = () => {
    return  'wiki/' + new Date().getTime() + '.png';
}

export default (img_cache_path, success_handler) => {

    const accessKey = process.env.QINIU_ACCESS_KEY;
    const secretKey = process.env.QINIU_SECRET_KEY;
    const bucket = 'image';

    //生成上传 Token
    const token = uptoken(bucket, accessKey, secretKey);

    //上传配置
    var config = new qiniu.conf.Config();
    config.zone = qiniu.zone.Zone_z1;
    var formUploader = new qiniu.form_up.FormUploader(config);
    var putExtra = new qiniu.form_up.PutExtra();
    var image_name = generage_image_path();

    //开始上传
    formUploader.putFile(token, image_name, img_cache_path, putExtra, function (respErr,
        respBody, respInfo) {
        if (respErr) {
            throw respErr;
        }
        if (respInfo.statusCode == 200) {
            console.log(respBody);
            success_handler('http://img.daker.wang/' + respBody.key);
        } else {
            console.log(respInfo.statusCode);
            console.log(respBody);
        }
    });
}