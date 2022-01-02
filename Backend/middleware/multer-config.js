// Importation des packages
import multer, { diskStorage } from "multer";

// Déclaration des formats autorisés
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
};

// Déclaration de storage qui permet de sauvegarder les images
// en leur indiquant la destination, et en changeant le nom
// de l'image ainsi que l'extension
const storage = diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
  },
});

export default multer({ storage: storage }).single("inputFile");