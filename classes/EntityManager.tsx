
import Fields from "@/constants/Fields";

class EntityManager {
  create(key: string, data: object) {
    console.log(key);
    console.log('create called');
  }
};

export default (new EntityManager());