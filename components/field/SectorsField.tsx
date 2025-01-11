import { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { BaseProps } from "@/constants/Types";
import { Layout } from '@/constants/Layout';
import BoxView from "../view/BoxView";
import SpinnerView from '../view/SpinnerView';
import TagView from '../view/TagView';
import EntityManager from '@/manager/EntityManager';

type Props = BaseProps & {
  resource: string;
  label?: any;
  onPressEvent?: () => void;
  onDeleteEvent: (item: any) => void;
};

const SectorsField = ({ resource, label, onPressEvent, onDeleteEvent }: Props) => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [sectorsData, setSectorsData] = useState<any>([]);
  const [selectedSectors, setSelectedSectors] = useState<any>([]);
  const formData: any = useSelector((state: any) => state.form[resource]);

  const getSelectedSectors = () => {
    let selectedIds: any[] = formData?.sectors_ids || [];
    let result: any[] = [];

    for (const item of sectorsData) {
      if (selectedIds.includes(item.id)) {
        for (const subitem of item?.sub_sectors || []) {
          if (selectedIds.includes(subitem.id)) {
            result.push(subitem);
          }
        }
      }
    }

    return result;
  };


  const deleteItem = (item: any) => {
    //setSelectedSectors(await getSelectedSectors());
      console.log('---> delete item', item.id);
    //onDeleteEvent(item);
  }

  useEffect(() => {
    (async () => {
      if (!isLoaded) {
        setSectorsData(await EntityManager.getSectors());
        setIsLoaded(true);
      }
      
      setSelectedSectors(getSelectedSectors());
      
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
