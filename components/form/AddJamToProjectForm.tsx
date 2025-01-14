import { StyleSheet, Text } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';

const AddJamToProjectForm = () => {
  return (
    <Text>
      ADD JAM TO PROJECT
    </Text>
  );
};

const styles = StyleSheet.create({
  content: {
    color: Colors.primary,
    fontSize: Layout.fontSize.base,
  },
});

export default AddJamToProjectForm;
