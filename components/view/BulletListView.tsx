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
      {data.map((row: any) => (
        <BoxView direction="row" align="center" justify="flex-start">
          {bulletHidden !== true && <View style={styles.bullet}></View>}
          <TextView>{row}</TextView>
        </BoxView>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 0,
    padding: 0,
  },
  bullet: {
    width: bulletSize,
    height: bulletSize,
    borderRadius: bulletSize,
    backgroundColor: Colors.primary,
  },
});

export default BulletListView;
