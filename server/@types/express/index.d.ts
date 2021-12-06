export {};

/**
 * This is a built-in middleware function in Express. It parses customs requests
 */

interface User {
  id: string;
  email: string;
  name: string;
  age?: number;
  goal?: string;
}

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}
