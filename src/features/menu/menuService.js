import db from '../../services/database';

export const getMenuItems = () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM menu', (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

export const addMenuItem = (item) => {
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO menu (name, price) VALUES (?, ?)',
      [item.name, item.price],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, ...item });
        }
      }
    );
  });
};