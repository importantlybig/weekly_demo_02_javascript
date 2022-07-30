// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
	// DOM Load event
	document.addEventListener('DOMContentLoaded', getTasks);

	// Add task event
	form.addEventListener('submit', addTask);

	// Remove task event
	taskList.addEventListener('click', removeTask);

	// Clear task event
	clearBtn.addEventListener('click', clearTasks);

	// Filter task event
	filter.addEventListener('keyup', filterTasks);
}

// Get Tasks from LS
function getTasks() {
	let tasks;
	if (localStorage.getItem('tasks') === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}

	tasks.forEach(function (task) {
		// Create li element
		const li = document.createElement('li');
		// Add class
		li.className = 'collection-item';
		// Create text node and append to li
		li.appendChild(document.createTextNode(task));
		// Create new link element
		const link = document.createElement('a');
		// Add class
		link.className = 'delete-item secondary-content';
		// Add icon HTML
		link.innerHTML = '<i class="fa fa-remove"></i>';
		// Append the link to li
		li.appendChild(link);

		// Append li to ul
		taskList.appendChild(li);
	});
}

// Add task
function addTask(e) {
	if (taskInput.value === '') {
		alert('Please add a valid task');
		return;
	}

	// Create li element
	const li = document.createElement('li');
	// Add class
	li.className = 'collection-item';
	// Create text node and append to <li></li>
	li.appendChild(document.createTextNode(taskInput.value));

	// Create new link element
	const link = document.createElement('a');
	// Add class
	link.className = 'delete-item secondary-content';
	// Add icon HTML
	link.innerHTML = '<i class="fa fa-remove"></i>';
	// Append the link to li
	li.appendChild(link);

	// Append li to ul
	taskList.appendChild(li);

	// Store in Localstorage
	storeTaskInLocalStorage(taskInput.value);

	// Clear input
	taskInput.value = '';

	e.preventDefault();
}

// Store Task in localstorage
function storeTaskInLocalStorage(task) {
	let tasks;
	if (localStorage.getItem('tasks') === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}

	tasks.push(task);

	localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove task
function removeTask(e) {
	console.log(e.target.parentElement);
	console.log(e.target.parentElement.parentElement);
	console.log(e.target.parentElement.parentElement.textContent);
	if (e.target.parentElement.classList.contains('delete-item')) {
		if (confirm('Are You Sure?')) {
			e.target.parentElement.parentElement.remove();

			// Remove from Localstorage //(3_4)
			removeTaskFromLocalStorage(e.target.parentElement.parentElement);
		}
	}
}

// Remove from LS
function removeTaskFromLocalStorage(taskItem) {
	let tasks;
	if (localStorage.getItem('tasks') === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}

	tasks.forEach(function (task, index) {
		if (taskItem.textContent === task) {
			tasks.splice(index, 1);
		}
	});

	localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear task
function clearTasks() {
	console.log(taskList.firstChild);
	// Faster
	while (taskList.firstChild) {
		taskList.removeChild(taskList.firstChild);
	}

	// Clear From LS
	clearTasksFromLocalStorage();
}

// Clear Tasks from LS
function clearTasksFromLocalStorage() {
	localStorage.clear();
}


// Filter tasks
function filterTasks(e) {
	const text = e.target.value.toLowerCase();
	// console.log(text);
	document.querySelectorAll('.collection-item').forEach(function (task) {
		// console.log(task);
		const item = task.firstChild.textContent;
		// console.log(item.toLowerCase());
		if (item.toLowerCase().indexOf(text) != -1) {
			task.style.display = 'block';
		} else {
			task.style.display = 'none';
		}
	});
}

console.log(document.querySelectorAll('.collection-item'));