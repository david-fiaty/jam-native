import { Text } from 'react-native';
import { GlobalStyles } from '@/constants/GlobalStyles';
import StaticIcon from '../base/StaticIcon';

type Props = {
  name: string,
};

const PrimaryIcon = ({name}: Props) => {
  return (
    <StaticIcon 
      name={nanme} 
      iconStyle={GlobalStyles.tabs.icon} 
      containerStyle={[GlobalStyles.icon.clear, styles.icon]}
      size={styles.icon.size} 
    />
  );
};

export default PrimaryIcon;