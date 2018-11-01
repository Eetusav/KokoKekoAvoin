const supertest = require('supertest')
const app = require('../app')
//const api = supertest(app)
const { Blog } = require('../models/blog')
const { User } = require('../models/user')
const config = require("../../config");
const mongoose = require("mongoose");
const request = supertest(app);


const Blogs = [
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
];
beforeAll(async () => {
  await mongoose.connect(config.testMongoUrl);
});
beforeAll(async () => {
  await Blog.remove({});
  for (blog of Blogs) {
    await new Blog(blog).save();
  }
});
afterAll(async () => {
  await mongoose.connection.close();
});
describe("GET /api/blogs", () => {
  test("number of blogs returned same as array", async () => {
    const response = await request.get("/api/blogs").expect(200);
    expect(response.body.length).toBe(Blogs.length);
  });
  test("blogs are returned as json", async () => {
    const response = await request.get("/api/blogs").expect(200);
    await request
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  });
  test("blogs are same as in array blogs", async () => {
    const response = await request.get("/api/blogs").expect(200);
    expect(response.body).toEqual(Blogs);
  });
});
describe("POST /api/blogs", () => {
  const newBlog = {
    title: "Blogi kirjoitus",
    author: "Pekka Pätkä",
    url: "http://eioikeeurlivaanjotainmuuta.asdfasdf",
    likes: 123
  }
  test("a valid blog can be added ", async () => {
    await request.post("/api/blogs").send(newBlog).expect(201)
    const response = await request.get("/api/blogs")
    const contents = response.body.map(r => r.title)
    expect(response.body.length).toBe(Blogs.length + 1)
    expect(contents).toContain('Blogi kirjoitus')
  });
  test("default likes is zero", async () => {
    const uusiBlogi = {
      title: "Bloki kirjoitus",
      author: "Pelle peloton",
      url: "http://eioikeeurlivaanjotainmuutafff.asdfasdf",
      likes: undefined
    }
    await request.post("/api/blogs").send(uusiBlogi).expect(201)
    const response = await request.get("/api/blogs")
    const contents = response.body.map(r => r.likes)
    expect(contents).not.toContain(undefined)
  });
  test("blog with no title or url returns 400 bad request", async () => {
    const huonoBlogi = {
      title: undefined,
      author: "Pelle peloton",
      url: "tämäonurl.com!",
      likes: 123
    }
    const huonoBlogi2 = {
      title: "Pelle pelottoman nerokkaat keksinnöt",
      author: "Pelle peloton",
      url: undefined,
      likes: 123
    }
    await request.post("/api/blogs").send(huonoBlogi2).expect(400)
    await request.post("/api/blogs").send(huonoBlogi).expect(400)
  });
});
describe("DELETE /api/blogs/:id", () => {
  test("a blog can be deleted ", async () => {
    const blogit = await Blog.find({})
    const poistettava = blogit[0]
    await request.delete(`/api/blogs/${poistettava._id}`).expect(204)

    const blogitPoistonJalkeen = await Blog.find({})
    expect(blogitPoistonJalkeen.length).toBe(blogit.length - 1)
    expect(blogitPoistonJalkeen).not.toContain(poistettava)
  });
});

describe("/api/users", () => {
  beforeEach(async () => {
    await User.remove({});
  });

  describe("GET /api/users", () => {
    const users = [
      {
        name: "Pekka Pätkä",
        username: "Pekka",
        passwordHash:
          "2b$10$ffZo/idP80RCvFJuGjxgUeJTmR4flLYZvC4BfgMYujunsTN4ZlyfK",
        adult: true
      },
      {
        name: "Jukka Jekku",
        username: "Jukka",
        passwordHash:
          "$2b$10$GSMYrnqbekZikmkpQgLV.e1fdOaOz0O2/MpPn3VAXsvUxyKO.Mi0a",
        adult: false
      }
    ];
    beforeEach(async () => {
      for (let user of users) {
        await new User(user).save();
      }
    });

    test("getting all users works", async () => {
      const response = await request.get("/api/users").expect(200);
      users.map(({ passwordHash, ...user }) => {
        expect(response.body).toContainEqual(expect.objectContaining(user));
      });
    });


  });
  describe("POST /api/users", () => {
    const kayttaja = {
      name: "Hukka Mukka",
      username: "Susi",
      password:
        "2b$10$ffZo/idP80RCvFJuGjxgUeJTmR4flLYZvC4BfgMYujunsTN4ZlyfK",
      adult: true
    };
    test("post a new user", async () => {
      const response = await request.post("/api/users").send(kayttaja).expect(200);
      const { password, ...user } = kayttaja
      expect(response.body).toEqual(
        expect.objectContaining(user)
      );
    });

    test("username has to be unique", async () => {
      await request
        .post("/api/users")
        .send(kayttaja)
        .expect(200);
      const response = await request
        .post("/api/users")
        .send(kayttaja).expect(400)
      expect(response.body).toEqual({ "error": "username must be unique" })
    });

    test("password min length is 3", async () => {
      const kayttaja2 = {
        name: "Jeepulis",
        username: "Seppo",
        password: "he",
        adult: true
      }
      const response = await request
        .post("/api/users")
        .send(kayttaja2).expect(400)
      expect(response.body).toEqual({ "error": "Salasana liian lyhyt..." })
    });
    /*test("Default", async () => {
      const kayttaja2 = {
        name: "Jeepulis",
        username: "Seppoli",
        password: "heippa",
        adult: undefined
      }
      const response = await request
        .post("/api/users")
        .send(kayttaja2).expect(200)
      expect(response.body).toEqual(
        expect.objectContaining({
          adult: true
        })
      )
    }); */

  });


});

