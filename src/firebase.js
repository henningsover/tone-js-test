import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const app = firebase.initializeApp({
  apiKey: 'AIzaSyA4yOKr1rcOd4VkpVH5nv81Ik8V4yqKw4I',
  authDomain: 'masterthesistracker.firebaseapp.com',
  projectId: 'masterthesistracker',
  storageBucket: 'masterthesistracker.appspot.com',
  messagingSenderId: '142524912621',
  appId: '1:142524912621:web:44dad6892cdee0ad458de4',
  measurementId: 'G-FHGZ71Y23Y',
});

const db = app.firestore();
export { db };

export const auth = app.auth();

export const firebaseCreateUser = (user, userId) => {
  db.collection('users').doc(user).set({
    userId,
    userEmail: user,
    userName: user,
  });
};

export const firebaseAddSong = (userId, song) => {
  let payload = {
    userId,
    title: song.title,
    published: song.published,
    patterns: song.patterns,
    masterList: song.masterList,
  };
  console.log(payload);
  db.collection('songs').doc().set(payload);
};

export const firebaseUpdateSong = (userId, songId, song) => {
  let payload = {
    userId,
    title: song.title,
    published: song.published,
    patterns: song.patterns,
    masterList: song.masterList,
    bpm: song.bpm
  };
  console.log(payload);
  db.collection('songs').doc(songId).update(payload);
};

export const firebaseGetOwnSongs = (userId) => {
  return db
    .collection('songs')
    .where('userId', '==', userId)
    .get()
    .then((querySnapshot) => {
      let songsToReturn = {};
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, ' => ', doc.data());
        songsToReturn[doc.id] = doc.data();
      });
      return songsToReturn;
    })
    .catch((error) => {
      console.log('Error getting documents: ', error);
    });
};

export const firebaseGetUsersSongs = (userId) => {
  return db
    .collection('songs')
    .where('userId', '==', userId)
    .where('published', '==', true)
    .get()
    .then((querySnapshot) => {
      let songsToReturn = {};
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, ' => ', doc.data());
        songsToReturn[doc.id] = doc.data();
      });
      return songsToReturn;
    })
    .catch((error) => {
      console.log('Error getting documents: ', error);
    });
}

export const firebaseGetUsers = (searchQuery, userId) => {
  return db
    .collection('users')
    .where('userName', '>=', searchQuery)
    .get()
    .then((querySnapshot) => {
      let usersToReturn = {};
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, ' => ', doc.data());
        usersToReturn[doc.id] = doc.data();
      });
      return usersToReturn;
    })
    .catch((error) => {
      console.log('Error getting documents: ', error);
    });
};

export default app;
