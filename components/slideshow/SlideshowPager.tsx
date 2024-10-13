import { StyleSheet, View } from 'react-native';
import { GlobalStyles, Colors } from '@/constants/GlobalStyles';

type Props = {
  data: [],
  pagerIndex: number,
}

export default function SlideshowPager({ data, pagerIndex }: Props) {
  return (  
    <View style={styles.container}>
      {data.map((_, index) => {
        return (
          <View 
            key={index} 
            style={[
              styles.pager, 
              {backgroundColor: pagerIndex == index ? Colors.primary : Colors.tertiary},
            ]}
          />
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
    borderRadius: 8,
    marginHorizontal: 4,
    marginVertical: GlobalStyles.space,
  },
});


