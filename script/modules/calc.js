import storage from './storageService.js';
const {setStorage, removeStorage, getStorage,} = storage;
import control from './control.js';





  const getRandomIntInclusive = (min, max) =>  {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
  };

const idGenerate = () => {
  const id = getRandomIntInclusive(1, 30);
  return id;
}


export default {
    getRandomIntInclusive,
    idGenerate,
}