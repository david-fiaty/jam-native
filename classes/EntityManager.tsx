
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
    let definition = Entities.find(item => item.type == key);

    for (const [sourceField, targetField] of Object.entries(definition.fields)) {
      if (data?.[targetField]) {
        entity[sourceField] = data?.[targetField];       
      }
    }

    return entity;
  }
};

export default (new EntityManager());