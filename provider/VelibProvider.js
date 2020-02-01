import React, { createContext, useEffect, useState } from 'react';
import { getPosition } from '../util/util';

export const VelibContext = createContext(1);

const VelibProvider = ({ children }) => {

/*const API_URL =
  "https://raw.githubusercontent.com/tlenclos/fake-opendata-velib-server/master/db.json";*/
  
  const DISTANCE = 100000;
  const [velibs, setVelibs] = useState([]);
  const [position, setPosition] = useState([]);

  /*useEffect( () => {
    getVelibs();
}, []);

  const getVelibs = () => { 
        fetch(API_URL)
        .then(response => response.json())
        .then(data => setVelibs(data));
    }*/

    useEffect(() => {
      const update = async () => {
          const position = await getPosition();
          const url = `https://opendata.paris.fr/api/records/1.0/search/?dataset=velib-disponibilite-en-temps-reel&geofilter.distance=${position.coords.latitude},${position.coords.longitude},${DISTANCE}&rows=50`;
          fetch(url)
              .then(response => response.json())
              .then(data => setVelibs(data));
          setPosition(position)
      }
      update();
  },[]);

  return (
    <VelibContext.Provider value={{ velibs, position }}>
      {children}
    </VelibContext.Provider>
  );
};

export default VelibProvider
