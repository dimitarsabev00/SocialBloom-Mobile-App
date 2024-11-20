import { supabaseUrl } from "../constants";

export const getUserImageSrc = (imagePath: string) => {
  if (imagePath) {
    return getSupabaseFileUrl(imagePath);
  } else {
    return require("../assets/images/defaultUser.png");
  }
};

export const getSupabaseFileUrl = (filePath: string) => {
  if (filePath)
    return {
      uri: `${supabaseUrl}/storage/v1/object/public/uploads/${filePath}`,
    };
  return null;
};
