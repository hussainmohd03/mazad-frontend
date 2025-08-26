import React from 'react'
import { useNavigate } from 'react-router-dom'

const ListingTable = ({ listings }) => {
  const navigate = useNavigate()

  return (
    <table className="">
      <thead>
        <tr className="">
          <th className="" res>
            index
          </th>
          <th className="">ID Listing</th>
          <th className="">Product Name</th>
          <th className="">Customer Name</th>
          <th className="">Status</th>
          <th className="">Created Date</th>
          <th className="">Price</th>
        </tr>
      </thead>

      <tbody>
        {listings.map((item, index) => (
          <tr
            key={item._id}
            className=""
            onClick={() => navigate(`/admin/listings/${item._id}`)}
          >
            <td className="">
              <td className="">{index + 1}</td>
            </td>
            <td className="">{item._id}</td>
            <td className="">{item.name}</td>
            <td className="">{item.ownerId}</td>
            <td className={item.status}>{item.status}</td>
            <td className="">
              {new Date(item.createdAt).toLocaleString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric'
              })}
            </td>
            <td className="">BHD {item.price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default ListingTable
