
import Entities from "@/constants/Entities";

class EntityManager {
  create(key: string, data: object) {
    try {
      let entity = this.buildEntity(key, data);

      return entity;
    }
    catch (error) {
      console.log(error);
    }
  }

  buildEntity(key: string, data: object) {
    let entity: any = {};
    let definition: any = Entities.find(item => item.type === key);
  
    function mapFields(fields: object, data: any) {
      let result: any = {};
      for (const [sourceField, targetField] of Object.entries(fields)) {
        if (typeof targetField === 'object' && data?.[sourceField]) {
          // Recursive call if the targetField is an object (indicating nested fields)
          result[sourceField] = mapFields(targetField, data[sourceField]);
        } else if (data?.[targetField] !== undefined) {
          // Direct mapping for non-nested fields
          result[sourceField] = data[targetField];
        }
      }
      return result;
    }
  
    if (definition) {
      entity = mapFields(definition.fields, data);
    }
  
    return entity;
  }
  
};

export default (new EntityManager());