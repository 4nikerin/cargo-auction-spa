const russianPluralRules = new Intl.PluralRules('ru-RU');

/** Возвращает стандартную категорию склонения для количества на русском языке. */
export const getRussianPluralForm = (count: number) => {
  return russianPluralRules.select(count);
};
