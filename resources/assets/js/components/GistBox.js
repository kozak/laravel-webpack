var GistBox = React.createClass({
		getInitialState: ()=> {
				return {gists: []}
		},
		addGist: (username)=> {
				var url = 'https://api.github.com/users/${username}/gists';
				$.get(url, (result)=> {
						var username = result[0].owner.login;
						var url = result[0].html_url;
						var gists = this.state.gists.concat({username: username});
						this.setState({gists});
				}).bind(this);
		},
		render: ()=> {
				var newGist = function(gist) {
						return <Gist username={gist.username} url={gist.url}/>
				};
				return (
						<div>
								<h1>Gist box</h1>
								<GistAddForm onAdd={this.addGist}/>
								{this.state.gists.map(newGist)}
						</div>
				)
		}
});
export default GistBox;
