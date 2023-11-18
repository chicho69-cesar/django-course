import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { editUser, getSoloUser } from '../../actions/user.js'
import Loader from '../../components/Loader'
import Messages from '../../components/Messages'
import { USER_EDIT_RESET } from '../../constants/user.js'

export default function EditProfile() {
  const [user_name, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [bio, setBio] = useState('')
  const [image, setImage] = useState('')
  const [message, setMessage] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [, setUploading] = useState(false)

  const userSolo = useSelector((state) => state.userSolo)
  const userLogin = useSelector((state) => state.userLogin)
  const userEdit = useSelector((state) => state.userEdit)
  const dispatch = useDispatch()

  const navigate = useNavigate()
  const path = '/my-profile'

  const { error, loading, user } = userSolo
  const { userInfo } = userLogin
  const { success } = userEdit

  useEffect(() => {
    if (userInfo.id !== user.id) {
      dispatch({ type: USER_EDIT_RESET })
      dispatch(getSoloUser(userInfo.id))
    } else {
      setUserName(user.user_name)
      setEmail(user.email)
      setBio(user.bio)
      setImage(user.image)
    }
  }, [dispatch, user, userInfo, success])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setMessage('Passwords must match ')
    } else {
      dispatch(editUser({
        'id': user.id,
        'user_name': user_name,
        'email': email,
        'bio': bio,
        'image': image,
        'password': password,
      }))

      navigate(path)
    }
  }

  const handleUploadFile = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()

    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`
        }
      }

      const { data } = await axios.post('http://127.0.0.1:8000/users/upload-image/', formData, config)

      setImage(data)
    } catch (error) {
      console.log(error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Messages>{error}</Messages>
      ) : (
        <div>
          {message && <Messages >{message}</Messages>}
          {error && <Messages>{error}</Messages>}

          <div className='md:grid md:grid-cols-4 md:gap-6'>
            <div className='md:col-span-1' />

            <div className='mt-5 md:col-span-2 md:mt-0'>
              <form onSubmit={handleSubmit}>
                <div className='shadow sm:overflow-hidden sm:rounded-md'>
                  <div className='space-y-6 bg-white px-4 py-5 sm:p-6'>
                    <div>
                      <div className='mt-1'>
                        <label htmlFor='user_name' className='block text-sm font-medium text-gray-700'>
                          Username
                        </label>

                        <input
                          value={user_name}
                          onChange={(e) => setUserName(e.target.value)}
                          type='text'
                          id='user_name'
                          className='relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                          placeholder='Full Name'
                        />
                      </div>

                      <br />

                      <div className='mt-1'>
                        <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
                          Email
                        </label>

                        <input
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          type='email'
                          name='email'
                          id='email'
                          className='relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                          placeholder='E-mail'
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor='about' className='block text-sm font-medium text-gray-700'>
                        About
                      </label>

                      <div className='mt-1'>
                        <textarea
                          type='text'
                          value={bio}
                          onChange={(e) => setBio(e.target.value)}
                          id='bio'
                          name='bio'
                          rows={3}
                          className='relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                          placeholder='About You'
                          defaultValue={''}
                        />
                      </div>
                    </div>

                    <label htmlFor='about' className='block text-sm font-medium text-gray-700'>
                      Update Your Password
                    </label>

                    <div className='mt-1 flex rounded-md shadow-sm'>
                      <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type='password'
                        id='password'
                        className='relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                        placeholder='Password'
                      />
                    </div>

                    <div className='mt-1 flex rounded-md shadow-sm'>
                      <input
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        type='password'
                        id='confirmPassword'
                        className='relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                        placeholder='Confirm Password'
                      />
                    </div>

                    <form>
                      <label htmlFor='about' className='block text-sm font-medium text-gray-700'>
                        Image
                      </label>

                      <input
                        type='text'
                        placeholder='Image'
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                      />

                      <input
                        label='Choose file'
                        type='file'
                        onChange={handleUploadFile}
                      />
                    </form>
                  </div>

                  <div className='bg-gray-50 px-4 py-3 text-right sm:px-6'>
                    <button
                      type='submit'
                      className='inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
