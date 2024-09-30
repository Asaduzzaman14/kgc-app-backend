import { existsSync, unlinkSync } from 'fs';
import path from 'path';

export const deleteUserImage = (fileUrl: string) => {
  console.log('File URL:', fileUrl);

  // Extract the path after 'uploads/users/'
  const splitIndex = fileUrl.indexOf('uploads/users') + 'uploads/users'.length;

  if (splitIndex > 0) {
    const imagePublicPath = fileUrl
      .substring(splitIndex)
      .replace(/\\/g, '/')
      .replace(/^\/+/, ''); // Clean the path

    // Use process.cwd() to get the correct root directory
    const uploadDirPath = path.join(process.cwd(), 'uploads/users'); // Path to 'uploads/users' folder in the root
    const imagePathInServer = path.join(uploadDirPath, imagePublicPath); // Full path to image on server

    console.log('Image Path In Server:', imagePathInServer);

    // Check if the file exists and delete it
    if (existsSync(imagePathInServer)) {
      console.log('File exists, deleting...');
      try {
        unlinkSync(imagePathInServer);
        console.log('File deleted successfully');
        return true;
      } catch (err) {
        console.error('Error deleting file:', err);
        return false;
      }
    } else {
      console.log('File does not exist:', imagePathInServer);
      return false;
    }
  }

  return false; // Return false if the path couldn't be constructed
};
