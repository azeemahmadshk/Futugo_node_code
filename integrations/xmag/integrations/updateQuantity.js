import { updatedProductsXmag } from '../services/xmagServices.js';
import {
  getProducts,
  updateProductVariant,
} from '../../../webkul/services/webkulServices.js';
import {
  processItemBarcode,
  findProduct,
  updateProduct,
} from '../services/helpers/updateProduct.js';

const updateQuantities = async (xmagkey, xmagApi, webkulAPi, webkulToken) => {
  try {
    const updatedProducts = await updatedProductsXmag(xmagkey, xmagApi);
    console.log(
      `Number of products fetched from xMag: ${updatedProducts.product.length}`
    );

    const webkulProducts = await getProducts(webkulAPi, webkulToken);
       
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    let processedBarcodes = new Set();

    for (let product of updatedProducts.product) {
      for (let item of product.items.item) {
        if (!processItemBarcode(item, processedBarcodes)) continue;

        await delay(500);

        const correspondingWebkulProduct = findProduct(
          webkulProducts,
          item.barcode
        );
        if (correspondingWebkulProduct) {
          console.log("Corresponding item: " + item);
          await updateProduct(
            item,
            correspondingWebkulProduct,
            webkulAPi,
            webkulToken,
            updateProductVariant
          );
        } else {
          console.warn(
            `No corresponding Webkul product found for barcode: ${item.barcode}`
          );
        }
      }
    }
  } catch (error) {
    console.error('Error in updateWebkulProductQuantities:', error);
  }
};

//Naudoti kai reikės atnaujinti visas prekes
// const updateQuantities = async (
//   xmagkey,
//   xmagApi,
//   webkulAPi,
//   webkulToken
// ) => {
//   const startUpdatingDate = new Date('2023-07-25');
//   const today = new Date();

//   // This function will fetch products for the given date and update them
//   const updateForDate = async (specificDate) => {
//     const updatedProducts = await getXmagUpdatedProducts(xmagkey, xmagApi, specificDate);
//     console.log(`Number of products fetched from xMag for ${specificDate}: ${updatedProducts.product.length}`);

//     const webkulProducts = await getProducts(webkulAPi, webkulToken);
//     const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
//     let processedBarcodes = new Set();

//     for (let product of updatedProducts.product) {
//       for (let item of product.items.item) {
//         if (!processItemBarcode(item, processedBarcodes)) continue;

//         await delay(500);

//         const correspondingWebkulProduct = findProduct(
//           webkulProducts,
//           item.barcode
//         );
//         if (correspondingWebkulProduct) {
//           await updateProduct(
//             item,
//             correspondingWebkulProduct,
//             webkulAPi,
//             webkulToken,
//             updateProductVariant
//           );
//         } else {
//           console.warn(
//             'No corresponding Webkul product found for barcode:',
//             item.barcode
//           );
//         }
//       }
//     }
//   }

//   // This loop will iterate over each day and call updateForDate
//   while (startUpdatingDate <= today) {
//     try {
//       await updateForDate(startUpdatingDate);
//     } catch (error) {
//       console.error(`Error updating for date ${startUpdatingDate}:`, error);
//     }

//     // Move to the next date
//     startUpdatingDate.setDate(startUpdatingDate.getDate() + 1);
//   }
// };

export { updateQuantities };
