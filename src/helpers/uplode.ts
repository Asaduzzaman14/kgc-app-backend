import fs from 'fs';
import multer from 'multer';
import path from 'path';
import sharp from 'sharp';

// Multer storage configuration
const storage = multer.memoryStorage(); // Store file in memory for processing with Sharp

// Multer configuration
const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // Max file size 1MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Only JPEG, JPG, and PNG files are allowed'));
    }
  },
});
const processImage = async (req: any, res: any, next: any) => {
  if (!req.file) return next();

  try {
    const uploadPath = path.join(__dirname, '../../uploads/images');
    const fileName = `image-${Date.now()}.jpeg`;

    // Ensure the upload directory exists
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    // Compress and save the image
    await sharp(req.file.buffer)
      .resize(300, 300, { fit: 'cover' }) // Resize to 300x300
      .jpeg({ quality: 80 }) // Compress
      .toFile(path.join(uploadPath, fileName));

    // Attach the generated file name to req.file
    req.file.filename = fileName;
    req.file.path = `/uploads/images/${fileName}`;
    next();
  } catch (error) {
    next(error);
  }
};

export { processImage, upload };
