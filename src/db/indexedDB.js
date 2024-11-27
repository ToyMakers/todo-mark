const DB_NAME = 'TODO_DB';
const DB_VERSION = 1;

if (!window.indexedDB) {
  alert('해당 브라우저에서는 indexedDB를 지원하지 않습니다.');
} else {
  let db;
  const request = window.indexedDB.open(DB_NAME, DB_VERSION);

  request.onupgradeneeded = e => {
    db = e.target.result;

    if (!db.objectStoreNames.contains('TODO')) {
      const todoStore = db.createObjectStore('TODO', { keyPath: 'todoId' });

      todoStore.createIndex('todoId', 'todoId', { unique: true });
      todoStore.createIndex('title', 'title', { unique: false });
      todoStore.createIndex('content', 'content', { unique: false });
      todoStore.createIndex('dueDate', 'dueDate', { unique: false });
      todoStore.createIndex('isCompleted', 'isCompleted', { unique: false });
    }
  };

  request.onsuccess = e => {
    db = e.target.result;
    console.log('DB 연결 성공:', db);
  };

  request.onerror = e => {
    alert('DB 열기 실패:', e.target.error);
  };
}
