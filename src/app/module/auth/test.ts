// import mongoose from 'mongoose';
// import { User } from './auth.model';

// const updateUsersWithDefaultImage = async () => {
//   try {
//     const result = await User.updateMany(
//       { image: { $exists: true } }, // Match documents without the `image` field
//       { $set: { image: 'https://khagrachariplus.com/App-default-PP.jpg' } } // Set default value
//     );

//     console.log(`Updated ${result.modifiedCount} users with default image.`);
//     mongoose.disconnect();
//   } catch (error) {
//     console.error('Error updating users:', error);
//   }
// };
// export default updateUsersWithDefaultImage;
