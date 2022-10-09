export const createFormData = <T>(args: T) => {
  const formData = new FormData();

  for (var key in args) {
    formData.append(key, args[key] as any);
  }

  return formData;
};
