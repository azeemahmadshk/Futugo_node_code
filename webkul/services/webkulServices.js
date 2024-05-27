import axios from 'axios';

const getProducts = async (webkulAPi, webkulToken) => {
  let products = [];
  let page = 1;
  const limit = 200;

  while (true) {
    
    try {
      const response = await axios.get(
        `${webkulAPi}/products.json?page=${page}&limit=${limit}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${webkulToken}`,
          },
        }
      );
      console.log('getting webkul products: ', page);
      if (response.status < 300) {
        products = [...products, ...response.data.products];
        console.log('response.data.products.length', response.data.products.length);
        // If the response data length is less than the limit, it means we have fetched all products
        if (response.data.products.length < limit) {
          break;
        }

        // Increment the page count for next request
        page++;
      } else {
        console.error('Response data is undefined or missing products');
        break;
      }
    } catch (error) {
      console.log('Error getting set',error);
      console.error('Error fetching existing products:', error);
      throw error;
    }
  }

  return products;
};

const postProduct = async (product, webkulAPi, webkulToken) => {
  const url = `${webkulAPi}/products.json`;

  try {
    const response = await axios.post(url, JSON.stringify(product), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${webkulToken}`,
      },
    });
    console.log(`Product ${product.product_name} posted successfully:`, {});
    return response.data;
  } catch (error) {
    console.error(
      `Failed to post product ${product.product_name}:`,
      error.response.data
    );
    return error.response.data;
  }
};

const getOrders = async (webkulAPi, webkulToken) => {
  debugger;
  try {
    const response = await axios.get(`${webkulAPi}/orders.json`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${webkulToken}`,
      },
    });
    
    debugger;

    // console.log("testttttt",response)
    if (response.status < 300) {
      if (response.data && response.data.orders) {
        return response.data.orders;
      } else {
        console.error('Response data is undefined or missing orders');
      }
    } else {
      console.error('Error status code:', response.status);
    }
  } catch (error) {
    debugger;
    console.error('Error fetching existing orders:', error);
    throw error;
  }

  return [];
};

const updateProductVariant = async (
  webkulAPi,
  webkulToken,
  productId,
  variantId,
  updatePayload
) => {
  try {
    const response = await axios.put(
      `${webkulAPi}/products/${productId}/variants/${variantId}.json`,
      updatePayload,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${webkulToken}`,
        },
      }
    );

    return response;
  } catch (error) {
    throw error; // Re-throw the error so that it can be caught and handled in the calling function
  }
};

export { getOrders, getProducts, postProduct, updateProductVariant };
