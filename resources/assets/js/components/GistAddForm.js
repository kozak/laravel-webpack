var GistAddForm = React.createClass({
		getInitialState: function() {
				return {username: ''}
		},
		onChange: function(e) {
				this.setState({username: e.target.value})
		},
		addGist: (e)=> {
				e.preventDefault();
				this.props.onAdd(this.state.username);
				this.setState({username: ''});
		},
		render: ()=> {
				return (
						<div>
								<form className="form-inline" onSubimit={this.addGist}>
										<input type="text" onChange={this.onChange} placeholder="Type a github username"/>
										<button>Fetch the user</button>
								</form>
						</div>
				)
		}
});
export default GistAddForm;