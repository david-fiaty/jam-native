import { Linking } from 'react-native';
import { Layout } from '@/constants/Layout';
import { Config } from '@/constants/Config';
import * as FileSystem from 'expo-file-system';
import ScreenManager from "@/manager/ScreenManager";
import DataManager from './DataManager';
import i18n from '@/translation/i18n';

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

  getThumbnailSize() {
    let windowWidth: any = ScreenManager.window.width;
    let imageDim: number = windowWidth / 3 - Layout.space.base * 1.7;

    return {
      width: imageDim,
      height: imageDim,
    };
  }

  getImageUrl(path: any) {
    return Config.imageUrl + path;
  }

  prepareUpload(data: any) {
    return data.map((item: any) => {
      return DataManager.extract(['base64'], item);
    }); 
  };

  fetchImageAsBase64(url: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(url);
        const blob = await response.blob();
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result); 
        };
        reader.onerror = reject; 
        reader.readAsDataURL(blob);
      } catch (error) {
        reject(error); 
      }
    });
  };
  
  async getImageBase64(url: string) {
    try {
      return await this.fetchImageAsBase64(url);
    } catch (error) {
      console.error('Error fetching image:', error);
      return null;
    }
  };
  
  async openUrl(url: string) {
    let supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      // Todo - Handle invalid link error
    }
  }
}

export default new MediaManager();
