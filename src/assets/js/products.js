import { app } from './firebase-config.js';
import {
  collection,
  getFirestore,
  doc,
  setDoc,
  getDocs,
} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';
import {
  getStorage,
  ref,
  listAll,
  getDownloadURL,
} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js';

const db = getFirestore(app);
const storage = getStorage(app);
const productsRef = ref(storage, 'images/shoes');

const productContainer = document.querySelector('.product-container');

// Show loading interface while fetching products
productContainer.innerHTML = '<p style="font-size: 2.2rem;">Loading ...</p>';

const imgUrls = [];

const fetchImgUrls = async () => {
  const res = await listAll(productsRef);
  for (const productRef of res.items) {
    const url = await getDownloadURL(productRef);
    imgUrls.push(url);
  }
};

const addProducts = async () => {
  const productsRef = collection(db, 'products');

  for (let i = 1; i <= imgUrls.length; i++) {
    await setDoc(doc(productsRef, i < 10 ? `shoe0${i}` : `shoe${i}`), {
      imgUrl: imgUrls[i - 1],
      name: `Shoe ${i}`,
      price: 100 * i,
      desc: `Giày thể thao nam cao cấp Bitis Hunter Layered Upper DSHM ${i}`,
    });
  }
};

const fetchProducts = async () => {
  const productsRef = collection(db, 'products');
  const productsSnapshot = await getDocs(productsRef);
  const productsList = productsSnapshot.docs.map((doc) => doc.data());

  productContainer.innerHTML = '';

  productsList.forEach((product) => {
    const productCard = document.createElement('div');
    productCard.classList.add('product');
    productCard.innerHTML = `
        <img class="product-img" src="${product.imgUrl}" alt="shoe${product.name.split(' ')[1]}">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-price">${product.price.toLocaleString()}đ</p>
        <p class="product-desc">${product.desc}</p>
    `;
    productContainer.appendChild(productCard);
  });
};

const optimizeCode = async () => {
  await fetchImgUrls();
  await addProducts();
  await fetchProducts();
};

// Call fetchImgUrls first, then optimizeCode
optimizeCode();
