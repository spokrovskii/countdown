import React from 'react'; 
import { shallow, configure } from 'enzyme'; 
import Goal from '../../Goal'; 
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

it ('shows a list of goal', () =>{
    const wrapped = shallow(<Goal />);

    expect(wrapped.find(Timer).length).toEqual(1);
});
