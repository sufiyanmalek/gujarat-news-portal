// Imports
import { generateFromEmail } from "unique-username-generator";

// Generate Username from Email
export const generateUsername = (email: string): string => {
  const username: string = generateFromEmail(email, 3);
  return username;
};
