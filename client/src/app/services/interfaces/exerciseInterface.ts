import { Set } from "./setInterface";

export interface Exercise {
  id: string;
  name: string;
  sets?: Set[];
  workoutId: string;
}

export interface CreateExerciseRequest {
  name: string;
  workoutId: string;
}

export interface EditExerciseRequest {
  id: string;
  name: string;
  sets?: Set[];
  workoutId: string;
}
