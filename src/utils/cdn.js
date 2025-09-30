const CLOUD = import.meta.env.VITE_CLOUDINARY_CLOUD || 'dp87ga5sb';

const slugify = (name = '') =>
  name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');

export const cdnCategoryImg = (maybeUrl, name, { w = 343, h = 250 } = {}) => {
  if (maybeUrl?.includes('/image/upload/')) {
    return maybeUrl.replace(/\/v[^/]+\//, '/');
  }
  const slug = slugify(name);
  return `https://res.cloudinary.com/${CLOUD}/image/upload/w_${w},h_${h},c_fill,q_auto,f_auto/foodies/categories/${slug}.jpg`;
};

export const NO_PHOTO = `https://res.cloudinary.com/${CLOUD}/image/upload/w_343,h_250,c_fill,q_auto,f_auto/foodies/placeholders/category.png`;
export const cdnPlaceholder = (w = 343, h = 250) =>
  `https://res.cloudinary.com/${CLOUD}/image/upload/w_${w},h_${h},c_fill,q_auto,f_auto/foodies/placeholders/category.png`;
