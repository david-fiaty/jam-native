import { StyleSheet } from 'react-native';
import { Layout } from '@/constants/Layout';
import JamsList from '../list/JamsList';

type Props = {
  jamId: any;
};

const JamItemSection = ({ jamId }: Props) => {
  jamId = parseInt(jamId);
  
  if (!jamId || isNaN(jamId)) {
    return <></>;
  }

  return (<JamsList idArray={[jamId]} />);
};

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    marginTop: Layout.space.base,
  },
});

export default JamItemSection;
