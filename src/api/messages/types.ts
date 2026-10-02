// src/api/messages/types.ts
export type MessageType = 'incoming' | 'outgoing';

export interface RawApiMessage {
  idMessage: string;
  type: MessageType;
  timestamp: number;
  typeMessage: string;
  chatId: string;
  chatType: string;
  textMessage: string;
  extendedTextMessage?: {
    text: string;
    description: string;
    title: string;
    previewType: string;
    jpegThumbnail: string;
    forwardingScore: number;
    isForwarded: boolean;
  };
  statusMessage: 'pending' | 'sent' | 'delivered' | 'read';
  sendByApi: boolean;
  deletedMessageId: string;
  editedMessageId: string;
  isEdited: boolean;
  isDeleted: boolean;
}

export interface UiMessage {
  id: string;
  text: string;
  time: string;
  fromMe: boolean;
  status?: string;
}

export interface Message {
  chatId: string;
  message: string;
}

export interface WebhookBody {
  typeWebhook: string;
  instanceData: { idInstance: number; wid: string; typeInstance: string };
  timestamp: number;
  idMessage: string;
  senderData: {
    chatId: string;
    chatName: string;
    sender: string;
    senderName: string;
  };
  messageData: {
    typeMessage: string;
    textMessageData?: { textMessage: string };
    extendedTextMessageData?: { text: string };
  };
}

export interface ReceiveNotificationResponse {
  receiptId: number;
  body: WebhookBody;
}