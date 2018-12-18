import React from 'react';

class ListingItem extends React.Component {
  render() {
    const { material } = this.props;
    return (
    <h2>{material.name}</h2>
    );
  }
}

export default ListingItem;
