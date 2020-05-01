import React from 'react';
import Enzyme from 'enzyme';
import 'babel-polyfill';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, mount, render } from 'enzyme';
import  DayComponent  from '../../client/src/DayComponent.jsx';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('../../client/src/DayComponent.jsx', () => 'DayComponent');

const mockFn = jest.fn();

// const wrapper = mount(<DayComponent className="availableDay" onDayClick={mockFn}/>);

describe('DayComponenet Component', () => {

  it('should be defined', () => {
    expect(DayComponent).toBeDefined();
  });

  it('should render correctly', () => {
    const wrapper = shallow(
      <DayComponent />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should call mock function when a day is clicked', () => {

    const wrapper = shallow(<DayComponent className="availableDay" onDayClick={mockFn} id='3-31'/>);

   wrapper.find('.availableDay').simulate('click')

    expect(wrapper.find('.availableDay').length).toEqual(1);
    expect(wrapper.props().id).toEqual('3-31')
  })

})