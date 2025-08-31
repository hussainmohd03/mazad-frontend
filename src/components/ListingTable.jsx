import React from 'react'
import { useNavigate } from 'react-router-dom'

const ListingTable = ({ listings }) => {
  const navigate = useNavigate()

  const headers = [
    'Index',
    'ID Listing',
    'Product Name',
    'Customer Name',
    'Status',
    'Created Date',
    'Price'
  ]
  return (
    <div className="listings-container">
      <div className="header">
        {headers.map((header) => (
          <span key={header} className="listing-header-cell">
            {header}
          </span>
        ))}
      </div>
      {listings.lengh !== 0 &&
        listings.map((item, index) => (
          <div
            key={item._id}
            className="listing-row"
            onClick={() => navigate(`/admin/listings/${item._id}`)}
          >
            <span>{index + 1}</span>
            <span>
              {item._id.slice(0, 4)}...{item._id.slice(-4)}
            </span>
            <span>{item.name}</span>
            <span>
              {item.ownerId.firstName} {item.ownerId.lastName}
            </span>
            <span className={`listing-status ${item.status}`}>
              {item.status}
            </span>
            <span className="listing-date">
              {String(item.createdAt).split('T')[0]}
            </span>
            <span>BHD {item.price}</span>
          </div>
        ))}
    </div>
  )
}

export default ListingTable
