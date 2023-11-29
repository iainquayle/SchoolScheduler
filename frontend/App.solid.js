import { createSignal } from 'solid-js';

const App = () => {
    const [schedule, setSchedule] = createSignal([]);
    const [newTask, setNewTask] = createSignal('');

    const addTask = () => {
        if (newTask()) {
            setSchedule([...schedule(), { id: Date.now(), name: newTask() }]);
            setNewTask(''); // Clear input after adding task
        }
    };

    const deleteTask = (taskId) => {
        setSchedule(schedule().filter((task) => task.id !== taskId));
    };

    return (
        <div class="container mx-auto mt-4">
            <h1 class="text-3xl font-semibold mb-4">School Schedule</h1>
            <div class="mb-4">
                <input
                    type="text"
                    value={newTask()}
                    onInput={(e) => setNewTask(e.target.value)}
                    class="border p-2 mr-2"
                    placeholder="Enter task name"
                />
                <button onClick={addTask} class="bg-blue-500 text-white px-4 py-2">
                    Add Task
                </button>
            </div>
            <ul class="mt-4">
                {schedule().map((task) => (
                    <li key={task.id} class="flex justify-between items-center border-b py-2">
                        <span>{task.name}</span>
                        <button onClick={() => deleteTask(task.id)} class="text-red-500">
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
