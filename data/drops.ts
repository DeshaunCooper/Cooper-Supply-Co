export type Drop = {
  id: string;
  slug: string;
  name: string;
  date: string;
  description: string;
  status: "upcoming" | "live" | "archive";
  productIds: string[];
  coverImage?: string;
};

export const drops: Drop[] = [];
