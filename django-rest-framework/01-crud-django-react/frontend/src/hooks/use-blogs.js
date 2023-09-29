import { useState, useEffect } from 'react'
import axios from 'axios'

export default function useBlogs() {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    const controller = new AbortController()

    const fetchBlogs = async () => {
      const { data } = await axios.get('http://localhost:8000/get/')
      setBlogs(data)
    }

    fetchBlogs()

    return () => {
      controller.abort()
    }
  }, [])

  return {
    blogs,
    setBlogs
  }
}