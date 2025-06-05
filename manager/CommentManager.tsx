import React from "react";
import { TouchableOpacity } from "react-native";
import { setActiveComment } from "@/redux/slices/CommentSlice";
import { Layout } from "@/constants/Layout";
import Store from "@/redux/Store";
import i18n from "@/translation/i18n";
import moment from 'moment';
import MediaManager from "./MediaManager";
import ImageView from "@/components/view/ImageView";
import IconView from "@/components/view/IconView";
import BoxView from "@/components/view/BoxView";
import TextView from "@/components/view/TextView";
import CollapsibleView from "@/components/view/CollapsibleView";
import ListView from "@/components/view/ListView";
import UserManager from "./UserManager";
import EntityManager from "./EntityManager";
import CommentForm from "@/components/comment/CommentForm";
import CommentItem from "@/components/comment/CommentItem";

const profileImageSize: number = 34;

class CommentManager {
  entityId: any;
  entityType: any;
  profileData: any;
  commentsData: any;

  async renderComments(entityType: string, entityId: any, itemsIds: any) {
    this.entityId = entityId;
    this.entityType = entityType
    this.profileData = await this.loadProfileData();
    this.commentsData = await this.loadCommentsData(itemsIds);

    return this.renderCommentsList(this.commentsData);
  }

  renderCommentsList(data: any) {
    return (
      <ListView
        data={[
          ...[this.renderCommentForm()],
          ...(data || []),
        ]}
        renderItem={(item: any) => this.renderComment(item)}
      />
    );
  }

  renderComment(row: any) {
    if (row.index === 0) {
      return this.renderCommentForm(row);
    }

    return this.renderCommentItem(row);
  }

  renderCommentForm(row?: any) {
    return (
      <CommentForm 
        commentData={row?.item}
        profileImage={this.renderProfileImage(row)}
        globalStyles={styles}
      />
    );
  }

  renderCommentItem(row?: any) {
    return (
      <CommentItem
        commentData={row?.item}
        profileImage={this.renderProfileImage(row)}
        globalStyles={styles}
      />
    );
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
            style={styles.profileImage}
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

  async loadProfileData() {
    return await UserManager.getProfileData();
  }

  async loadCommentsData(itemsIds: any[]) {
    return await EntityManager.getComments(itemsIds);
  }
}

const styles: any = {
  container: {
    paddingBottom: Layout.space.base * 4,
    width: '100%',
    height: '100%',
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

export default (new CommentManager());