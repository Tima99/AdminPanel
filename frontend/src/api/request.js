import axios from "axios"

const req = axios.create({
    baseURL: "http://localhost:7000/api/",
    timeout: 20000,
    withCredentials: true
})

export default req

export const register = async (data) => {
    try {
        const res = await req.post('/register', data)
        return res.data
    } catch (error) {
        return Promise.reject(error?.response?.data || error)        
    }
} 


export const login = async (data) => {
    try {
        const res = await req.post('/login', data)
        return res.data
    } catch (error) {
        return Promise.reject(error?.response?.data || error)        
    }
} 

export const createUser = async ({adminEmail, user}) => {
    try {
        const res = await req.post(`/createUser/${adminEmail}`, user)

        return res.data
    } catch (error) {
        return Promise.reject(error?.response?.data || error)        
    }
} 

export const editUser = async ({adminEmail, editUserEmail ,user}) => {
    try {
        // console.log({adminEmail, editUserEmail ,user});
        const res = await req.post(`/editUser/${adminEmail}`, {user, editUserEmail})

        return res.data
    } catch (error) {
        return Promise.reject(error?.response?.data || error)        
    }
}

export const deleteUser = async ({ adminEmail, deleteUserEmail}) => {
    try {
        // console.log({adminEmail, editUserEmail ,user});
        const res = await req.get(`/delete/${adminEmail}/${deleteUserEmail}`)

        return res.data
    } catch (error) {
        return Promise.reject(error?.response?.data || error)        
    }
}