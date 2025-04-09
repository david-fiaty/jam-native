import { StyleSheet } from 'react-native';
import { BaseProps } from '@/constants/Types';

type Props = BaseProps & {
  item?: any;
  data?: any;
  params?: any;
};

const PersonalProfileForm = ({item, data, params}: Props) => {
  return (<></>);
};

const styles = StyleSheet.create({
  container: {
    
  },
});

export default PersonalProfileForm;