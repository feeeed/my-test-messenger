export interface Contact {
  chatId: string;
  name: string;
  unreadCount: number;
}

// Если используется алиас Contacts:
export type Contacts = Contact[];