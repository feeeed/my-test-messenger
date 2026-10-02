import type { AxiosRequestConfig } from 'axios';
import appClient from '../client';
import {type Message, type RawApiMessage, type ReceiveNotificationResponse} from './types'
import { getApiCredentials } from '../../lib/api-helper';
export interface GetChatHistoryPayload {
  chatId: string;
  count?: number;
}

export const mesaageApi = {
  sendMessage: async (message: Message): Promise<Message> => {
    const { idInstance, apiTokenInstance } = getApiCredentials();
    const response = await appClient.post<Message>(`waInstance${idInstance}/sendMessage/${apiTokenInstance}`, message, {
    });
    return response.data;
  },
  getMessages: async (): Promise<Message[]> => {
    const { idInstance, apiTokenInstance } = getApiCredentials();
    const response = await appClient.get<Message[]>(`waInstance${idInstance}/receiveNotification/${apiTokenInstance}`, {
    });
    return response.data;
  },
  getMessagesByChatId: async (
    chatId: string,
    count: number = 10,
    config?: AxiosRequestConfig
  ): Promise<RawApiMessage[]> => {
    const { idInstance, apiTokenInstance } = getApiCredentials();
    // Формируем требуемый payload
    const payload: GetChatHistoryPayload = {
      chatId,
      count,
    };
    const response = await appClient.post<RawApiMessage[]>(
      `waInstance${idInstance}/getChatHistory/${apiTokenInstance}`,
      payload,
      config
    );

    return response.data;
  },

  receiveNotification: async (config?: AxiosRequestConfig): Promise<ReceiveNotificationResponse | null> => {
    const { idInstance, apiTokenInstance } = getApiCredentials();
    const response = await appClient.get<ReceiveNotificationResponse | null>(
      `waInstance${idInstance}/receiveNotification/${apiTokenInstance}`,
      {
        ...config,
        params: { receiveTimeout: 5, ...config?.params },
      }
    );
    return response.data; 
  },

  // Обязательное удаление уведомления после обработки
  deleteNotification: async (receiptId: number, config?: AxiosRequestConfig): Promise<{ result: boolean }> => {
    const { idInstance, apiTokenInstance } = getApiCredentials();
    const response = await appClient.delete(
      `waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`,
      config
    );
    return response.data;
  },


}
