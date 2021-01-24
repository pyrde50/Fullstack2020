
// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}


const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0
  } else {
    const likesArray = blogs.map((blog) =>  blog.likes)
    if (blogs.length === 1) {
      return likesArray[0]
    } else {
      return likesArray.reduce((a, b) => a + b, 0)
    }
  }
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return NaN
  } else {
    if (blogs.length === 1) {
      return blogs[0]
    } else {
      const likesArray = blogs.map((blog) =>  blog.likes)
      likesArray.sort((a,b) => b - a)
      const finale = blogs.filter(blog => likesArray[0] === blog.likes)
      return finale[0]
    }
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return NaN
  } else {
    if (blogs.length === 1) {
      return {
        author: blogs[0].author,
        blogs: 1
      }
    } else {
      const authors = blogs.map((blog) => blog.author)
      const authorsWBlogs = authors.map((author) => {
        return ({
          author: author,
          blogs: blogs.filter((blog) => blog.author === author).length
        })
      })
      const sorted = authorsWBlogs.sort((a,b) => b.blogs - a.blogs)
      return sorted[0]
    }
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return NaN
  } else {
    if (blogs.length === 1) {
      return {
        author: blogs[0].author,
        likes: blogs[0].likes
      }
    } else {
      const authors = blogs.map((blog) => blog.author)
      const authorsWLikes = authors.map((author) => {
        return ({
          author: author,
          likes: blogs.filter((blog) => blog.author === author).map((blog) => blog.likes).reduce(function(a,b) {return a + b})
        })
      })
      const sorted = authorsWLikes.sort((a,b) => b.likes - a.likes)
      return sorted[0]
    }
  }
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}