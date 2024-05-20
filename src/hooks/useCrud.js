import axios from 'axios'
import React, { useState } from 'react'

const useCrud = (path) => {
    const [response, setResponse] = useState()

    const BASE_URL = 'https://users-crud.academlo.tech'

    //GET
    const getApi = () => {
        const url = `${BASE_URL}${path}`
        axios.get(url)
            .then(res => setResponse(res.data))
            .catch(err => console.log(err))
    }

    //POST

    const postApi = (data) => {
        const url = `${BASE_URL}${path}`
        axios.post(url, data)
            .then(res => {
                console.log(res.data)
                setResponse([...response, res.data])
            })
            .catch(err => console.log(err))
        
    }

    //DELETE
    const deleteApi = (id) => {
        const url = `${BASE_URL}${path}${id}/`
        axios.delete(url)
            .then(res => {
                console.log(res.data)
                setResponse(response.filter(el => el.id !== id))
            })
            .catch(err => console.log(err))
    }


    //UPDATE
    const updateApi = (id, data) => {
        const url = `${BASE_URL}${path}${id}/`
        axios.put(url, data)
            .then(res => {console.log(res.data)
                setResponse(response.map(el => el.id === id ? res.data : el))
            })
            .catch(err => console.log(err))
    }


    return [response, getApi, postApi, deleteApi, updateApi]

}

export default useCrud