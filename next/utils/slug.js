export const createSlug = (text) => {
  if (!text) return "";

  return text
    .toLowerCase()
    .trim()
    .replace(/^\-+|\-+$/g, "")
    .replace(/\+/g, "plus")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

export const normalizeSlug = (slug) => {
  if (!slug) return "";

  return slug
    .toLowerCase()
    .trim()
    .replace(/^\-+|\-+$/g, "")
    .replace(/-+/g, "-");
};



// export function createTopicSlug(title) {
//   if (!title) return "";

//   return title
//     .toLowerCase()
//     .replace(/&nbsp;|\\u00a0/g, " ") 
//     .replace(/<[^>]*>/g, "")         
//     .replace(/[^a-z0-9\s]/g, " ")     
//     .trim()
//     .replace(/\s+/g, "_")             
//     + ".htm";
// }

export function createTopicSlug(title) {
  if (!title) return "";

  return title
    .toLowerCase()
    .replace(/&nbsp;|\\u00a0/g, " ")
    .replace(/<[^>]*>/g, "")
    .replace(/^\d+[a-z]?[_-]?/i, "")  
    .replace(/[^a-z0-9\s]/g, " ")
    .trim()
    // .replace(/\s+/g, "_")
    // + ".htm";
     .replace(/\s+/g, "-")
}