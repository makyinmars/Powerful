export interface Workout {
  id: string;
  name: string;
  userId: string;
}

export interface CreateWorkoutRequest {
  name: string;
  userId: string;
}

export interface EditWorkoutRequest {
  id: string;
  name: string;
  userId: string;
}
