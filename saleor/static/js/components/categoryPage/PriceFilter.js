import React, { Component, PropTypes } from 'react';
import FilterHeader from './FilterHeader';
import {isMobile} from '../utils';

export default class PriceFilter extends Component {

  constructor(props) {
    super(props);
      this.state = {
        visibility: !isMobile()
      };
  }

  static propTypes = {
    minPrice: PropTypes.number,
    maxPrice: PropTypes.number,
    onFilterChanged: PropTypes.func.isRequired
  }

  checkKey = (event) => {
    if (event.key === 'Enter') {
      this.updateFilter();
    }
  }

  updateFilter = () => {
    const minPrice = this.minPriceInput.value;
    const maxPrice = this.maxPriceInput.value;
    this.props.onFilterChanged(minPrice, maxPrice);
  }

  changeVisibility = () => {
    const { minPrice, maxPrice } = this.props;
    if (!(minPrice || maxPrice)) {
      this.setState({
        visibility: !this.state.visibility
      });
    }
  }

  render() {
    const { maxPrice, minPrice } = this.props;
    const { visibility } = this.state;
    return (
      <div className="price-range">
        <FilterHeader
          onClick={this.changeVisibility}
          title={gettext('Price range')}
          visibility={visibility}
        />
        {visibility && (
          <div>
            <input
              className="form-control"
              defaultValue={minPrice}
              min="0"
              onKeyUp={this.checkKey}
              placeholder={gettext('from')}
              ref={input => (this.minPriceInput = input)}
              type="number"
            />
            <span>&#8212;</span>
            <input
              className="form-control"
              defaultValue={maxPrice}
              min="0"
              onKeyUp={this.checkKey}
              placeholder={gettext('to')}
              ref={input => (this.maxPriceInput = input)}
              type="number"
            />
            <button className="btn btn-primary" onClick={this.updateFilter}>{gettext('Update')}</button>
          </div>
        )}
      </div>
    );
  }
}
