
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

  createEntity(key: string, data: object) {
    let entity: any = {};
    let definition: any = Entities.find(item => item.type === key);
    
    if (definition) {
      entity = this.mapFields(definition.fields, data);
    }
  
    return entity;
  }

  mapFields(fields: object, data: any) {
    let result: any = {};

    for (const [sourceField, targetField] of Object.entries(fields)) {
      if (typeof targetField === 'object' && data?.[sourceField]) {
        result[sourceField] = this.mapFields(targetField, data[sourceField]);
      } 
      else if (data?.[targetField] !== undefined) {
        result[sourceField] = data[targetField];
      }
    }
    return result;
  }
};

export default (new EntityManager());