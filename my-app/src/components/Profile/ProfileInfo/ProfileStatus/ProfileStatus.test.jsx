import React from "react";
import { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus.jsx";

describe("ProfileStatus component", () => {
  test("status from the props should be in the state", () => {
    const component = create(<ProfileStatus status="Hello world" />);
    const instance = component.getInstance();
    expect(instance.state.status).toBe("Hello world");
  });
  
  test("after creation input shoudnt be display ", () => {
    const component = create(<ProfileStatus status="Hello world" />);
    const root = component.root;
	
    expect(() => {
		let input = root.findByType("input");
	}).toThrow();
  });
  
  test("span should be to display", () => {
    const component = create(<ProfileStatus status="Hello world" />);
    const root = component.root;
	let span = root.findByType("span");
    expect(span).not.toBeNull();
  });
  
  test("span should containe correct status", () => {
    const component = create(<ProfileStatus status="Hello world" />);
    const root = component.root;
	let span = root.findByType("span");
    expect(span.children[0]).toBe("Hello world");
  });
  
  test("input should be appear in editMode", () => {
    const component = create(<ProfileStatus status="Hello world" />);
    const root = component.root;
	let span = root.findByType("span");
	span.props.onDoubleClick();
	let input = root.findByType("input");
    expect(input.props.value).toBe("Hello world");
  });
  
  test("callBack should be colled", () => {
	const mockCallback =  jest.fn();
    const component = create(<ProfileStatus status="Hello world" updateStatus={mockCallback} />);
    const instance = component.getInstance();
	instance.deactivateEditMode();
	// определяем сколько раз был бызван callback
    expect(mockCallback.mock.calls.length).toBe(1);
  });
});