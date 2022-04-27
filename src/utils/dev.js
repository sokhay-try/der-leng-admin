export const isDebug = () => process?.env?.NODE_ENV === "development";

export const delay = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};
