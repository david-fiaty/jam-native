import FileSystem from "react-native-fs";

class MediaManager {
  async getBinaryData(uri: string) {
    try {
      const platformFilePath = uri.startsWith('file://') ? uri.replace('file://', '') : uri;
      const base64String = await FileSystem.readFile(platformFilePath, 'base64');
      const binaryData = Uint8Array.from(atob(base64String), (c) => c.charCodeAt(0));

      return binaryData; 
    } 
    catch (error) {
      console.error('Error reading file:', error);
      return null;
    }
  }
}

export default new MediaManager();
