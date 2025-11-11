import { Linking, View, Image } from 'react-native';
import { Layout } from '@/constants/Layout';
import { Config } from '@/constants/Config';
import ScreenManager from "@/manager/ScreenManager";
import NoImageView from '@/components/view/NoImageView';
import ImageView from '@/components/view/ImageView';

class MediaManager {
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

  imageExists = async (url: string): Promise<boolean> => {
    if (!url) return false;
    
    try {
      const response = await fetch(url, { method: 'GET' });
      return response.ok;
    } catch (error) {
      return false;
    }
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
