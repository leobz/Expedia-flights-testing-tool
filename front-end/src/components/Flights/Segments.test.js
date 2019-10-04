/* eslint-disable no-undef */
import React from 'react';
import {shallow} from 'enzyme';
import faker from 'faker';
import Segments from './Segments';
import {checkProps} from '../util';

const shallowComponent = props => shallow(<Segments {...props}/>);
const props = {
    handleClick: () => {
    },
    itinerariesSize: faker.random.number(),
    segment: {
        arrival_time: faker.lorem.word(),
        departure_time: faker.lorem.word(),
        duration: faker.lorem.word(),
        from: faker.name.findName(),
        price: faker.random.number(),
        stops: faker.random.number(),
        to: faker.name.findName(),
        zid: faker.random.uuid()
    },
    segmentsId: [faker.random.uuid(), faker.random.uuid()]
};

describe('Segments component', () => {
    describe('Checking proptypes', () => {
        let component;

        beforeEach(() => {
            component = shallowComponent(props);
        });

        it('Should render with props', () => {
            const wrapper = component.find('.tool__segments');
            expect(wrapper.length).toBe(2);
        });

        it('Should not throw a warning', () => {
            const propsErrors = checkProps(Segments, props);
            expect(propsErrors).toBeUndefined();
        });
    });
});
