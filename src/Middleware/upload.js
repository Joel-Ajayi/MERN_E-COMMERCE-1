const multer = require('multer')

exports.upload=(size,type)=>{
  const upload=multer({
    dest:'images/',
    limits:{
      fileSize:size
    },
    fileFilter(req,file,cb){
      if(!file.originalname.match(/\.(png|jpeg|jpg|gif)$/)){
        return cb(new Error('Incorrect file format'))
      }
      cb(undefined,true)
    }
  })
  return upload.single(type)
}
  
  