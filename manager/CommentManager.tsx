import React from "react";
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native";
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
import InputTextField from "@/components/field/InputTextField";
import InputTextareaField from "@/components/field/InputTextareaField";
import FormManager from "./FormManager";
import ButtonView from "@/components/view/ButtonView";
import ListView from "@/components/view/ListView";
import UserManager from "./UserManager";
import EntityManager from "./EntityManager";

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
              <TextView>{row?.item?.sub_ids?.length || 0} {i18n.t('replies')}</TextView>
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
    let activeComment: any = Store.getState().form.comment.active;
    let commentId: any = activeComment?.id || null;
    let isEditing: boolean = false;

    if (commentId !== null) {
      isEditing = activeComment.isEditing;      
    }

    return (
      <BoxView
        direction="row"
        align="flex-start"
        justify="flex-start"
        style={styles.commentFormContainer}
      >
        <BoxView
          direction="row"
          align="flex-start"
          justify="flex-start"
          style={styles.commentContainerLeft}
        >
          {this.renderProfileImage({
            item: {
              profile: {
                profile_picture: this.profileData?.profile_picture,
              },
            }
          })}
        </BoxView>

        <BoxView
          direction="column"
          align="center"
          justify="flex-start"
          style={styles.commentContainerRight}
        >
          {!row?.length && (
            <CollapsibleView
              openedLabel={<></>}
              isExpanded={isEditing}
              onLabelPress={() => this.toggleCommentForm()}
              label={(
                <TouchableWithoutFeedback>
                  <InputTextField
                    placeholder={i18n.t('Add a comment...')}
                    disabled={true}
                  />
                </TouchableWithoutFeedback>
              )}
              content={this.renderCommentFormFields(row)}
            />
          )}

          {row?.length && (
            // Todo - Render edit comment form fields
            <TextView>Edit comment form fields</TextView>
          )}
        </BoxView>
      </BoxView>
    );
  }

  toggleCommentForm(row?: any) {
    let activeComment: any = {...Store.getState().form.comment.active};
    let commentId: number = row?.item?.id || 0;

    if (Object.keys(activeComment).length > 0) {
      activeComment = {
        ...activeComment,
        ...{ isEditing: !activeComment.isEditing },
      };
    }
    else {
      activeComment = {
        id: commentId,
        comment_text: '',
        isEditing: true,
      };
    }

    Store.dispatch(setActiveComment(activeComment));
  }

  renderCommentFormFields(row?: any) {
    let commentState: any = Store.getState().form.comment;

    return (
      <>
        <InputTextareaField
          placeholder={i18n.t('Add a comment...')}
        //value={formData?.comment_text}
        //onChangeText={(value: string) => FormManager.updateField(resource, 'comment_text', value, ['string'])}
        />

        <BoxView
          direction="row"
          align="center"
          justify="center"
          style={styles.commentFormButtonsContainer}
        >
          <ButtonView
            label={i18n.t('Cancel')}
            onPress={() => this.toggleCommentForm()}
            containerStyle={[styles.buttonStyle, styles.cancelButtonStyle]}
          />

          <ButtonView
            label={i18n.t('Submit')}
            //onPress={submitComment}
            containerStyle={[styles.buttonStyle, styles.submitButtonStyle]}
            isProcessing={commentState.processing}
          />
        </BoxView>
      </>
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

export default (new CommentManager());