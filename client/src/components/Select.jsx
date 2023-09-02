import React from 'react'

const Select = ({label, options = [], register, errors, id, validate, active, type }) => {
  return (
    <div className='flex flex-col gap-2 mb-[20px]'>
      {label && <label htmlFor={id} className='mb-[5px] block text-left'>{label}</label>}
      <select id={id} {...register(id, validate)} className='p-[10px] cursor-pointer text-orange-600'>
        <option>------Choose------</option>
        {options.map(option => (
          <option selected={active === option.code ? true : false} key={option.code} value={type === "user" ? option.value : option.code}>{option.value}</option>
        ))}
      </select>
      {errors[id] && <small className='text-error'>{errors[id]?.message}</small>}
    </div>
  )
}

export default Select