var Gist = React.createClass({
		render: ()=> {
				return (
						<div>
								{this.props.username}'s last Gist is on <a href={this.props.url}>here</a>
						</div>
				);
		}
});
export default Gist;