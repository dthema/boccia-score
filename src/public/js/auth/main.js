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
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

let currentEmail = '';
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    currentEmail = user.email;
  } else {
    currentEmail = '';
  }
});

const signOutBtn = document.getElementById('sign-out-btn');

signOutBtn.onclick = () => signOut();

function signOut() {
  firebase
    .auth()
    .signOut()
    .then(
      function () {
        console.log('Signed Out');
        document.cookie = `jwt=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
        location.reload();
      },
      function (error) {
        console.error('Sign Out Error', error);
        document.cookie = `jwt=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
        location.reload();
      },
    );
}
