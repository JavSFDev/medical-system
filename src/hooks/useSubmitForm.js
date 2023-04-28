import { useEffect, useState } from 'react'
const BASE_URL =
    import.meta.env.VITE_BASE_URL

export function useSubmitForm({ endpoint, action, formData, start, user = null }) {
    const [responseData, setData] = useState(null)
    const [errorData, setError] = useState('')
    const [loadedData, setLoaded] = useState(false)

    useEffect(() => {
            let headerVar = ''
            if (user) {
                headerVar = `Bearer ${user}`
            }
            if (start) {
                fetch(`${BASE_URL}${endpoint}`, {
                        mode: 'cors',
                        credentials: 'same-origin',
                        method: action,
                        headers: {
                            'Content-Type': 'application/json',
                            Authentication: headerVar
                        },
                        body: JSON.stringify(formData)
                    })
                    .then((res) => {
                        if (!res.status) {
                            throw new Error('Error de red o servidor')
                        }
                        return res.json()
                    })
                    .then(response => {
                        // console.log(response)
                        setData(response.results)
                        setError(response.error)
                        setLoaded(true)
                    })
                    .catch(error => {
                        if (error instanceof SyntaxError) {
                            console.log(error)
                            throw new Error('Respuesta no válida del servidor')
                        }
                    })
            }
        }, [endpoint, start]) // Or [] if effect doesn't need props or state
    return { responseData, errorData, loadedData }
}