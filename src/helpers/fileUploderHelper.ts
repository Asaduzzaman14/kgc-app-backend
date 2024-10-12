import multer from 'multer';
import path from 'path';

function randomIntFromInterval(min: number, max: number): number {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folderPath = 'uploads/';

    if (
      file.fieldname === 'img' ||
      file.fieldname === 'img2' ||
      file.fieldname === 'img3'
    ) {
      folderPath = 'uploads/users/';
    }
    cb(null, folderPath);
  },
  filename: function (req, file, cb) {
    const randomString = randomIntFromInterval(100, 999).toString();
    const fileTempName = `${Date.now()}-${randomString}-${file.originalname}`;
    cb(null, fileTempName);
  },
});

const upload = multer({
  storage: storage,

  fileFilter: (req, file, cb) => {
    // console.log(file, 'file');

    const filetypes = /png|jpg|jpeg/;
    const mimetype = filetypes.test(file?.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    if (mimetype && extname) {
      return cb(null, true);
    }
    return cb(
      new Error('Only images with png, jpg, or jpeg format are allowed!')
    );
  },
});

export const FileUploadHelper = {
  upload,
};
