import { useState, useEffect } from "react";
import { useContacts } from "../hooks/getContacts";
import { useMessages } from "../hooks/useMessages";
import { ChatList } from "./chat-list";
import { ChatWindow } from "./chat-window";
import { mesaageApi } from "../api/messages/message";
import { type UiMessage } from "../api/messages/types";
import { useNotificationPolling } from "../hooks/useNotificationPolling";

export function Messenger() {
  const { contacts, loading: contactsLoading } = useContacts();
  const [activeId, setActiveId] = useState<string | null>(null);

  // По умолчанию выбираем первый контакт после загрузки списка
  useEffect(() => {
    if (!activeId && contacts.length > 0) {
      setActiveId(contacts[0].chatId);
    }
  }, [contacts, activeId]);

  const {
    messages,
    setMessages,
    loading: messagesLoading,
  } = useMessages(activeId);

  // Находим активный контакт для передачи в шапку чата

  const activeContact =
    contacts.find((contact) => contact.chatId === activeId) ?? null;

  useNotificationPolling((body) => {
    if (body.typeWebhook === "incomingMessageReceived") {
      const chatId = body.senderData.chatId;

      const text =
        body.messageData.textMessageData?.textMessage ||
        body.messageData.extendedTextMessageData?.text ||
        "";

      const time = new Date(body.timestamp * 1000).toLocaleTimeString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
      });

      if (chatId === activeId) {
        setMessages((prev) => {
          if (prev.some((m) => m.id === body.idMessage)) return prev;

          return [
            ...prev,
            {
              id: body.idMessage,
              text,
              time,
              fromMe: false,
              status: "delivered",
            },
          ];
        });
      } else {
        //бновить unreadCount
      }
    }
  });
  const handleSelect = (chatId: string) => {
    setActiveId(chatId);
  };

  const handleSend = async (text: string) => {
    if (!activeId) return;

    const time = new Date().toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    });

    // сообщение для мгновенного отображения пользователю
    const optimisticMessage: UiMessage = {
      id: String(Date.now()),
      text,
      time,
      fromMe: true,
      status: "pending",
    };

    setMessages((prev) => [...prev, optimisticMessage]);

    try {
      await mesaageApi.sendMessage({ message: text, chatId: activeId });
    } catch {
      setMessages((prev) => prev.filter((m) => m.id !== optimisticMessage.id));
    }
  };

  return (
    <main className="grid h-dvh grid-cols-1 overflow-hidden bg-background md:grid-cols-3">
      {contactsLoading ? (
        <div className="flex items-center justify-center p-4 text-sm text-muted-foreground md:col-span-1">
          Загрузка контактов...
        </div>
      ) : (
        <ChatList
          chats={contacts}
          activeId={activeId}
          onSelect={handleSelect}
          className="md:col-span-1 md:flex"
        />
      )}
      <ChatWindow
        contact={activeContact}
        messages={messages}
        loading={messagesLoading}
        onSend={handleSend}
        onBack={() => setActiveId(null)}
        className="md:col-span-2 md:flex"
      />
    </main>
  );
}
