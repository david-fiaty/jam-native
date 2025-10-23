import { setFormData, setFormErrors } from "@/redux/slices/FormSlice";
import FieldErrorView from "@/components/view/FieldErrorView";
import Store from "@/redux/Store";
import i18n from "@/translation/i18n";
import ScreenManager from "./ScreenManager";

class FormManager {
  resetForm(resource: any) {
    Store.dispatch(setFormData<any>({
      resource: resource,
      key: null,
      value: {},
    }));

    this.clearErrors(resource);
  }

  addValue(resource: string, key: any, value: any) {
    Store.dispatch(setFormData<any>({
      resource: resource,
      key: this.getTargetKey(key),
      value: value,
    }));
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

  addClientError(resource: string, errors: any[]) {
    let formErrors: any[] = [...Store.getState().form.errors]; 

    Store.dispatch(setFormErrors<any>([...formErrors, {
      ...{ resource: resource },
      ...errors[0],
    }]));
  }

  addServerErrors(resource: string, errors: any) {
    let formErrors: any[] = [...Store.getState().form.errors];

    for (const [key, val] of Object.entries(errors || {})) {
      let message: any = i18n.t('Invalid field value');
      
      if (Array.isArray(val) && val?.length > 0) {
        message = val[0];
      }
      else if (val) {
        message = val;
      }

      formErrors.push({
        key: key,
        message: message,
      });
    }

    Store.dispatch(setFormErrors<any>([...formErrors, {
      ...{ resource: resource },
      ...formErrors,
    }]));
  }

  clearErrors(resource: string, key?: any) {
    let formErrors: any[] = [...Store.getState().form.errors];

    if (key) {
      formErrors = formErrors.filter((o: any) => o.resource !== resource && o.key !== key);
    }
    else {
      formErrors = [];
    }

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

  updateField(resource: string, key: any, value: any, rules: any[] = []) {
    let errors: any[] = [];

    if (rules.length > 0) {
      errors = this.validateFied(resource, key, value, rules);
    }

    if (errors.length) {
      this.addClientError(resource, errors);
    }

    this.addValue(resource, key, value);
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
          return value && String(value).trim() !== ''; 
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
          return !isNaN(parseFloat(value)) && isFinite(value);
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
          const tempKey = `${formKey}[${index}]`;

          if (this.isObjectItem(element) && !this.isFileItem(element)) {
            this.objectToFormData(element, form, tempKey);
          }
          else if (this.isFileItem(element)) {
            form.append(tempKey, this.createFileObject(element));
          }
          else {
            form.append(tempKey, element);
          }
        });
      }
      else if (this.isNestedObjectItem(value) && !this.isFileItem(value)) {
        for (const [k, v] of Object.entries(value)) {
          if (Array.isArray(v)) {
            v.forEach((o: any, i: number) => {
              if (this.isFileItem(o)) {
                form.append(`${formKey}.${k}[${i}]`, this.createFileObject(o)); 
              }
              else {
                form.append(`${formKey}.${k}[${i}]`, o);  
              }
            });
          }
          else {
            form.append(`${formKey}.${k}`, v);
          }
        }
      }
      else if (this.isObjectItem(value) && !this.isFileItem(value)) {
        form.append(formKey, this.createJsonObject(value));
      }
      else if (this.isFileItem(value)) {
        form.append(formKey, this.createFileObject(value));
      }
      else {
        form.append(formKey, value);
      }
    }

    return form;
  }

  isFileItem(element: any) {
    return element && element?.uri && element?.type;
  }

  isObjectItem(element: any) {
    return typeof element === 'object';
  }

  isNestedObjectItem(element: any) {
    return Object.values(element).some(
      value => value !== null && (typeof value === 'object' || Array.isArray(value)) 
    );
  }

  createNestedObject(element: any) { 

    console.log('--->', element)

    return element; 
  }
 
  createFileObject(element: any) {
    if (ScreenManager.isWeb()) {
      return element.file;
    }
    else {
      return {
        uri: element.uri, // Todo - Handle IOS case?
        type: element.mimeType,
        name: element.fileName,
      };
    }
  }

  createJsonObject(element: any) {
    return JSON.stringify(element);
  }
};

export default (new FormManager());