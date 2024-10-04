import { StyleSheet, View } from 'react-native';
import { ScreenStyles } from '@/constants/ScreenStyles';

type Props = {
  data: [],
  pagerIndex: number,
}

export default function CarouselPager({ data, pagerIndex }: Props) {
  return (  
    <View style={styles.container}>
      {data.map((_, index) => {
        return (
          <View key={index} style={[styles.dot, {backgroundColor: pagerIndex == index ? ScreenStyles.text.color : '#F1F1F1'}]}></View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    height: 8,
    width: 8,
    marginHorizontal: 4,
    borderRadius: 8,
  },
});


