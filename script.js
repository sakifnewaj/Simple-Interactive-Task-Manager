document.addEventListener('DOMContentLoaded', function() {
            const taskInput = document.getElementById('task-input');
            const addBtn = document.getElementById('add-btn');
            const taskList = document.getElementById('task-list');
            loadTasks();
            addBtn.addEventListener('click', addTask);
            taskInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    addTask();
                }
            });
            function addTask() {
                const taskText = taskInput.value.trim();
                
                if (taskText === '') {
                    alert('Please enter a task!');
                    return;
                }
                const taskItem = document.createElement('li');
                taskItem.className = 'task-item';
                
                taskItem.innerHTML = `
                    <span class="task-text">${taskText}</span>
                    <div class="task-actions">
                        <button class="complete-btn">✓</button>
                        <button class="delete-btn">✕</button>
                    </div>
                `;
                const completeBtn = taskItem.querySelector('.complete-btn');
                const deleteBtn = taskItem.querySelector('.delete-btn');
                
                completeBtn.addEventListener('click', function() {
                    taskItem.classList.toggle('completed');
                    saveTasks();
                });
                deleteBtn.addEventListener('click', function() {
                    taskItem.remove();
                    saveTasks();
                    checkEmptyState();
                });
                taskItem.addEventListener('dblclick', function() {
                    taskItem.classList.toggle('completed');
                    saveTasks();
                });
                taskList.appendChild(taskItem);
                taskInput.value = '';
                saveTasks();
                const emptyState = document.querySelector('.empty-state');
                if (emptyState) {
                    emptyState.remove();
                }
            }
            function saveTasks() {
                const tasks = [];
                document.querySelectorAll('.task-item').forEach(task => {
                    tasks.push({
                        text: task.querySelector('.task-text').textContent,
                        completed: task.classList.contains('completed')
                    });
                });
                
                localStorage.setItem('tasks', JSON.stringify(tasks));
            }
            function loadTasks() {
                const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
                
                if (tasks.length === 0) {
                    showEmptyState();
                    return;
                }
                tasks.forEach(task => {
                    const taskItem = document.createElement('li');
                    taskItem.className = 'task-item';
                    
                    if (task.completed) {
                        taskItem.classList.add('completed');
                    }
                    
                    taskItem.innerHTML = `
                        <span class="task-text">${task.text}</span>
                        <div class="task-actions">
                            <button class="complete-btn">✓</button>
                            <button class="delete-btn">✕</button>
                        </div>
                    `;
                    const completeBtn = taskItem.querySelector('.complete-btn');
                    const deleteBtn = taskItem.querySelector('.delete-btn');
                    
                    completeBtn.addEventListener('click', function() {
                        taskItem.classList.toggle('completed');
                        saveTasks();
                    });
                    deleteBtn.addEventListener('click', function() {
                        taskItem.remove();
                        saveTasks();
                        checkEmptyState();
                    });
                    taskItem.addEventListener('dblclick', function() {
                        taskItem.classList.toggle('completed');
                        saveTasks();
                    });
                    taskList.appendChild(taskItem);
                });
            }
            function showEmptyState() {
                const emptyState = document.createElement('div');
                emptyState.className = 'empty-state';
                emptyState.innerHTML = `
                    <i>📝</i>
                    <p>No tasks yet. Add a task to get started!</p>
                `;
                taskList.appendChild(emptyState);
            }
            function checkEmptyState() {
                if (document.querySelectorAll('.task-item').length === 0) {
                    showEmptyState();
                }
            }
        });
