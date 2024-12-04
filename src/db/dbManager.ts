import { Todo } from '../todoSchemas';

const DB_NAME = 'TODO_DB';
const STORE_NAME = 'TODO';

export const createDB = () => {
  if (!window.indexedDB) {
    throw new Error('해당 브라우저에서는 indexedDB를 지원하지 않습니다.');
  }

  const request = window.indexedDB.open(DB_NAME, 1);

  request.onupgradeneeded = e => {
    const target = e.target as IDBOpenDBRequest;
    const db = target.result;

    if (!db.objectStoreNames.contains(STORE_NAME)) {
      const todoStore = db.createObjectStore(STORE_NAME, { keyPath: 'id' });

      todoStore.createIndex('title', 'title', { unique: false });
      todoStore.createIndex('description', 'todoDetail.description', {
        unique: false,
      });
    } else {
      const todoStore = db
        .transaction(STORE_NAME, 'readwrite')
        .objectStore(STORE_NAME);

      if (!todoStore.indexNames.contains('title')) {
        todoStore.createIndex('title', 'title', { unique: false });
      }
      if (!todoStore.indexNames.contains('description')) {
        todoStore.createIndex('description', 'description', { unique: false });
      }
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

export const addToDB = (todo: Todo) => {
  const request = window.indexedDB.open(DB_NAME);

  request.onerror = e => {
    const target = e.target as IDBOpenDBRequest;
    throw new Error(`DB 오픈 실패: ${target.error}`);
  };

  request.onsuccess = () => {
    const db = request.result;
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    store.add(todo);
  };
};

export const getAllTodos = (): Promise<Todo[]> => {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(DB_NAME);

    request.onsuccess = e => {
      const db = (e.target as IDBOpenDBRequest).result;
      const transaction = db.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const getAllRequest = store.getAll();

      getAllRequest.onsuccess = () => {
        const result = getAllRequest.result as Array<Todo>;
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
