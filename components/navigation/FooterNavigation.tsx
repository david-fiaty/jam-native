import { StyleSheet } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { Layout } from '@/constants/Layout';
import { setActiveTab } from "@/redux/slices/TabSlice";
import { Colors } from "@/constants/Colors";
import IconView from "../view/IconView";
import BoxView from "../view/BoxView";
import ScreenManager from '@/classes/ScreenManager';

const FooterNavigation = () => {
  const dispatch = useDispatch();
  const tabState = useSelector((state) => state.tab);
  const activeTab = ScreenManager.getActiveScreen(tabState);

  console.log(activeTab?.name);

  return (
    <BoxView direction="row" align="center" justify="space-around" style={Layout.footer}>
      <IconView
        name="location"
        radius="round"
        theme={activeTab?.name == 'MapView' ? 'secondary' : 'clear'}
        onPress={() => dispatch(setActiveTab('MapView'))}
      />
      <IconView
        name="plus"
        radius="round"
        theme={activeTab?.name == 'AddJamForm' ? 'secondary' : 'clear'}
        onPress={() => dispatch(setActiveTab('AddJamForm'))}
        style={activeTab?.name == 'AddJamForm' ? styles.active : {}}
      />
      <IconView
        name="user"
        radius="round"
        theme={activeTab?.name == 'ProfileForm' ? 'secondary' : 'clear'}
        onPress={() => dispatch(setActiveTab('ProfileForm'))}
        style={activeTab?.name == 'ProfileForm' ? styles.active : {}}
      />
    </BoxView>
  );
};

const styles = StyleSheet.create({
  active: {
    backgroundColor: Colors.secondary,
  },
});

export default FooterNavigation;
