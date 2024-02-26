import { ID, storage } from "../../appwrite";

const uploadImage = async (file: File) => {
  if (!file) {
    return;
  }
  return await storage.createFile(process.env.NEXT_PUBLIC_STORAGE_DI!,ID.unique() ,file)
  

};

export default uploadImage;
