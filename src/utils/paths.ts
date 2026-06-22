export const withBase = (path: string): string => {
  if (/^(https?:|mailto:|tel:)/i.test(path)) {
    return path;
  }

  const base = import.meta.env.BASE_URL.endsWith("/")
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;

  return `${base}${path.replace(/^\//, "")}`;
};

