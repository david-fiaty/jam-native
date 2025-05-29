import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Layout } from '@/constants/Layout';
import Collapsible from 'react-native-collapsible';

type Props = {
  label?: any;
  openedLabel?: any;
  content?: any;
  headerStyle?: any;
  preview?: any;
};

const ListItemCollapsible = ({ label, openedLabel, content, headerStyle, preview }: Props) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  let buttonLabel = label;

  if (!isCollapsed && openedLabel) {
    buttonLabel = openedLabel;
  }
  
  return (
    <View style={styles.container}>
      {isCollapsed && preview}

      {isCollapsed && (
        <TouchableOpacity
          onPress={() => setIsCollapsed((prev) => !prev)}
          style={styles.topButton}
        >
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
        <TouchableOpacity
          onPress={() => setIsCollapsed((prev) => !prev)}
          style={styles.bottomButton}
        >
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
    margin: 0,
    padding: 0,
    width: '100%',
  },
  topButton: {
    margin: 0,
    padding: 0,
    marginTop: Layout.space.base,
  },
  bottomButton: {
    margin: 0,
    padding: 0,
    marginTop: Layout.space.base,
  },
});

export default ListItemCollapsible;