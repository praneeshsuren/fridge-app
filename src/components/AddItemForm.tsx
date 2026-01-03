import { useEffect, useState } from "react";
import type { FridgeItem } from "../types/fridge";
import axios from "axios";

export default function AddItemForm({ 
    onAdd, 
    editingItem, 
    onUpdate, 
    onCancel 
}: { 
    onAdd?: (item: FridgeItem) => void; 
    editingItem?: FridgeItem; onUpdate?: 
    (item: FridgeItem) => void; onCancel?: () => void 
}) {
    
  const [title, setTitle] = useState("");
  const [expiry, setExpiry] = useState("");

  useEffect(() => {
    if (editingItem) {
      setTitle(editingItem.title ?? "");
      setExpiry(editingItem.expiry ?? "");
    }
  }, [editingItem]);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!title || !expiry) return;

    const payload: FridgeItem = { title, expiry };

    try {
      if (editingItem && editingItem._id) {
        const res = await axios.put<FridgeItem>(
          `https://thefridge-api.karapincha.io/fridge/${encodeURIComponent(editingItem._id)}`,
          payload,
          { headers: { "Content-Type": "application/json" } }
        );
        if (res.data) onUpdate?.(res.data);
      } else {
        const res = await axios.post<FridgeItem>(
          "https://thefridge-api.karapincha.io/fridge",
          payload,
          { headers: { "Content-Type": "application/json" } }
        );
        if (res.data) onAdd?.(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setTitle("");
      setExpiry("");
    }
  }

  return (
    <form
      onSubmit={submit}
      className="bg-white mt-8 p-7 rounded-l shadow-sm shadow-neutral-300"
    >
      <div className="flex flex-col md:flex-row gap-4 items-end">
        <div className="flex-2">
          <label className="text-sm font-medium text-slate-600">
            🍎 Item Title
          </label>
          <input
            className="mt-1 w-full rounded-sm border px-3 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="flex-2 flex flex-col">
          <label className="text-sm font-medium text-slate-600 mb-1">
            ⏰ Expiry Date
          </label>
          <input
            type="date"
            className="rounded-sm border px-3 py-2"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <button type="submit" className="bg-blue-900 text-white px-6 py-2 rounded-sm font-medium hover:bg-blue-950 cursor-pointer">
            {editingItem ? "Save Changes" : "Add to Fridge"}
          </button>
          {editingItem && (
            <button type="button" onClick={() => { setTitle(""); setExpiry(""); onCancel?.(); }} className="bg-gray-100 px-4 py-2 rounded-sm hover:bg-gray-200">
              Cancel
            </button>
          )}
        </div>
      </div>

      <p className="text-xs text-slate-400 mt-3">
        ⚠️ We don't want more than one piece of the same food in our fridge.
      </p>
    </form>
  );
}
