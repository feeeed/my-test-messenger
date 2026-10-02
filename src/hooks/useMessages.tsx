// src/hooks/useMessages.ts
import { useState, useEffect } from 'react';
import axios from 'axios';
import { mesaageApi } from '../api/messages/message';
import { type RawApiMessage, type UiMessage } from '../api/messages/types';
import { mapApiMessageToUi } from '../lib/message-mapper';

export function useMessages(chatId: string | null) {
  const [messages, setMessages] = useState<UiMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!chatId) {
      setMessages([]);
      return;
    }

    const controller = new AbortController();

    const fetchMessages = async () => {
      try {
        setLoading(true);
        const data: RawApiMessage[] = await mesaageApi.getMessagesByChatId(chatId,42);
        // 1. Преобразуем формат
        const formatted = (Array.isArray(data) ? data : []).map(mapApiMessageToUi);

        
        formatted.sort((a, b) => {
          return Number(a.id) - Number(b.id);
        });

        setMessages(formatted);
        setError(null);
      } catch (err: unknown) {
        if (!axios.isCancel(err)) {
          setError(err instanceof Error ? err : new Error('Ошибка загрузки сообщений'));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();

    return () => {
      controller.abort();
    };
  }, [chatId]);

  return { messages, setMessages, loading, error };
}