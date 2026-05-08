export interface Rating {
  rate: number; // from 0 to 5 => acts as stars
  count: number; // review numbers
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}
