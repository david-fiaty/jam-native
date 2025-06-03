import { Layout } from "@/constants/Layout";
import i18n from "@/translation/i18n";
import MediaManager from "./MediaManager";
import ImageView from "@/components/view/ImageView";
import IconView from "@/components/view/IconView";

const profileImageSize: number = 34;

class CommentManager {

  getStyles() {
    return {
      container: {
        paddingBottom: Layout.space.base * 4,
        width: '100%',
        height: '100%'
      },
      commentContainer: {
        ...Layout.listItem,
        ...{
          paddingVertical: Layout.space.base * 1.5,
          width: '100%',
        },
      },
      commentContainerLeft: {
        backgroundColor: Layout.colors.white,
        width: '10%',
      },
      commentContainerRight: {
        width: '78%',
      },
      commentFormContainer: {
        marginBottom: Layout.space.base * 1.5,
      },
      commentFormButtonsContainer: {
        width: '100%',
        marginTop: Layout.space.base,
      },
      commentToolbarContainer: {

      },
      buttonStyle: {
        width: 'auto',
        height: Layout.space.base * 3,
        paddingHorizontal: Layout.space.base,
      },
      cancelButtonStyle: {

      },
      submitButtonStyle: {

      },
      profileName: {
        fontWeight: 'bold',
      },
      commentDate: {
        fontSize: 11.5,
      },
      profileImage: {
        width: profileImageSize,
        height: profileImageSize,
        borderRadius: profileImageSize,
      },
    };
  }

  renderProfileImage(row: any) {
    return (
      <>
        {row?.item?.profile?.profile_picture?.url?.length > 0 && (
          <ImageView
            uri={MediaManager.getImageUrl(row.item.profile.profile_picture.url)}
            resizeMode="cover"
            width={profileImageSize}
            height={profileImageSize}
            style={this.getStyles().profileImage}
          />
        )}

        {!row?.item?.profile?.profile_picture?.url?.length && (
          <IconView
            name="user"
            theme="secondary"
            size={14}
            padding={10}
          />
        )}
      </>
    );
  }
}

export default (new CommentManager());