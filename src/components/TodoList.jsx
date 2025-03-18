import { useSelector, useDispatch } from 'react-redux';
import TodoItem from './TodoItem';
import { useEffect } from 'react';
import { setTodos } from '../features/todo/todoSlice';
function TodoList() {
    const dispatch = useDispatch();
    const todos = useSelector((state) => state.todo.todos); // ✅ Get todos from Redux store
    
    useEffect(() => {
        const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
        if (savedTodos.length > 0) {
            dispatch(setTodos(savedTodos)); // ✅ Dispatch action to update Redux store
        }
    }, []);
    
    useEffect(() => { // useEffect to save todos to localStorage
    localStorage.setItem("todos", JSON.stringify(todos))
    }, [todos]) 


    return (
        <div>
            <h2>Todos</h2>
            <ul>
                {todos.length > 0 ? 
                (
                    todos.map((todo) => <TodoItem key={todo.id} todo={todo} />) // ✅ Pass todo prop
                ) : 
                (
                    <p>No todos available</p> // ✅ Show message if no todos
                )}
            </ul>
        </div>
    );
}

export default TodoList;