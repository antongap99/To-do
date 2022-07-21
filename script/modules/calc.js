
  const getRandomIntInclusive = (min, max) =>  {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

const idGenerate = () => {
  const id = getRandomIntInclusive(1, 10000);
  return id;
}


export default {
    idGenerate,
}