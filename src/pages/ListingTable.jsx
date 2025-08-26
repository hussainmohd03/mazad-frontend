import React from 'react'
import { useNavigate } from 'react-router-dom'

const ListingTable = ({ listings }) => {
  const navigate = useNavigate()

  return (
    <table className="listing-table">
      <thead>
        <tr>
          <th>Image</th>
          <th>ID Listing</th>
          <th>Product Name</th>
          <th>Customer Name</th>
          <th>Status</th>
          <th>Created Date</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {listings.map((item) => (
          <tr
            key={item._id}
            onClick={() => navigate(`/admin/listings/${item._id}`)}
          >
            <td>
              <img src={item.images?.[0] || 'no image'} alt={item.name} />
            </td>
            <td>{item._id}</td>
            <td>{item.name}</td>
            <td>
              {item.ownerId
                ? `${item.ownerId.firstName} ${item.ownerId.lastName}`
                : 'Unknown'}
            </td>
            <td>{item.status}</td>
            <td>
              {new Date(item.createdAt).toLocaleString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric'
              })}
            </td>
            <td>${item.price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default ListingTable
