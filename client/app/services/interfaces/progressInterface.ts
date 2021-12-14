export interface Progress {
  id: string;
  picture: string;
  description: string;
  weight: number;
  cloudinary_id: string;
  userId: string;
}

export interface CreateProgressRequest {
  image: any;
  description: string;
  weight: string;
  userId: string;
}
