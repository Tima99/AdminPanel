import { useEffect } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const useSubmitForm = ({data, api, navigateTo, options={}, setResponseTo }) => {
    const [msg, setMsg] = useState()
    const [response, setResponse] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        const timeout = setTimeout(setMsg, 2500, '')

        return () => clearTimeout(timeout)
    }, [msg])
    
    async function SubmitHandler(e){
        e.preventDefault()

        const form = e.target.parentElement
        const isValid = form.checkValidity()

        
        try {
            if(!isValid) throw Error("All fields required")
            
            // console.log(data);
            const _data = await api(data)
            // console.log(_data);

            setResponse(_data)
            setMsg('$ Sucess')

            if(!navigateTo) return

            navigate(navigateTo, {replace: true, state: _data, ...options})

        } catch (error) {
            let msg = error?.message || error
            setMsg(msg)
        }
    }

    return [SubmitHandler, msg, response , setMsg,]
}