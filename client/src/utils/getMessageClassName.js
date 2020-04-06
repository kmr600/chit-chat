import classNames from "classnames";

export const getMessageClassName = (allMessages, messageIndexKey) => {
  const prevUserName = allMessages[messageIndexKey - 1]
    ? allMessages[messageIndexKey - 1].username
    : "";
  const currentUserName = allMessages[messageIndexKey]
    ? allMessages[messageIndexKey].username
    : "";
  const nextUserName = allMessages[messageIndexKey + 1]
    ? allMessages[messageIndexKey + 1].username
    : "";

  const firstMsg = isFirstMessage(prevUserName, currentUserName);
  const lastMsg = isLastMessage(currentUserName, nextUserName);
  const betweenMsg = !firstMsg && !lastMsg;
  return classNames({ firstMsg, lastMsg, betweenMsg });
};

const isFirstMessage = (prevUserName, currentUserName) => {
  return prevUserName !== currentUserName;
};

const isLastMessage = (currentUserName, nextUserName) => {
  return currentUserName !== nextUserName;
};
