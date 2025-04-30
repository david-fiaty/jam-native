import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BaseProps } from '@/constants/Types';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';
import IconView from './IconView';
import BoxView from './BoxView';
import TextView from './TextView';

type Props = BaseProps & {
  profileId: any;
};

const ProfileItemView = ({ profileId }: Props) => {
  return (
    <TextView>{profileId}</TextView>
  );
};

const styles = StyleSheet.create({
  container: {
  },
});

export default ProfileItemView;
