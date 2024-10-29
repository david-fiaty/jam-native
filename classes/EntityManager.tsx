
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

    if (entityDefinition) {
      for (const [sourceField, targetField] of Object.entries(entityDefinition.fields)) {
        if (definition = this.getEntityDefinition(sourceField)) {
          console.log(sourceField);
        }

        /*
        if (Entities.includes(sourceField)) {
          entity[sourceField] = this.buildEntity(Entities);      
        }


        if (data?.[targetField]) {
          entity[sourceField] = data?.[targetField];       
        }
          */

         
      }
    }

    return entity;
  }

  getEntityDefinition(key: string) {
    return Entities.find(item => item.type == key);
  }
};

export default (new EntityManager());