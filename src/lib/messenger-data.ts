// мок дата для чатов и сообщений


export type Message = {
    id: string;
    text: string;
    time: string;
    fromMe: boolean;
}
export type Chat = {
    id: string;
    name: string;
    initials: string;
    color: string;
    online: boolean;
    unread: number;
    messages: Message[];
}

export const initialChats: Chat[] = [
  {
    id: '1',
    name: 'Анна Смирнова',
    initials: 'АС',
    color: 'bg-rose-500',
    online: true,
    unread: 2,
    messages: [
      { id: 'm1', text: 'Привет! Как дела?', time: '10:12', fromMe: false },
      { id: 'm2', text: 'Привет, всё отлично. Работаю над новым проектом', time: '10:14', fromMe: true },
      { id: 'm3', text: 'Звучит интересно! Расскажешь подробнее?', time: '10:15', fromMe: false },
      { id: 'm4', text: 'Созвонимся вечером?', time: '10:16', fromMe: false },
    ],
  },
  {
    id: '2',
    name: 'Команда разработки',
    initials: 'КР',
    color: 'bg-sky-500',
    online: false,
    unread: 5,
    messages: [
      { id: 'm1', text: 'Релиз переносим на пятницу', time: '09:30', fromMe: false },
      { id: 'm2', text: 'Ок, успею закрыть задачи по API', time: '09:41', fromMe: true },
      { id: 'm3', text: 'Не забудьте обновить документацию', time: '09:58', fromMe: false },
    ],
  },
  {
    id: '3',
    name: 'Дмитрий Петров',
    initials: 'ДП',
    color: 'bg-emerald-500',
    online: true,
    unread: 0,
    messages: [
      { id: 'm1', text: 'Скинул тебе макеты на почту', time: 'Вчера', fromMe: false },
      { id: 'm2', text: 'Спасибо, посмотрю', time: 'Вчера', fromMe: true },
    ],
  },
  {
    id: '4',
    name: 'Мария Иванова',
    initials: 'МИ',
    color: 'bg-amber-500',
    online: false,
    unread: 0,
    messages: [
      { id: 'm1', text: 'С днём рождения!', time: 'Пн', fromMe: true },
      { id: 'm2', text: 'Спасибо большое!', time: 'Пн', fromMe: false },
    ],
  },
  {
    id: '5',
    name: 'Игорь Кузнецов',
    initials: 'ИК',
    color: 'bg-violet-500',
    online: false,
    unread: 1,
    messages: [{ id: 'm1', text: 'Ты будешь на встрече завтра?', time: 'Вс', fromMe: false }],
  },
  {
    id: '79994605203@c.us',
    name: 'testDev',
    initials: 'TD',
    color: 'bg-pink-500',
    online: true,
    unread: 0,
    messages: [{ id: 'm1', text: 'test123', time: '10:12', fromMe: true }],
  }
]