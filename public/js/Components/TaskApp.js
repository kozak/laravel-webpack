const TaskApp = React.createClass({
		getInitialState: function(){
				return {
						items: []
				}
		},
		render: function() {
				return (
						<div>
								<h1>Tasks:</h1>
								<TaskList items={this.state.items}/>
								<form action="" >
										<input type="text"/>
										<button>Add text</button>
								</form>
						</div>
				)
		}
});
ReactDOM.render(<TaskApp/>, document.body);
