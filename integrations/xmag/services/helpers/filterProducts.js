import { getProductsXmag } from '../xmagServices.js';
import {
  getProducts,
  postProduct,
} from '../../../../webkul/services/webkulServices.js';
import { modelXmag } from '../models/model.js';

let postedSKUs = [];

const filterProducts = async (key, API, webkulAPi, webkulToken) => {

  console.log("Filter products", key)

  const xmagProducts = await getProductsXmag(key, API);
  const webkulProducts = await getProducts(webkulAPi, webkulToken);

  const existingSKUs = new Set(
    webkulProducts.flatMap((product) =>      
      product.variants.map((variant) => 
      {
        console.log("variant", variant);
        return variant.sku != null ?  variant.sku.toString()  : ""
      })
    )
  );

  postedSKUs = [];
  const filteredProducts = [];

  for (const product of xmagProducts) {
    const productSKUs = product.items.item.map((item) =>
      item.item_id.toString()
    );
    let isProductPosted = false;

    for (const sku of productSKUs) {
      if (existingSKUs.has(sku)) {
        postedSKUs.push(sku);
        isProductPosted = true;
        break;
      }
    }

    if (!isProductPosted) {
      filteredProducts.push(product);
    }
  }
  console.log(`Posted products ${postedSKUs.length}`);
  return filteredProducts;
};

const postNewProducts = async (products, webkulAPi, webkulToken) => {
  console.log("Posting product with key" + webkulToken);
  let requestCounter = 0;
  for (const product of products) {
    const productSKUs = product.items.item.map((item) =>
      item.item_id.toString()
    );

    const notPostedSKUs = productSKUs.filter(
      (sku) => !postedSKUs.includes(sku)
    );

    if (notPostedSKUs.length === 0) {
      console.log(`Skipping already posted product: ${product.product_name}`);
      continue;
    }

    try {
      const webkulProduct = modelXmag(product);
      const response = await postProduct(webkulProduct, webkulAPi, webkulToken);

      postedSKUs = [...new Set([...postedSKUs, ...notPostedSKUs])];

      requestCounter++;
      if (requestCounter % 2 === 0) {
        await new Promise((resolve) => setTimeout(resolve, 2000)); // adding 2-second delay
      }
    } catch (error) {
      console.error(`ERROR Failed to post product ${product.product_name}:`, error);
    }
  }
};

export { filterProducts, postNewProducts };
