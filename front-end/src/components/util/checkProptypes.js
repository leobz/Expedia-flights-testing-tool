import checkPropTypes from 'check-prop-types';

const checkProps = (
    component,
    expectedProps
) => checkPropTypes(component.propTypes, expectedProps, 'props', component.name);

export default checkProps;
