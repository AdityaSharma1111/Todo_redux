import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTodo, toggleComplete, updateTodo } from '../features/todo/todoSlice';

function TodoItem({ todo }) {
    const [isEditing, setIsEditing] = useState(false);
    const [newText, setNewText] = useState(todo.text);
    const dispatch = useDispatch();

    const handleToggleComplete = () => {
        dispatch(toggleComplete(todo.id));
    };

    const handleDelete = () => {
        dispatch(deleteTodo(todo.id));
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        if (newText.trim() !== "") {
            dispatch(updateTodo({ id: todo.id, text: newText }));
            setIsEditing(false);
        }
    };

    return (
        <li className="flex items-center justify-between p-2 border-b border-gray-300">
            <div className="flex items-center gap-2">
                <input 
                    type="checkbox" 
                    checked={todo.completed} 
                    onChange={handleToggleComplete} 
                    className="cursor-pointer"
                />
                {isEditing ? (
                    <input
                        type="text"
                        value={newText}
                        onChange={(e) => setNewText(e.target.value)}
                        className="border p-1 rounded outline-none"
                    />
                ) : (
                    <span className={todo.completed ? "line-through text-gray-500" : ""}>{todo.text}</span>
                )}
            </div>
            <div className="flex gap-2">
                {isEditing ? (
                    <button 
                        onClick={handleSave} 
                        className="px-2 py-1 bg-blue-500 text-white rounded">
                        Save
                    </button>
                ) : (
                    <button 
                        onClick={handleEdit} 
                        disabled={todo.completed}
                        className="px-2 py-1 bg-yellow-500 text-white rounded">
                        Edit
                    </button>
                )}
                <button 
                    onClick={handleDelete} 
                    className="px-2 py-1 bg-red-500 text-white rounded">
                    Delete
                </button>
            </div>
        </li>
    );
}

export default TodoItem;