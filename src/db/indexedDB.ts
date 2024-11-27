const DataBase = () => {
  const DB_NAME = 'TODO_DB';
  const DB_VERSION = 1;

  if (!window.indexedDB) {
    console.error('해당 브라우저에서는 indexedDB를 지원하지 않습니다.');
  } else {
    let db: IDBDatabase;
    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (e: IDBVersionChangeEvent) => {
      const target = e.target as IDBOpenDBRequest;
      db = target.result;

      if (!db.objectStoreNames.contains('TODO')) {
        const todoStore = db.createObjectStore('TODO', { keyPath: 'todoId' });

        todoStore.createIndex('title', 'title', { unique: false });
        todoStore.createIndex('content', 'content', { unique: false });
        todoStore.createIndex('dueDate', 'dueDate', { unique: false });
        todoStore.createIndex('isComplete', 'isComplete', { unique: false });
      }
    };

    request.onsuccess = (e: Event) => {
      const target = e.target as IDBOpenDBRequest;
      db = target.result;
      console.log('DB 연결 성공:', db);
    };

    request.onerror = (e: Event) => {
      const target = e.target as IDBOpenDBRequest;
      console.error('DB 열기 실패:', target.error);
    };
  }
  return window.indexedDB;
};
export default DataBase;
