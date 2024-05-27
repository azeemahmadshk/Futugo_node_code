import dotenv from 'dotenv';
import { response } from 'express';
import {
  fetchPost
} from '../integrations/xmag/integrations/fetchPost.js';
import {
  updateQuantities
} from '../integrations/xmag/integrations/updateQuantity.js';

import { getOrders } from '../webkul/services/webkulServices.js';

import { postOrderToXmag } from '../integrations/xmag/services/xmagServices.js';
import {updatedProductsXmag} from '../integrations/xmag/services/xmagServices.js';

// debugger;
// require('dotenv').config();

debugger;

// dotenv.config();

const webkulAPI = process.env.API;
const lorenzettiWebkulKey = process.env.LORENZETTIWEBKUL;
const lorenzettiKey = process.env.LORENZETTIKEY;
const lorenzettiAPI = process.env.LORENZETTIAPI;
const xmagKey = process.env.LORENZETTIKEY;
const xmagApi = process.env.LORENZETTIAPI;
// const OrdesData = responseData

const lorenzettiIntegration = async () => {

  console.log("Lorenzeti Integration START")
  //await fetchPost(lorenzettiKey, lorenzettiAPI, webkulAPI, lorenzettiWebkulKey);
 //we did
 await updateQuantities(
    lorenzettiKey,
    lorenzettiAPI,
    webkulAPI,
    lorenzettiWebkulKey
  );
debugger;
//call get orders here 
debugger;
console.log("apiiiiiiii ",webkulAPI )
console.log("keyyyyyyyyy ",lorenzettiWebkulKey )

// await getOrders( 

//   webkulAPI,
//   lorenzettiWebkulKey
//   );


  //Step 3: Fetch orders from Webkul and post them to XMAG
  // const syncOrdersToXmag = async (webkulApi, webkulToken, xmagKey, xmagApi) => {
  //   console.log("I reached in syncorderss")
  //   console.log ("this is my xmag keyyyy",xmagKey)
  //   console.log ("this is my xmag apiiiii",xmagApi)
  //   try {
  //     const orders = await getOrders(webkulApi, webkulToken);
  //     console.log(`Fetched ${orders.length} orders from Webkul`);
  //       console.log(` we got orders ${orders.length} ` ); 
  //     for (const order of orders) {
  //       console.log("here is custome id", order.customer)

  //       console.log("here is complete order", order)
  //       // Convert the Webkul order format to the XMAG order format if necessary
  //       // const orderData = {
  //       //   customer: {
  //       //     id: order.customer_id,
  //       //     name: order.customer.first_name + ' ' + order.customer.last_name,
  //       //     email: order.customer.email
  //       //   },
  //       //   items: order.line_items.map(item => ({
  //       //     productId: item.product_id,
  //       //     quantity: item.quantity,
  //       //     price: item.price
  //       //   })),
  //       //   total: order.total_price,
  //       //   // Add additional fields as needed
  //       // };
  //       const orderData = {order}
  //       const result = await postOrderToXmag(xmagKey, xmagApi, orderData);
  //       if (result) {
  //         console.log('Order synced successfully:', result);
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Error syncing orders to XMAG:', error);
  //   }
  // };
  

  // // await postOrders( 

  // //   webkulAPI,
  // //   lorenzettiWebkulKey,
  // //   orderData
  // //   );
  // syncOrdersToXmag(webkulAPI, lorenzettiWebkulKey, xmagKey, xmagApi);
  // updatedProductsXmag(xmagkey, xmagApi)
};


export {
  lorenzettiIntegration
};