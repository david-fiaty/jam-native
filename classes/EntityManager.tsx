
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
    let entityDefinition = this.getEntityDefinition(entityType);

    for (const [targetFieldName, targetFieldValue] of Object.entries(data)) {
      let definition = this.getEntityDefinition(entityType);
      if (targetFieldName == definition?.type) {

      }
      /*
      if (definition = this.getEntityDefinition(entityType)) {

        //let coreFieldName = this.getCoreFieldName(targetFieldName, definition);
        
        //console.log(coreFieldName);

      }
        */
    }

    /*
    if (data?.[targetField]) {
      entity[sourceField] = data?.[targetField];
    }
    else if (definition = this.getEntityDefinition(sourceField)) {
      entity[sourceField] = this.buildEntity(definition.type, data?.[targetField]);   
    }
      */

    return entity;
  }

  

  /*
  getCoreFieldName(targetFieldName: string, entityDefinition: object) {
    for (const [name, value] of Object.entries(entityDefinition.fields)) {
      if (targetFieldName == value) return name;
    }
    
    return null;
  }
  */

  getEntityDefinition(key: string) {
    return Entities.find(item => item.type == key);
  }


};

export default (new EntityManager());