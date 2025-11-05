
import type { Category, PromptExample } from './types';

export const CATEGORIES: Category[] = ['Boy', 'Girl', 'Couple', 'Men', 'Women', 'Family', 'Other'];

export const PROMPTS: Record<Category, PromptExample[]> = {
    Boy: [
        { prompt: 'Turn the boy into a superhero with a red cape.', imageUrl: 'https://picsum.photos/seed/boy1/400' },
        { prompt: 'Place the boy in a futuristic cityscape.', imageUrl: 'https://picsum.photos/seed/boy2/400' },
        { prompt: 'Give the boy a friendly robot pet.', imageUrl: 'https://picsum.photos/seed/boy3/400' },
        { prompt: 'Change the background to a magical forest.', imageUrl: 'https://picsum.photos/seed/boy4/400' },
    ],
    Girl: [
        { prompt: 'Dress the girl in a sparkling princess gown.', imageUrl: 'https://picsum.photos/seed/girl1/400' },
        { prompt: 'Add a crown of flowers to her hair.', imageUrl: 'https://picsum.photos/seed/girl2/400' },
        { prompt: 'Place her on a majestic white horse.', imageUrl: 'https://picsum.photos/seed/girl3/400' },
        { prompt: 'Surround her with glowing butterflies.', imageUrl: 'https://picsum.photos/seed/girl4/400' },
    ],
    Couple: [
        { prompt: 'Change the background to a romantic sunset on a beach.', imageUrl: 'https://picsum.photos/seed/couple1/400' },
        { prompt: 'Place the couple under the Eiffel Tower in Paris.', imageUrl: 'https://picsum.photos/seed/couple2/400' },
        { prompt: 'Add a vintage, old-photo filter.', imageUrl: 'https://picsum.photos/seed/couple3/400' },
        { prompt: 'Make it look like a watercolor painting.', imageUrl: 'https://picsum.photos/seed/couple4/400' },
    ],
    Men: [
        { prompt: 'Put the man in a sharp business suit.', imageUrl: 'https://picsum.photos/seed/men1/400' },
        { prompt: 'Change the background to a rugged mountain range.', imageUrl: 'https://picsum.photos/seed/men2/400' },
        { prompt: 'Add a cool pair of sunglasses.', imageUrl: 'https://picsum.photos/seed/men3/400' },
        { prompt: 'Place him in the driver\'s seat of a classic sports car.', imageUrl: 'https://picsum.photos/seed/men4/400' },
    ],
    Women: [
        { prompt: 'Turn the background into a vibrant, abstract pattern.', imageUrl: 'https://picsum.photos/seed/women1/400' },
        { prompt: 'Add elegant, sparkling jewelry.', imageUrl: 'https://picsum.photos/seed/women2/400' },
        { prompt: 'Place her in a serene Japanese garden.', imageUrl: 'https://picsum.photos/seed/women3/400' },
        { prompt: 'Give her hair a fantasy color like pink or blue.', imageUrl: 'https://picsum.photos/seed/women4/400' },
    ],
    Family: [
        { prompt: 'Place the family in a cozy log cabin with a fireplace.', imageUrl: 'https://picsum.photos/seed/family1/400' },
        { prompt: 'Change the setting to a sunny day at a theme park.', imageUrl: 'https://picsum.photos/seed/family2/400' },
        { prompt: 'Turn the photo into a cartoon or comic book style.', imageUrl: 'https://picsum.photos/seed/family3/400' },
        { prompt: 'Add a festive holiday theme with snow and decorations.', imageUrl: 'https://picsum.photos/seed/family4/400' },
    ],
    Other: [
        { prompt: 'Make the image black and white, except for one red object.', imageUrl: 'https://picsum.photos/seed/other1/400' },
        { prompt: 'Apply a retro, 80s synthwave style.', imageUrl: 'https://picsum.photos/seed/other2/400' },
        { prompt: 'Remove the person in the background.', imageUrl: 'https://picsum.photos/seed/other3/400' },
        { prompt: 'Make it look like it was drawn with colored pencils.', imageUrl: 'https://picsum.photos/seed/other4/400' },
    ],
};
