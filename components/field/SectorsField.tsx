import { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { setFormData } from "@/redux/slices/FormSlice";
import { BaseProps } from "@/constants/Types";
import { Layout } from '@/constants/Layout';
import BoxView from "../view/BoxView";
import SpinnerView from '../view/SpinnerView';
import TagView from '../view/TagView';
import EntityManager from '@/manager/EntityManager';
import ScreenManager from '@/manager/ScreenManager';

type Props = BaseProps & {
  resource: string;
  label?: any;
  onPressEvent?: () => void;
};

const SectorsField = ({ resource, label, onPressEvent }: Props) => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [selectedSectors, setSelectedSectors] = useState<any>([]);
  const activeScreen: any = ScreenManager.getActiveScreen();
  const formData: any = useSelector((state: any) => state.form[resource]);

  const getSelectedSectors = async () => {
    if (formData?.sectors_ids?.length) {
      return await EntityManager.getSectors({items_ids: formData.sectors_ids});
    }

    return [];
  };

  const getSelectedSubsectors = async () => {
    let sectors: any = await getSelectedSectors();
    let subsectors: any = [];

    for (const item of (sectors?.[0]?.sub_sectors || [])) {
      if (formData.sectors_ids?.includes(item.id)) {
        subsectors.push(item);
      }
    }

    return subsectors;
  };

  const deleteItem = async (item: any) => {
    let sectorsIds: any = [...formData?.sectors_ids || []];
    let index: number = sectorsIds.findIndex((v: any) => v == item.id);
    delete sectorsIds[index];
    sectorsIds = sectorsIds.filter((o: any) => o);

    dispatch(setFormData<any>({ 
      resource: resource,
      key: 'sectors_ids', 
      value: sectorsIds, 
    }));

    setSelectedSectors(await getSelectedSubsectors());
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
