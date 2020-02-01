export const getPosition = () => {
    return new Promise((resolve,reject) => {
        navigator.geolocation.getCurrentPosition(position => {
            resolve(position);
        }, reject,);
    });
  };