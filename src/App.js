import './App.css';
import { useRef, useState } from 'react';

function TodoItem({ todoItem, toggleTodo, removeTodo }) {
	const { id, todo, active } = todoItem;
	return (
		<div>
			<span
				onClick={() => toggleTodo(id)}
				style={{ textDecoration: active && 'line-through' }}>
				{todo}
			</span>
			<button onClick={() => removeTodo(id)} style={{ marginLeft: '5px' }}>
				X
			</button>
		</div>
	);
}

function App() {
	const [newTodo, setNewTodo] = useState('');
	const [todoList, setTodoList] = useState([
		{
			id: 0,
			todo: '밥먹기',
			active: false,
		},
		{
			id: 1,
			todo: '공부하기',
			active: false,
		},
	]);
	const inputRef = useRef();
	const nextId = useRef(2);

	function addTodo() {
		setTodoList([
			...todoList,
			{ id: nextId.current, todo: newTodo, active: false },
		]);
		nextId.current++;
		setNewTodo('');
		inputRef.current.focus();
	}

	function removeTodo(id) {
		setTodoList(todoList.filter((todo) => todo.id !== id));
	}

	function toggleTodo(id) {
		setTodoList(
			todoList.map((todo) =>
				todo.id === id ? { ...todo, active: !todo.active } : todo,
			),
		);
	}

	function changeInputData(e) {
		setNewTodo(e.target.value);
	}

	return (
		<div>
			<input onChange={changeInputData} value={newTodo} ref={inputRef} />
			<button onClick={addTodo}>추가</button>
			<div>
				{todoList.map((todoItem) => (
					<TodoItem
						key={todoItem.id}
						todoItem={todoItem}
						toggleTodo={toggleTodo}
						removeTodo={removeTodo}
					/>
				))}
			</div>
		</div>
	);
}

export default App;
