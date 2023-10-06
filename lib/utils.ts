export function getChatId(id1: string, id2: string) {
  const chatId = [id1, id2].sort().join("--");
  return chatId;
}

export function toPusherKey(key: string) {
  key.replace("-", "_");
  return key;
}

export function randomColor(opacity?: number) {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  const color = `rgba(${red},${green},${blue},${opacity})`;
  return color;
}
