export const isClassOf = (pretenderKlass: any, expectedKlass: any): boolean => {
  if (!pretenderKlass.name) {
    return false;
  }

  if (pretenderKlass.name === expectedKlass.name) {
    return true;
  } else {
    return isClassOf(pretenderKlass.__proto__, expectedKlass);
  }
};
