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
  styles?: any;
};

const CommentForm = ({ commentData, profileImage, styles }: Props) => {
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(true);
  const commentState: any = useSelector((state: any) => state.comment);

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
          <View
          //style={styles.content}
          >
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
                onPress={() => setCollapsed(true)}
                containerStyle={[styles.buttonStyle, styles.cancelButtonStyle]}
              />

              <ButtonView
                label={i18n.t('Submit')}
                onPress={() => submitComment()}
                containerStyle={[styles.buttonStyle, styles.submitButtonStyle]}
                isProcessing={activeComment.processing}
              />
            </BoxView>
          </View>
        </Collapsible>
      </>
    );
  }

  useEffect(() => {
    
  }, []);

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
        {renderCommentForm(commentData)}
      </BoxView>
    </BoxView>
  );
}

/*
const styles = StyleSheet.create({
  container: {
    width: '100%',
  },

});
*/

export default CommentForm;