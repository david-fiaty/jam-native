import * as FileSystem from 'expo-file-system';

class MediaManager {
  async getBase64Data(uri: string) {
    try {
      return await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
    } 
    catch (error) {
      console.error('Error reading file:', error);
      return null;
    }
  }

  getBinaryData(base64data: string ) {
    Uint8Array.from(atob(base64data), (char) => char.charCodeAt(0));
  }
}

export default new MediaManager();
