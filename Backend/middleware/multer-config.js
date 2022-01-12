 // Importation des packages
import multerFile from "multer";
 // Déclaration des formats autorisés
const mineTypes = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
};
// Déclaration de storage qui permet de sauvegarder les images
// // en leur indiquant la destination, et en changeant le nom
// // de l'image ainsi que l'extension
const storage = multerFile.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (res, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    const extension = mineTypes[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
    //===== contrôle extension images
    // if (!extension) {
    //   return res.status(400).json({error:"error"});
    // }
  },
});

const multer = multerFile({ storage: storage }).single("image");

export { multer };