import { StyleSheet, View } from 'react-native';
import TextView from './TextView';
import { Colors } from '@/constants/Colors';
import BoxView from './BoxView';

type Props = {
  data?: any;
  bulletHidden?: boolean;
};

const bulletSize: number = 4;

const BulletListView = ({ data, bulletHidden }: Props) => {
  return (
    <View style={styles.container}>
      {data.map((row: any, i: number) => (
        <BoxView 
          key={`list-item-${i}`}
          direction="row" 
          align="center" 
          style={styles.item}
        >
          {bulletHidden !== true && <View style={styles.bullet}></View>}
          <TextView>{row}</TextView>
        </BoxView>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    margin: 0,
    padding: 0,
  },
  item: {
    flexWrap: 'wrap',
  },
  bullet: {
    width: bulletSize,
    height: bulletSize,
    borderRadius: bulletSize,
    backgroundColor: Colors.primary,
  },
});

export default BulletListView;
