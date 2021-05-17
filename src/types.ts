interface FoodProps{
  id: number;
  name: string;
  description: string;
  image: string;
  price: string;
  available: boolean;
}

interface A{}

export type { FoodProps, A }