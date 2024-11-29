interface TODO {
  id: string;
  title?: string;
  content?: string;
  dueDate?: string;
  isComplete: boolean;
}
const DB_NAME = 'TODO_DB';

export const createDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      reject(new Error('해당 브라우저에서는 indexedDB를 지원하지 않습니다.'));
    }

    const request = window.indexedDB.open(DB_NAME, 1);

    request.onupgradeneeded = e => {
      const target = e.target as IDBOpenDBRequest;
      const db = target.result;

      if (!db.objectStoreNames.contains('TODO')) {
        const todoStore = db.createObjectStore('TODO', { keyPath: 'id' });

        todoStore.createIndex('title', 'title', { unique: false });
        todoStore.createIndex('content', 'content', { unique: false });
        todoStore.createIndex('dueDate', 'dueDate', { unique: false });
        todoStore.createIndex('isComplete', 'isComplete', { unique: false });
      }
    };

    request.onsuccess = e => {
      const target = e.target as IDBOpenDBRequest;
      const db = target.result;
      resolve(db);
    };

    request.onerror = e => {
      const target = e.target as IDBOpenDBRequest;
      console.error('DB 생성 실패:', target.error);
    };
  });
};

export const addToDB = (todo: TODO) => {
  const request = window.indexedDB.open(DB_NAME);
  request.onerror = e => {
    const target = e.target as IDBOpenDBRequest;
    console.error('DB 오픈 실패:', target.error);
  };

  request.onsuccess = () => {
    const db = request.result;
    const transaction = db.transaction(['TODO'], 'readwrite');
    const store = transaction.objectStore('TODO');
    store.add(todo);
    request.onsuccess = e => {
      const target = e.target as IDBRequest | null;
      if (target) {
        console.log(target.result);
      }
    };
  };
};
