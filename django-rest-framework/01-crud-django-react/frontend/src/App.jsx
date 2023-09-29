import BlogForm from './components/BlogForm'
import Blogs from './components/Blogs'
import Header from './components/Header'
import useBlogs from './hooks/use-blogs'

function App() {
  const { blogs, setBlogs } = useBlogs()

  console.log(blogs)

  return (
    <>
      <Header />

      <div className='container p-4'>
        <BlogForm blogs={blogs} setBlogs={setBlogs} />
        <Blogs blogs={blogs} setBlogs={setBlogs} />
      </div>
    </>
  )
}

export default App
