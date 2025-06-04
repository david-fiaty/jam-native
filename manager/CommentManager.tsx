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
  }

  async loadProfileData() {
    return await UserManager.getProfileData();
  }

  async loadCommentsData(itemsIds: any[]) {
    return await EntityManager.getComments(itemsIds);
  }
}

export default (new CommentManager());