const firebaseConfig = {
  apiKey: 'AIzaSyBChjoqhEmW3lNteq15Ghtv4am_3Y8wtM4',
  authDomain: 'boccia-score.firebaseapp.com',
  projectId: 'boccia-score',
  storageBucket: 'boccia-score.appspot.com',
  messagingSenderId: '72788596783',
  appId: '1:72788596783:web:f94954859b47101297ceda',
  measurementId: 'G-1F9HVE4HHT',
};

firebase.initializeApp(firebaseConfig);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);
