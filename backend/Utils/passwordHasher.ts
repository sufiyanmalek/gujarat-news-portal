// Imports
import bcrypt from "bcrypt";

// Bcrypt Password Hashing
export const passwordHasher = async (
  plainPassword: string
): Promise<string> => {
  const hashedPassword = await bcrypt.hash(plainPassword, 10);
  return hashedPassword;
};
