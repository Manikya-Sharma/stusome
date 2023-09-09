export function getChatId(id1: string, id2: string) {
  const chatId = [id1, id2].sort().join("--");
  return chatId;
}
