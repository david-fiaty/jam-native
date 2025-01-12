import { setFormData } from '@/redux/slices/FormSlice';
import Store from '@/redux/Store';

class FormManager {
  setData(resource: string, key: any, value: any) {
    Store.dispatch(setFormData<any>({
      resource: resource,
      name: key,
      params: value,
    }));
  }
};

export default (new FormManager());

