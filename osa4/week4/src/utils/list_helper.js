const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogs) => {
  return blogs.map(blog => blog.likes).reduce((a, b) => a + b, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((a, b) => a === null || b.likes > a.likes ? b : a, null)
}
const mostBlogs = blogs => {
  const authorsBlogs = blogs.reduce(
    (t, blog) => ({
      ...t,
      [blog.author]: (t[blog.author] || 0) + 1
    }),
    {}
  );

  //console.log(authorsBlogs)
  //console.log(authorsBlogs['Michael Chan'])
  //console.log('Something:',authorsBlogs['Something something'])
  //console.log(Object.keys(authorsBlogs))
  return Object.keys(authorsBlogs)
    .map(author => ({ author, blogs: authorsBlogs[author] }))
    .reduce(
      (a, b) =>
        a === null || b.blogs > a.blogs ? b : a,
      null
    );
};
const mostLikes = blogs => {
  const authorsBlogs = blogs.reduce(
    (t, blog) => ({
      ...t,
      [blog.author]: (t[blog.author] || 0) + blog.likes
    }),
    {}
  );

  //console.log(authorsBlogs)
  return Object.keys(authorsBlogs)
    .map(author => ({ author, blogs: authorsBlogs[author] }))
    .reduce(
      (a, b) =>
        a === null || b.blogs > a.blogs ? b : a,
      null
    );
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
