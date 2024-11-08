
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
      entity = this.importEntity(definition.fields, data);
    }
  
    return entity;
  }

  importEntity(fields: object, data: any) {
    let result: any = [];

    for (const [fieldName, fieldValue] of Object.entries(data)) {
      let coreFieldName: any = this.getCoreFieldName(fieldName, fields);
      let entityDefinition: any = this.findEntityDefinition(coreFieldName);

      if (entityDefinition) {
        result[coreFieldName] = this.importEntity(entityDefinition.fields, fieldValue);
      }
      else if (coreFieldName) {
        result[coreFieldName] = fieldValue;
      }
      else {
        result[fieldName] = fieldValue;
        console.warn(`Missing field definition ${fieldName}`);
      }
    }

    return result;
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
};

export default (new EntityManager());