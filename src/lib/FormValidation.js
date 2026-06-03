
export const validatePhoto = (photo) => {
  if (!photo) {
    return { valid: false, error: 'Please upload a family photo' };
  }

  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (!validTypes.includes(photo.type)) {
    return { valid: false, error: 'Photo must be a JPEG, PNG, or WebP image' };
  }

  const maxSize = 5 * 1024 * 1024; // 5MB
  if (photo.size > maxSize) {
    return { valid: false, error: 'Photo size must be less than 5MB' };
  }

  return { valid: true, error: null };
};

export const validateFamilyName = (familyName) => {
  if (!familyName || familyName.trim().length === 0) {
    return { valid: false, error: 'Please enter your family name' };
  }

  if (familyName.trim().length < 2) {
    return { valid: false, error: 'Family name must be at least 2 characters' };
  }

  return { valid: true, error: null };
};

export const validateChildren = (children) => {
  if (!children || children.length === 0) {
    return { valid: false, error: 'Please add at least one child' };
  }

  const emptyNames = children.filter(child => !child.trim());
  if (emptyNames.length > 0) {
    return { valid: false, error: 'All children must have names' };
  }

  const shortNames = children.filter(child => child.trim().length < 2);
  if (shortNames.length > 0) {
    return { valid: false, error: 'All child names must be at least 2 characters' };
  }

  return { valid: true, error: null };
};

export const validateCountries = (countries) => {
  if (!countries || countries.length === 0) {
    return { valid: false, error: 'Please add at least one country' };
  }

  for (let i = 0; i < countries.length; i++) {
    const country = countries[i];

    if (!country.name || country.name.trim().length === 0) {
      return { valid: false, error: `Country ${i + 1} must have a name` };
    }

    if (!country.attractions || country.attractions.length === 0) {
      return { valid: false, error: `${country.name} must have at least one attraction` };
    }

    const emptyAttractions = country.attractions.filter(attr => !attr.trim());
    if (emptyAttractions.length > 0) {
      return { valid: false, error: `All attractions in ${country.name} must have names` };
    }
  }

  return { valid: true, error: null };
};

export const validateAllFields = (formData) => {
  const photoValidation = validatePhoto(formData.photo);
  if (!photoValidation.valid) return photoValidation;

  const familyNameValidation = validateFamilyName(formData.familyName);
  if (!familyNameValidation.valid) return familyNameValidation;

  const childrenValidation = validateChildren(formData.children);
  if (!childrenValidation.valid) return childrenValidation;

  const countriesValidation = validateCountries(formData.countries);
  if (!countriesValidation.valid) return countriesValidation;

  return { valid: true, error: null };
};
