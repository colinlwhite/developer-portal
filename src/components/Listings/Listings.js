import React from 'react';
import ListingItem from '../ListingItem/ListingItem';
import './Listings.scss';

class Listings extends React.Component {
  render() {
    const { materials, deleteSingleResource, passResourceToEdit } = this.props;
    const materialItemComponents = materials.map(material => (
      <ListingItem
        material={material}
        key={material.id}
        deleteSingleResource={deleteSingleResource}
        passResourceToEdit={passResourceToEdit}
        />
    ));
    return (
      <div className="listings col">
        <h2>Learning Materials</h2>
        <ul>{materialItemComponents}</ul>
      </div>
    );
  }
}

export default Listings;
