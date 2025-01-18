export type Salon = {
  id: number;
  name: string;
  description: string;
  phoneNumber: string;
  locationUrl: string;
  followersNumber: number;
};

export type UpdateSalonDto = {
  id: number;
  name: string;
  description: string;
  phoneNumber: string;
  locationUrl: string;
};
