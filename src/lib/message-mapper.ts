import { type RawApiMessage, type UiMessage } from '../api/messages/types';
// нормализация данных из API в формат, удобный для UI
export function mapApiMessageToUi(msg: RawApiMessage): UiMessage {
  const date = new Date(msg.timestamp * 1000);
  const time = date.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return {
    id: msg.idMessage,
    text: msg.textMessage || msg.extendedTextMessage?.text || '',
    time: isNaN(date.getTime()) ? '' : time,
    fromMe: msg.type === 'outgoing',
    status: msg.statusMessage,
  };
}