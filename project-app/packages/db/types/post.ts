export type Post = {
  id: number;
  imageUrl: string;
  title: string;
  likesNumber: number | null;
  createdAt: Date | null;
};

export type PostComponentDto = {
  id: number;
  imageUrl: string;
  title: string;
  likesNumber: number | null;
  createdAt: Date | null;
  salonId: number;
  salonName: string;
};

export type PostGridDto = {
  id: number;
  imageUrl: string;
  title: string;
  salonId: number;
  likesNumber: number | null;
  createdAt: Date | null;
};
