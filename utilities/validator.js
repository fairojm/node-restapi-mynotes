export const validateName = (name) => {
  if (name.trim().length > 0) {
    return true;
  }
  return false;
};
