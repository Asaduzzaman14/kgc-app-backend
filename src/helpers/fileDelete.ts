import { existsSync, unlinkSync } from 'fs';
import path from 'path';

export const deleteUserImage = (fileUrl: string) => {
  const splitIndex = fileUrl.indexOf('uploads') + 'uploads'.length;

  if (splitIndex > 0) {
    const imagePublicPath = fileUrl
      .substring(splitIndex)
      .replace(/\\/g, '/')
      .replace(/^\/+/, '');

    const uploadDirPath = path.join(process.cwd(), 'uploads');
    const imagePathInServer = path.join(uploadDirPath, imagePublicPath);

    // console.log('Image Path In Server:', imagePathInServer);

    if (existsSync(imagePathInServer)) {
      // console.log('File exists, deleting...');
      try {
        unlinkSync(imagePathInServer);
        // console.log('File deleted successfully');
        return true;
      } catch (err) {
        // console.error('Error deleting file:', err);
        return false;
      }
    } else {
      console.log('File does not exist:', imagePathInServer);
      return false;
    }
  }
  return false;
};

export const deleteUserImage2 = (fileUrl: string) => {
  // console.log('File URL:', fileUrl);

  // Extract the path after 'uploads/users/'
  const splitIndex = fileUrl.indexOf('uploads/users') + 'uploads/users'.length;

  if (splitIndex) {
    const imagePublicPath = fileUrl
      .substring(splitIndex)
      .replace(/\\/g, '/')
      .replace(/^\/+/, ''); // Clean the path

    // Resolve the correct upload directory path
    const uploadDirPath = path.join(__dirname, '../../uploads/users'); // Path to 'uploads/users' folder
    const imagePathInServer = path.join(uploadDirPath, imagePublicPath); // Full path to image on server

    // Check if the file exists and delete it
    if (existsSync(imagePathInServer)) {
      // console.log('File exists, deleting...');
      try {
        unlinkSync(imagePathInServer);
        console.log('File deleted successfully');
        return true;
      } catch (err) {
        // console.error('Error deleting file:', err);
        return false;
      }
    } else {
      // console.log('File does not exist:', imagePathInServer);
      return false;
    }
  }

  return false; // Return false if the path couldn't be constructed
};
