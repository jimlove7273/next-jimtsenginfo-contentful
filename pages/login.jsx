import { useState } from 'react'
import Layout from './layout'
import Router from 'next/router'


const Login = () => {

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const cklogin = (e) => {
		e.preventDefault()

		if ( username===process.env.PROTECTED_USER && password===process.env.PROTECTED_PASSWORD ) {
			var date = new Date();
			date.setTime(date.getTime()+(10*60*1000));	// first # denotes the # of minutes, 5=5 minutes
			document.cookie = "log="+username+"; expires="+date.toGMTString()+"; path=/"
			Router.push("/admin")
		} else {
			console.log("You have entered incorrect Username or Password")
		}
	}
	
	return (
		<Layout>

			<div id="loginpage">
				<div className="pgcontent">
					<div className="container">

					<div className="formarea">
						<div className="pgheading">Login</div>
							<form onSubmit={cklogin}>
								<label htmlFor="username">Username</label>
								<input type="text" name="username" value={username} onChange={(e)=>setUsername(e.target.value)} />
								<label htmlFor="password">Password</label>
								<input type="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} />

								<button className="btn" type="submit">Login</button>
							</form>
						</div>
					</div>
				</div>
			</div>

		</Layout>
	)
}

export default Login