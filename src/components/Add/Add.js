import React from 'react';
import './Add.scss';

const defaultListing = {
  name: '',
  link: '',
  category: '',
  uid: '',
};

class Add extends React.Component {
  state = {
    newResource: defaultListing,
  }

  formFieldStringState = (name, e) => {
    e.preventDefault();
    const tempListing = { ...this.state.newResource };
    tempListing[name] = e.target.value;
    this.setState({ newResource: tempListing });
  }

  resourceChange = e => this.formFieldStringState('name', e);

  render() {
    const { newResource } = this.state;
    return (
      <div className="Add col">
        <h2>Add Learning Material</h2>
        <form>
          <div className="form-group">
            <label htmlFor="resource">Resource:</label>
            <input
              type="text"
              className="form-control"
              id="resource"
              aria-describedby="resourceHelp"
              placeholder="Add Resource Here"
              value={newResource.name}
              onChange={this.resourceChange}
            />
          </div>
          <button className="btn btn-danger">Save Resource</button>
        </form>
      </div>
    );
  }
}

export default Add;
