import { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { listBlogs } from '../../actions/blog.js'
import { getSoloUser } from '../../actions/user.js'
import Loader from '../../components/Loader'
import Messages from '../../components/Messages'

export default function UserProfile() {
  const { id } = useParams()

  const blogList = useSelector((state) => state.blogList)
  const userSolo = useSelector((state) => state.userSolo)
  const dispatch = useDispatch()

  const { error: errorBlog, loading: blogLoading, blogs } = blogList
  const { loading, error, user } = userSolo

  useEffect(() => {
    dispatch(getSoloUser(id))
    dispatch(listBlogs())
  }, [dispatch, id])

  return (
    <>
      {blogLoading && <Loader />}
      {errorBlog && <Messages variant='danger'>{errorBlog}</Messages>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Messages variant='danger'>{error}</Messages>
      ) : (
        <div className='mx-auto max-w-7xl px-4 sm:px-6 pt-6'>
          <div className='overflow-hidden bg-white shadow sm:rounded-lg'>
            <div className='px-4 py-5 sm:px-6'>
              <center>
                <img className='h-40 w-55 rounded-lg object-cover object-center' src={`http://127.0.0.1:8000${user.image}`} alt='' />
                <br />
                <h3 className='text-lg font-medium leading-6 text-gray-900'>{user.user_name} &nbsp;&nbsp;&nbsp;&nbsp;

                </h3>
              </center>

              <p className='mt-1 max-w-2xl text-sm text-gray-500'>Personal details</p>
            </div>

            <div className='border-t border-gray-200'>
              <dl>
                <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                  <dt className='text-sm font-medium text-gray-500'>Username</dt>
                  <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>{user.user_name}</dd>
                </div>

                <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                  <dt className='text-sm font-medium text-gray-500'>Email address</dt>
                  <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>{user.email}</dd>
                </div>

                <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                  <dt className='text-sm font-medium text-gray-500'>About</dt>
                  <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                    {user.bio}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <h2 className='mt-6 mb-6 text-center text-3xl font-bold tracking-tight text-gray-900'>
            -- POSTS --
          </h2>

          {blogs.map((blog) => (
            <Fragment key={blog.id}>
              {user.user_name === blog.user && (
                <div className='py-20 bg-gray-200'>
                  <div className=' px-10'>
                    <div className='max-w-md mx-auto bg-white shadow-lg rounded-md overflow-hidden md:max-w-md'>
                      <div className='md:flex'>
                        <div className='w-full'>
                          <div key={blog.id} className='flex justify-between items-center m-8'>
                            <div className='flex flex-row items-center'>
                              <img src={`http://127.0.0.1:8000${user.image}`} className='rounded-lg object-cover object-center' width='40' />

                              <div className='flex flex-row items-center ml-2'>
                                <span className='font-bold mr-1'>{blog.user}</span>
                              </div>
                            </div>
                          </div>

                          <div />

                          <div className='p-4 flex justify-between items-center'>
                            <p >{blog.body}</p>
                          </div>
                          
                          <div className='p-4 flex justify-between items-center'>
                            <div className='flex flex-row items-center'>
                              <a
                                href={`/one-blog/${blog.id}`}
                                className='group relative flex  justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                              >
                                See More
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Fragment>
          ))}
        </div>
      )}
    </>
  )
}
