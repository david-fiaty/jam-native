
import Fields from "@/constants/Fields";

class EntityManager {
  create(type: string, data: object) {
    console.log(type);
    console.log('create called');
  }
};

export default (new EntityManager());