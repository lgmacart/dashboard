import { useEffect, useState } from "react"

export default function Index() {
	const [status, setStatus] = useState(null)

	useEffect(() => {
		let interval = setInterval(async () => {
			try {
				let response = await fetch("http://192.1.1.103:8080/status")
				let text = await response.text()
				setStatus(text)
			}
			catch(error) {
				console.log(error)
			}
		}, 1000)

		return () => clearInterval(interval)
	}, [])

	return (
		<div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
			<textarea value={status} style={{width: "100%", height: "50vh"}}/>
		</div>
	)
}
