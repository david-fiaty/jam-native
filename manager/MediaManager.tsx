import { Layout } from '@/constants/Layout';
import { Config } from '@/constants/Config';
import * as FileSystem from 'expo-file-system';
import DeviceManager from "@/manager/DeviceManager";
import DataManager from './DataManager';

class MediaManager {
  async getBase64Data(uri: string) {
    try {
      return await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
    } 
    catch (error) {
      console.error('Error reading image file:', error);
      return null;
    }
  }

  getBinaryData(base64data: string) {
    return Uint8Array.from(atob(base64data), (char) => char.charCodeAt(0));
  }

  getThumbnailSize () {
    let windowWidth: any = DeviceManager.window.width;
    let imageDim: number = windowWidth / 3 - Layout.space.base * 1.7;

    return {
      width: imageDim,
      height: imageDim,
    };
  }

  getImageUrl (path: any) {
    return Config.imageUrl + path;
  }

  prepareUpload = (data: any) => {
    return data.map((item: any) => {
      return DataManager.extract(['base64'], item);
    }); 
  };
  
  urlToBase64 (url: string) {
    
  } 
}

export default new MediaManager();
