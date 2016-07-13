const StopWatch = React.createClass({
				getInitialState: ()=> {
						"use strict";
						return {
								time: 0
						}
				},
				tick: ()=> {
						const currentState = this.state.time;
						var newState = currentState + 1;
						this.setState({state: newState});
						if (newState >= this.props.milestone) {
								this.ding();
						}
				},
				ding: ()=> {
						"use strict";

				}
		}
);
export default StopWatch;