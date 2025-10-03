export const CATEGORY_DESCRIPTIONS = {
  All: 
  'Every recipe, all in one place.',
  Seafood:
    'Fresh, bright dishes from the ocean—quick sautés, hearty stews, and simple grills that let the catch shine.',
  Lamb: 'Tender cuts and slow-cooked classics with herbs, spices, and deep, savory notes.',
  Starter: 'Small plates to kick things off—crisp, zesty, and perfect for sharing.',
  Chicken:
    'Weeknight-friendly roasts, grills, and stir-fries with clean flavors and comforting textures.',
  Beef: 'From seared steaks to slow braises—bold, rich, and deeply satisfying.',
  Dessert: 'Cakes, cookies, custards, and chilled treats—sweet finishes for every occasion.',
  Vegan:
    'Plant-forward mains and sides with vibrant produce, grains, and legumes—no animal products.',
  Pork: 'Juicy chops, caramelized roasts, and quick sautés with balance of sweet, salty, and spicy.',
  Vegetarian: 'Hearty, meat-free recipes built around vegetables, grains, eggs, and dairy.',
  Miscellaneous:
    'Unexpected finds and cross-category favorites that don’t fit in one box—but taste great.',
  Pasta: 'Saucy bowls, baked layers, and quick tosses—al dente comfort in every shape.',
  Breakfast: 'Early bites from eggs and oats to pancakes and quick bakes—fuel for the day.',
  Side: 'Vegetables, grains, and salads designed to round out the plate without stealing the show.',
  Goat: 'Distinct, lean flavor best in slow braises and spiced stews with warm aromatics.',
  Soup: 'Light broths to creamy ladles—one-pot comfort with layered, simmered flavor.',
};

export function getCategoryDescription(categoryName) {
  if (!categoryName) return 'Explore recipes by category.';
  return (
    CATEGORY_DESCRIPTIONS[categoryName] ||
    CATEGORY_DESCRIPTIONS[capitalize(categoryName)] ||
    'Explore recipes by category.'
  );
}

function capitalize(s = '') {
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}
