// Custom Firebase error type
export interface FirebaseError extends Error {
  code?: string;
  name: string;
  message: string;
}