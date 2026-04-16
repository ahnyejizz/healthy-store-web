export const productKeys = {
  all: ["products"] as const,
  featured: () => [...productKeys.all, "featured"] as const,
};
