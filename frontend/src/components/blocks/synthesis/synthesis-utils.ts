export const isInputValid = (text: string) => {
  if (!text) {
    return false;
  }
  if (typeof text !== 'string') {
    throw new Error('The argument type must be "string"');
  }
  return /^([-,.%+();:?!"']*[а-яА-ЯёЁәӘһҺҗҖөӨүҮңҢ0-9\s]+[-,.%+();:?!"']*)+$/i.test(
    text.trim()
  );
};
