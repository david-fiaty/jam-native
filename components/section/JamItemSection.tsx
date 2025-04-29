import { StyleSheet } from 'react-native';
import { Layout } from '@/constants/Layout';
import JamsList from '../list/JamsList';
import TextView from '../view/TextView';

type Props = {
  jamId: any;
};

const JamItemSection = ({ jamId }: Props) => {
  return <TextView>{jamId}</TextView>
  return (<JamsList idArray={[jamId]} />);
};

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    marginTop: Layout.space.base,
  },
});

export default JamItemSection;
