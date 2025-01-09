import { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { BaseProps } from "@/constants/Types";
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';
import i18n from "@/translation/i18n";
import BoxView from "../view/BoxView";
import TextView from "../view/TextView";
import IconView from "../view/IconView";
import SpinnerView from '../view/SpinnerView';
import TagView from '../view/TagView';

type Props = BaseProps & {
  selectedIds?: any;
  onPressEvent?: () => void;
};

const CollaboratorsField = ({ selectedIds, onPressEvent }: Props) => {
const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      if (!isLoaded) { 
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
      >
        <IconView name="plus" theme="secondary" radius="round" />
        <TextView>{i18n.t('Add collaborators')}</TextView>
      </BoxView>

      <View style={styles.preview}>
        <TagView
          onDeleteButtonPress={() => console.log('delete tag')}  
        >
          Some tag
        </TagView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {

  },
  preview: {
    paddingTop: Layout.space.base,
  },
});

export default CollaboratorsField;
