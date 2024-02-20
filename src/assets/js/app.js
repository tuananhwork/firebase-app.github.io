// import { app } from './firebase-config.js';

// import { getAuth, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';

// const auth = getAuth(app);

// const loginBtn = document.querySelector('.account a#login');
// const signupBtn = document.querySelector('.account a#signup');
// const username = document.querySelector('.account a#username');
// const logoutBtn = document.querySelector('.account a#logout');

// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     loginBtn.classList.add('hidden');
//     signupBtn.classList.add('hidden');
//     username.classList.remove('hidden');
//     logoutBtn.classList.remove('hidden');
//   } else {
//     loginBtn.classList.remove('hidden');
//     signupBtn.classList.remove('hidden');
//     username.classList.add('hidden');
//     logoutBtn.classList.add('hidden');
//   }
// });

// logoutBtn.addEventListener('click', () => {
//   signOut(auth)
//     .then(() => {})
//     .catch((error) => {
//       console.log(error);
//     });
// });

// Tối ưu đoạn mã trong file app.js bằng cách sử dụng object để lưu trữ các phần tử DOM và thay vì sử dụng nhiều querySelector, chỉ cần thực hiện một lần.
import { app } from './firebase-config.js';
import { getAuth, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';

const auth = getAuth(app);

const elements = {
  loginBtn: document.querySelector('.account a#login'),
  signupBtn: document.querySelector('.account a#signup'),
  username: document.querySelector('.account a#username'),
  logoutBtn: document.querySelector('.account a#logout'),
};

const { loginBtn, signupBtn, username, logoutBtn } = elements;

const toggleElements = (user) => {
  loginBtn.classList.toggle('hidden', !!user);
  signupBtn.classList.toggle('hidden', !!user);
  username.classList.toggle('hidden', !user);
  logoutBtn.classList.toggle('hidden', !user);
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log(user);

    username.textContent = user.displayName || 'User';
  }
  toggleElements(user);
});

logoutBtn.addEventListener('click', () => {
  signOut(auth)
    .then(() => {})
    .catch((error) => {
      console.log(error);
    });
});
