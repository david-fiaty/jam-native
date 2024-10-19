import { StyleSheet } from 'react-native';
import StaticIcon from '../base/IconBase';
import { Layout } from '@/constants/Layout';

type Props = {
  name: string,
  size?: number, 
};

const PrimaryIcon = ({name, size}: Props) => {

  return (
    <StaticIcon 
      name={name} 
      iconStyle={styles.iconStyle} 
      containerStyle={styles.containerStyle}
      size={size} 
    />
  );
};

const styles = StyleSheet.create({
  /*
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: GlobalStyles.space.base*3,
    height: GlobalStyles.space.base*3,
    borderRadius: GlobalStyles.space.base*1.5,
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  */
  containerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  iconStyle: {
    color: 'red',
    backgroundColor: 'orange',
    padding: Layout.space.base,
    borderRadius: 40,
  },
});

export default PrimaryIcon;