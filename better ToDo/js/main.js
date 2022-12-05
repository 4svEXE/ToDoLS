//создаем обьект с массивом внутри в который переданн обьект таска с его текстом и чекнут ли он
let tasks = {mass: [{text: 'удалить эту запись',checked: false}]} , todo = ""

// очищаем див с тасками чтоб потом заполнить новыми
const wipeTasks = () => qs('.active_tasks').innerHTML = ''

// добавляем массив тасков в локал сторейдж
const addInLocal = item => localStorage.setItem('todo', JSON.stringify(item))

// если в локал сторейдже есть ключ с именем todo то переменная tasks заполняется массивом из локалки а если нет то добавляет в локалку нынешний tasks
localStorage.getItem('todo')? tasks = JSON.parse(localStorage.getItem('todo')): addInLocal(tasks)

// добавляет таск в виде хтмл в класс active_tasks
function addTask(value, check = ''){
	let task = document.createElement('div')
	task.classList = 'task'
	task.innerHTML = `
		<input type="checkbox" class="check" ${check?'checked':0}>
		<span>${value}</span>
		<div class="delete">+</div>
	`
	qs('.active_tasks').appendChild(task);
}

// сохраняет таск в массиве tasks.mass и потом сохраняет его в локалку
function saveTask(text, check){
	if (text) {
		tasks.mass[tasks.mass.length] = {text: 0, checked: false}
		tasks.mass[tasks.mass.length-1].text = text
		tasks.mass[tasks.mass.length-1].checked = check
		addInLocal(tasks)
	}
}

// если в локалке есть ключ todo то обновляет список тасков в хтмл
function loadTasks(){
	if (localStorage.getItem('todo')) {
		wipeTasks()
		todo = JSON.parse(localStorage.getItem('todo'))
		
		for (var i = 0; i < tasks.mass.length; i++) {
			let task = todo.mass[i]
			addTask(task.text, task.checked)
		}
	}
}

// добавляет сохраняет обновляет таски и очищает поле ввода
const newTask = () =>{
	addTask(task_input.value, false)
	saveTask(task_input.value, false)
	loadTasks()
	task_input.value = ''
}

// удаляет таск из хтмл и из локалки
function delTasks(e, id){
	qs('.active_tasks').removeChild(e.target.parentElement)
	tasks.mass.splice(id, 1)
	addInLocal(tasks)
	loadTasks()
}

// при движении мышкой по хтмл запускается функцыи удаления и меняет состояние чекбокса
//(onmousemove тут костыль потому что после одного срабатывания цыкл останавливался и функцыя больше не выполнялась)
qs('.active_tasks').onmousemove = function(e){
	for (var i = 0; i < qsa('.task').length; i++) {
		let id = i
		qsa('.delete')[i].onclick = e => delTasks(e, id)
		qsa('.check')[i].onclick = () => addCheck(id)
	}
}

//меняет состояние чекбокса
function addCheck(id){
	tasks.mass[id].checked? tasks.mass[id].checked = false: tasks.mass[id].checked = true
	addInLocal(tasks)
}

// удаляет из локалки ключ todo и обновляет страницу
dellAll.onclick = function(){
	localStorage.removeItem('todo')
	location.reload()
}

// сохраняет таск
task_input.onkeypress = e =>e.keyCode == 13?newTask():0
task_add.onclick = () => newTask()

// при загрузке страниы выводит в хтмл таски из локалки
localStorage.getItem('todo')?loadTasks():0