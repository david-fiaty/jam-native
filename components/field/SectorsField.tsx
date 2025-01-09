import { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { BaseProps } from "@/constants/Types";
import { Layout } from '@/constants/Layout';
import BoxView from "../view/BoxView";
import SpinnerView from '../view/SpinnerView';
import TagView from '../view/TagView';
import EntityManager from '@/manager/EntityManager';

type Props = BaseProps & {
  label?: any;
  selectedIds?: any;
  onPressEvent?: () => void;
};

const SectorsField = ({ label, selectedIds, onPressEvent }: Props) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [selectedSectors, setSelectedSectors] = useState<any>([]);

  useEffect(() => {
    (async () => {
      if (!isLoaded) { 
        if (selectedIds?.length) setSelectedSectors(await EntityManager.getSectors({items_ids: selectedIds}));
        setIsLoaded(true);
      }
    })();
  }, [isLoaded, selectedIds]);

  if (!isLoaded) return <SpinnerView size="small" />;

  return (
    <View style={styles.container}>
      <BoxView
        direction="row"
        align="center"
        onPress={onPressEvent}
        style={styles.container}
      >
        {label}      
      </BoxView>

      <View style={styles.preview}>
        { selectedSectors?.length > 0 && (
          selectedSectors.map((item: any) => {
            return (
              <TagView
                key={item.id}
                onDeleteButtonPress={() => console.log('delete sector tag', item.id)}  
              >
                {item?.name}
              </TagView>
            );
          })
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  preview: {
    paddingTop: Layout.space.base,
  },
});


export default SectorsField;
