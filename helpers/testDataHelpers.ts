const getRandomString = (length) => {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};

const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

const getRandomNumber = (min, max) => {
  return Math.random() * (max - min) + min;
};

export const getValidProduct = () => {
  return {
    name: getRandomString(10),
    data: {
      year: getRandomInt(2021, 2024),
      price: getRandomNumber(10, 2000),
      "CPU model": getRandomString(5),
      "Hard disk size": getRandomString(4),
    },
  };
};
