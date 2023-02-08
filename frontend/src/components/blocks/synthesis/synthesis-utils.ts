export const isInputValid = (text: string) => {
  return /^([-,.%+();:?!"']*[а-яА-ЯёЁәӘһҺҗҖөӨүҮңҢ0-9\s]+[-,.%+();:?!"']*)+$/i.test(
    text.trim()
  );
};
