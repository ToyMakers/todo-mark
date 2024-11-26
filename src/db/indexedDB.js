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
      const objectStore = db.createObjectStore('TODO', { keyPath: 'id' });

      objectStore.createIndex('title', 'title', { unique: false });
      objectStore.createIndex('content', 'content', { unique: false });
      objectStore.createIndex('dueDate', 'dueDate', { unique: false });
      objectStore.createIndex('isComplete', 'isComplete', { unique: false });
    }
  };
  request.onsuccess = e => {
    db = e.target.result;
  };
  request.onerror = () => alert('DB 열기 실패');
}
