import React from "react";
import { Layout } from "@/constants/Layout";
import { View } from "react-native";
import MediaManager from "./MediaManager";
import ImageView from "@/components/view/ImageView";
import IconView from "@/components/view/IconView";
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
      <View style={styles.container}>
        <ListView
          data={[
            ...[this.renderCommentForm()],
            ...(data || []),
          ]}
          renderItem={(item: any) => this.renderComment(item)}
          contentContainerStyle={styles.commentsList}
        />
      </View>
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
        globalStyles={styles}
        profileImage={this.renderProfileImage({
          item: {
            profile: {
              profile_picture: this.profileData?.profile_picture,
            },
          }
        })}
      />
    );
  }

  renderCommentItem(row?: any) {
    return (
      <CommentItem
        commentData={row?.item}
        globalStyles={styles}
        profileImage={this.renderProfileImage(row)}
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
    flex: 1,
    width: '100%',
    backgroundColor: 'yellow',
  },
  commentsList: {
    width: '100%',
  },
  commentContainer: {
    marginBottom: Layout.space.base * 3,
    padding: 0,
    flex: 1,
    width: '100%',
    backgroundColor: 'gray',
    borderWidth: 3,
    gap: 0,
  },
  commentContainerLeft: {
    
  },
  commentContainerRight: {
    flex: 1,
    backgroundColor: 'white',
  },
  commentActionsContainer: {
    backgroundColor: 'blue',
  },
  commentFormContainer: {
    width: '90%',
  },
  commentFormButtonsContainer: {
    width: '100%',
    paddingTop: Layout.space.base,
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