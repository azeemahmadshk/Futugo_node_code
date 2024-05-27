export const isValidOptionValue = (value) => {
  return typeof value === 'string' && value.length > 0;
};

export const ensureArray = (input) => {
  return Array.isArray(input) ? input : [input];
};

export const processImages = (items) => {
  const images = [];
  items.forEach((item) => {
    item.pictures.forEach((picUrl) => {
      images.push({
        image_url: picUrl,
        position: images.length.toString(),
      });
    });
  });
  return images;
};

export const extractDescription = (items, fallbackDescription) => {
  if (
    items.length > 0 &&
    items[0].language &&
    items[0].language.length > 0 &&
    items[0].language[0].long_desc.length > 0
  ) {
    return items[0].language[0].long_desc;
  }
  return fallbackDescription;
};

export const extractTitle = (items, fallbackTitle) => {
  if (
    items.length > 0 &&
    items[0].language &&
    items[0].language.length > 0 &&
    items[0].language[0].short_desc.length > 0
  ) {
    return items[0].language[0].short_desc;
  }
  return fallbackTitle;
};

export const createVariant = (item) => {
  const options = [];
  if (isValidOptionValue(item.item_size)) {
    options.push({
      name: 'Size',
      value: item.item_size,
    });
  }
  if (isValidOptionValue(item.base_color)) {
    options.push({
      name: 'Color',
      value: item.base_color,
    });
  }

  return {
    sku: item.item_id,
    id: item.item_id,
    barcode: item.barcode,
    weight: '1',
    dimension: JSON.stringify({
      length: '1',
      width: '1',
      height: '1',
      girth: '1',
    }),
    price: parseFloat(item.supply_price.replace(',', '.')),
    charge_taxes: 0,
    require_shipping: '1',
    track_inventory: '1',
    quantity: item.stock,
    inventory_policy: '0',
    inventory_locations: [
      {
        location_id: '111949',
        variant_quantity: item.stock,
      },
    ],
    options: options,
  };
};

export const getUniqueValues = (items, key) => {
  return Array.from(new Set(items.map((item) => item[key])));
};

export const createOptions = (uniqueSizes, uniqueColors, producerId) => {
  const options = [];

  if (isValidOptionValue(uniqueSizes.join(','))) {
    options.push({
      name: 'Size',
      values: uniqueSizes.join(','),
    });
  }

  if (isValidOptionValue(uniqueColors.join(','))) {
    options.push({
      name: 'Color',
      values: uniqueColors.join(','),
    });
  }

  options.push({
    name: 'Brand',
    values: producerId,
  });

  return options;
};
