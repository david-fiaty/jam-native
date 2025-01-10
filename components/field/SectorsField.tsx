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

  const getSelectedSectors = async () => {
    if (selectedIds?.length) {
      return await EntityManager.getSectors({items_ids: selectedIds});
    }

    return [];
  };

  const getSelectedSubsectors = async () => {
    let sectors: any = await getSelectedSectors();
    let subsectors: any = [];

    for (const item of (sectors?.[0]?.sub_sectors || [])) {
      if (selectedIds?.includes(item.id)) {
        subsectors.push(item);
      }
    }

    return subsectors;
  };

  const deleteItem = (item: any) => {

    console.log('---> zzzz', item.id);

    /*

              let sectorsIds: any = [...formData?.sectors_ids || []];
          let index: number = sectorsIds.findIndex((v: any) => v == id);
          delete sectorsIds[index];
          updateField('sectors_ids', sectorsIds.filter((o: any) => o));

    */

  };

  useEffect(() => {
    (async () => {
      if (!isLoaded) { 
        setSelectedSectors(await getSelectedSubsectors());
        setIsLoaded(true);
      }
    })();
  }, [isLoaded]);

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

      { selectedSectors?.length > 0 && (
        <View style={styles.preview}>
          { selectedSectors.map((item: any) => {
            return (
              <TagView
                key={item.id}
                onDeleteButtonPress={() => deleteItem(item)}  
              >
                {item?.name}
              </TagView>
            );
          }) }
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  preview: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Layout.space.base,
    marginTop: Layout.space.base,
    marginBottom: Layout.space.base,
  },
});

export default SectorsField;
