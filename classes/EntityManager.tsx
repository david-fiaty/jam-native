
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

  buildEntity(entityType: string, data: object) {
    let entity = {};

    for (const [targetFieldName, targetFieldValue] of Object.entries(data)) {
      let entityDefinition = this.getEntityDefinition(entityType);
      let coreFieldName = this.getCoreFieldName(targetFieldName, entityDefinition);
      
      if (subEntityDefinition = this.getEntityDefinition(coreFieldName)) {
        entity[coreFieldName] = this.buildEntity(subEntityDefinition.type, targetFieldValue);
      }
      else {
        entity[coreFieldName] = targetFieldValue;
      }
    }

    return entity;
  }

  getCoreFieldName(targetFieldName: string, entityDefinition: object) {
    for (const [name, value] of Object.entries(entityDefinition.fields)) {
      if (targetFieldName == value) return name;
    }
    
    return null;
  }


  getEntityDefinition(key: string) {
    return Entities.find(item => item.type == key);
  }


};

export default (new EntityManager());