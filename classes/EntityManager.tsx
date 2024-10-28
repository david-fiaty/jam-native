
import Fields from "@/constants/Fields";

class EntityManager {
  create(key: string, data: object) {
    try {
      let entity = {};
      for (const [sourceField, targetField] of Object.entries(Fields[key])) {
        entity[sourceField] = data[targetField]; 
      }

      return entity;
    }
    catch (error) {
      console.log(error);
    }
  }
};

export default (new EntityManager());