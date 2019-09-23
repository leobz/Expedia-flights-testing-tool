import React from 'react';
import PropTypes from 'prop-types';
import Airlines from '../Airlines';
import Stops from '../Stops';
import InputComponent from '../InputComponent';
import SplitInputComponent from '../SplitInputComponent';

const FilterPanel = ({
    filters
}) => {
    const renderFilters = () => filters.map(f => {
        switch (f.label) {
            case 'Airlines':
                return (
                    <div key={f.label}>
                        <h4>{f.label}</h4>
                        <Airlines handleClick={f.onChange} airlines={f.data}/>
                    </div>
                );
            case 'Flight Number':
                return (
                    <div key={f.label}>
                        <h4>{f.label}</h4>
                        <InputComponent data={f.data} handleClick={f.onChange}/>
                    </div>
                );
            case 'Duration':
                return (
                    <div key={f.label}>
                        <h4>{f.label}</h4>
                        <SplitInputComponent data={f.data} label={f.label} handleClick={f.onChange}/>
                    </div>
                );
            case 'Price':
                return (
                    <div key={f.label}>
                        <h4>{f.label}</h4>
                        <SplitInputComponent data={f.data} label={f.label} handleClick={f.onChange}/>
                    </div>
                );
            default:
                return (
                    <div key={f.label}>
                        <h4>{f.label}</h4>
                        <Stops handleClick={f.onChange} stops={f.data}/>
                    </div>
                );
        }
    });

    return (
        <>
            {renderFilters()}
        </>
    );
};

FilterPanel.propTypes = {
    filters: PropTypes.arrayOf(PropTypes.shape).isRequired
};

export default FilterPanel;
