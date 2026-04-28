import car1 from "@/assets/car-1.jpg";
import car2 from "@/assets/car-2.jpg";
import car3 from "@/assets/car-3.jpg";
import car4 from "@/assets/car-4.jpg";
import car5 from "@/assets/car-5.jpg";
import car6 from "@/assets/car-6.jpg";

export type Car = {
  id: string;
  name: string;
  brand: string;
  category: "Luxury" | "SUV" | "Sedan" | "Hatchback" | "Sports";
  image: string;
  gallery: string[];
  pricePerDay: number;
  pricePerHour: number;
  pricePerWeek: number;
  rating: number;
  reviews: number;
  seats: number;
  transmission: "Automatic" | "Manual";
  fuel: "Petrol" | "Diesel" | "Electric" | "Hybrid";
  mileage: string;
  features: string[];
  available: boolean;
  popular?: boolean;
  description: string;
};

export const CARS: Car[] = [
  {
    id: "obsidian-gt",
    name: "Obsidian GT",
    brand: "Tesla",
    category: "Sports",
    image: car1,
    gallery: [car1, car3, car4],
    pricePerHour: 45,
    pricePerDay: 320,
    pricePerWeek: 1890,
    rating: 4.9,
    reviews: 284,
    seats: 2,
    transmission: "Automatic",
    fuel: "Electric",
    mileage: "0–100 in 2.1s",
    features: ["Autopilot", "GPS", "Premium Audio", "Heated Seats", "AC"],
    available: true,
    popular: true,
    description:
      "A head-turning electric coupe crafted for drivers who demand precision, silence, and unforgettable acceleration.",
  },
  {
    id: "noir-suv",
    name: "Noir Range",
    brand: "Range Rover",
    category: "SUV",
    image: car2,
    gallery: [car2, car6, car4],
    pricePerHour: 38,
    pricePerDay: 260,
    pricePerWeek: 1520,
    rating: 4.8,
    reviews: 192,
    seats: 7,
    transmission: "Automatic",
    fuel: "Hybrid",
    mileage: "28 mpg combined",
    features: ["4WD", "Panoramic Roof", "GPS", "Massage Seats", "AC"],
    available: true,
    popular: true,
    description:
      "Commanding presence meets quiet luxury. Seven seats of pure comfort with effortless off-road capability.",
  },
  {
    id: "crimson-spyder",
    name: "Crimson Spyder",
    brand: "Ferrari",
    category: "Luxury",
    image: car3,
    gallery: [car3, car1, car4],
    pricePerHour: 78,
    pricePerDay: 550,
    pricePerWeek: 3200,
    rating: 5.0,
    reviews: 96,
    seats: 2,
    transmission: "Automatic",
    fuel: "Petrol",
    mileage: "0–100 in 2.9s",
    features: ["Convertible", "Launch Control", "GPS", "Carbon Interior"],
    available: true,
    popular: true,
    description:
      "A thoroughbred convertible. Open the roof, unleash the V8, and let the road remember your name.",
  },
  {
    id: "platinum-coupe",
    name: "Platinum Coupe",
    brand: "Mercedes",
    category: "Luxury",
    image: car4,
    gallery: [car4, car6, car1],
    pricePerHour: 55,
    pricePerDay: 380,
    pricePerWeek: 2240,
    rating: 4.9,
    reviews: 156,
    seats: 4,
    transmission: "Automatic",
    fuel: "Petrol",
    mileage: "26 mpg combined",
    features: ["Ambient Lighting", "GPS", "Burmester Audio", "AC"],
    available: true,
    description:
      "Tailored elegance from every angle. A grand tourer for those who travel in whispers, not shouts.",
  },
  {
    id: "azure-bolt",
    name: "Azure Bolt",
    brand: "BMW",
    category: "Hatchback",
    image: car5,
    gallery: [car5, car1, car6],
    pricePerHour: 22,
    pricePerDay: 140,
    pricePerWeek: 820,
    rating: 4.7,
    reviews: 312,
    seats: 4,
    transmission: "Automatic",
    fuel: "Electric",
    mileage: "230 mi range",
    features: ["Fast Charge", "GPS", "Lane Assist", "AC"],
    available: true,
    description:
      "Compact, nimble, fully electric. The perfect city companion with serious punch where it counts.",
  },
  {
    id: "pearl-sedan",
    name: "Pearl Sedan",
    brand: "Tesla",
    category: "Sedan",
    image: car6,
    gallery: [car6, car4, car5],
    pricePerHour: 30,
    pricePerDay: 210,
    pricePerWeek: 1240,
    rating: 4.8,
    reviews: 421,
    seats: 5,
    transmission: "Automatic",
    fuel: "Electric",
    mileage: "405 mi range",
    features: ["Autopilot", "Glass Roof", "GPS", "Premium Audio"],
    available: true,
    popular: true,
    description:
      "Silent, swift, and smart. A refined electric sedan that redefines what the daily drive can feel like.",
  },
];

export const getCarById = (id: string) => CARS.find((c) => c.id === id);
