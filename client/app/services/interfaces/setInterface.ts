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

export interface EditExerciseRequest {
  id: string;
  reps: number;
  weight: number;
  exerciseId: string;
}
