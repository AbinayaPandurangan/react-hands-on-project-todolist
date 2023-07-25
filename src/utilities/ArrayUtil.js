const sortedItemsbyDescending = (array, sortproperty) => {
  let sortedArray = array.sort((a, b) => {
    let fa = a[sortproperty].toLowerCase(),
      fb = b[sortproperty].toLowerCase();

    if (fb < fa) {
      return -1;
    }
    if (fb > fa) {
      return 1;
    }
    return 0;
  });
  return sortedArray;
};

const sortedItemsbyAscending = (array, sortproperty) => {
  let sortedArray = array.sort((a, b) => {
    let fa = a[sortproperty].toLowerCase(),
      fb = b[sortproperty].toLowerCase();

    if (fa < fb) {
      return -1;
    }
    if (fa > fb) {
      return 1;
    }
    return 0;
  });
  return sortedArray;
};
const sortedBooleanItemsbyAscending = (array, sortproperty) => {
  let sortedArray = array.sort((a, b) => {
    let fa = a[sortproperty],
      fb = b[sortproperty];

    if (fa < fb) {
      return -1;
    }
    if (fa > fb) {
      return 1;
    }
    return 0;
  });
  return sortedArray;
};
const sortedBooleanItemsbyDescending = (array, sortproperty) => {
  let sortedArray = array.sort((a, b) => {
    let fa = a[sortproperty],
      fb = b[sortproperty];

    if (fb < fa) {
      return -1;
    }
    if (fb > fa) {
      return 1;
    }
    return 0;
  });
  return sortedArray;
};

const sortedDateTimeItemsbyDescending = (array, sortproperty) => {
  const sortedArray = array.sort((a, b) => b[sortproperty] - a[sortproperty]);
  return sortedArray;
};

export {
  sortedItemsbyDescending,
  sortedItemsbyAscending,
  sortedBooleanItemsbyAscending,
  sortedBooleanItemsbyDescending,
  sortedDateTimeItemsbyDescending,
};
