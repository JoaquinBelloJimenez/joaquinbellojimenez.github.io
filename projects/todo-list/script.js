document.addEventListener('DOMContentLoaded', () => {
    const taskList = document.getElementById('taskList2');

    loadTasks();

    function addTask(text) {
        const tasks = getTasks();
        tasks.push({ text, completed: false });
        saveTasks(tasks);
        renderTasks();
    }

    function renderTasks() {
        taskList.innerHTML = '';
        const tasks = getTasks();

        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            const checkbox = document.createElement('button');
            checkbox.className = 'checkbox';
            if (task.completed) {
                checkbox.textContent = '✓';
                checkbox.classList.add('completed');
            }
            checkbox.addEventListener('click', () => toggleTask(index));

            const span = document.createElement('span');
            span.textContent = task.text;
            if (task.completed) span.style.textDecoration = 'line-through';

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = '🗑';
            deleteBtn.className = 'delete-btn';
            deleteBtn.addEventListener('click', () => deleteTask(index));

            li.append(checkbox, span, deleteBtn);
            taskList.appendChild(li);
        });

        const addLi = document.createElement('li');
        addLi.className = 'add-task-row';

        const input = document.createElement('input');
        input.type = 'text';
        input.id = 'taskInput2';
        input.placeholder = '+ Add a task';

        const addBtn = document.createElement('button');
        addBtn.id = 'addTaskBtn2';
        addBtn.textContent = '+';

        const doAdd = () => {
            const text = input.value.trim();
            if (text) {
                addTask(text);
                input.value = '';
            }
        };

        addBtn.addEventListener('click', doAdd);
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') doAdd();
        });

        addLi.append(input, addBtn);
        taskList.appendChild(addLi);

        if (tasks.length === 0) input.focus();
    }

    window.toggleTask = (index) => {
        const tasks = getTasks();
        tasks[index].completed = !tasks[index].completed;
        saveTasks(tasks);
        renderTasks();
    };

    window.deleteTask = (index) => {
        const tasks = getTasks();
        tasks.splice(index, 1);
        saveTasks(tasks);
        renderTasks();
    };

    function getTasks() {
        return JSON.parse(localStorage.getItem('tasks')) || [];
    }

    function saveTasks(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        renderTasks();
    }
});
