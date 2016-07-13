const TaskList = React.createClass({
		render: function() {
				alert('rendering task list');
				var displayTask = function(task) {
						return <li>{task}</li>
				}
				return
				(
						<ul>
								{this.props.items.map(displayTask)}
						</ul>
				)
		}
});