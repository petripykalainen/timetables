import React from 'react';

class LocationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location1: "",
      location2: "",
      ukc: false,
      ukt: false
    }
  }

  submitForm = (event) => {
    event.preventDefault();
    this.props.changeLocation(this.state.location1, this.state.location2);
  }

  render() {
    return (
      <div className="uk-padding uk-container">
            <form onSubmit={this.submitForm}>
              <fieldset className="uk-fieldset">
                <legend className="uk-legend">Change locations:</legend>
                <div className="uk-margin">
                  <input 
                    className="uk-input" 
                    type="text" 
                    placeholder="Location 1"
                    value={this.state.location1}
                    onChange={e => this.setState({location1: e.target.value})}
                  />
                  <input
                    className="uk-input" 
                    type="text" 
                    placeholder="Location 2"
                    value={this.state.location2}
                    onChange={e => this.setState({location2: e.target.value})}
                  />
                </div>
              </fieldset>
              <input
                className="uk-width-1-1 uk-button-primary uk-button uk-button-default"
                type="submit" 
                value="Submit"
              />
            </form>
      </div>
    );
  }

};

export default LocationForm;
