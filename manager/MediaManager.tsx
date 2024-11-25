import * as FileSystem from 'expo-file-system';

class MediaManager {
  async getBinaryData(uri: string) {
    try {
      const base64String = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
  
      const binaryData = Uint8Array.from(atob(base64String), (char) => char.charCodeAt(0));
  
      return binaryData; 
    } 
    catch (error) {
      console.error('Error reading file:', error);
      return null;
    }
  }
}

export default new MediaManager();
