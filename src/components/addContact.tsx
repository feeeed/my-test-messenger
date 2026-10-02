import { useState } from 'react';
import { contactApi } from '../api/contact/getContact';
import { mesaageApi } from '../api/messages/message';
import {type PhoneExistsResponse} from '../api/contact/getContact';

type ContactAddFormProps = {
    onAddContact: (phoneNumber: PhoneExistsResponse) => void
    isOpen: boolean
    onClose: () => void
  };


export function ContactAddForm({ isOpen, onClose, onAddContact }: ContactAddFormProps) {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [draft, setDraft] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    if(!isOpen) return null;

    const handleClose = () => {
        setError(null);
        setPhoneNumber('');
        setDraft('');
        onClose();
    };

    const handleCreateChat = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);


    try {
      setIsLoading(true);
      const res = await contactApi.checkContact(phoneNumber);
        console.log('checkContact response:', res.exist, res);
      if (!res.exist) {
        setError("Аккаунт Max с таким номером не найден");
        return;
      }

      const newContact: PhoneExistsResponse = {
        chatId: res.chatId,
        exist: res.exist,
      };

      onAddContact(newContact);
      await mesaageApi.sendMessage({ chatId: newContact.chatId ?? "", message: draft });
      handleClose();
    } catch {
      setError("Ошибка при проверке аккаунта. Попробуйте снова.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-sm rounded-xl border bg-white p-5 shadow-lg">
        <h2 className="mb-3 text-base font-semibold text-black">Новый чат по номеру</h2>

        <form onSubmit={handleCreateChat} className="flex flex-col gap-3">
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="79999999999"
            className="h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            autoFocus
          />
          <input
            type="tel"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Привет!"
            className="h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            autoFocus
          />

          {error && <p className="text-xs text-red-500">{error}</p>}

          <div className="mt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-lg px-3 py-1.5 text-sm transition-colors hover:bg-muted"
            >
              Отмена
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
            >
              {isLoading ? "Проверка..." : "Создать чат"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );


}