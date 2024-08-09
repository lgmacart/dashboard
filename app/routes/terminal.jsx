import { useState } from "react"

export default function Index() {
	const [status, setStatus] = useState("")
	const [command, setCommand] = useState("")

	async function handleRun() {
		let response = await fetch("http://192.1.1.103:8080/run", {
			method: "POST",
			headers: {
				"content-type": "application/json"
			},
			body: JSON.stringify({
				command
			})
		})

		let text = await response.text()

		setStatus(text)
		setCommand("")
	}

	return (
		<div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
			<textarea style={{width: "100%", height: "50vh"}} value={status}/>
			<input type="text" value={command} onChange={(event) => setCommand(event.target.value)}/>
			<button type="button" onClick={handleRun}>Run</button>
		</div>
	)
}
