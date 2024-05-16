const loginForm = document.getElementById('login-form');
const emailField = document.getElementById('email');
const passwordField = document.getElementById('password');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = emailField.value;
  const password = passwordField.value;
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(({ user }) => {
      return user.getIdToken().then((idToken) => {
        // ttl: 1 day
        document.cookie = `jwt=${idToken}; path=/; max-age=86400`;
        fetch('/admin', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${idToken}`,
          },
        })
          .then((response) => {
            if (response.redirected) {
              window.location.href = response.url;
            }
          })
          .catch((err) => {
            console.error(err.message);
            error.innerHTML = err.message;
          });
      });
    })
    .catch((err) => {
      console.error(err.message);
      error.innerHTML = err.message;
    });
});
