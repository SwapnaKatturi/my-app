import { Component } from 'react';

interface FilterState {
  startprice: string;
  endprice: string;
  startdate: string;
  enddate: string;
  results: string;
}

/**
 * EXERCISE 7 (class component) — reproduces a real test bug
 * -------------------------------------------------------------
 * Expected behavior: filling in the price/date fields and clicking "Apply"
 * should read the current filter values from state and show a summary below.
 *
 * Bug: open the console and click "Apply". You'll see:
 *   "TypeError: Cannot read properties of undefined (reading 'state')"
 * pointing at the first line inside filterOnSubmit.
 *
 * This is the SAME bug family as Ex2 (ToggleClass) — a class method is being
 * handed to onClick as a bare reference, so React calls it without an
 * instance attached and `this` is undefined inside it.
 */
class FilterFormClass extends Component<{}, FilterState> {
  state: FilterState = {
    startprice: '',
    endprice: '',
    startdate: '',
    enddate: '',
    results: '',
  };

  handleChange = (field: keyof FilterState) => (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [field]: e.target.value } as Pick<FilterState, keyof FilterState>);
  };

  // BUG: not bound, and not a class field arrow function either.
  filterOnSubmit(e: React.MouseEvent) {
    console.log(this.state); // <- crashes here: `this` is undefined
    const { startprice, endprice, startdate, enddate } = this.state;
    this.setState({
      results: `Filtering price ${startprice}-${endprice}, date ${startdate}-${enddate}`,
    });
  }

  render() {
    return (
      <div className="exercise">
        <h3>Ex7: Filter form (class) — mirrors the test bug</h3>
        <div>
          <input
            placeholder="start price"
            value={this.state.startprice}
            onChange={this.handleChange('startprice')}
          />
          <input
            placeholder="end price"
            value={this.state.endprice}
            onChange={this.handleChange('endprice')}
          />
        </div>
        <div>
          <input
            placeholder="start date"
            value={this.state.startdate}
            onChange={this.handleChange('startdate')}
          />
          <input
            placeholder="end date"
            value={this.state.enddate}
            onChange={this.handleChange('enddate')}
          />
        </div>
        {/* This is the line that breaks: this.filterOnSubmit is a bare reference */}
        <button onClick={(e) => this.filterOnSubmit(e)}>Apply</button>
        <p>{this.state.results}</p>
      </div>
    );
  }
}

export default FilterFormClass;
