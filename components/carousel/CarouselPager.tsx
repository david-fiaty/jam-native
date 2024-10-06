import { StyleSheet, View } from 'react-native';
import { GlobalStyles } from '@/constants/GlobalStyles';

type Props = {
  data: [],
  pagerIndex: number,
}

export default function CarouselPager({ data, pagerIndex }: Props) {
  return (  
    <View style={styles.container}>
      {data.map((_, index) => {
        return (
          <View key={index} style={[styles.pager, {backgroundColor: pagerIndex == index ? GlobalStyles.pager.color : '#F1F1F1'}]}></View>
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
  pager: {
    height: 8,
    width: 8,
    marginHorizontal: 4,
    borderRadius: 8,
  },
});


