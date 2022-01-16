import { useState } from 'react'
import Layout from './layout'


const Contact = () => {

	const [msgdata,setMsgdata] = useState({
		name: '',
		email: '',
		subject: '',
		msg: ''
	})
	const [status, setStatus] = useState('')


	const handleSubmit = async (e) => {
		e.preventDefault()

		let outmessage = "Name: " + msgdata.name + "<br>"
		outmessage += "Email: " + msgdata.email + "<br>"
		outmessage += "Subject: " + msgdata.subject + "<br>"
		outmessage += "Message: " + msgdata.msg + "<br><br>"
		
		const res = await fetch('/api/sendemail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ msgdata, outmessage })
    })
		const text = await res.text()

		if (text === "Message sent successfully.") {
			setStatus("Message Sent Successfully")
		}
	}
	
	return (
		<Layout>

			<div id="contactpage">
				<div className="pgcontent">
					<div className="container">

					<div className="pgheading">Contact Me</div>
					<div className="formarea">

						{ status && <div className="statusbar">{status}</div> }
						
						<form onSubmit={handleSubmit}>
							<label htmlFor="name">Your Name</label><br />
							<input type="text" id="name" name="name" value={msgdata.name}
								onChange={(e) => setMsgdata({...msgdata, name: e.target.value })} /><br />
							<label htmlFor="email">Your Email</label><br />
							<input type="text" id="email" name="email" value={msgdata.email}
								onChange={(e) => setMsgdata({...msgdata, email: e.target.value })} /><br />
							<label htmlFor="subject">Subject</label><br />
							<input type="text" name="subject" value={msgdata.subject}
								onChange={(e) => setMsgdata({...msgdata, subject: e.target.value })} /><br />
							<label htmlFor="msg">Your Message</label><br />
							<textarea name="msg" id="msg" value={msgdata.msg}
								onChange={(e) => setMsgdata({...msgdata, msg: e.target.value })} /><br /><br />
							<button type="btn">Submit</button>
						</form>

					</div>
					</div>
				</div>
			</div>

		</Layout>
	)
}

export default Contact