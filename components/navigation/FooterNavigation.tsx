import { useDispatch } from 'react-redux';
import { Layout } from '@/constants/Layout';
import { setActiveTab } from "@/redux/slices/TabSlice";
import IconView from "../view/IconView";
import BoxView from "../view/BoxView";

const FooterNavigation = () => {
  const dispatch = useDispatch();
  
  return (
    <BoxView direction="row" align="center" justify="space-around" style={Layout.footer}>
      <IconView
        name="location"
        theme="clear"
        onPress={() => dispatch(setActiveTab('MapView'))}
      />
      <IconView
        name="plus"
        theme="clear"
        onPress={() => dispatch(setActiveTab('AddJamForm'))}
      />
      <IconView
        name="user"
        theme="clear"
        onPress={() => dispatch(setActiveTab('ProfileForm'))}
      />
    </BoxView>
  );
};

export default FooterNavigation;
