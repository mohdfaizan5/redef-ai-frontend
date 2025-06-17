"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Plus } from "lucide-react"

interface Todo {
  _id: string
  name: string
  category?: string
  isCompleted: boolean
}

// const categories = ["All", "home", "work", "clg", "personal", "shopping"]

export default function TodoManager({ todos }: { todos: Todo[] }) {
  // const [todos, setTodos] = useState<Todo[]>()
    const categories = todos.map((todo) => todo.category).filter((category, index, self) => category && self.indexOf(category) === index)
  categories.unshift("All") // Add "All" category at the beginning
  console.log("categories", categories)


  const [selectedCategory, setSelectedCategory] = useState("All")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newTodo, setNewTodo] = useState({ title: "", category: "home" })

  // Filter todos based on selected category
  const filteredTodos = selectedCategory === "All" ? todos : todos.filter((todo) => todo.category === selectedCategory)

  // Handle todo completion toggle
  // const handleToggleTodo = (id: string) => {
  //   setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  // }

  // Handle adding new todo
  // const handleAddTodo = () => {
  //   if (newTodo.title.trim()) {
  //     const todo: Todo = {
  //       id: Date.now().toString(),
  //       title: newTodo.title.trim(),
  //       category: newTodo.category,
  //       completed: false,
  //     }
  //     setTodos((prevTodos) => [...prevTodos, todo])
  //     setNewTodo({ title: "", category: "home" })
  //     setIsDialogOpen(false)
  //   }
  // }

  // Handle category filter change
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
  }
  console.log("todos", todos)
  return (
    <div className="">
      <div className="max-w-md mx-auto">
        {/* Category Filter */}
        <div className="mb-4 flex justify-end">
          <Select value={selectedCategory} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-32 bg-transparent border-2  ">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="">
              {categories.map((category) => (
                <SelectItem key={category} value={category as string} className="">
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Todo List */}
        <div className="space-y-4 mb-10 min-h-[10dvh]">
          {filteredTodos.filter((todo) => !todo.isCompleted).map((todo) => {
            return <div key={todo._id.toString()} className="flex items-center gap-4 p-4 rounded-lg bg-card">
              <Checkbox
                color="green"
                id={todo._id.toString()}
                checked={todo.isCompleted}
                // onCheckedChange={() => handleToggleTodo(todo.id)}
                className="w-6 h-6 border-2 dark:border-white rounded-md 
                dark:data-[state=checked]:bg-green-500
                dark:data-[state=checked]:border-0
                
                "
              />
              <div className="flex-1 flex">
                <label
                  htmlFor={todo._id.toString()}
                  className={`text-lg cursor-pointer ${todo.isCompleted ? "line-through text-gray-400" : ""}`}
                >
                  {todo.name}
                </label>
                {
                  todo.category &&
                  <Badge
                    variant="outline"
                    className="ml-2"
                  >
                    {todo.category}
                  </Badge>
                }
              </div>
            </div>
          })}



        </div>
        <details>
          <summary className="ml-1 py-2 ">
            <span className="ml-1">
              Completed
            </span>
          </summary>
          {filteredTodos.filter((todo) => todo.isCompleted).map((todo) => {
            return <div key={todo._id.toString()} className="flex items-center gap-4 p-4 rounded-lg bg-card">
              <Checkbox
                color="green"
                id={todo._id.toString()}
                checked={todo.isCompleted}
                // onCheckedChange={() => handleToggleTodo(todo.id)}
                className="w-6 h-6 border-2 border-white rounded-md dark:data-[state=checked]:bg-green-500
                dark:data-[state=checked]:border-0
                dark:data-[state=checked]:text-white  data-[state=unchecked]:bg-amber-300 "
              />
              <div className="flex-1">
                <label
                  htmlFor={todo._id.toString()}
                  className={`text-lg cursor-pointer ${todo.isCompleted ? "line-through text-gray-400" : ""}`}
                >
                  {todo.name}
                </label>
                {
                  todo.category &&
                  <Badge
                    variant="outline"
                    className="ml-2"
                  >
                    {todo.category}
                  </Badge>
                }
              </div>
            </div>
          })}
        </details>

        {filteredTodos.length === 0 && (
          <div className="text-center text-gray-400 py-8">No todos found for this category</div>
        )}
        {/* Add Todo Button */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 transition-colors"
              size="icon"
            >
              <Plus className="w-6 h-6" />
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-800 border-gray-600 text-white">
            <DialogHeader>
              <DialogTitle>Add New Todo</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div>
                <Label htmlFor="todo-title" className="text-sm font-medium">
                  Todo Title
                </Label>
                <Input
                  id="todo-title"
                  value={newTodo.title}
                  onChange={(e) => setNewTodo((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter todo title..."
                  className="mt-1 bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      // handleAddTodo()
                    }
                  }}
                />
              </div>
              <div>
                <Label htmlFor="todo-category" className="text-sm font-medium">
                  Category
                </Label>
                <Select
                  value={newTodo.category}
                  onValueChange={(value) => setNewTodo((prev) => ({ ...prev, category: value }))}
                >
                  <SelectTrigger className="mt-1 bg-gray-700 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    {categories.slice(1).map((category) => (
                      <SelectItem key={category} value={category as string} className="text-white hover:bg-gray-600">
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2 pt-4">
                <Button
                  // onClick={handleAddTodo}
                  className="flex-1 bg-white text-gray-900 hover:bg-gray-200"
                  disabled={!newTodo.title.trim()}
                >
                  Add Todo
                </Button>
                <Button
                  onClick={() => setIsDialogOpen(false)}
                  variant="outline"
                  className="flex-1 border-gray-600 text-white hover:bg-gray-700"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
