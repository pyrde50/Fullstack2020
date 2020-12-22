import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm, { AddBlogForm } from '../BlogForm'


const handleLogout = jest.fn()

test ('blog calls callback function when created', () => {
    const addBlog = jest.fn()
  const component = render(
    <BlogForm handleLogout={handleLogout}/>
  )
  const author = component.container.querySelector('#author')
  const title = component.container.querySelector('#title')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(author, {
    target: { value: 'joku' }
  })

  fireEvent.change(title, {
    target: { value: 'uusi testi' }
  })
  fireEvent.change(url, {
    target: { value: 'www.testi.fi' }
  })
  fireEvent.submit(form)
  console.log(author.target)

  expect(author.target.value).toBe('joku')
  expect(title.target.value).toBe('uusi testi')
  expect(url.target.value).toBe('www.testi.fi')







})

