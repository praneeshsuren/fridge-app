import { useEffect, useState } from "react";
import axios from "axios";
import type { FridgeItem } from "../../types/fridge";
import Button from "../atoms/Button";
import Card from "../atoms/Card";
import Text from "../atoms/Text";
import FormField from "../molecules/FormField";

interface AddItemFormProps {
  onAdd?: (item: FridgeItem) => void;
  editingItem?: FridgeItem;
  onUpdate?: (item: FridgeItem) => void;
  onCancel?: () => void;
}

export default function AddItemForm({
  onAdd,
  editingItem,
  onUpdate,
  onCancel,
}: AddItemFormProps) {
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
          `${import.meta.env.VITE_API_URL}/${encodeURIComponent(editingItem._id)}`,
          payload,
          { headers: { "Content-Type": "application/json" } }
        );
        if (res.data) onUpdate?.(res.data);
      } else {
        const res = await axios.post<FridgeItem>(
          import.meta.env.VITE_API_URL,
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
    <Card className="mt-8 p-7">
      <form onSubmit={submit}>
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <FormField
            label="🍎 Item Title"
            value={title}
            onChange={setTitle}
            className="flex-2"
          />

          <FormField
            label="⏰ Expiry Date"
            type="date"
            value={expiry}
            onChange={setExpiry}
            className="flex-2"
          />

          <div className="flex gap-2">
            <Button type="submit">
              {editingItem ? "Save Changes" : "Add to Fridge"}
            </Button>
            {editingItem && (
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setTitle("");
                  setExpiry("");
                  onCancel?.();
                }}
                className="px-4"
              >
                Cancel
              </Button>
            )}
          </div>
        </div>

        <Text variant="caption" className="mt-3">
          ⚠️ We don't want more than one piece of the same food in our fridge.
        </Text>
      </form>
    </Card>
  );
}
