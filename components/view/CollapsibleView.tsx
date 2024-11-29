import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { Layout } from '@/constants/Layout';

type Props = {
  label?: any,
  openedLabel?: any,
  content?: any,
  headerStyle?: any,
};

const CollapsibleView = ({label, openedLabel, content, headerStyle}: Props) => {
  const [collapsed, setCollapsed] = useState(true);
  let buttonLabel = label;
  
  if (!collapsed && openedLabel) {
    buttonLabel = openedLabel;
  }

  return (
    <View>
      <TouchableOpacity onPress={() => setCollapsed((prev) => !prev)}>
        <View style={headerStyle}>{buttonLabel}</View>
      </TouchableOpacity>
      <Collapsible 
        collapsed={collapsed} 
        align="center"
      >
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