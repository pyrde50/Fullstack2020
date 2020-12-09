const dummy = (blogs) => {
  return 1
}


const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0
  } else {
    const likesArray = blogs.map((blog) =>  blog.likes)
    console.log(likesArray)
    if (blogs.length === 1) {
      return likesArray[0]
    } else {
      return likesArray.reduce((a, b) => a + b, 0)
    }
  }
}

module.exports = {
  dummy, totalLikes
}