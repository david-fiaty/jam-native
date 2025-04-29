import { StyleSheet } from 'react-native';
import { Layout } from '@/constants/Layout';

type Props = {
  profileId: any;
};

const ProfileItemSection = ({ profileId }: Props) => {
  profileId = parseInt(profileId);
  
  if (!profileId || isNaN(profileId)) {
    return <></>;
  }

  return (<></>);
};

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    marginTop: Layout.space.base,
  },
});

export default ProfileItemSection;
