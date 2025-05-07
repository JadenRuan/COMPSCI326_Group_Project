
import bcrypt from "bcryptjs";

const SALT_ROUNDS = 12;

export function hashPassword(raw) {
  return bcrypt.hash(raw, SALT_ROUNDS);
}

export function comparePassword(raw, hash) {
  return bcrypt.compare(raw, hash);
}