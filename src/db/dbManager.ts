import DB from '../constants/constants';

export const createDB = () => {
  if (!window.indexedDB) {
    throw new Error('해당 브라우저에서는 indexedDB를 지원하지 않습니다.');
  }

  const request = window.indexedDB.open(DB.NAME, 1);

  request.onupgradeneeded = e => {
    const target = e.target as IDBOpenDBRequest;
    const db = target.result;

    if (!db.objectStoreNames.contains(DB.STORE_NAME)) {
      const todoStore = db.createObjectStore(DB.STORE_NAME, { keyPath: 'id' });

      todoStore.createIndex('title', 'title', { unique: false });
      todoStore.createIndex('description', 'todoDetail.description', {
        unique: false,
      });
    } else {
      const todoStore = db
        .transaction(DB.STORE_NAME, 'readwrite')
        .objectStore(DB.STORE_NAME);

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

export const withIndexedDB = <Type>(
  storeName: string,
  mode: IDBTransactionMode,
  callback: (store: IDBObjectStore) => IDBRequest<Type> | void,
): Promise<Type | void> => {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(DB.NAME);

    request.onsuccess = e => {
      const db = (e.target as IDBOpenDBRequest).result;
      const transaction = db.transaction([storeName], mode);
      const store = transaction.objectStore(storeName);
      const result = callback(store);

      if (result instanceof IDBRequest) {
        result.onsuccess = () => {
          resolve(result.result);
        };
      } else {
        transaction.oncomplete = () => {
          resolve();
        };
      }
    };
    request.onerror = () => {
      reject(new Error('DB 연결 실패'));
    };
  });
};

export const addTodo = (todo: Todo): Promise<void> => {
  return withIndexedDB<void>(DB.STORE_NAME, 'readwrite', store => {
    store.add(todo);
  });
};

export const getAllTodos = (): Promise<Todo[]> => {
  return withIndexedDB<Todo[]>(DB.STORE_NAME, 'readonly', store => {
    return store.getAll();
  }) as Promise<Todo[]>;
};

export const getTodobyId = (id: string): Promise<Todo> => {
  return withIndexedDB<Todo>(DB.STORE_NAME, 'readonly', store => {
    return store.get(id);
  }) as Promise<Todo>;
};

export const updateTodo = (todo: Todo): Promise<void> => {
  return withIndexedDB<void>(DB.STORE_NAME, 'readwrite', store => {
    store.put(todo);
  });
};

export const deleteTodo = (id: string): Promise<void> => {
  return withIndexedDB<void>(DB.STORE_NAME, 'readwrite', store => {
    store.delete(id);
  });
};
