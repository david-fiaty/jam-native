import { useDispatch } from 'react-redux';
import { Layout } from '@/constants/Layout';
import { setTabActive } from "@/redux/slices/TabSlice";
import IconView from "../view/IconView";
import BoxView from "../view/BoxView";

const FooterNavigation = () => {
  const dispatch = useDispatch();
  
  return (
    <BoxView direction="row" align="center" justify="space-around" style={Layout.footer}>
      <IconView
        name="location"
        theme="clear"
        size={22}
        onPress={() => dispatch(setTabActive('MapView'))}
      />
      <IconView
        name="plus"
        theme="clear"
        size={22}
        onPress={() => dispatch(setTabActive('AddJamForm'))}
      />
      <IconView
        name="user"
        theme="clear"
        size={22}
        onPress={() => dispatch(setTabActive('ProfileForm'))}
      />
    </BoxView>
  );
};

export default FooterNavigation;
