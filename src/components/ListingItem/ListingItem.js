import React from 'react';
import authRequests from '../../helpers/data/authRequests';
import './ListingItem.scss';

class ListingItem extends React.Component {
  deleteEvent = (e) => {
    e.preventDefault();
    const { deleteSingleResource, material } = this.props;
    deleteSingleResource(material.id);
  }

  render() {
    const { material } = this.props;
    const uid = authRequests.getCurrentUid();

    const makeButtons = () => {
      if (material.uid === uid) {
        return (
          <div>
            <span className="col">
              <button className="btn btn-default" onClick={this.deleteEvent}>
              <i className="fas fa-trash-alt"></i>
              </button>
            </span>
          </div>
        );
      }
      return <span className="col-2"></span>;
    };
    return (
      <li className="listing-item text-center">
    <span className="col-7">{material.name}</span>
    {makeButtons()}
    </li>
    );
  }
}

export default ListingItem;
