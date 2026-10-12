/** Shared date formatting so the blog, Publications and Hero stay consistent. */
export const fmt = (iso) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });