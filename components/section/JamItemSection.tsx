import { StyleSheet } from 'react-native';
import { Layout } from '@/constants/Layout';
import JamsList from '../list/JamsList';
import TextView from '../view/TextView';

type Props = {
  jamId: any;
};

const JamItemSection = ({ jamId }: Props) => {
  if (jamId) {
    return (<JamsList idArray={[parseInt(jamId)]} />);
  }

  return <TextView>No params</TextView>
  
};

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    marginTop: Layout.space.base,
  },
});

export default JamItemSection;
