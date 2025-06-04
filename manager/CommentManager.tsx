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

const profileImageSize: number = 34;


let commentsData: any[] = await EntityManager.getComments(entityData.comments.map((o: any) => o.id));


  const getProfileData = async () => {
    return await UserManager.getProfileData();
  };

class CommentManager {







  

  renderComments = (entityComments: any, profileData: any) => {
    return (
      <ListView
        data={[
          ...[this.renderCommentForm(profileData)],
          ...(entityComments || []),
        ]}
        renderItem={(row: any) => this.renderComment(row, profileData)}
      />
    );
  }

  renderComment (row: any, profileData: any) {
    if (row.index === 0) {
      return this.renderCommentForm(profileData);
    }

    return (
      <BoxView
        key={row.item.id}
        direction="row"
        align="flex-start"
        justify="flex-start"
        style={this.getStyles().commentContainer}
      >
        <BoxView
          direction="row"
          align="center"
          justify="flex-start"
          style={this.getStyles().commentContainerLeft}
        >
          {this.renderProfileImage(row)}
        </BoxView>

        <BoxView
          direction="column"
          align="flex-start"
          justify="flex-start"
          style={this.getStyles().commentContainerRight}
        >
          <BoxView
            direction="row"
            align="center"
            justify="flex-start"
          >
            <TextView style={this.getStyles().profileName}>@{row?.item?.profile?.profile_name}</TextView>
            <TextView style={this.getStyles().commentDate}>{moment(row?.item?.created_at).fromNow()}</TextView>
          </BoxView>

          <TextView>{row?.item?.comment_text}</TextView>

          <BoxView
            direction="row"
            align="center"
            justify="flex-start"
            style={this.getStyles().commentToolbarContainer}
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

  renderCommentForm(profileData: any, row?: any)  {
    let commentState: any = Store.getState().form.comment;

    return (
      <BoxView
        direction="row"
        align="flex-start"
        justify="flex-start"
        style={this.getStyles().commentFormContainer}
      >
        <BoxView
          direction="row"
          align="flex-start"
          justify="flex-start"
          style={this.getStyles().commentContainerLeft}
        >
          {this.renderProfileImage({
            item: {
              profile: {
                profile_picture: profileData?.profile_picture,
              },
            }
          })}
        </BoxView>

        <BoxView
          direction="column"
          align="center"
          justify="flex-start"
          style={this.getStyles().commentContainerRight}
        >
          {!row?.length && (
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

  renderCommentFormFields (row?: any) {
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
          style={this.getStyles().commentFormButtonsContainer}
        >

          <ButtonView
            label={i18n.t('Cancel')}
            onPress={() => this.collapseCommentForm()}
            containerStyle={[this.getStyles().buttonStyle, this.getStyles().cancelButtonStyle]}
          />

          <ButtonView
            label={i18n.t('Submit')}
            //onPress={submitComment}
            containerStyle={[this.getStyles().buttonStyle, this.getStyles().submitButtonStyle]}
            isProcessing={commentState.processing}
          />
        </BoxView>
      </>
    );
  }

  submitComment = async () => {
    setIsSubmitProcessing(true);

    // Todo - Implement submit comment
    console.log('on comment submit');

    let payload: any = {
      profile_id: profileData.id,
      item_id: entityId,
      comment_text: formData?.comment_text,
    };

    console.log('comment payload', payload)

    //let result: any = await UserManager.register(payload);

    setIsSubmitProcessing(false);
  }

  expandCommentForm() {
    Store.dispatch(setFormData<any>({
      expanded: true,
    }));
  }

  collapseCommentForm() {
    Store.dispatch(setFormData<any>({
      expanded: false,
    }));
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
}

export default (new CommentManager());