const signOutBtn = document.getElementById('sign-out-btn');

signOutBtn.onclick = () => {
  firebase
    .auth()
    .signOut()
    .then(
      function () {
        console.log('Signed Out');
      },
      function (error) {
        console.error('Sign Out Error', error);
      },
    );
};
