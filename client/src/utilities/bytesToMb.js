export default function bytesToMb(bytes) {
  return (bytes / 1024 ** 2).toFixed(1);
}
