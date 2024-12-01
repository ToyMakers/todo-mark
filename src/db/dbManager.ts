interface TODO {
  id: string;
  title?: string;
  content?: string;
  dueDate?: string;
  isComplete: boolean;
}
const DB_NAME = 'TODO_DB';

export const createDB = () => {
  if (!window.indexedDB) {
    throw new Error('해당 브라우저에서는 indexedDB를 지원하지 않습니다.');
  }

  const request = window.indexedDB.open(DB_NAME, 1);

  request.onupgradeneeded = e => {
    const target = e.target as IDBOpenDBRequest;
    const db = target.result;

    if (!db.objectStoreNames.contains('TODO')) {
      const todoStore = db.createObjectStore('TODO', { keyPath: 'id' });

      todoStore.createIndex('title', 'title', { unique: false });
      todoStore.createIndex('content', 'content', { unique: false });
    }
  };

  request.onsuccess = e => {
    const target = e.target as IDBOpenDBRequest;
    const db = target.result;
    return db;
  };

  request.onerror = e => {
    const target = e.target as IDBOpenDBRequest;
    throw new Error(`DB 생성 실패 : ${target.error}`);
  };
};

export const addToDB = (todo: TODO) => {
  const request = window.indexedDB.open(DB_NAME);

  request.onerror = e => {
    const target = e.target as IDBOpenDBRequest;
    throw new Error(`DB 오픈 실패: ${target.error}`);
  };

  request.onsuccess = () => {
    const db = request.result;
    const transaction = db.transaction(['TODO'], 'readwrite');
    const store = transaction.objectStore('TODO');
    store.add(todo);
  };
};

export const getAllTodos = (): Promise<TODO[]> => {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(DB_NAME);

    request.onsuccess = e => {
      const db = (e.target as IDBOpenDBRequest).result;
      const transaction = db.transaction(['TODO'], 'readonly');
      const store = transaction.objectStore('TODO');
      const getAllRequest = store.getAll();

      getAllRequest.onsuccess = () => {
        const result = getAllRequest.result as Array<TODO>;
        resolve(result);
      };

      getAllRequest.onerror = () => {
        reject(new Error('데이터 읽기 실패'));
      };
    };

    request.onerror = () => {
      reject(new Error('DB 연결 실패'));
    };
  });
};
