import { StyleSheet, View } from 'react-native';
import { Layout } from '@/constants/Layout';
import TextView from './TextView';
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
          justify="flex-start"
          style={styles.listItem}
        >
          <BoxView direction="row" align="center" justify="flex-end" style={styles.listItemLeft}>
            {bulletHidden !== true && <View style={styles.listBullet} />}
          </BoxView>
          
          <BoxView direction="row" align="center" justify="flex-start" style={styles.listItemRight}>
            <TextView>{row}</TextView>
          </BoxView>
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
  listItem: {
    width: '100%',
  },
  listItemLeft: {
    width: Layout.space.base/3,
  },
  listItemRight: {
    flexWrap: 'wrap',
  },
  listBullet: {
    width: bulletSize,
    height: bulletSize,
    borderRadius: bulletSize,
    backgroundColor: Layout.colors.primary,
  },
});

export default BulletListView;
