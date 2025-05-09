import { setFormData, setFormErrors } from "@/redux/slices/FormSlice";
import FieldErrorView from "@/components/view/FieldErrorView";
import Store from "@/redux/Store";
import i18n from "@/translation/i18n";

class FormManager {
  updateField(resource: string, key: any, value: any, rules: any[] = []) {
    let errors: any[] = [];

    if (rules.length > 0) {
      errors = this.validateFied(key, value, rules);
    }

    if (errors.length) {
      this.addError(resource, key, value, errors);
    }
    else {
      this.clearError(resource, key);
    }

    this.addValue(resource, key, value);
  };

  addValue(resource: string, key: any, value: any) {
    Store.dispatch(setFormData<any>({
      resource: resource,
      key: this.getFieldKey(key),
      value: value,
    }));
  }

  addError(resource: string, key: any, value: any, errors: any[]) {
    this.clearError(resource, key);
    let formErrors: any[] = [...Store.getState().form.errors];
    
    Store.dispatch(setFormErrors<any>([...formErrors, {
      ...{ resource: resource },
      ...errors[0],
    }]));
  }

  clearError(resource: string, key: any) {
    let formErrors: any[] = [...Store.getState().form.errors];
    formErrors = formErrors.filter((o: any) => o.resource !== resource && o.key !== key);
    
    Store.dispatch(setFormErrors<any>(formErrors));
  }
  
  renderError(key: string) {
    let formErrors: any[] = Store.getState().form.errors;
    let fieldError: any = formErrors.find((o: any) => o.key === key);

    if (fieldError) {
      return <FieldErrorView message={fieldError.message} />;
    }

    return <></>;
  }

  validateFied(key: string, value: any, rules: any[]) {
    let fieldValue: any = value;
    let fieldRules: any = this.getValidationRules();
    let errors: any = [];

    if (this.isPathKey(key)) {
      fieldValue = fieldValue[this.getFieldKey(key)];
    }

    for (const rule of rules) {
      if (!fieldRules[rule].run(fieldValue)) {
        errors.push({
          key: key,
          value: fieldValue,
          message: fieldRules[rule].error(),
        });
      }
    }

    return errors;
  }

  getFieldKey(key: string) {
    let keyParts: any[] = key.split('.');
    let targetKey = keyParts[keyParts.length - 1];

    return targetKey;
  }

  isPathKey(key: string) {
    return key.split('.').length > 0;
  }

  getValidationRules() {
    return {
      string: {
        run: (value: any) => {
          return value && typeof value == 'string' && value.trim().length > 0;
        },
        error: () => {
          return i18n.t('A value is required');
        },
      },
      array: {
        run: (value: any) => {
          return value && Array.isArray(value) && value.length > 0;
        },
        error: () => {
          return i18n.t('A selection is required');
        },
      },
      number: {
        run: (value: any) => {
          let pattern: any = /^\d+$/;
          return value && pattern.test(value);
        },
        error: () => {
          return i18n.t('Invalid number value');
        },
      },
      email: {
        run: (value: any) => {
          let pattern: any = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          return value && typeof value == 'string' && pattern.test(value);
        },
        error: () => {
          return i18n.t('Invalid email value');
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
          return i18n.t('Invalid date value');
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
          return i18n.t('Invalid URL value');
        },
      },
      domain: {
        run: (value: any) => {
          let pattern: any = /^((?!-)[A-Za-z0-9-]{1, 63}(?<!-)\\.)+[A-Za-z]{2, 6}$/;
          return value && typeof value == 'string' && pattern.test(value);
        },
        error: () => {
          return i18n.t('Invalid domain value');
        },
      },
    };
  }
};

export default (new FormManager());