const generateUpdatePayload = (variant, item, correspondingWebkulProduct) => {
  return {
    id: variant.id,
    quantity: item.stock,
    image_id: variant.image_id !== 0 ? variant.image_id : undefined,
    barcode: item.barcode,
    price: item.supply_price,
    charge_taxes: 1,
    require_shipping: 1,
    track_inventory: 1,
    inventory_policy: 0,
    inventory_locations: [
      {
        location_id:
          correspondingWebkulProduct.variants[0].inventory_locations[0]
            .location_id,
        variant_quantity: item.stock,
      },
    ],
  };
};

export { generateUpdatePayload };
