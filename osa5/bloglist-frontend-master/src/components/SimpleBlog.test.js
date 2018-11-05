import React from "react";
import { shallow } from "enzyme";
import SimpleBlog from "./SimpleBlog";

const simpleBlog = {
    title: "Pelle pelottoman mietintämyssyn mietinnät",
    author: "Pelle Peloton",
    likes: 123
}

describe("SimpleBlog", () => {
    it('renders title', () => {
        const simpleBlogComponent = shallow(<SimpleBlog blog={simpleBlog} />)
        //const titleDiv = simpleBlogComponent.find('.title')
        //console.log(titleDiv)
        expect(simpleBlogComponent.text()).toContain(simpleBlog.title)
    })
    it('renders author', () => {
        const simpleBlogComponent = shallow(<SimpleBlog blog={simpleBlog} />)
        expect(simpleBlogComponent.text()).toContain(simpleBlog.author)
    })
    it('renders likes', () => {
        const simpleBlogComponent = shallow(<SimpleBlog blog={simpleBlog} />)
        expect(simpleBlogComponent.text()).toContain(simpleBlog.likes)
    })
    it('clicking the button twice calls event handler twice', () => {
      
        const mockHandler = jest.fn()
      
        const simpleBlogComponent = shallow(
          <SimpleBlog
            blog={simpleBlog}
            onClick={mockHandler}
          />
        )
      
        const button = simpleBlogComponent.find('button')
        button.simulate('click')
        button.simulate('click')
      
        expect(mockHandler.mock.calls.length).toBe(2)
      })
})