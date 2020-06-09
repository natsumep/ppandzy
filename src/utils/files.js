/*
 * @Author: fangp
 * @Date: 2020-06-09 16:56:12
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-06-09 17:41:50
 */ 
function checkHeadPortraitType(type) {
    if (!/(jpg|jpeg|png|bmp|JPG|PNG)$/.test(type)) {
        return {
            state: false,
            msg: "图片类型必须是jpeg、jpg、png、bmp中的一种"
        };
    }
    return { state: true };
}
exports.checkHeadPortraitType = checkHeadPortraitType;
;
/**
 * 获取文件后缀
 * @param fileName
 */
function getFileSuffix(fileName) {
    if (!fileName)
        return "";
    var index = fileName.lastIndexOf(".");
    var lastIndex = fileName.lastIndexOf("?");
    lastIndex = lastIndex === -1 ? fileName.length : lastIndex;
    if (index > -1) {
        return fileName.slice(index + 1, lastIndex).toLowerCase();
    }
    else {
        return "";
    }
}
exports.getFileSuffix = getFileSuffix;
var videoTypes = ['mp4', 'rm', 'mkv', 'rmvb', 'mpeg1-4', 'mov', 'mtv', 'dat', 'wmv', 'avi', '3gp', 'amv', 'dmv', 'flv']; //后续看情况在拓展吧
var imageTypes = ['bmp', "jpeg", 'jpg', 'png', 'tif', 'gif', 'pcx', 'tga', 'exif', 'fpx', 'svg', 'psd', 'cdr', 'pcd', 'dxf', 'ufo', 'eps', 'ai', 'raw', 'wmf', 'webp', "jfif"];
/**
 * 判断是否为视频
 * @param filePath (文件地址 )
 */
function isVideo(filePath) {
    var suffix = getFileSuffix(filePath);
    if (videoTypes.indexOf(suffix) > -1) { //如果是视频
        return true;
    }
    else {
        return false;
    }
}
exports.isVideo = isVideo;
/**
 * 判断是否为图片
 * @param filePath (文件地址 )
 */
function isImage(filePath) {
    var suffix = getFileSuffix(filePath);
    if (imageTypes.indexOf(suffix) > -1) {
        return true;
    }
    else {
        return false;
    }
}
exports.isImage = isImage;
/**
 * 获取单个文件的缩略图 这里只支持文件和视频
 */
function getFileThumb(path) {
    if (isImage(path)) { 
        var lastIndex = path.lastIndexOf(".") + 1;
        return path.slice(0, lastIndex - 1) + "_thumb.jpg";
    }
    else if (isVideo(path)) {
        var lastIndex = path.lastIndexOf(".") + 1;
        return path.slice(0, lastIndex - 1) + "_compress.jpg";
    }
    else {
        return "";
    }
}
exports.getFileThumb = getFileThumb;


function getFileThumbName(path) {
    var lastIndex = path.lastIndexOf(".") + 1;
    return path.slice(0, lastIndex - 1) + "_thumb.jpg";

}
exports.getFileThumbName = getFileThumbName;
/**
 * 获取单个文件的缩略图 这里只支持文件和视频
 */
function getFilesThumb(paths) {
    return paths.map(function (item) { return getFileThumb(item); });
}
exports.getFilesThumb = getFilesThumb;
/**
 * 获取文件大小 （名称）
 * @param value （b）
 */
function getFileLength(value) {
    if (null == value || value == '') {
        return "0 Bytes";
    }
    var unitArr = new Array("Bytes", "K", "M", "G", "T", "P", "E", "Z", "Y");
    var index = 0, srcsize = parseFloat(value);
    index = Math.floor(Math.log(srcsize) / Math.log(1024));
    var size = srcsize / Math.pow(1024, index);
    //  保留的小数位数
    return size + unitArr[index];
}
exports.getFileLength = getFileLength;
;
/**
 * 判断是否为图片视频
 */
function isImageOrVideo(fileName) {
    var types = videoTypes.concat(imageTypes);
    var suffix = getFileSuffix(fileName);
    return types.indexOf(suffix) > -1;
}
exports.isImageOrVideo = isImageOrVideo;
/**
 * 判断文件类型
 */
exports;
function getFileType(fileName) {
    if (isVideo(fileName)) {
        return "video";
    }
    else if (isImage(fileName)) {
        return "img";
    }
    else {
        return "file";
    }
}