

export const ITEMS_PER_PAGE = 15;
export const discountPrice = (item) => {
  return Math.round(item.price * (1 - item.discountPercentage / 100), 2);
};


