import React from 'react';
import renderer from 'react-test-renderer';
import { UserProfile } from "../UserProfile";

describe("Header", () => {
    test("Snapshot header", () => {
        const component = renderer.create(<UserProfile/>);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    })
})