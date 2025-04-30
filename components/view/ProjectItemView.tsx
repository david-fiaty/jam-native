import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BaseProps } from '@/constants/Types';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';
import IconView from './IconView';
import BoxView from './BoxView';
import TextView from './TextView';

type Props = BaseProps & {
  projectId: any;
};

const ProjectItemView = ({ projectId }: Props) => {
  return (
    <TextView>{projectId}</TextView>
  );
};

const styles = StyleSheet.create({
  container: {
  },
});

export default ProjectItemView;
