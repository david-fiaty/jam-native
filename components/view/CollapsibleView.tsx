import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Layout } from '@/constants/Layout';
import Collapsible from 'react-native-collapsible';

type Props = {
  label?: any;
  openedLabel?: any;
  content?: any;
  headerStyle?: any;
  onLabelPress?: () => void;
};

const CollapsibleView = ({label, openedLabel, content, headerStyle, onLabelPress}: Props) => {
  const [collapsed, setCollapsed] = useState(true);
  let buttonLabel = label;
  
  if (!collapsed && openedLabel) {
    buttonLabel = openedLabel;
  }

  const onPress = () => {
    setCollapsed((prev) => !prev);
    if (onLabelPress) onLabelPress();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
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
  container: {
    width: '100%',
  },
  content: {
    marginTop: Layout.space.base,
    width: '100%',
  },
});

export default CollapsibleView;