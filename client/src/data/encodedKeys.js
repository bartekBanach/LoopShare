import keys from './keys';

const selectKeys = keys.map((key, index) => ({ id: index, label: key, value: encodeURIComponent(key) }));

export default selectKeys;
