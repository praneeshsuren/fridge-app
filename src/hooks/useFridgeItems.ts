import { useEffect, useState } from 'react';
import axios from 'axios';
import type { FridgeItem } from '../types/fridge';

export function useFridgeItems() {
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
        const res = await axios.get<FridgeItem[]>(import.meta.env.VITE_API_URL);
        if (!cancelled) setItems(res.data || []);
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Failed to load items');
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
      await axios.delete(`${import.meta.env.VITE_API_URL}/${encodeURIComponent(itemToDelete._id)}`);
      setItems((prev) => 
        prev.filter((i) => 
          i._id !== itemToDelete._id
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete item');
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

  return {
    items,
    loading,
    error,
    editingItem,
    handleDelete,
    handleAdd,
    handleEdit,
    handleUpdate,
    handleCancelEdit,
  };
}
