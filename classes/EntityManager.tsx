
import Entities from "@/constants/Entities";

class EntityManager {
  create(key: string, data: object) {
    try {
      let entity = this.createEntity(key, data);

      return entity;
    }
    catch (error) {
      console.log(error);
    }
  }

  createEntity(entityType: string, data: object) {
    let entity: object = {};
    let definition: any = this.findEntityDefinition(entityType);
    
    if (definition) {
      entity = this.mapEntityFields(definition.fields, data);
    }
  
    return entity;
  }

  findEntityDefinition(entityType: string) {
    return Entities.find(item => item.type === entityType) || null;
  }

  getCoreFieldName(fieldName: string, fields: object) {
    for (const [key, value] of Object.entries(fields)) {
      if (value == fieldName) return key;
    }

    return null;
  }



  mapEntityFields(fields: object, data: any) {
    let result: any = [];

    for (const [fieldName, fieldValue] of Object.entries(data)) {
      let coreFieldName: any = this.getCoreFieldName(fieldName, fields);
      let entityDefinition: any = this.findEntityDefinition(coreFieldName);

      console.log('----------------------------------------');
      console.log(coreFieldName, entityDefinition, fieldValue);
      console.log('----------------------------------------');
      
      
      if (coreFieldName && entityDefinition) {
        result[coreFieldName] = this.mapEntityFields(entityDefinition.fields, fieldValue);
      }
      else if (coreFieldName) {
        result[coreFieldName] = fieldValue;
      }
    }

    //console.warn('xx', result);

    return result;
  }
  
  /*
  mapEntityFields(fields: object, data: any) {
    let result: any = {};

    for (const [sourceField, targetField] of Object.entries(fields)) {
      if (typeof targetField === 'object' && data?.[sourceField]) {
        console.log('xxxxxx');
        console.log(targetField);
        result[sourceField] = this.mapEntityFields(targetField, data[sourceField]);
      } 
      else if (data?.[targetField] !== undefined) {
        result[sourceField] = data[targetField];
      }
    }

    return result;
  }
    */
};

export default (new EntityManager());