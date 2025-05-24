import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Layout } from '@/constants/Layout';
import Collapsible from 'react-native-collapsible';

type Props = {
  label?: any,
  openedLabel?: any,
  content?: any,
  headerStyle?: any,
};

const CollapsibleView = ({label, openedLabel, content, headerStyle}: Props) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  let buttonLabel = label;
  
  if (!isCollapsed && openedLabel) {
    buttonLabel = openedLabel;
  }

  return (
    <View style={styles.container}>
      {isCollapsed && (
        <TouchableOpacity onPress={() => setIsCollapsed((prev) => !prev)}>
          <View style={headerStyle}>{buttonLabel}</View>
        </TouchableOpacity>
      )}

      <Collapsible 
        collapsed={isCollapsed} 
        align="center"
      >
        <View style={styles.content}>
          {content}
        </View>
      </Collapsible>

      {!isCollapsed && (
        <TouchableOpacity onPress={() => setIsCollapsed((prev) => !prev)}>
          <View style={headerStyle}>{buttonLabel}</View>
        </TouchableOpacity>
      )}
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