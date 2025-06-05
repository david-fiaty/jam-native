import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { setActiveComment } from '@/redux/slices/CommentSlice';
import { Layout } from '@/constants/Layout';
import Collapsible from 'react-native-collapsible';
import BoxView from '../view/BoxView';
import InputTextField from '../field/InputTextField';
import InputTextareaField from '../field/InputTextareaField';
import i18n from '@/translation/i18n';
import ButtonView from '../view/ButtonView';

type Props = {
  commentData?: any;
  profileImage?: JSX.Element;
  globalStyles?: any;
};

const CommentForm = ({ commentData, profileImage, globalStyles }: Props) => {
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(true);
  const commentState: any = useSelector((state: any) => state.comment);

  const componentStyles: any = {
    ...styles,
    ...globalStyles,
  };

  const setCommentText = (value: string) => {
    dispatch(setActiveComment({
      ...commentState,
      ...{ comment_text: value },
    }));
  };

  const submitComment = async () => {

    console.log('submit comment', commentState);
  };

  const renderCommentForm = (row?: any) => {
    return (
      <View>
        {collapsed && (
          <TouchableOpacity onPress={() => setCollapsed(false)}>
            <InputTextField
              placeholder={i18n.t('Add a comment...')}
              disabled={true}
            />
          </TouchableOpacity>
        )}

        <Collapsible
          collapsed={collapsed}
          align="center"
        >
          <InputTextareaField
            placeholder={i18n.t('Add a comment...')}
            value={commentState?.comment_text || ''}
            onChangeText={(value: string) => setCommentText(value)}
          />

          <BoxView
            direction="row"
            align="center"
            justify="center"
            style={componentStyles.commentFormButtonsContainer}
          >
            <ButtonView
              label={i18n.t('Cancel')}
              onPress={() => setCollapsed(true)}
              containerStyle={[componentStyles.buttonStyle, componentStyles.cancelButtonStyle]}
            />

            <ButtonView
              label={i18n.t('Submit')}
              onPress={() => submitComment()}
              containerStyle={[componentStyles.buttonStyle, componentStyles.submitButtonStyle]}
              isProcessing={commentState.processing}
            />
          </BoxView>
        </Collapsible>
      </View>
    );
  }

  useEffect(() => {

  }, []);

  return (
    <BoxView
      direction="row"
      align="flex-start"
      justify="flex-start"
      style={componentStyles.commentFormContainer}
    >
      <BoxView
        direction="row"
        align="flex-start"
        justify="flex-start"
        style={componentStyles.commentContainerLeft}
      >
        {profileImage}
      </BoxView>

      {renderCommentForm(commentData)}
    </BoxView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});

export default CommentForm;