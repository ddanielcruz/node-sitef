export default <T = void>(handler: Function) => {
  return new Promise<T>((resolve, reject) => {
    try {
      const value = handler();
      resolve(value);
    } catch (error) {
      reject(error);
    }
  });
};
