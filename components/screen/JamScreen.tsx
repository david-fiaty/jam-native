import { StyleSheet } from "react-native";
import { useRouter } from 'expo-router';
import { Layout } from '@/constants/Layout';
import { BaseProps } from '@/constants/Types';
import BoxView from "../view/BoxView";
import BackButton from "../button/BackButton";
import i18n from '@/translation/i18n';
import JamsList from '../list/JamsList';

type Props = BaseProps & {
  idArray?: any,
};

const JamScreen = ({ idArray }: Props) => {
  const router = useRouter();

  return (
    <BoxView align="flex-start" justify="flex-start" scroll={false} style={[Layout.screenContent, styles.container]}>
      <BackButton
        title={i18n.t('Saved Jams')}
        onPress={() => router.back()}
      />
      <BoxView style={Layout.mainContent}>
        <JamsList idArray={idArray} showSpinner={true} />
      </BoxView>
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
    flex: 1,
  },
});

export default JamScreen;