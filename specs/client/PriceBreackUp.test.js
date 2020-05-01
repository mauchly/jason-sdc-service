import React from 'react';
import Enzyme from 'enzyme';
import 'babel-polyfill';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, mount, render } from 'enzyme';
import  PriceBreakup  from '../../client/src/PriceBreakup.jsx';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('../../client/src/PriceBreakup.jsx', () => 'PriceBreakup');


const wrapper = shallow(<PriceBreakup />)


describe('Price Break up Component', () => {

  it('should be defined', () => {
   expect(wrapper.find('td.priceData').length).toBe(0)
    const results = wrapper.find('td.priceData')
    console.log('RESULTS', results)
  });
  it('Price per night should be $129', ()=> {

    const wrapper = shallow(<PriceBreakup price={129} />)
    const pricePerNight = wrapper.find('td.priceData').dive().text();
    expect(pricePerNight).toBe(129)
  })


})