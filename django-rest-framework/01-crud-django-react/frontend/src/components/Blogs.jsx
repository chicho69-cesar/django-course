import { useState } from 'react'
import axios from 'axios'

import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/esm/ListGroupItem'
import FormControl from 'react-bootstrap/FormControl'
import Modal from 'react-bootstrap/Modal'
import ModalHeader from 'react-bootstrap/esm/ModalHeader'

import { FaEdit, FaTrashAlt } from 'react-icons/fa'

export default function Blogs({ blogs, setBlogs }) {
  const [show, setShow] = useState(false)
  const [record, setRecord] = useState(null)

  const handleUpdate = async (id, value) => {
    const { data } = await axios.put(`http://localhost:8000/put/${id}/`, value)

    const newBlogs = blogs.map((blog) => {
      if (blog.id === id) return data
      return blog
    })

    setBlogs(newBlogs)
  }

  const handleClose = () => {
    setShow(false)
  }

  const handleSaveChanges = async () => {
    await handleUpdate(record.id, { body: record.body })
    handleClose()
  }
  
  const handleChange = (e) => {
    setRecord({
      ...record,
      body: e.target.value
    })
  }

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8000/delete/${id}/`)

    const newBlogs = blogs.filter((blog) => blog.id !== id)
    setBlogs(newBlogs)
  }

  return (
    <div>
      <ListGroup>
        {blogs.map((blog) => (
          <ListGroupItem 
            key={blog.id}
            className='d-flex justify-content-between align-items-center'
          >
            {blog.body}

            <div>
              <FaEdit
                size={20}
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  setRecord(blog)
                  setShow(true)
                }}
              />

              <FaTrashAlt
                size={20}
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  handleDelete(blog.id)
                }}
              />
            </div>
          </ListGroupItem>
        ))}
      </ListGroup>

      <Modal show={show} onHide={handleClose}>
        <ModalHeader closeButton>
          <Modal.Title>EDIT BLOG</Modal.Title>
        </ModalHeader>

        <Modal.Body>
          <FormControl
            value={record ? record.body : ''}
            onChange={handleChange}
          />
        </Modal.Body>

        <Modal.Footer>
          <Button variant='dark' onClick={handleClose}>
            Cerrar
          </Button>
          
          <Button variant='dark' onClick={handleSaveChanges}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
