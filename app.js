let tasks = [];

const AddTask = () => {
    const taskinput = document.getElementById("taskinput");
    const text = taskinput.value.trim();
    if (text && !tasks.some(task => task.text === text)) {
        tasks.push({ text: text, completed: false });
        taskinput.value = '';
        updateTasksList();
        updatestats();
    } else {
        alert('Please enter a unique task!');
    }
};


const toggleTaskcomplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTasksList();
    updatestats();
};

const deletetask = (index) => {
    tasks.splice(index, 1);
    updateTasksList();
    updatestats();
};

const edittask = (index) => {
    const taskinput = document.getElementById("taskinput");
    taskinput.value = tasks[index].text;
    tasks.splice(index, 1);
    updateTasksList();
};

const updatestats = () => {
    const completeTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    const progress = totalTasks ? (completeTasks / totalTasks) * 100 : 0;
    const progressbar = document.getElementById("progress");
    progressbar.style.width = `${progress}%`;
    document.getElementById('numbers').innerText = `${completeTasks}/${totalTasks}`;
    if (totalTasks && completeTasks === totalTasks) {
        blast();
    }
};

const updateTasksList = () => {
    const tasklist = document.getElementById('task-list');
    tasklist.innerHTML = "";
    tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
        <div class="taskItem">
            <div class="task ${task.completed ? 'completed' : ''}">
                <input type="checkbox" class="checkbox" ${task.completed ? 'checked' : ''} data-index="${index}"/>
                <p>${task.text}</p>
            </div>
            <div class="icons">
                <img src="./img/edit.png" onclick="edittask(${index})" alt="Edit"/>
                <img src="./img/bin.png" onclick="deletetask(${index})" alt="Delete"/>
            </div>
        </div>
        `;
        taskItem.querySelector('.checkbox').addEventListener('change', () => toggleTaskcomplete(index));
        tasklist.append(taskItem);
    });
};

document.getElementById('task').addEventListener('click', function(e) {
    e.preventDefault();
    AddTask();
});

const blast = () => {
    const duration = 15 * 100,
        animationEnd = Date.now() + duration,
        defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) {
            return clearInterval(interval);
        }
        const particleCount = 50 * (timeLeft / duration);
        confetti(
            Object.assign({}, defaults, {
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            })
        );
        confetti(
            Object.assign({}, defaults, {
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            })
        );
    }, 250);
};
