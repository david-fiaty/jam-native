import Endpoints from '@/constants/Endpoints';
import ApiManager from './ApiManager';
import moment from "moment";
import { Config } from '@/constants/Config';

class DataManager {
  async get(key: keyof typeof Endpoints, options?: any, variables?: any) {
    let data: any = await ApiManager.get(key, options, variables);

    if (Endpoints[key]?.dataKey !== null) {
      return data?.[Endpoints[key].dataKey];
    }

    return data;
  }

  async post(key: keyof typeof Endpoints, data: any, variables?: any) {
    return await ApiManager.post(key, data, variables);
  }

  async delete(key: keyof typeof Endpoints, data: any, variables?: any) {
    return await ApiManager.delete(key, data, variables);
  }

  async put(key: keyof typeof Endpoints, data: any, variables?: any) {
    return await ApiManager.put(key, data, variables);
  }

  async find(key: keyof typeof Endpoints, idField: string, idValues: any) {
    idValues = Array.isArray(idValues) ? idValues : [idValues];
    let data: any = await ApiManager.get(key);
    let haystack: any = data?.[Endpoints[key]?.dataKey];
    let result: any = haystack.find((item: any) => idValues.includes(item[idField]));

    return result || {};
  }

  createUuid() { 
    var d = new Date().getTime();
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;
    
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;
        if (d > 0){
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }

        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }

  extract(properties: any[], obj: any) {
    return Object.fromEntries(
      Object.entries(obj).filter(([key]) => properties.includes(key))
    );
  }

  formatDate(value: string) {
    if (value) {
      return moment(value).format(Config.dateFormat);
    }

    return value;
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
    if (!value || value == 'undefined' || value === '' || value.trim() === '')  return false; 

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
    if (text?.length <= maxLength) return text;

    ellipsis = ellipsis || '...';
    let truncated = text.slice(0, maxLength);
    let lastSpaceIndex = truncated.lastIndexOf(' ');

    if (lastSpaceIndex > 0) {
      truncated = truncated.slice(0, lastSpaceIndex);
    }

    return truncated + ellipsis;
  }
};

export default (new DataManager());