import './App.css'
import AddItemForm from './components/organisms/AddItemForm'
import FridgeList from './components/organisms/FridgeList'
import Header from './components/organisms/Header'
import { useFridgeItems } from './hooks/useFridgeItems'

function App() {
  const {
    items,
    loading,
    error,
    editingItem,
    handleDelete,
    handleAdd,
    handleEdit,
    handleUpdate,
    handleCancelEdit,
  } = useFridgeItems();

  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0 top-[280px] bg-blue-50 -z-10"></div>
      <div className="max-w-5xl mx-auto px-4 py-10">
        <Header />
        <AddItemForm onAdd={handleAdd} editingItem={editingItem ?? undefined} onUpdate={handleUpdate} onCancel={handleCancelEdit} />
        <FridgeList items={items} loading={loading} error={error} onDelete={handleDelete} onEdit={handleEdit} />
      </div>
    </div>
  )
}

export default App
