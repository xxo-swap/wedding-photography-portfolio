



export function generateSlug(bride, groom) {
  return `${groom}-${bride}`
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}
