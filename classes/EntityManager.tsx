
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
    let entity = {};
    let definition = this.getFieldDefinition(key);

    for (const [sourceField, targetField] of Object.entries(definition.fields)) {
      if (data?.[targetField]) {
        entity[sourceField] = data?.[targetField];       
      }
      else if (false) {

      }
    }

    return entity;
  }

  getFieldDefinition(key: string) {
    return Entities.find(item => item.type == key);
  }

  isEntityData(key: string) {

  }
};

export default (new EntityManager());