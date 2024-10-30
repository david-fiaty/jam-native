import { StyleSheet, Text, View } from 'react-native';
import Slick from 'react-native-slick';


type Props = {
  data?: [],
  type?: string,
};

const SlideshowView = ({data, type}: Props) => {
    const SlideshowItem = data?.map(item => {
      if (type == 'text') {
        return (
          <View style={styles.slide1}>
            <Text style={styles.text}>{item.title}</Text>
          </View>
        );
      }
      else if (type == 'image') {
        return (
          <View style={styles.slide1}>
            <Text style={styles.text}>{item.title}</Text>
          </View>
        );
      }
    });

    return (
      <Slick style={styles.wrapper} showsButtons={true}>
        {SlideshowItem}
      </Slick>
    );
};
 
const styles = StyleSheet.create({
  wrapper: {
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  }
});

export default SlideshowView;
 
 
