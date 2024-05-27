import {
  ensureArray,
  processImages,
  extractDescription,
  extractTitle,
  createVariant,
  getUniqueValues,
  createOptions,
} from '../../../../webkul/services/helpers.js';

const modelXmag = (xmagProduct) => {
  const items = ensureArray(xmagProduct.items.item);
  const images = processImages(items);
  const description = extractDescription(items, xmagProduct.description);
  const title = extractTitle(items, xmagProduct.product_name);
  const variants = items.map(createVariant);
  const uniqueSizes = getUniqueValues(items, 'item_size');
  const uniqueColors = getUniqueValues(items, 'base_color');
  const options = createOptions(
    uniqueSizes,
    uniqueColors,
    xmagProduct.producer_id
  );

  return {
    seller_id: '2394100',
    type: '1',
    product_name: title,
    product_type: xmagProduct.product_name,
    product_tag: xmagProduct.producer_id,
    product_description: description,
    handle: xmagProduct.handle,
    product_meta_info: 'meta_info',
    product_policy: 'product_policy',
    product_url: xmagProduct.product_url,
    expiry_date: '2019/08/15',
    shipping_id: '1',
    variants: variants,
    options: options,
    images: images,
    collections: [],
  };
};

export { modelXmag };
