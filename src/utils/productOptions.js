export const getProductOptions = (product) => {
  const parse = (value) => (Array.isArray(value) ? value : String(value || "").split(/[;,\n]/))
    .map((option) => String(option).trim()).filter(Boolean);
  return { sizes: parse(product?.sizes), colors: parse(product?.colors) };
};

export const productOptionsAreSelected = (product, selection) => {
  const { sizes, colors } = getProductOptions(product);
  return (!sizes.length || Boolean(selection.size)) && (!colors.length || Boolean(selection.color));
};
