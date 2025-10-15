import { Linking, View } from 'react-native';
import { Layout } from '@/constants/Layout';
import { Config } from '@/constants/Config';
import * as FileSystem from 'expo-file-system';
import ScreenManager from "@/manager/ScreenManager";
import DataManager from './DataManager';
import NoImageView from '@/components/view/NoImageView';
import ImageView from '@/components/view/ImageView';

class MediaManager {
  base64ToFile(base64String: string, filename: string, mimeType: string) {
    const [base64Data] = base64String.split(',');
    const binary = atob(base64Data); 

    const array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }

    return new File([new Uint8Array(array)], filename, { type: mimeType });
  }

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

  getThumbnailSize(numColumns?: number) {
    numColumns = numColumns || 3;
    let windowWidth: any = ScreenManager.window.width;
    let factor: number = numColumns === 2 ? numColumns : 1.7;
    let imageDim: number = windowWidth / numColumns - (Layout.space.base * factor);

    return {
      width: imageDim,
      height: imageDim,
    };
  }

  getImageUrl(path: any) {
    return Config.imageUrl + path;
  }

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

  renderImage(uri: any, params?: any) {
    let output = null;
    let numColumns: number = params?.numColumns || 3;
    let imageSize = params?.imageSize || this.getThumbnailSize();

    if (!uri || uri == 'undefined') {
      output = (
        <View style={styles.item}>
          <NoImageView
            width={imageSize.width}
            height={imageSize.height}
            rounded={true}
          />
        </View>
      );
    }
    else {
      output = (
        <View style={styles.item}>
          <ImageView
            uri={this.getImageUrl(uri)}
            width={imageSize.width}
            height={imageSize.height}
            resizeMode="cover"
            style={[styles.image, ScreenManager.getGridCellSize(numColumns)]}
          />
        </View>
      );
    }

    return output;
  }
}

const styles: any = {
  item: {
    flexDirection: "column",
    gap: Layout.space.small,
  },
  image: {
    borderRadius: Layout.space.base,
  },
};

export default new MediaManager();
