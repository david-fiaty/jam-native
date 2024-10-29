
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
    let entityDefinition = this.getEntityDefinition(key);

    for (const [sourceField, targetField] of Object.entries(entityDefinition.fields)) {
      const value = data[sourceField];

      if (value && typeof value === 'object') {
        const nestedType = Entities.find(entry => entry.fields && Object.values(entry.fields).includes(sourceField));

        entity[targetField] = nestedType ? this.buildEntity(value, nestedType.type) : value;

      } else {
        entity[targetField] = value;
      }
    }

    return entity;
  }

  getEntityDefinition(key: string) {
    return Entities.find(item => item.type == key);
  }
};

export default (new EntityManager());