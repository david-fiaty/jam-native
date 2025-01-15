import { Layout } from '@/constants/Layout';
import { Config } from '@/constants/Config';
import * as FileSystem from 'expo-file-system';
import DeviceManager from "@/manager/DeviceManager";

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

  urlToBase64 (url: string) {
    fetch(url)
    .then(response => response.blob())
    .then(blob => new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result)
      reader.onerror = reject
      reader.readAsDataURL(blob)
    }));
  } 
}

export default new MediaManager();
