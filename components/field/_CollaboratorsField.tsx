import { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
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
  resource: string;
  field: string;
  onPressEvent?: () => void;
  onDeleteEvent: (item: any) => void;
};

const CollaboratorsField = ({ resource, field, onPressEvent, onDeleteEvent }: Props) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [selectedProfiles, setSelectedProfiles] = useState<any>([]);
  const formData: any = useSelector((state: any) => state.form[resource]);
  const fieldName: string = field;

  useEffect(() => {
    (async () => {
        if (formData?.[fieldName]?.length) setSelectedProfiles(await EntityManager.getProfiles({ items_ids: formData[fieldName] }));
        setIsLoaded(true);
    })();
  }, [isLoaded, formData]);

  if (!isLoaded) return <SpinnerView size="small" />;

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

        { selectedProfiles?.length > 0 && (
          <View style={styles.preview}> 
            { selectedProfiles.map((item: any) => {
              return (
                <TagView
                  key={item.id}
                  onDeleteButtonPress={() => onDeleteEvent(item)}  
                >
                  {item?.profile_name}
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

export default CollaboratorsField;
