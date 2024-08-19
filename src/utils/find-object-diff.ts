export default function findDifference(oldValue: any, newValue: any) {
  let diff = {};

  function compare(
    oldValue: { [x: string]: any },
    newValue: { [x: string]: any },
  ) {
    const result: { [key: string]: any } = {};
    const keys = new Set([...Object.keys(oldValue), ...Object.keys(newValue)]);

    keys.forEach((key) => {
      if (
        typeof oldValue[key] === 'object' &&
        typeof newValue[key] === 'object' &&
        oldValue[key] !== null &&
        newValue[key] !== null
      ) {
        const nestedDiff = compare(oldValue[key], newValue[key]);
        if (Object.keys(nestedDiff).length > 0) {
          result[key] = nestedDiff;
        }
      } else if (oldValue[key] !== newValue[key]) {
        result[key] = newValue[key];
      }
    });

    return result;
  }

  diff = compare(oldValue, newValue);
  return diff;
}
