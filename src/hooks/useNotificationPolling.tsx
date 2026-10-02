// src/hooks/useNotificationPolling.ts
import { useEffect, useRef } from 'react';
import { mesaageApi} from '../api/messages/message';
import { type WebhookBody } from '../api/messages/types';

export function useNotificationPolling(onMessageReceived: (body: WebhookBody) => void) {
  const callbackRef = useRef(onMessageReceived);

  useEffect(() => {
    callbackRef.current = onMessageReceived;
  }, [onMessageReceived]);

  useEffect(() => {
    let isPolling = true;

    const poll = async () => {
      while (isPolling) {
        try {
          const notification = await mesaageApi.receiveNotification();
          
          
          if (notification && notification.receiptId) {
            callbackRef.current(notification.body);
            await mesaageApi.deleteNotification(notification.receiptId);

            await new Promise((resolve) => setTimeout(resolve, 3000));
          }
          else{
            await new Promise((resolve) => setTimeout(resolve, 3000));
          }
        } catch (error) {
            console.error('Ошибка при получении уведомления:', error);
          if (isPolling) {
            await new Promise((resolve) => setTimeout(resolve, 200));
          }
        }
      }
    };

    poll();

    return () => {
      isPolling = false; 
    };
  }, []);
}