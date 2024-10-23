import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Collapsible from 'react-native-collapsible';
import TextView from './TextView';
import { Layout } from '@/constants/Layout';

type Props = {
  label: string,
  content: JSX.Element,
};

const CollapsibleView = ({label, content}: Props) => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <View>
      <TouchableOpacity onPress={() => setCollapsed((prev) => !prev)}>
        <TextView>{label}</TextView>
      </TouchableOpacity>
      <Collapsible collapsed={collapsed} align="center">
        <View style={styles.content}>
          {content}
        </View>
      </Collapsible>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    marginTop: Layout.space.base,
    width: '100%',
  },
});

export default CollapsibleView;