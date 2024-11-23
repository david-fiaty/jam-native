import { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from 'expo-router';
import { Layout } from "@/constants/Layout";
import BackButton from "../button/BackButton";
import i18n from "@/translation/i18n";
import IconView from '../view/IconView';
import BoxView from '../view/BoxView';
import TextView from '../view/TextView';
import SpinnerView from "../view/SpinnerView";
import ShareJamButton from "../button/ShareJamButton";
import AddToProjectButton from "../button/AddToProjectButton";
import ViewProjectButton from "../button/ViewProjectButton";
import EditJamButton from "../button/EditJamButton";
import ReportJamButton from "../button/ReportJamButton";
import DeleteJamButton from "../button/DeleteJamButton";
import ListView from "./ListView";
import ScreenManager from "@/manager/ScreenManager";
import UserManager from '@/manager/UserManager';
import EntityManager from '@/manager/EntityManager';

/*
const data = [
  <SaveJamButton style={Layout.listItem} />,
  <ShareJamButton style={Layout.listItem} />,
  <AddToProjectButton style={Layout.listItem} />,
  <ViewProjectButton style={Layout.listItem} />,
  <EditJamButton style={Layout.listItem} />,
  <ReportJamButton style={Layout.listItem} />,
  <DeleteJamButton style={Layout.listItem} />,
];
*/

const MoreJamView = () => {
  const router = useRouter();
  const isLoggedIn = UserManager.isLoggedIn();
  const [entity, setEntity] = useState<any>(null);
  const entityId = ScreenManager.getActiveScreen()?.entityId;

  if (!entity) {
    EntityManager.findJam(entityId).then((item: any) => {
      setEntity(item);
    });
  }

  if (!entity) return <SpinnerView />;

  console.log(entityId);

  return (
    <BoxView align="flex-start" justify="flex-start" style={Layout.screenContent}>
      <BackButton
        title={i18n.t('More actions')}
        onPress={() => ScreenManager.toggleModal({ name: 'MoreJamView' })}
      />
      
      <View style={styles.listContainer}>
        {/* Save jam */}
        <TouchableOpacity 
          style={styles.listItem}
          onPress={() => isLoggedIn ? ScreenManager.toggleModal({
            name: 'SaveJamView',
            entityId: entityId, 
          }) : router.push('/login')} 
        >
          <BoxView direction="row" align="center" justify="flex-start">
            <IconView name="save" theme="tertiary" />
            <TextView>{i18n.t('Save Jam')}</TextView>
          </BoxView>
        </TouchableOpacity>

        {/* Add to project */}
        <TouchableOpacity 
          onPress={() => isLoggedIn ? ScreenManager.toggleModal({
            name: 'SaveJamView',
            entityId: entityId, 
          }) : router.push('/login')} 
        >
          <BoxView direction="row" align="center" justify="flex-start">
            <IconView name="save" theme="tertiary" />
            <TextView>{i18n.t('Add to project')}</TextView>
          </BoxView>
        </TouchableOpacity>
      </View>
    </BoxView>
  );
};

const styles = StyleSheet.create({
  listContainer: Layout.borderedListContainer,
  listItem: {
    marginBottom: Layout.space.base,
  }, 
});

export default MoreJamView;
