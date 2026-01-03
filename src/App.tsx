import './App.css'
import AddItemForm from './components/AddItemForm'
import FridgeList from './components/FridgeList'
import Header from './components/Header'
import { useEffect, useState } from 'react'
import type { FridgeItem } from './types/fridge'
import axios from 'axios'

function App() {

  const [items, setItems] = useState<FridgeItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<FridgeItem | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function fetchItems() {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get<FridgeItem[]>('https://thefridge-api.karapincha.io/fridge');
        if (!cancelled) setItems(res.data || []);
      } catch (err: any) {
        if (!cancelled) setError(err?.message ?? 'Failed to load items');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchItems();
    return () => { cancelled = true };
  }, []);

  async function handleDelete(itemToDelete: FridgeItem) {
    setError(null);
    try {
      if (!itemToDelete._id) throw new Error('Item id missing');
      await axios.delete(`https://thefridge-api.karapincha.io/fridge/${encodeURIComponent(itemToDelete._id)}`);
      setItems((prev) => 
        prev.filter((i) => 
          i._id !== itemToDelete._id
      ));
    } catch (err: any) {
      setError(err?.message ?? 'Failed to delete item');
    }
  }

  function handleAdd(newItem: FridgeItem) {
    setItems((prev) => [newItem, ...prev]);
  }

  function handleEdit(item: FridgeItem) {
    setEditingItem(item);
  }

  function handleUpdate(updated: FridgeItem) {
    setItems((prev) => 
      prev.map((item) => 
        (item._id === updated._id) 
          ? updated 
          : item
        )
    );
    setEditingItem(null);
  }

  function handleCancelEdit() {
    setEditingItem(null);
  }

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-4">
        <Header />
        <AddItemForm onAdd={handleAdd} editingItem={editingItem ?? undefined} onUpdate={handleUpdate} onCancel={handleCancelEdit} />
        <FridgeList items={items} loading={loading} error={error} onDelete={handleDelete} onEdit={handleEdit} />
      </div>
    </div>
  )
}

export default App
