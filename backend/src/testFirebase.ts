import admin from './config/firebase';

const checkFirebase = async () => {
  try {
    const users = await admin.auth().listUsers();
    console.log('Firebase Connected! Total Users:', users.users.length);
  } catch (error) {
    console.error('Error connecting to Firebase:', error);
  }
};

checkFirebase();
