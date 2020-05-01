import React from 'react';
import Enzyme from 'enzyme';
import 'babel-polyfill';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, mount, render } from 'enzyme';
import  Reservation  from '../../client/src/index.jsx';
import  PriceBreakup  from '../../client/src/PriceBreakup.jsx';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('../../client/src/index.jsx', () => 'Reservation');
jest.mock('../../client/src/PriceBreakup.jsx', () => 'PriceBreakup');




const wrapper = shallow(<Reservation />);

describe('Reservation', () => {


  it('should be defined', () => {
    expect(Reservation).toBeDefined();
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should contain a CalendarBoard child component', () => {
    expect(wrapper.find(Reservation)).toHaveLength(1);
  });

  it('should contain text in the first node', () => {

   // const div = wrapper.find('underReserve');
    expect(wrapper.find('p.span.perNight')).toEqual({})

  });
  it('PriceBreakup component should exist', () => {
   const priceBreakup = wrapper.find(PriceBreakup);
   expect(priceBreakup.exists()).toBe(false)
  })

})
