const listHelper = require('../utils/list_helper');
 test("dummy is called", () => {
  const blogs = [];
   const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 123,
    __v: 0
  }
]
const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }  
]

describe("total likes", () => {
  test("empty list returns zero", () => {
    expect(listHelper.totalLikes([])).toBe(0);
  });

  test("when list has only one blog equals the likes of that", () => {
    const result = listHelper.totalLikes([listWithOneBlog[0]]);
    expect(result).toBe(123);
  });

  test("big list returns sum of likes", () => {
    expect(listHelper.totalLikes(blogs)).toBe(36);
  });
});

describe("favoriteBlog", () => {
  test("empty list returns null", () => {
    expect(listHelper.favoriteBlog([])).toEqual(null);
  });
  test("big lists returns right blog", () => {
    expect(listHelper.favoriteBlog(blogs)).toEqual(blogs[2]);
  })
  test("list with one blog returns the only blog", () => {
    expect(listHelper.favoriteBlog(listWithOneBlog)).toEqual(listWithOneBlog[0]);
  })
});

describe("mostBlogs", () => {
  test("empty list returns null", () => {
    expect(listHelper.mostBlogs([])).toEqual(null);
  });
  test("big lists returns right author and blog count", () => {
    expect(listHelper.mostBlogs(blogs)).toEqual({
      author: "Robert C. Martin",
      blogs: 3
    });
  })
  test("list with one blog returns the author and 1", () => {
    expect(listHelper.mostBlogs(listWithOneBlog)).toEqual({
      author: "Edsger W. Dijkstra",
      blogs: 1
    });
  })
});

describe("mostLikes", () => {
  test("empty list returns null", () => {
    expect(listHelper.mostLikes([])).toEqual(null);
  });
  test("big lists returns right author and amount of likes", () => {
    expect(listHelper.mostLikes(blogs)).toEqual({
      author: "Edsger W. Dijkstra",
      blogs: 17
    });
  })
  test("list with one blog returns the author and 123", () => {
    expect(listHelper.mostLikes(listWithOneBlog)).toEqual({
      author: "Edsger W. Dijkstra",
      blogs: 123
    });
  })
});