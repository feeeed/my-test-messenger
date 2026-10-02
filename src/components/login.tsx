// src/components/login.tsx
import { useState } from 'react';

type LoginProps = {
  onSuccess: () => void;
};

export function Login({ onSuccess }: LoginProps) {
  const [idInstance, setIdInstance] = useState('');
  const [apiTokenInstance, setApiTokenInstance] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!idInstance.trim() || !apiTokenInstance.trim()) {
      setError('Поля авторизации не заполнены');
      return;
    }

    // localStorage
    localStorage.setItem('idInstance', idInstance.trim());
    localStorage.setItem('apiTokenInstance', apiTokenInstance.trim());
    
    onSuccess();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl border bg-background p-8 shadow-sm"
      >
        <h1 className="mb-6 text-2xl font-semibold">Вход в Green-API</h1>
        
        {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-muted-foreground">
            idInstance
          </label>
          <input
            type="text"
            value={idInstance}
            onChange={(e) => setIdInstance(e.target.value)}
            className="h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        <div className="mb-6">
          <label className="mb-1 block text-sm font-medium text-muted-foreground">
            apiTokenInstance
          </label>
          <input
            type="text"
            value={apiTokenInstance}
            onChange={(e) => setApiTokenInstance(e.target.value)}
            className="h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        <button
          type="submit"
          className="h-10 w-full rounded-lg bg-primary px-4 font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Войти
        </button>
      </form>
    </div>
  );
}