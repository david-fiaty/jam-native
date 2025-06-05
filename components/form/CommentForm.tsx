import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { setActiveComment } from '@/redux/slices/CommentSlice';
import { Layout } from '@/constants/Layout';
import Store from '@/redux/Store';
import Collapsible from 'react-native-collapsible';
import BoxView from '../view/BoxView';
import InputTextField from '../field/InputTextField';
import InputTextareaField from '../field/InputTextareaField';
import i18n from '@/translation/i18n';
import ButtonView from '../view/ButtonView';

type Props = {
  profileImage?: JSX.Element;

  label?: any;
  openedLabel?: any;
  content?: any;
  headerStyle?: any;
  isExpanded?: boolean;
  onLabelPress?: () => void;
};

const profileImageSize: number = 34;

const CommentForm = ({ profileImage,  label, openedLabel, content, headerStyle, isExpanded, onLabelPress }: Props) => {
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(true);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const commentState: any = useSelector((state: any) => state.comment);

  let buttonLabel = label;

  if (!collapsed && openedLabel) {
    buttonLabel = openedLabel;
  }

  const onPress = () => {
    setCollapsed((prev) => !prev);
    if (onLabelPress) onLabelPress();
  };

  const setCommentText = (value: string) => {
    let activeComment: any = { ...commentState };

    dispatch(setActiveComment({
      ...activeComment,
      ...{ comment_text: value },
    }));
  };

  const submitComment = async () => {
    let activeComment: any = { ...commentState };

    console.log('submit comment', activeComment);
  };

  const renderCommentForm = (row?: any) => {
    let activeComment: any = { ...commentState };

    return (
      <>
        <InputTextareaField
          placeholder={i18n.t('Add a comment...')}
          value={activeComment?.comment_text || ''}
          onChangeText={(value: string) => setCommentText(value)}
        />

        <BoxView
          direction="row"
          align="center"
          justify="center"
          style={styles.commentFormButtonsContainer}
        >
          <ButtonView
            label={i18n.t('Cancel')}
            onPress={() => setCollapsed(false)}
            containerStyle={[styles.buttonStyle, styles.cancelButtonStyle]}
          />

          <ButtonView
            label={i18n.t('Submit')}
            onPress={() => submitComment()}
            containerStyle={[styles.buttonStyle, styles.submitButtonStyle]}
            isProcessing={activeComment.processing}
          />
        </BoxView>
      </>
    );
  }

  useEffect(() => {
    if (typeof isExpanded !== 'undefined') setCollapsed(!isExpanded);
  }, [isExpanded]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <View style={headerStyle}>{buttonLabel}</View>
      </TouchableOpacity>
      <Collapsible
        collapsed={collapsed}
        align="center"
      >
        <View style={styles.content}>
          {content}
        </View>
      </Collapsible>
    </View>
  );

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
        {profileImage}
      </BoxView>

      <BoxView
        direction="column"
        align="center"
        justify="flex-start"
        style={styles.commentContainerRight}
      >
        <CommentForm
          openedLabel={<></>}
          isExpanded={activeComment?.showForm}
          content={this.renderCommentFormFields()}
          onLabelPress={() => this.toggleCommentForm()}
          label={(
            <TouchableWithoutFeedback>
              <InputTextField
                placeholder={i18n.t('Add a comment...')}
                disabled={true}
              />
            </TouchableWithoutFeedback>
          )}
        />
      </BoxView>
    </BoxView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  content: {
    marginTop: Layout.space.base,
    width: '100%',
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
});

export default CommentForm;