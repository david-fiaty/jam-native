

const UserLocationClass = class UserLocation {
  get(key: keyof typeof ApiEndpoints) {
    
    let data = await import(`../data/${key}'.json`);

    console.log(data);
    return {};

  }
};

const UserLocation = new UserLocationClass();
export default UserLocation;