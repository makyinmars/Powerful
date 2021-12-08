export {};

/**
 * This is a built-in middleware function in Express. It parses customs requests
 */

interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  age?: number;
  goal?: string;
  workouts?: Workout[];
}

interface Workout {
  id: string;
  name: string;
  description: string;
  user: User;
  userId: string;
  exercises: Exercise[];
}

interface Exercise {
  id: string;
  name: string;
  description: string;
  sets: Set[];
  workout: Workout;
  workoutId: string;
}

interface Set {
  id: string;
  sets: number;
  reps: number;
  weight: number;
  exercise: Exercise;
  exerciseId: string;
}

declare global {
  namespace Express {
    interface Request {
      user: User;
      workout: Workout;
      exercise: Exercise;
      set: Set;
    }
  }
}
