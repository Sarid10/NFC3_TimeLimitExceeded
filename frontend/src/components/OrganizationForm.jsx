import React, { useState } from 'react'

const OrganizationForm = () => {
  const [formData, setFormData] = useState({
    orgName: '',
    address: '',
    email: '',
    phone: '',
    category: '',
    description: '',
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission logic here (e.g., send data to server)
    alert('Thank you for submitting your organization’s details!')
  }

  return (
    <div
      style={{
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        paddingTop: '120px', // Adjust this based on your header height
      }}
    >
      <h2 style={{ textAlign: 'center', color: '#2C3E50' }}>
        Organization Form
      </h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label
            style={{ display: 'block', marginBottom: '5px', color: '#2C3E50' }}
          >
            Organization Name:
          </label>
          <input
            type="text"
            name="orgName"
            value={formData.orgName}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
            }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label
            style={{ display: 'block', marginBottom: '5px', color: '#2C3E50' }}
          >
            Address:
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
            }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label
            style={{ display: 'block', marginBottom: '5px', color: '#2C3E50' }}
          >
            Email:
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
            }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label
            style={{ display: 'block', marginBottom: '5px', color: '#2C3E50' }}
          >
            Phone Number:
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
            }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label
            style={{ display: 'block', marginBottom: '5px', color: '#2C3E50' }}
          >
            Category:
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
            }}
          >
            <option value="">Select Category</option>
            <option value="Old Age Home">Old Age Home</option>
            <option value="Orphanage">Orphanage</option>
            <option value="Rehabilitation Center">Rehabilitation Center</option>
            <option value="Shelter Home">Shelter Home</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label
            style={{ display: 'block', marginBottom: '5px', color: '#2C3E50' }}
          >
            Description:
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              height: '100px',
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#3498DB',
            color: '#fff',
            borderRadius: '5px',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default OrganizationForm
