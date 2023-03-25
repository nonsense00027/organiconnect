export const collectIdsAndDocs = (doc) => ({ ...doc.data(), id: doc.id });

export const hasBlank = (data) => {
  const lengths = data.map((item) => item.length);
  return lengths.includes(0);
};

export function formatConversationId(userId, conversationId) {
  const formattedId = conversationId.replace(userId, "");

  const refId =
    userId > formattedId ? userId + formattedId : formattedId + userId;

  return refId;
}
