import FileSystem from "react-native-fs";

class MediaManager {
  async getBinaryData(uri: string) {
    try {
      return await FileSystem.readFile(uri, 'base64');
    } 
    catch (error) {
      console.error('Error reading file:', error);
      return null;
    }
  }
}

export default new MediaManager();
