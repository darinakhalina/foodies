// src/pages/UserPage/components/MyRecipes.jsx
import UserRecipeRow from '../../../components/UserRecipeRow/UserRecipeRow';

export default function MyRecipes() {
  // Replace with real recipes
  const recipes = [
    {
      id: 101,
      title: 'CHILLI PRAWN LINGUINE',
      description:
        'Mix the dressing ingredients in a small bowl and season with salt...',
      thumb: '/images/mock/pasta.jpg',
    },
    {
      id: 101,
      title: 'CHILLI PRAWN LINGUINE',
      description:
        'Mix the dressing ingredients in a small bowl and season with salt...',
      thumb: '/images/mock/pasta.jpg',
    },
    {
      id: 101,
      title: 'CHILLI PRAWN LINGUINE',
      description:
        'Mix the dressing ingredients in a small bowl and season with salt...',
      thumb: '/images/mock/pasta.jpg',
    },
    {
      id: 101,
      title: 'CHILLI PRAWN LINGUINE',
      description:
        'Mix the dressing ingredients in a small bowl and season with salt...',
      thumb: '/images/mock/pasta.jpg',
    },
    {
      id: 101,
      title: 'CHILLI PRAWN LINGUINE',
      description:
        'Mix the dressing ingredients in a small bowl and season with salt...',
      thumb: '/images/mock/pasta.jpg',
    },
    {
      id: 101,
      title: 'CHILLI PRAWN LINGUINE',
      description:
        'Mix the dressing ingredients in a small bowl and season with salt...',
      thumb: '/images/mock/pasta.jpg',
    },
    {
      id: 101,
      title: 'CHILLI PRAWN LINGUINE',
      description:
        'Mix the dressing ingredients in a small bowl and season with salt...',
      thumb: '/images/mock/pasta.jpg',
    },
    {
      id: 101,
      title: 'CHILLI PRAWN LINGUINE',
      description:
        'Mix the dressing ingredients in a small bowl and season with salt...',
      thumb: '/images/mock/pasta.jpg',
    },
    {
      id: 101,
      title: 'CHILLI PRAWN LINGUINE',
      description:
        'Mix the dressing ingredients in a small bowl and season with salt...',
      thumb: '/images/mock/pasta.jpg',
    },
    {
      id: 101,
      title: 'CHILLI PRAWN LINGUINE',
      description:
        'Mix the dressing ingredients in a small bowl and season with salt...',
      thumb: '/images/mock/pasta.jpg',
    },
    {
      id: 101,
      title: 'CHILLI PRAWN LINGUINE',
      description:
        'Mix the dressing ingredients in a small bowl and season with salt...',
      thumb: '/images/mock/pasta.jpg',
    },
    {
      id: 101,
      title: 'CHILLI PRAWN LINGUINE',
      description:
        'Mix the dressing ingredients in a small bowl and season with salt...',
      thumb: '/images/mock/pasta.jpg',
    },
  ];

  return (
    <div>
      {recipes.map((recipe) => (
        <UserRecipeRow
          key={recipe.id}
          title={recipe.title}
          description={recipe.description}
          thumb={recipe.thumb}
          onOpen={() => console.log('open recipe', recipe.id)}
        />
      ))}
    </div>
  );
}
