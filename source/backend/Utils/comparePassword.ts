// Imports
import bcrypt from "bcrypt";

// Bcrypt compare pass
export const comparePassword = async (
  plainPassword: string,
  hashedPassword: string
) => {
  const valid = await bcrypt.compare(plainPassword, hashedPassword);
  return valid;
};
