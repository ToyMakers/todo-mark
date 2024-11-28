interface Todo {
  id: string;
  title: string;
  content?: string;
  dueDate?: Date;
  isComplete: boolean;
}

export const createDB = (): Promise<IDBDatabase> => {
  const DB_NAME = 'TODO_DB';
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
      console.log('DB 연결 성공:', db);
      resolve(db);
    };

    request.onerror = e => {
      const target = e.target as IDBOpenDBRequest;
      console.error('DB 열기 실패:', target.error);
      reject(target.error);
    };
  });
};

export const checkDB = async (db: IDBDatabase) => {
  try {
    const transaction = db.transaction('TODO', 'readonly');
    const store = transaction.objectStore('TODO');
    const request = store.getAll();

    request.onsuccess = () => {
      request.result.forEach((todo: Todo) => {
        console.log('데이터 조회 성공:', todo);
      });
    };

    request.onerror = e => {
      console.error('데이터 조회 실패:', e);
    };
  } catch (error) {
    console.error('DB 연결 실패:', error);
  }
};

export const addToDB = async (db: IDBDatabase, todo: Todo) => {
  try {
    console.log('DB를 체크합니다.');
    checkDB(db);
    const transaction = db.transaction('TODO', 'readwrite');
    const store = transaction.objectStore('TODO');

    const getRequest = store.get(todo.id);

    getRequest.onsuccess = () => {
      if (getRequest.result) {
        console.error('중복된 데이터: 같은 id가 이미 존재합니다.');
        return;
      }
      const addRequest = store.add(todo);
      addRequest.onsuccess = () => {
        console.log('데이터 추가 성공:', todo);
      };
      addRequest.onerror = e => {
        console.error('데이터 추가 실패:', e);
      };
    };
    getRequest.onerror = e => {
      console.error('중복 확인 중 오류 발생:', e);
    };
  } catch (error) {
    console.error('DB 연결 실패:', error);
  }
};
