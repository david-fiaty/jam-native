
import Entities from "@/constants/Entities";

class EntityManager {
  create(key: string, data: object) {
    try {
      let entity = {};
      let definition = Entities.find(item => item.type == key);


      for (const [sourceField, targetField] of Object.entries(definition.fields)) {
        //console.log(sourceField, targetField);
        //entity[sourceField] = data[targetField]; 

        console.log(data);
      }
      //console.log(entity);

      return entity;
    }
    catch (error) {
      console.log(error);
    }
  }
};

export default (new EntityManager());