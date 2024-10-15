import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import StaticIcon from '../base/StaticIcon';
import PrimaryIcon from '../icons/PrimaryIcon';

const items = [
  { name: 'Cars', id: 1},
  { name: 'Vans', id: 2},
  { name: 'SUVs', id: 3},
  { name: 'Motorbikes', id: 4 },
  { name: 'Trucks', id: 5},
];

const MultiselectDropdownField = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  console.log('Selected:', selectedItems);

  return (
    <View style={styles.container}>
      <View>
        <SectionedMultiSelect
          items={items}
          IconRenderer={<PrimaryIcon name="user" size={24}/>}
          uniqueKey="id"
          onSelectedItemsChange={setSelectedItems}
          selectedItems={selectedItems}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    justifyContent: 'center',
    padding: 24,
  },
});

export default MultiselectDropdownField;