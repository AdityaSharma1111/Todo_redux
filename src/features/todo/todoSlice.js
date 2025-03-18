import {createSlice, nanoid} from '@reduxjs/toolkit';

const initialState = {
    todos: [
        {id: 1, text: "hello world", completed: false}
    ]
}

export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        setTodos: (state, action) => {
            state.todos = action.payload;  // Update todos from payload
        },
        addTodo: (state, action) => {
            const currTodo = {
                id: nanoid(),
                text: action.payload,
                completed: false
            }
            state.todos.push(currTodo)
        },
        deleteTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload) 
        },
        updateTodo: (state, action) => {
            const {id, text} = action.payload
            state.todos = state.todos.map((todo) => (todo.id === id ? {...todo, text} : todo))
        },
        toggleComplete: (state, action) => {
            state.todos = state.todos.map((todo) => (todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo))
        }
    }
})

export const {setTodos, addTodo, deleteTodo, updateTodo, toggleComplete} = todoSlice.actions
export default todoSlice.reducer