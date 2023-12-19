import keys from './keys';

const selectKeys = keys.map((key, index) => ({ id: index, label: key, value: encodeURIComponent(key) }));

// key.replace('/', '%2F')

export default selectKeys;
