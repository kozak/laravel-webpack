var Gist = React.createClass({
		render() {
				return (
						<div>{this.props.username}'s las gist is: <a href={this.props.url}>here</a>.</div>);
		}
});
export default Gist;