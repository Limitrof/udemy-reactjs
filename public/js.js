//function TodoList(props) {
function TodoList({todos, onSetTodoStatus}) {
	/* const items = [];
	for (let todo of todos){
		items.push(<li key={todo.id}>
			
			{todo.text}</li>);
	} */
	return (
			<ul>
			{todos.map(todo => 
				<li key={todo.id}>
					<label>
						<input type="checkbox" checked={todo.isCompleted} onChange={e => onSetTodoStatus(todo, e.target.checked)} />
							{todo.isCompleted?<del>{todo.text}</del>: todo.text}
					</label>	
				</li>)}
			</ul>
		);//{items}
		

}
class TodoForm extends React.Component {
	constructor(props) {
		super(props);
		this._onSubmit = this._onSubmit.bind(this);
	}
	render(){
		return(
			<form onSubmit={this._onSubmit}>
				<input type="text" ref={input => this._todoText = input}/>
				<button>Add todo</button>
			</form>
		); 
	}
	
	focusInput() {
		this._todoText.focus();
	}
	
	_onSubmit(e){
		e.preventDefault();
		const todoText = this._todoText.value.trim();
		if (todoText.length == 0)
			return;
		
		this._todoText.value = "";
		this.props.onAddTodo(todoText);
	}
}

TodoForm.propTypes = {
	onAddTodo: React.PropTypes.func.isRequired
}

class AppComponent extends React.Component {
	constructor(props) {
		super(props);
		this._nextTodoId = 1;
		this.state = {
			filter: { showCompleted: true },
			todos: [
			{id: this._nextTodoId++, text: "point 1", isCompleted: false},
			{id: this._nextTodoId++, text: "point 2", isCompleted: false},
			{id: this._nextTodoId++, text: "point 3", isCompleted: true},
			{id: this._nextTodoId++, text: "point 4", isCompleted: false},
			],
			cnt:7,ttl:"hi"};
		this.incdec = this.incdec.bind(this);
		this.increment = this.increment.bind(this);
		this.decrement = this.decrement.bind(this);
		this._onShowCompletedChanged = this._onShowCompletedChanged.bind(this);
		this._setTodoStatus = this._setTodoStatus.bind(this);
		this._setTodoStatus = this._setTodoStatus.bind(this);
		this._addTodo = this._addTodo.bind(this);
	}
	
	componentDidMount() {
	this._todoForm.focusInput(); //[this._todoForm] 
	}
	
	render(){
		const{filter,todos,cnt,ttl}=this.state;
		const filteredTodos = filter.showCompleted ? todos : todos.filter(todo => !todo.isCompleted);
		
		let date = new Date().toJSON().slice(0,10).toString();
		while (date.indexOf("-") > 0){
			date = date.replace("-",".");
		}

/* 		while(date.indexOf('-')>0) {
			//date.replace("-",".");
		} */
		return (<div className="some">{date} - на сегодня {cnt} задач:
				<button onClick={this.decrement}>-</button>
				<button onClick={this.increment}>+</button>
				<button onClick={this.incdec}>7</button>
				<h2>Todo List...</h2>
				<label>Completed
					<input type="checkbox" checked={filter.showCompleted} onChange={this._onShowCompletedChanged}/>
				</label>
				<TodoList todos={filteredTodos} onSetTodoStatus={this._setTodoStatus} />
				<TodoForm onAddTodo={this._addTodo} ref={form => this._todoForm = form}/>
				</div>);
	}
	
	_addTodo(text) {
		this.setState({
			todos: this.state.todos.concat({
				id: this._nextTodoId++,
				text,
				isCompleted: false
			})
		});
	}
	
	_setTodoStatus(todo, isCompleted){
		const{todos} = this.state;
		const newTodos = todos.map(currTodo => {
			if (currTodo.id !== todo.id)
				return currTodo;
			return Object.assign({},currTodo,{isCompleted});
		});
		this.setState({
			todos:newTodos
		});
	}
	_onShowCompletedChanged(e) {
		this.setState({
			filter: {showCompleted: e.target.checked}
		});
	}
	incdec(){
		const{cnt}=this.state;
		this.setState({cnt:7});
		console.log('just set 7');
	}
	decrement(){
		const{cnt}=this.state;
		console.log('minus'+this);
		this.setState({cnt:cnt - 1});
	}
	increment(){
		const{cnt}=this.state;
		console.log('plus'+this);
		this.setState({cnt:cnt + 1});
	}
}
ReactDOM.render(
	React.createElement(AppComponent,null),
	document.getElementById("application")
	       );
