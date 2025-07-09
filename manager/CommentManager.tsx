import React from "react";
import { Layout } from "@/constants/Layout";
import { View } from "react-native";
import MediaManager from "./MediaManager";
import ImageView from "@/components/view/ImageView";
import IconView from "@/components/view/IconView";
import ListView from "@/components/view/ListView";
import UserManager from "./UserManager";
import EntityManager from "./EntityManager";
import AddCommentForm from "@/components/comment/AddCommentForm";
import CommentItem from "@/components/comment/CommentItem";
import TextView from "@/components/view/TextView";

const profileImageSize: number = 34;

class CommentManager {
  entityId: any;
  entityType: any;
  profileData: any;
  entityComments: any;

  async renderComments(entityType: string, entityId: any, entityComments: any) {
    this.entityId = entityId;
    this.entityType = entityType;
    this.entityComments = entityComments;
    this.profileData = await this.loadProfileData();

    return await this.renderCommentsList((entityComments || []).map((o: any) => o.id));
  }

  async renderCommentsList(itemsIds: any[]) {
    let data: any[] = [];

    if (itemsIds.length > 0) {
      data = await this.loadCommentsData(itemsIds);
    }

    return (
      <View style={styles.container}>
        <ListView
          renderItem={(item: any) => this.renderComment(item)}
          contentContainerStyle={styles.commentsList}
          data={[
            ...[this.renderAddCommentForm()],
            ...(data || []),
          ]}
        />
      </View>
    );
  }

  renderComment(row: any) {
    if (row.index === 0) {
      return this.renderAddCommentForm(row);
    }

    return this.renderCommentItem(row);
  }

  renderAddCommentForm(row?: any) {
    return (
      <AddCommentForm
        entityId={this.entityId}
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
        entityId={this.entityId}
        commentData={row?.item}
        globalStyles={styles}
        profileImage={this.renderProfileImage(row)}
        commentReplies={this.renderCommentReplies(row)} 
      />
    );
  }

  renderCommentReplies(row: any) {
    let commentItem: any = this.entityComments.find((o: any) => o.id === row.item.id);
    let repliesIds: any = commentItem.sub_ids;
    
    return this.renderCommentsList(repliesIds);
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
  },
  commentsList: {
    width: '100%',
  },
  commentContainer: {
    marginBottom: Layout.space.base * 3,
    padding: 0,
    flex: 1,
    width: '100%',
    gap: 0,
  },
  commentContainerLeft: {

  },
  commentContainerRight: {
    paddingLeft: Layout.space.base,
    flex: 1,
  },
  commentRepliesContainer: {
    gap: 0,
  },
  commentActionsContainer: {

  },
  commentFormContainer: {
    width: '100%',
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