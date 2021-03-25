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
    return image1;
}

module.exports.deleteImage = async (id) => {
    const uploadPath = "./upload"
    var delete_path = uploadPath +'/'+ id
    console.log(delete_path);
    try{
        fs.unlinkSync(delete_path);
    }
    catch(error){
        res.status(401).json();
    };
    
}