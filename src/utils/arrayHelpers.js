export function extractField(array, fieldName, index, accumulator) {
  if (index >= array.length) return accumulator;
  accumulator.push(array[index][fieldName]);
  return extractField(array, fieldName, index + 1, accumulator);
}

export function findById(collection, targetId, index) {
  if (index >= collection.length) return null;
  if (collection[index]._id.toString() === targetId.toString()) return collection[index];
  return findById(collection, targetId, index + 1);
}
