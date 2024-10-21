import { StyleSheet, View } from 'react-native';
import { StaticImage } from '../base/StaticImage';
import { Colors } from '@/constants/GlobalStyles';

type Props = {
  item: object,
  index: number,
};

const url = 'https://dev.jammm.app/backend';

const JamImages = ({item, index}: Props) => {
  const imageUri = url + item?.medias[0]?.url;

  return (
    <View style={styles.container}>
      <StaticImage 
        uri={imageUri} 
        width="100%"
        height="100%"
        resizeMode="cover"
      />   
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.tertiary,
    width: '100%',
    height: 280,
    opacity: 1,
  },
});

export default JamImages;