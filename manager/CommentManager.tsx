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
import CommentForm from "@/components/form/CommentForm";

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

    return (
      <BoxView
        key={row.item.id}
        direction="row"
        align="flex-start"
        justify="flex-start"
        style={styles.commentContainer}
      >
        <BoxView
          direction="row"
          align="center"
          justify="flex-start"
          style={styles.commentContainerLeft}
        >
          {this.renderProfileImage(row)}
        </BoxView>

        <BoxView
          direction="column"
          align="flex-start"
          justify="flex-start"
          style={styles.commentContainerRight}
        >
          <BoxView
            direction="row"
            align="center"
            justify="flex-start"
          >
            <TextView style={styles.profileName}>@{row?.item?.profile?.profile_name}</TextView>
            <TextView style={styles.commentDate}>{moment(row?.item?.created_at).fromNow()}</TextView>
          </BoxView>

          <TextView>{row?.item?.comment_text}</TextView>

          <BoxView
            direction="row"
            align="center"
            justify="flex-start"
            style={styles.commentToolbarContainer}
          >
            {true && (
              <CollapsibleView
                //
                //isExpanded={true}
                content={this.renderCommentReplies(row)}
                //onLabelPress={() => this.toggleCommentForm()}
                label={(
                  <>
                    <TextView>+ {row?.item?.sub_ids?.length || 0} {i18n.t('replies')}</TextView>
                  </>
                )}
                openedLabel={
                  <>
                    <TextView>- {row?.item?.sub_ids?.length || 0} {i18n.t('replies')}</TextView>
                  </>
                }
              />
            )}

            <TouchableOpacity onPress={() => console.log('on comment reply press')}>
              <TextView>{i18n.t('Reply')}</TextView>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => console.log('on comment edit press')}>
              <TextView>{i18n.t('Edit')}</TextView>
            </TouchableOpacity>
          </BoxView>

        </BoxView>
      </BoxView>
    );
  }

  renderCommentForm(row?: any) {
    return (
      <CommentForm 
        commentData={row?.item}
        profileImage={this.renderProfileImage(row)}
        styles={styles}
      />
    );
  }

  renderCommentReplies(row: any) {
    //console.log('----- render comment replies', row);

    return (
      <TextView>
        this is the comment replies list component for a commment
      </TextView>
    );
  }

  toggleCommentForm(row?: any) {
    let activeComment: any = { ...Store.getState().comment };
    let commentId: number = row?.item?.id || 0;

    //console.log('--- active comment', activeComment);

    if (Object.keys(activeComment).length > 0) {
      activeComment = {
        ...activeComment,
        ...{ showForm: !activeComment.showForm },
      };
    }
    else {
      activeComment = {
        id: commentId,
        comment_text: '',
        showForm: true,
      };
    }

    Store.dispatch(setActiveComment(activeComment));
  }

  toggleCommentReplies(row?: any) {
    console.log('------ toggle comment replies')
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