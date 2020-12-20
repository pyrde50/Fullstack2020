const listHelper = require('../utils/list_helper')

describe('most liked author', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  const emptyList = []

  const listWithFiveBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. D!ijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676134d17f8',
      title: 'Go To Satement Considered Harmful',
      author: 'Edsger W. Dijks!tra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 7,
      __v: 0
    },
    {
      _id: '5a422aa74b54a676234d17f8',
      title: 'Go To Statemnt Considered Harmful',
      author: 'Edsger W. Dijkstra!',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 0,
      __v: 0
    },
    {
      _id: '5a422aa71b74a676234d17f8',
      title: 'Go To Statement Consdered Harmful',
      author: 'Edsge!r W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 2,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d97f8',
      title: 'Go To Statement Considred Harmful',
      author: 'Ed!sger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 15,
      __v: 0
    },

  ]

  const listWithTwoOfTheSame = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. D!ijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676134d17f8',
      title: 'Go To Satement Considered Harmful',
      author: 'Edsger W. Dijks!tra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 7,
      __v: 0
    },
    {
      _id: '5a422aa74b54a676234d17f8',
      title: 'Go To Statemnt Considered Harmful',
      author: 'Edsger W. Dijkstra!',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 0,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d97f8',
      title: 'Go To 2222222 Statement Considred Harmful',
      author: 'Ed!sger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 15,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d97f8',
      title: 'Go To Statement Considred Harmful',
      author: 'Ed!sger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 15,
      __v: 0
    },

  ]

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 5
    })
  })

  test('empty', () => {
    const result = listHelper.mostLikes(emptyList)
    expect(result).toBe(NaN)
  })

  test('when list has five items', () => {
    const result = listHelper.mostLikes(listWithFiveBlogs)
    expect(result).toEqual({
      author: 'Ed!sger W. Dijkstra',
      likes: 15
    })
  })
  test('two of the same', () => {
    const result = listHelper.mostLikes(listWithTwoOfTheSame)
    expect(result).toEqual({
      author: 'Ed!sger W. Dijkstra',
      likes: 30
    })
  })
})