const base64Img = require('base64-img');


module.exports.createImage = async (image, name) => {
    const uploadPath = "./upload"
    const uploadPath_del = "upload\\"

    var image = base64Img.imgSync(
        image,
        uploadPath,
        name
    );
    const image1 = await image.replace(uploadPath_del, "");
    return name;
}