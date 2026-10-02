import appClient from '../client';
import type { Contacts } from './types';
import { getApiCredentials } from '../../lib/api-helper';

export type PhoneExistsResponse = {
  exist: boolean;
  chatId?: string;
  fromCache?: boolean;
};



export const contactApi = {
  getContacts: async (): Promise<Contacts> => {
    const { idInstance, apiTokenInstance } = getApiCredentials();
    const response = await appClient.get<Contacts>(`waInstance${idInstance}/getChats/${apiTokenInstance}`);
    return response.data;
  },
  checkContact: async (phoneNumber: string): Promise<PhoneExistsResponse> => {
    const { idInstance, apiTokenInstance } = getApiCredentials();
    const response = await appClient.post<PhoneExistsResponse>(
      `waInstance${idInstance}/checkAccount/${apiTokenInstance}`,
      { phoneNumber }
    );
    return response.data;
  }
};
