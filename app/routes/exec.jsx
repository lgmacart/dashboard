import { Form, useActionData, useLoaderData } from "@remix-run/react"

export async function action({request}) {
    let data = await request.formData()
    let values = Object.fromEntries(data)
    let id = data.getAll("id").map(i => parseInt(i)).filter(i => !isNaN(i))

    let outputsResponse = await fetch("http://localhost:2323/exec", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            id,
            command: values.command
        })
    })

    let jsonData = await outputsResponse.json()

    return {
        outputs: jsonData.outputs
    }
}

export async function loader() {
    let agentsResponse = await fetch(`http://localhost:2323/agents`)
    let agents = await agentsResponse.json()
    return {
        agents
    }
}

export default function Exec() {
    const { agents } = useLoaderData()
    const actionData = useActionData()

    return (
        <>
            <Form method="POST">
                <div style={{display: "flex"}}>
                {
                    agents.map(a =>
                        <div key={`agents-${a.id}`} style={{border: "solid 1px black"}}>
                            <label htmlFor={a.id}>
                                {a.name}
                            </label>
                            <input type="checkbox" id={a.id} name="id" value={a.id}></input>
                        </div>
                    )
                }
                </div>
                <input type="text" name="command"></input>
                <button type="submit">Exec</button>
            </Form>
            {
                actionData?.outputs
                ? <div>
                {
                    actionData.outputs.map(o =>
                        <div key={`outputs-${o.id}`}>
                            <p>id: {o.id}</p>
                            <p>name: {o.name}</p>
                            <textarea value={o.output ?? ""} style={{width: "100%", height: "50vh"}}/>
                        </div>
                    )
                }
                </div>
                : <></>
            }
        </>
    )
}