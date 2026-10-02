'use client'
import { useState } from "react";
import { cn } from "../lib/utils";

import {type Contacts} from "../api/contact/types";
import {type PhoneExistsResponse} from '../api/contact/getContact';
import { ContactAddForm } from "./addContact";



type ChatListProps = {
  chats: Contacts;
  activeId: string | null;
  onSelect: (id: string) => void;
  onChatCreated?: (newContact: PhoneExistsResponse) => void;
  className?: string;
};

export function ChatList({
  chats,
  activeId,
  onSelect,
  onChatCreated,
  className,
}: ChatListProps) {

  const [query, setQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filtered = chats.filter((chat) =>
    chat.name.toLowerCase().includes(query.trim().toLowerCase()),
  );
  const handleChatSuccess = (newContact: PhoneExistsResponse) => {
    onChatCreated?.(newContact);
    onSelect(newContact.chatId ?? "");
  };
  return (
    <aside
      className={cn("flex min-h-0 flex-col border-r bg-muted/30", className)}
      aria-label="Список чатов"
    >
      <header className="flex h-16 shrink-0 items-center justify-between border-b px-4">
        <h1 className="text-lg font-semibold">Чаты</h1>
      </header>
      <button
          type="button"
          onClick={() => setIsDialogOpen(true)}
          className="flex flex-column gap-2.5 items-center justify-center rounded-lg m-2 p-6 bg-green-300 text-xl font-bold text-primary-foreground transition-colors hover:bg-white/30"
          title="Новый чат"
        >
          <div>Добавить чат</div>
          <div>+</div>
        </button>
        <ContactAddForm
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onAddContact={handleChatSuccess}
      />

      <div className="p-3">
        <label className="relative block">
          <span className="sr-only">Поиск по чатам</span>
          <div className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Поиск"
            className="h-10 w-full rounded-lg border bg-background pr-3 pl-9 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </label>
      </div>

      <ul className="min-h-0 flex-1 overflow-y-auto px-2 pb-2">
        {filtered.map((chat) => {
          const isActive = chat.chatId === activeId;
          return (
            <li key={chat.chatId}>
              <button
                type="button"
                onClick={() => onSelect(chat.chatId)}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg p-2.5 text-left transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted",
                )}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="truncate font-medium">{chat.name}</span>
                    <span
                      className={cn(
                        "shrink-0 text-xs",
                        isActive
                          ? "text-primary-foreground/70"
                          : "text-muted-foreground",
                      )}
                    >
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <p
                      className={cn(
                        "truncate text-sm",
                        isActive
                          ? "text-primary-foreground/80"
                          : "text-muted-foreground",
                      )}
                    >
                    </p>
                    {chat.unreadCount > 0 && !isActive && (
                      <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-primary px-1.5 text-xs font-medium text-primary-foreground">
                        {chat.unreadCount}
                        <span className="sr-only"> непрочитанных</span>
                      </span>
                    )}
                  </div>
                </div>
              </button>
            </li>
          );
        })}
        {filtered.length === 0 && (
          <li className="px-3 py-8 text-center text-sm text-muted-foreground">
            Ничего не найдено
          </li>
        )}
      </ul>
    </aside>
  );
}
