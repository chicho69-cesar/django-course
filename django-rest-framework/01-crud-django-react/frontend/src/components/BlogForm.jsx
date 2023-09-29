import { useState } from 'react'
import axios from 'axios'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

export default function BlogForm({ blogs, setBlogs }) {
  const [body, setBody] = useState('')

  const handleChangeBody = (e) => {
    setBody(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!body) {
      console.error('No hay nada para agregar')
      return
    }

    const { data } = await axios.post('http://localhost:8000/post/', {
      body
    })

    setBlogs([...blogs, data])
    setBody('')
  }

  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup className='mb-3'>
        <FormControl
          type='text'
          placeholder='Type here...'
          value={body}
          onChange={handleChangeBody}
        />

        <Button variant='dark' type='submit'>Agregar</Button>
      </InputGroup>
    </Form>
  )
}
