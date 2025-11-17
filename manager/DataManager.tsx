import { Config } from '@/constants/Config';
import Endpoints from '@/constants/Endpoints';
import ApiManager from './ApiManager';
import moment from "moment";
import ContentManager from './ContentManager';

class DataManager {
  async get(key: any, options?: any, variables?: any, search?: boolean) {
    let data: any = await ApiManager.get(key, options, variables);

    if (Endpoints[key]?.dataKey === null) {
      return data;
    }

    if (search === true) {
      return {
        total: data?.[Endpoints[key].totalKey],
        data: data?.[Endpoints[key].dataKey],
      };
    }
    else {
      return data?.[Endpoints[key].dataKey];
    }
  }

  async post(key: any, data: any, variables?: any) {
    return await ApiManager.post(key, data, variables);
  }

  async delete(key: any, data: any, variables?: any) {
    return await ApiManager.delete(key, data, variables);
  }

  async put(key: any, data: any, variables?: any) {
    return await ApiManager.put(key, data, variables);
  }

  createUuid() {
    var d = new Date().getTime();
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0;

    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16;
      if (d > 0) {
        r = (d + r) % 16 | 0;
        d = Math.floor(d / 16);
      } else {
        r = (d2 + r) % 16 | 0;
        d2 = Math.floor(d2 / 16);
      }

      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }

  extract(properties: any[], obj: any) {
    return Object.fromEntries(
      Object.entries(obj).filter(([key]) => properties.includes(key))
    );
  }

  toUiDate(value: string) {
    if (value) {
      return moment(value).format(Config.uiDateFormat);
    }

    return value;
  }

  toDbDate(value: any) {
    if (value) {
      return moment(value).format(Config.toDbDate);
    }

    return value;
  }

  toDbTime(value: any) {
    let hours: any = value.getHours();
    let minutes: any = value.getMinutes();
    let formattedTime: any = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;

    return formattedTime;
  }

  isUrl(value: string) {
    let url;

    try {
      url = new URL(value);
    } catch (error) {
      console.log(error);
      return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
  }

  isBase64(value: string) {
    if (!value || value == 'undefined' || value === '' || value.trim() === '') return false;

    try {
      return btoa(atob(value)) == value;
    } catch (err) {
      return false;
    }
  }

  intersect(array1: any[], array2: any[]) {
    const set2 = new Set(array2 || []);
    return (array1 || []).filter((o: any) => set2.has(o));
  }

  dateStatus(startDate: string, endDate: string) {
    let now = moment();
    let start = moment.utc(startDate).local();
    let end = moment.utc(endDate).local();

    if (now.isBefore(start)) {
      return 'coming';
    } else if (now.isAfter(end)) {
      return 'past';
    } else {
      return 'live';
    }
  }

  truncateText(text: string, maxLength: number, ellipsis?: any) {
    if (!text) return '';
    if (text?.length <= maxLength) return text;

    ellipsis = ellipsis || '...';
    let truncated = text.slice(0, maxLength);
    let lastSpaceIndex = truncated.lastIndexOf(' ');

    if (lastSpaceIndex > 0) {
      truncated = truncated.slice(0, lastSpaceIndex);
    }

    return truncated + ellipsis;
  }

  toPositiveInt(value: any) {
    const num = Number(value);

    if (Number.isNaN(num) || num < 0) {
      return 0;
    }

    return Math.floor(num);
  }

  setObjectProperty(obj: any, path: string, value: any) {
    const clone = JSON.parse(JSON.stringify(obj));
    const keys = path.split('.');
    let current = clone;

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];

      if (i === keys.length - 1) {
        current[key] = value;
      } else {
        if (typeof current[key] !== 'object' || current[key] === null) {
          current[key] = {};
        }
        current = current[key];
      }
    }

    return clone;
  }
  
  isPhoneNumberPrefix(value: string) {
    return ContentManager.getCountryPhoneCodes().some((o: any) => value == o.prefix);
  }

  extractPhoneNumber(value: any) {
    if (value) {
      let foundPrefix: any = ContentManager.getCountryPhoneCodes().find((o: any) => value.startsWith(o.prefix))?.prefix;
      let isDigits: boolean = !isNaN(parseFloat(value)) && isFinite(value);

      if (foundPrefix) {
        return value.replace(foundPrefix, '').replaceAll(' ', '');
      } 
      else if (isDigits) { 
        return value; 
      }
    }

    return '';
  }
};

export default (new DataManager());