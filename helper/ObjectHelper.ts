const ObjectHelper = {
  update(target: any, keyPath: string, newValue: any) {
    const keys = keyPath.split('.'); 
    let current = Object.assign({}, target); 
  
    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];
      if (!current[key] || typeof current[key] !== 'object') {
        current[key] = {};
      }
      current = current[key]; 
    }

    current[keys[keys.length - 1]] = newValue;
  
    return current;
  }  
};

export default ObjectHelper;