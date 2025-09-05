import { Package } from "@/types/package.type";

export const mockPackages: Package[] = [
  {
    id: "-1",
    name: "A donation",
    description: "A custom donation package",
    price: 20,
    currency: "thb",
  },
  {
    id: "0",
    name: "Basic Plan",
    description: "A basic subscription plan",
    price: 299,
    currency: "thb",
  },
  {
    id: "1",
    name: "Standard Plan",
    description: "A standard subscription plan",
    price: 599,
    currency: "thb",
  },
  {
    id: "2",
    name: "Premium Plan",
    description: "A premium subscription plan",
    price: 899,
    currency: "thb",
  },
];
