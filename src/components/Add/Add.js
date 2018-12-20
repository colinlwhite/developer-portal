import React from 'react';
import './Add.scss';

class Add extends React.Component {
  render() {
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
              aria-describedby="addressHelp"
              placeholder="Add Resource Here"
            />
          </div>
          <button className="btn btn-danger">Save Resource</button>
        </form>
      </div>
    );
  }
}

export default Add;
