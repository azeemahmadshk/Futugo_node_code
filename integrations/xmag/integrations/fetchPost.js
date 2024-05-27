import {
  filterProducts,
  postNewProducts,
} from '../services/helpers/filterProducts.js';

const fetchPost = async (key, API, webkulAPi, webkulToken) => {


  console.log("fetchPost")
  try {
    const filteredProducts = await filterProducts(
      key,
      API,
      webkulAPi,
      webkulToken
    );
    console.log(`Filtered products: ${filteredProducts.length}`);
    await postNewProducts(filteredProducts, webkulAPi, webkulToken);
  } catch (error) {
    console.log("Zerror: ", error);
    console.error('Failed to fetch or post products:', error);
  }
};

export { fetchPost };
