import React from 'react'

function FormInput({ label, id, name, type, required, value, onChange }) {
  return (
    <div className="mb-2.5">
      <label htmlFor={id} className="form-control w-full">
        <div className="label">
          <span className="label-text">{label}</span>
        </div>
        <input
          type={type}
          id={id}
          name={name}
          className="input input-bordered w-full"
          required={required}
          value={value}
          onChange={onChange}
        />
      </label>
    </div>
  )
}

export default FormInput
