export interface Progress {
  id: string;
  picture: string;
  description: string;
  weight: number;
  cloudinary_id: string;
  userId: string;
}

export interface ProgressStatus {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  errorMessage: string;
}
export interface ProgressState {
  currentProgress: Progress;
  progressStatus: ProgressStatus;
}

export interface CreateProgressRequest {
  image: any;
  description: string;
  weight: string;
  userId: string;
}
