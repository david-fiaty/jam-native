import { setFormData } from "@/redux/slices/FormSlice";
import Store from "@/redux/Store";
import i18n from "@/translation/i18n";

class FormManager {
  updateField(resource: string, key: string, value: any) {
    Store.dispatch(setFormData<any>({
      resource: resource,
      key: key,
      value: value,
      profile_id: 3,
    }));
  };

  validateFied(key: string, value: any, rules: any[]) {
    let fieldRules: any = this.getValidationRules();
    let errors: any = [];

    for (const rule of rules) {
      if (!fieldRules[rule].run(value)) {
        errors.push({
          field: key,
          value: value,
          message: fieldRules[rule].error(),
        });
      }
    }

    return errors;
  }

  getValidationRules() {
    return {
      required: {
        run: (value: any) => {
          return value && typeof value == 'string' && value.trim().length > 0;
        },
        error: () => {
          return i18n.t('Invalid empty value');
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
          return value && pattern.test(value);
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
          return value && pattern.test(value);
        },
        error: () => {
          return i18n.t('Invalid domain value');
        },
      },
    };
  }
};

export default (new FormManager());