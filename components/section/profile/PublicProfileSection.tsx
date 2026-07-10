import { StyleSheet } from "react-native";
import BoxView from "@/components/view/BoxView";
import ProfileView from "@/components/view/ProfileView";

type Props = {
  profileId?: any;
  itemData?: any;
};

const PublicProfileSection = ({ profileId, itemData }: Props) => {
  return (
    <BoxView
      direction="column"
      align="center"
      justify="center"
      style={styles.container}
      scroll={true}
    >
      <ProfileView
        profileId={profileId}
        isPublic={true}
      />
    </BoxView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
  },
});

export default PublicProfileSection;