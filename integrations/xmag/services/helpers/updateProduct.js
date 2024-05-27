import { generateUpdatePayload } from '../models/variantModel.js';

const processedBarcodes = new Map(); // Initialize an empty set to store processed barcodes

export const processItemBarcode = (item, productName, currentWebkulStock) => {
  const lastProcessedItem = processedBarcodes.get(item.barcode);
  console.log("lastProcessedItem: ", lastProcessedItem);

  if (lastProcessedItem) {
    if (lastProcessedItem.stock === currentWebkulStock) {
      console.log(
        `This barcode ${item.barcode} has already been processed with the same stock. ${productName}, ${currentWebkulStock}`
      );
      return false;
    } else {
      console.log(
        `This barcode ${item.barcode} has a changed stock from ${currentWebkulStock} to ${item.stock}. Proceeding to update...`
      );
    }
  } else {
    console.log(
      `This barcode ${item.barcode} is being processed for the first time.`
    );
  }

  processedBarcodes.set(item.barcode, { stock: currentWebkulStock });
  return true;
};

export const findProduct = (webkulProducts, barcode) => {
  return webkulProducts.find((p) =>
    p.variants.some((v) => v.barcode === barcode)
  );
};

export const updateProduct = async (
  item,
  correspondingWebkulProduct,
  webkulAPi,
  webkulToken,
  updateProductVariant
) => {
  const variant = correspondingWebkulProduct.variants.find(
    (v) => v.barcode === item.barcode
  );

  if (!variant) return;

  // Log the current stock in Webkul
  console.log(`Stock in Webkul for this product: ${variant.quantity}`);

  // Process item barcode based on the current stock in Webkul
  if (
    !processItemBarcode(
      item,
      correspondingWebkulProduct.product_name,
      variant.quantity
    )
  ) {
    console.log(
      `Skipping update for product: ${correspondingWebkulProduct.product_name}, Barcode: ${item.barcode}`
    );
    return;
  }
  /**
  let updatePayload = generateUpdatePayload(
    variant,
    item,
    correspondingWebkulProduct
  );

  // Dynamically set the options
  correspondingWebkulProduct.options.forEach((option, index) => {
    const optionKey = `option${index + 1}`;
    const optionName = option.name.toLowerCase();

    if (optionName === 'size' && item.item_size) {
      updatePayload[optionKey] = item.item_size;
    } else if (optionName === 'color' && item.color) {
      updatePayload[optionKey] = item.color;
    } else if (optionName === 'brand') {
      updatePayload[optionKey] = option.values[0].value;
    }
  });

  try {
    const updateResponse = await updateProductVariant(
      webkulAPi,
      webkulToken,
      correspondingWebkulProduct.id,
      variant.id,
      updatePayload
    );

    if (updateResponse.status === 200) {
      console.log(
        `Successfully updated Webkul product with barcode: ${item.barcode} to stock: ${item.stock}`
      );
      console.log(
        `Updated Product Name: ${correspondingWebkulProduct.product_name}`
      );
    } else {
      console.error(
        `Failed to update product with barcode: ${item.barcode}. Response status: ${updateResponse.status}. Response data:`,
        updateResponse.data
      );
    }
  } catch (error) {
    if (error.response && error.response.status === 422) {
      console.error('Error:', error.response.data.message);
    } else {
      console.error(
        `Error updating product with barcode: ${item.barcode}`,
        error
      );
    }
  }
 */


};
