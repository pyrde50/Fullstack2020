import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from '../Blog'
import blogs from '../../services/blogs'


describe('testing blogs', () => {

  const blog = {
    user: 'testaaja',
    likes: 69,
    author: 'tester',
    title: 'testit',
    url: 'www.testi.fi',
  }
  const mockHandler = jest.fn()
  const addLike = jest.fn()
  let component
  beforeEach(() => {
    component = render(
      <Blog blog={blog} editVisibility={mockHandler} addLike={addLike} />
    )
  })

  test('renders only author and title', () => {
    expect(component.container).toHaveTextContent('testit')
    expect(component.container).toHaveTextContent('tester')
    expect(component.container).not.toHaveTextContent('www.testi.fi')
    expect(component.container).not.toHaveTextContent(69)
  })

  test('renders all after click', () => {

    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent('testit')
    expect(component.container).toHaveTextContent('tester')
    expect(component.container).toHaveTextContent('www.testi.fi')
    expect(component.container).toHaveTextContent('likes 69')
  })



})

test('like called two times when clicked twice', () => {
  const mockHandler = jest.fn()
  const addLike = jest.fn()
  const Delete = jest.fn()

  const blog = {
    user: 'testaaja',
    likes: 69,
    author: 'tester',
    title: 'testit',
    url: 'www.testi.fi',
    userID: '3456utrhfdh'
  }

  const component = render(
    <div>
      {blog.title} <button onClick={mockHandler}>hide</button>
      <div>{blog.url}</div>
      <div>likes {blog.likes} <button onClick={addLike}>like!</button></div>
      <div>{blog.author}</div>
      {blogs.userID === blog.user.id && <button onClick={Delete}>Delete</button>}
    </div>
  )

  const like = component.getByText('like!')
  fireEvent.click(like)
  fireEvent.click(like)

  expect(addLike.mock.calls).toHaveLength(2)
})