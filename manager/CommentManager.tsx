import React from "react";
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { setFormData } from "@/redux/slices/FormSlice";
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

  async renderComments(itemsIds: any[], entityId: any, entityType: string) {
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

  renderComment(item: any) {
    return <></>;
  }

  renderCommentForm(item?: any) {
    let commentState: any = Store.getState().form.comment;

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
          {!item?.length && (
            <CollapsibleView
              openedLabel={<></>}
              isExpanded={commentState.expanded}
              onLabelPress={() => this.expandCommentForm()}
              label={(
                <TouchableWithoutFeedback onPress={() => this.expandCommentForm()}>
                  <InputTextField
                    placeholder={i18n.t('Add a comment...')}
                    disabled={true}
                  />
                </TouchableWithoutFeedback>
              )}
              content={this.renderCommentFormFields(item)}
            />
          )}

          {item?.length && (
            // Todo - Render edit comment form fields
            <TextView>Edit comment form fields</TextView>
          )}
        </BoxView>
      </BoxView>
    );
  }

  renderCommentFormFields (item?: any) {
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
            onPress={() => this.collapseCommentForm()}
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