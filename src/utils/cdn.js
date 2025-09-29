const CLOUD = import.meta.env.VITE_CLOUDINARY_CLOUD || 'dp87ga5sb';

const SPECIAL = { Dessert: 'desserts' };

const slugify = (name = '') => (SPECIAL[name] || name).toLowerCase();

export const cdnCategoryImg = (maybeUrl, name, { w = 343, h = 250 } = {}) => {
  if (maybeUrl?.includes('/image/upload/')) {
    return maybeUrl.replace(/\/v[^/]+\//, '/');
  }
  const slug = slugify(name);
  return `https://res.cloudinary.com/${CLOUD}/image/upload/w_${w},h_${h},c_fill,q_auto,f_auto/foodies/categories/${slug}.jpg`;
};
