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

export type PostModifyDto = {
  id?: number;
  image: File;
  title: string;
  tagIds: number[];
};

export type PostForEditDto = {
  id: number;
  imageUrl: string;
  likesNumber: number;
  salonId: number;
  title: string;
  tagIds: number[];
};
