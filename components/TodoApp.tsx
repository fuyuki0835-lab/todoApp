"use client";

import { useState, useCallback } from "react";
import TodoInput from "./TodoInput";
import TodoItem from "./TodoItem";
import TodoFilter from "./TodoFilter";

export type Todo = {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
};

export type Filter = "all" | "active" | "completed";

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>("all");

  const addTodo = useCallback((text: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: new Date(),
    };
    setTodos((prev) => [newTodo, ...prev]);
  }, []);

  const toggleTodo = useCallback((id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }, []);

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const activeCount = todos.filter((t) => !t.completed).length;
  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <div className="max-w-lg mx-auto">
      {/* ヘッダー */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 tracking-tight">
          ✅ やること
        </h1>
        <p className="text-gray-400 mt-2 text-sm">タスクを管理してみよう</p>
      </div>

      {/* カード */}
      <div className="bg-white rounded-2xl shadow-lg shadow-indigo-100 overflow-hidden border border-gray-100">
        {/* 入力エリア */}
        <div className="p-6 border-b border-gray-100">
          <TodoInput onAdd={addTodo} />
        </div>

        {/* フィルター */}
        {todos.length > 0 && (
          <div className="px-6 pt-4">
            <TodoFilter
              filter={filter}
              onFilterChange={setFilter}
              activeCount={activeCount}
              completedCount={completedCount}
              totalCount={todos.length}
            />
          </div>
        )}

        {/* タスクリスト */}
        <div className="p-6">
          {filteredTodos.length === 0 ? (
            <div className="text-center py-12">
              {todos.length === 0 ? (
                <>
                  <div className="text-5xl mb-4">📝</div>
                  <p className="text-gray-400 font-medium">
                    タスクを追加してみましょう
                  </p>
                </>
              ) : (
                <>
                  <div className="text-5xl mb-4">
                    {filter === "completed" ? "🎯" : "🎉"}
                  </div>
                  <p className="text-gray-400 font-medium">
                    {filter === "completed"
                      ? "完了済みのタスクはありません"
                      : "未完了のタスクはありません！"}
                  </p>
                </>
              )}
            </div>
          ) : (
            <ul className="space-y-2">
              {filteredTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                />
              ))}
            </ul>
          )}
        </div>

        {/* フッター統計 */}
        {todos.length > 0 && (
          <div className="px-6 pb-6">
            <div className="flex justify-between text-xs text-gray-400 pt-4 border-t border-gray-100">
              <span>合計 {todos.length} 件</span>
              <span>
                完了 {completedCount} / 未完了 {activeCount}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
