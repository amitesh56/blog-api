const cloudinary = require("cloudinary").v2


cloudinary.config({
    cloudinary_url : process.env.CLOUDINARY_URL
})

function uploadImage(buffer){
    return new Promise((resolve,reject)=>{
        cloudinary.uploader.upload_stream({resource_type : "image"},(error,result)=>{
            if(error) reject(error)
            else resolve(result.url)
        }).end(buffer)
    })
}

module.exports = uploadImage

