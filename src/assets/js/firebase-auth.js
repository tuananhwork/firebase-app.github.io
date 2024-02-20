import { app } from './firebase-config.js';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';

const auth = getAuth(app);
let isLogin = false;

// Get form

const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const googleBtn = document.getElementById('google');
const facebookBtn = document.getElementById('facebook');

const toast = document.querySelector('.toast');

const toastHandle = (text, isSuccess) => {
  if (isSuccess) {
    isLogin = true;
    localStorage.setItem('isLogin', 'true');
    toast.classList.add('success');
    toast.textContent = `${text} success!`;
    toast.style.display = 'flex';
    setTimeout(() => {
      toast.classList.remove('success');
      toast.style.display = 'none';
      window.location.href = '../../index.html';
    }, 3000);
  } else {
    localStorage.setItem('isLogin', 'false');
    toast.classList.add('fail');
    toast.textContent = `${text} failed!`;
    toast.style.display = 'flex';
    setTimeout(() => {
      toast.classList.remove('fail');
      toast.style.display = 'none';
    }, 3000);
  }
};

const handleLogin = (e) => {
  e.preventDefault();
  const email = loginForm.email.value;
  const password = loginForm.password.value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      toastHandle('Login', true);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      //   window.alert(`Error Code: ${errorCode} \nLogin failed! ${errorMessage}`);
      toastHandle('Login', false);
    });
};
``;
const handleSignup = (e) => {
  e.preventDefault();
  const email = signupForm.email.value;
  const password = signupForm.password.value;
  const confirmPassword = signupForm['re-password'].value;

  if (password !== confirmPassword) {
    window.alert('Passwords do not match!');
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      toastHandle('Signup', true);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      //   window.alert(`Error Code: ${errorCode} \nSignup failed! ${errorMessage}`);
      toastHandle('Signup', false);
    });
};

const handleGoogleLoginProvider = () => {
  const provider = new GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      console.log(user);
      toastHandle('Login', true);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      toastHandle('Login', false);
    });
};

const handleFacebookLoginProvider = () => {
  const provider = new FacebookAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      const credential = FacebookAuthProvider.credentialFromResult(result);
      console.log(user, credential);
      toastHandle('Login', true);
    })
    .catch((error) => {
      console.log(error);
      toastHandle('Login', false);
    });
};

if (loginForm) {
  loginForm.addEventListener('submit', handleLogin);
}

if (signupForm) {
  signupForm.addEventListener('submit', handleSignup);
}

if (googleBtn && facebookBtn) {
  googleBtn.addEventListener('click', handleGoogleLoginProvider);
  facebookBtn.addEventListener('click', handleFacebookLoginProvider);
}

export { isLogin };
