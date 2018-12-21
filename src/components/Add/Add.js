import React from 'react';
import authRequests from '../../helpers/data/authRequests';
import materialsRequest from '../../helpers/data/materialsRequest';
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
    console.log(tempListing);
    this.setState({ newResource: tempListing });
  }

  resourceChange = e => this.formFieldStringState('name', e);

  formSubmit = (e) => {
    e.preventDefault();
    const { onSubmit } = this.props;
    const myResource = { ...this.state.newResource };
    myResource.uid = authRequests.getCurrentUid();
    onSubmit(myResource);
    this.setState({ newResource: defaultListing });
  }

  componentDidUpdate(prevProps) {
    const { isEditing, editId } = this.props;
    if (prevProps !== this.props && isEditing) {
      materialsRequest.getSingleResource(editId)
        .then((material) => {
          this.setState({ newListing: material.data });
        })
        .catch(err => console.error('error with getSingleListing', err));
    }
  }

  render() {
    const { newResource } = this.state;
    const { isEditing } = this.props;
    const title = () => {
      if (isEditing) {
        return <h2>Edit Resource:</h2>;
      }
      return <h2>Add New Material:</h2>;
    };
    return (
      <div className="Add col">
        {title()}
        <form onSubmit={this.formSubmit}>
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
