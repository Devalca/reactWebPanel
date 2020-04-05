import React, { useState, useEffect } from 'react'
import './styles.css'
import HomePage from '../HomePage'
import Login from '../Login'
import Validasi from '../HomePage/valdasi'
import Register from '../Register'
import Dashboard from '../Dashboard'
import RsCalon from '../Register/calon'
import RsUser from '../Register/user'
import ChartVote from '../List/charVote'
import ListData from '../List/listData'
import UploadImage from '../Register/upload'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { CssBaseline, CircularProgress } from '@material-ui/core'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import firebase from '../firebase'

const theme = createMuiTheme()

export default function App() {

	const [firebaseInitialized, setFirebaseInitialized] = useState(false)

	useEffect(() => {
		firebase.isInitialized().then(val => {
			setFirebaseInitialized(val)
		})
	})


	return firebaseInitialized !== false ? (
		<MuiThemeProvider theme={theme}>
			<CssBaseline />
			<Router>
				<Switch>
					<Route exact path="/" component={HomePage} />
					<Route exact path="/valdasi" component={Validasi} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/register" component={Register} />
					<Route exact path="/dashboard" component={Dashboard} />
					<Route exact path="/calon" component={RsCalon} />
					<Route exact path="/upload" component={UploadImage} />
					<Route exact path="/user" component={RsUser} />
					<Route exact path="/listdata" component={ListData} />
					<Route exact path="/vote" component={ChartVote} />
				</Switch>
			</Router>
		</MuiThemeProvider>
	) : <div id="loader"><CircularProgress /></div>
}