import React, { useState, useEffect } from 'react';

const { ipcRenderer } = window.electron;

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');

  useEffect(() => {
    const loadMenuItems = async () => {
      const items = await ipcRenderer.invoke('get-menu-items');
      setMenuItems(items);
    };
    loadMenuItems();
  }, []);

  const handleAddItem = async () => {
    if (newItemName && newItemPrice) {
      const newItem = {
        name: newItemName,
        price: parseFloat(newItemPrice)
      };
      await ipcRenderer.invoke('add-menu-item', newItem);
      setMenuItems([...menuItems, { ...newItem, id: menuItems.length + 1 }]);
      setNewItemName('');
      setNewItemPrice('');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20%' }}>
      <h1>Adicionar Itens ao Menu</h1>
      <p>Aqui você pode adicionar, editar ou remover itens do cardápio.</p>

      <div style={{ marginBottom: '20px' }}>
        {menuItems.length > 0 ? (
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {menuItems.map((item) => (
              <li key={item.id} style={{ marginBottom: '10px' }}>
                {item.name} - R$ {item.price.toFixed(2)}
              </li>
            ))}
          </ul>
        ) : (
          <p>O cardápio está vazio.</p>
        )}
      </div>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Nome do Item"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <input
          type="number"
          placeholder="Preço do Item"
          value={newItemPrice}
          onChange={(e) => setNewItemPrice(e.target.value)}
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <button onClick={handleAddItem} style={styles.button}>
          Adicionar Item
        </button>
      </div>
    </div>
  );
};

const styles = {
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#28a745',
    color: '#fff'
  }
};

export default MenuPage;
