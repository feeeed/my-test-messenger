import { useState, useEffect } from 'react';
import axios from 'axios';
import { contactApi } from '../api/contact/getContact';
import { type Contact } from '../api/contact/types';

export function useContacts() {
  const [data, setData] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await contactApi.getContacts();
        const normalizedContacts = (Array.isArray(result) ? result : []).map((contact) => ({
          ...contact,
          name: contact.name && contact.name.trim() !== '' ? contact.name : 'Новый контакт',
        }));
        setData(normalizedContacts);

        setError(null);
      } catch (err: unknown) {
        if (axios.isCancel(err)) {
          return;
        }
        setError(err instanceof Error ? err : new Error('Неизвестная ошибка'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, []);

  return { contacts: data, loading, error };
}