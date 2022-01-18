export interface Set {
  id: string;
  reps: number;
  weight: number;
  exerciseId: string;
}

export interface CreateSetRequest {
  reps: number;
  weight: number;
  exerciseId: string;
}

export interface EditSetRequest {
  id: string;
  reps: number;
  weight: number;
}
