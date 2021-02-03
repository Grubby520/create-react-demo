import React from 'react'

// before
// function Toolbar(props) {
// 	return (
// 		<div>
// 				<ThemedButton theme={props.theme} />
// 		</div>
// 	)
// }

// class ThemedButton extends React.Component {
// 	render() {
// 		return <button theme={this.props.theme} >{this.props.theme}</button>;
// 	}
// }

// class App extends React.Component {
// 	constructor(props) {
// 		super(props)
// 		this.handleSetTheme = this.handleSetTheme.bind(this)
// 		this.state = {
// 			theme: 'dark'
// 		}
// 	}

// 	handleSetTheme() {
// 		this.setState(state => ({
// 			theme: state.theme === 'dark' ? 'blue' : 'dark'
// 		}))
// 	}

// 	getSetTheme() {
// 		return this.state.theme === 'dark' ? 'blue' : 'dark'
// 	}

// 	render() {
// 		return (
// 			<div>
// 				<Toolbar theme={this.state.theme} />
// 				<button onClick={this.handleSetTheme}>make theme {this.getSetTheme()}</button>
// 			</div>
// 		);
// 	}
// }

// export default App

// after
import { ThemeContext } from '../context/theme-context'

class ThemedButton extends React.Component {
	render() {
		// const props = this.props
		const theme = this.context
		console.log(theme)
		return (
			<button
				{...this.props}
				// 双大括号? {{}}
				style={{backgroundColor: theme.background}}
			>{theme.name}</button>
		)
	}
}

ThemedButton.contextType = ThemeContext

export default ThemedButton
