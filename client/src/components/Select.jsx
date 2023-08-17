import React from 'react'

const Select = ({label, options = [], register, errors, id, validate }) => {
  return (
    <div className='flex flex-col gap-2'>
      {label && <label htmlFor={id}>{label}</label>}
      <select id={id} {...register(id, validate)}>
        <option value="">------Choose------</option>
        {options.map(option => (
          <option key={option.code} value={option.code}>{option.value}</option>
        ))}
          {/* <option value={0}>Admin</option>
          <option value={1}>User</option> */}
      </select>
      {errors[id] && <small className='text-xs text-red-500'>{errors[i]?.message}</small>}
    </div>
  )
}

export default Select