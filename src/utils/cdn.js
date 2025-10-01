const CLOUD = import.meta.env.VITE_CLOUDINARY_CLOUD || 'dp87ga5sb';

const slugify = (name = '') =>
  name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');

export const cdnCategoryImg = (maybeUrl, name) => {
  if (maybeUrl?.includes('/image/upload/')) {
    return maybeUrl.replace(/\/v[^/]+\//, '/');
  }
  const slug = slugify(name);
  return `https://res.cloudinary.com/${CLOUD}/image/upload/q_auto,f_auto/foodies/categories/${slug}.jpg`;
};

export const NO_PHOTO = `https://res.cloudinary.com/${CLOUD}/image/upload/q_auto,f_auto/foodies/placeholders/category.png`;

export const cdnPlaceholder = () =>
  `https://res.cloudinary.com/${CLOUD}/image/upload/q_auto,f_auto/foodies/placeholders/category.png`;
