export function TodoNote({ info }) {
    return (
        <ul className="todo-note">
            {info.todos.map((todo, idx) => (
                <li key={idx}>
                    <input type="checkbox" defaultChecked={todo.isDone} />
                    {todo.txt}
                </li>
            ))}
        </ul>
    );
}
