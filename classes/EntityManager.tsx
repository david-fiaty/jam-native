
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
    return Entities.find(item => item.type === entityType);
  }

  getCoreFieldName(fieldName: string, fields: object) {
    for (const [key, value] of Object.entries(fields)) {
      if (value == fieldName) return key;
    }

    return null;
  }

  mapEntityFields(fields: object, data: any) {
    let result: any = {};

    for (const [fieldName, fieldValue] of Object.entries(data)) {
      let coreFieldName = this.getCoreFieldName(fieldName, fields);
      //console.log(coreFieldName);


      /*
      if (definition = this.findEntityDefinition(fieldName)) {
        //console.log('---');
        //console.log(definition);
        //result[fieldName] = this.mapEntityFields(definition.fields, fieldValue);
      }
      else {
        //result[fieldName] = fieldValue;
      }
        */
    }

    //console.log(result);

    return {};

    return result;
  }
  
  /*
  mapEntity(fields: object, data: any) {
    let result: any = {};

    for (const [sourceField, targetField] of Object.entries(fields)) {
      if (typeof targetField === 'object' && data?.[sourceField]) {
        result[sourceField] = this.mapEntity(targetField, data[sourceField]);
      } 
      else if (data?.[targetField] !== undefined) {
        result[sourceField] = data[targetField];
      }
    }

    return result;
  }*/
};

export default (new EntityManager());