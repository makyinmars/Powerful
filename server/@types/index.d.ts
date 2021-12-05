export {};

/**
 * This is a built-in middleware function in Express. It parses customs requests
 */
declare global {
  namespace Express {
    interface Request {
      user: any;
    }
  }
}
