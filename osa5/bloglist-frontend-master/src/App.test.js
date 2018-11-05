import React from "react";
import { shallow } from "enzyme";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import App from "./App"

const loginPage = ""


//Käytin axios mock adapteria. Tuo materiaali meni vähän yli hilseen?: https://github.com/ctimmerm/axios-mock-adapter
//
const mock = new MockAdapter(axios);

it("when user is not logged", () => {
    mock.onGet("/api/blogs").replyOnce(200, []);
    const appComponent = shallow(<App />);
    //console.log(appComponent.text())
    expect(appComponent.text()).toContain("käyttäjätunnus");
    expect(appComponent.text()).toContain("salasana");
    expect(appComponent.text()).toContain("kirjaudu");
    expect(appComponent.text()).toContain("cancel");
    expect(appComponent.text()).not.toContain("blogs")
});




