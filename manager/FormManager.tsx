import { Platform } from "react-native";
import { setFormData, setFormErrors, resetFormData } from "@/redux/slices/FormSlice";
import FieldErrorView from "@/components/view/FieldErrorView";
import Store from "@/redux/Store";
import i18n from "@/translation/i18n";

class FormManager {
  resetForm(resource: any) {
    Store.dispatch(resetFormData(resource));
  }

  updateField(resource: string, key: any, value: any, rules: any[] = []) {
    let errors: any[] = [];

    if (rules.length > 0) {
      errors = this.validateFied(resource, key, value, rules);
    }

    if (errors.length) {
      this.addClientError(resource, errors);
    }

    this.addValue(resource, key, value);
  };

  addValue(resource: string, key: any, value: any) {
    Store.dispatch(setFormData<any>({
      resource: resource,
      key: this.getTargetKey(key),
      value: value,
    }));
  }

  addClientError(resource: string, errors: any[]) {
    let formErrors: any[] = [...Store.getState().form.errors];

    Store.dispatch(setFormErrors<any>([...formErrors, {
      ...{ resource: resource },
      ...errors[0],
    }]));
  }

  validatePasswordMatch(resource: string, confirmationkey: string, confirmationValue: string, passwordValue: string) {
    let formErrors: any[] = [...Store.getState().form.errors];

    if (confirmationValue != passwordValue) {
      formErrors = [...formErrors, {
        ...{ resource: resource },
        ...{
          key: confirmationkey,
          message: i18n.t('The password confirmation is invalid'),
        },
      }];
    }
    else {
      formErrors = formErrors.filter((o: any) => o.key != confirmationkey);
    }

    Store.dispatch(setFormErrors<any>(formErrors));
  }

  addServerErrors(resource: string, errors: any) {
    let formErrors: any[] = [...Store.getState().form.errors];

    for (const [key, message] of Object.entries(errors)) {
      formErrors.push({
        key: key,
        message: message[0],
      });
    }

    Store.dispatch(setFormErrors<any>([...formErrors, {
      ...{ resource: resource },
      ...formErrors,
    }]));
  }

  clearErrors(resource: string, key: any) {
    let formErrors: any[] = [...Store.getState().form.errors];
    formErrors = formErrors.filter((o: any) => o.resource !== resource && o.key !== key);

    Store.dispatch(setFormErrors<any>(formErrors));
  }

  renderError(key: string, message?: any) {
    let targetKey: string = this.getTargetKey(key);
    let formErrors: any[] = Store.getState().form.errors;
    let fieldError: any = formErrors.findLast((o: any) => o.key === targetKey);

    if (fieldError) {
      return <FieldErrorView message={message || fieldError.message} />;
    }

    return <></>;
  }

  validateFied(resource: string, key: string, value: any, rules: any[]) {
    let fieldValue: any = value;
    let fieldRules: any = this.getValidationRules();
    let targetKey: string = key;
    let errors: any = [];

    if (this.isPathKey(key)) {
      targetKey = this.getTargetKey(key);
      fieldValue = fieldValue[targetKey];
    }

    for (const rule of rules) {
      if (!fieldRules[rule].run(fieldValue)) {
        errors.push({
          key: targetKey,
          message: fieldRules[rule].error(),
        });
      }
      else {
        this.clearErrors(resource, targetKey);
      }
    }

    return errors;
  }

  getTargetKey(key: string) {
    let keyParts: any[] = key.split('.');
    let targetKey = keyParts[keyParts.length - 1];

    return targetKey;
  }

  isPathKey(key: string) {
    return key.split('.').length > 1;
  }

  getValidationRules() {
    return {
      string: {
        run: (value: any) => {
          return value && typeof value == 'string' && value.trim().length > 0;
        },
        error: () => {
          return i18n.t('A value is required.');
        },
      },
      array: {
        run: (value: any) => {
          return value && Array.isArray(value) && value.length > 0;
        },
        error: () => {
          return i18n.t('A selection is required.');
        },
      },
      number: {
        run: (value: any) => {
          let pattern: any = /^\d+$/;
          return value && pattern.test(value);
        },
        error: () => {
          return i18n.t('Invalid number value.');
        },
      },
      email: {
        run: (value: any) => {
          let pattern: any = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          return value && typeof value == 'string' && pattern.test(value);
        },
        error: () => {
          return i18n.t('Invalid email value.');
        },
      },
      date: {
        run: (value: any) => {
          try {
            new Date(value);
            return true;
          } catch (error) {
            return false;
          }
        },
        error: () => {
          return i18n.t('Invalid date value.');
        },
      },
      url: {
        run: (value: any) => {
          try {
            new URL(value);
            return true;
          } catch (error) {
            return false;
          }
        },
        error: () => {
          return i18n.t('Invalid URL value.');
        },
      },
      domain: {
        run: (value: any) => {
          let pattern: any = /^((?!-)[A-Za-z0-9-]{1, 63}(?<!-)\\.)+[A-Za-z]{2, 6}$/;
          return value && typeof value == 'string' && pattern.test(value);
        },
        error: () => {
          return i18n.t('Invalid domain value.');
        },
      },
    };
  } 

  objectToFormData(obj: any, form: any = new FormData(), namespace: string = '') {
    for (let key in obj) {
      if (!obj.hasOwnProperty(key)) continue;

      const formKey = namespace ? `${namespace}[${key}]` : key;
      const value = obj[key];

      if (value === null || value === undefined) {
        continue;
      }
      else if (Array.isArray(value)) {
        value.forEach((element, index) => {
          if (element && element.uri && element.type) {
            const name = element.fileName || `file_${index}.${element.type.split('/')[1] || 'jpg'}`;
            const uri = Platform.OS === 'ios' ? element.uri.replace('file://', '') : element.uri;
            
            form.append(formKey + '[]', {
              uri: uri,
              name: name,
              type: element.type,
            });
          }
          else if (typeof element === 'object') {
            this.objectToFormData(element, form, `${formKey}[${index}]`);
          }
          else {
            form.append(formKey + '[]', element);
          }
        });
      }
      else if (value && value.uri && value.type) {
        const name = value.fileName || `file.${value.type.split('/')[1] || 'jpg'}`;
        const uri = Platform.OS === 'ios' ? value.uri.replace('file://', '') : value.uri;

        form.append(formKey, {
          uri: uri,
          name: name,
          type: value.type,
        });
      }
      else if (typeof value === 'object') {
        this.objectToFormData(value, form, formKey);
      }
      else {
        form.append(formKey, value);
      }
    }

    return form;
  }
};

export default (new FormManager());