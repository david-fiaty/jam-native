import { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { BaseProps } from "@/constants/Types";
import { Layout } from '@/constants/Layout';
import i18n from "@/translation/i18n";
import BoxView from "../view/BoxView";
import TextView from "../view/TextView";
import IconView from "../view/IconView";
import SpinnerView from '../view/SpinnerView';
import TagView from '../view/TagView';
import EntityManager from '@/manager/EntityManager';

type Props = BaseProps & {
  selectedIds?: any;
  onPressEvent?: () => void;
};

const CollaboratorsField = ({ selectedIds, onPressEvent }: Props) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [selectedProfiles, setSelectedProfiles] = useState<any>([]);

  useEffect(() => {
    (async () => {
      if (!isLoaded) { 
        if (selectedIds?.length) setSelectedProfiles(await EntityManager.getProfiles({items_ids: selectedIds}));
        setIsLoaded(true);
      }
    })();
  }, [isLoaded, selectedIds]);

  if (!isLoaded) return <SpinnerView size="small" />;

  console.log(selectedProfiles);

  return (
    <View style={styles.container}>
      <BoxView
        direction="row"
        align="center"
        onPress={onPressEvent}
      >
        <IconView name="plus" theme="secondary" radius="round" />
        <TextView>{i18n.t('Add collaborators')}</TextView>
      </BoxView>

      <View style={styles.preview}>
        { selectedProfiles?.length > 0 && (
          selectedProfiles.map((item: any) => {
            return (
              <TagView
                key={item.id}
                onDeleteButtonPress={() => console.log('delete tag', item.id)}  
              >
                {item?.profile_name}
              </TagView>
            );
          })
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  preview: {
    paddingTop: Layout.space.base,
  },
});

export default CollaboratorsField;
