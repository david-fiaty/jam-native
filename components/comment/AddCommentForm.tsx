import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { setActiveComment } from '@/redux/slices/CommentSlice';
import Collapsible from 'react-native-collapsible';
import BoxView from '../view/BoxView';
import InputTextField from '../field/InputTextField';
import InputTextareaField from '../field/InputTextareaField';
import i18n from '@/translation/i18n';
import ButtonView from '../view/ButtonView';
import EntityManager from '@/manager/EntityManager';
import FormManager from '@/manager/FormManager';
import ScreenManager from '@/manager/ScreenManager';

type Props = {
  entityId?: any;
  commentData?: any;
  profileImage?: JSX.Element;
  globalStyles?: any;
};

const resource: string = 'comment';

const AddCommentForm = ({ entityId, commentData, profileImage, globalStyles }: Props) => {
  const dispatch = useDispatch();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const commentState: any = useSelector((state: any) => state.comment, shallowEqual);

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
    setIsProcessing(true);

    let result: any = await EntityManager.addComment(entityId, commentState?.comment_text);

    let message: any = {
      title: i18n.t('Add comment'),
      content: i18n.t('The comment was successfully added.'),
    };

    if (result.success === false) {
      message.content = i18n.t('Invalid data submission.');
      FormManager.addServerErrors(resource, result.response);
    }
 
    ScreenManager.showMessage(message);
    setIsProcessing(false);
  };

  const renderAddCommentForm = (row?: any) => {
    return (
      <View style={componentStyles.commentFormContainer}>
        {isCollapsed && (
          <TouchableOpacity onPress={() => setIsCollapsed(false)}>
            <InputTextField
              placeholder={i18n.t('Add a comment...')}
              disabled={true}
            />
          </TouchableOpacity>
        )}

        <Collapsible
          collapsed={isCollapsed}
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
              onPress={() => setIsCollapsed(true)}
              containerStyle={[componentStyles.buttonStyle, componentStyles.cancelButtonStyle]}
            />

            <ButtonView
              label={i18n.t('Submit')}
              onPress={() => submitComment()}
              containerStyle={[componentStyles.buttonStyle, componentStyles.submitButtonStyle]}
              isProcessing={isProcessing}
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
      key={commentData.id}
      direction="row"
      align="flex-start"
      justify="flex-start"
      style={componentStyles.commentContainer}
    >
      <BoxView
        direction="row"
        align="flex-start"
        justify="flex-start"
        style={componentStyles.commentContainerLeft}
      >
        {profileImage}
      </BoxView>

      <BoxView
        direction="column"
        align="flex-start"
        justify="flex-start"
        style={componentStyles.commentContainerRight}
      >
        {renderAddCommentForm(commentData)}
      </BoxView>
    </BoxView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});

export default AddCommentForm;