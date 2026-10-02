'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '../lib/utils'
import { type Contact } from '../api/contact/types'
import { type UiMessage } from '../api/messages/types'

type ChatWindowProps = {
  contact: Contact | null
  messages: UiMessage[]
  loading?: boolean
  onSend: (text: string) => void
  onBack: () => void
  className?: string
}

export function ChatWindow({
  contact,
  messages,
  loading,
  onSend,
  onBack,
  className,
}: ChatWindowProps) {
  const [draft, setDraft] = useState('')
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [contact?.chatId, messages.length])

  if (!contact) {
    return (
      <section
        className={cn(
          'flex flex-col items-center justify-center gap-3 text-muted-foreground',
          className,
        )}
      >
        <p>Выберите чат, чтобы начать общение</p>
      </section>
    )
  }

  const submit = () => {
    const text = draft.trim()
    if (!text) return
    onSend(text)
    setDraft('')
  }

  return (
    <section
      className={cn('flex min-h-0 flex-col', className)}
      aria-label={`Чат с ${contact.name}`}
    >
      <header className="flex h-16 shrink-0 items-center gap-3 border-b px-4">
        <button
          type="button"
          onClick={onBack}
          aria-label="Назад к чатам"
          className="text-sm font-medium text-primary md:hidden"
        >
          ← Назад
        </button>
        <div className="min-w-0 flex-1">
          <h2 className="truncate font-semibold">{contact.name}</h2>
          <p className="text-xs text-muted-foreground">В сети</p>
        </div>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto bg-muted/20 px-4 py-6">
        {loading ? (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            Загрузка сообщений...
          </div>
        ) : (
          <ol className="mx-auto flex max-w-3xl flex-col gap-2">
            {messages.map((message) => (
              <li
                key={message.id}
                className={cn('flex', message.fromMe ? 'justify-end' : 'justify-start')}
              >
                <div
                  className={cn(
                    'max-w-[75%] rounded-2xl px-4 py-2 text-sm leading-relaxed shadow-xs',
                    message.fromMe
                      ? 'rounded-br-sm bg-primary text-primary-foreground'
                      : 'rounded-bl-sm border bg-background',
                  )}
                >
                  <p className="text-pretty break-words">{message.text}</p>
                  <time
                    className={cn(
                      'mt-1 block text-right text-[11px]',
                      message.fromMe
                        ? 'text-primary-foreground/70'
                        : 'text-muted-foreground',
                    )}
                  >
                    {message.time}
                  </time>
                </div>
              </li>
            ))}
          </ol>
        )}
        <div ref={endRef} />
      </div>

      <form
        className="flex shrink-0 items-end gap-2 border-t p-3"
        onSubmit={(e) => {
          e.preventDefault()
          submit()
        }}
      >
        <label className="flex-1">
          <span className="sr-only">Сообщение</span>
          <textarea
            rows={1}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                if (e.nativeEvent.isComposing || e.keyCode === 229) return
                e.preventDefault()
                submit()
              }
            }}
            placeholder="Написать сообщение..."
            className="max-h-32 min-h-10 w-full resize-none rounded-lg border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </label>
      </form>
    </section>
  )
}