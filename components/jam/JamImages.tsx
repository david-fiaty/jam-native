import { StyleSheet, View } from 'react-native';
import { StaticImage } from '../base/StaticImage';
import { Colors } from '@/constants/GlobalStyles';

type Props = {
  item: object,
  index: number,
};

const JamImages = ({item, index}: Props) => {
  const source = require(`@/assets/images/${item.image}`); 

  return (
    <View style={styles.container}>
      <StaticImage 
        source={source} 
        width={200}
        height={200}
      />   
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.tertiary,
    width: '100%',
    height: 280,
    opacity: 0.7,
  },
});

export default JamImages;