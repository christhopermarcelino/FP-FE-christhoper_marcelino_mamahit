export const setGlow = (isLoading) => {
  return isLoading ? "placeholder" : "";
};

export const isValueExists = (value) => {
  return value && value != "N/A";
};
