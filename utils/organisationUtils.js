function reorderObjectArrayId(array) {
  // reorders objects in an array by property 'id'
  for (let i = 0; i < array.length; i += 1) {
    if (array[i]['id'] != i) {
      array[i]['id'] = i;
    }
  }

  return array;
}