import React, {memo} from 'react'

const InputForm = ({label, disabled, register, errors, defaultValue, id, validate, type = "text", placeholderText}) => {
  return (
    <div className=''>
        {label && <label htmlFor={id}>{label}</label>}
        <input 
          type={type}
          id={id} 
          defaultValue={defaultValue}
          {...register(id, validate)}
          disabled={disabled}
          placeholder={placeholderText} 
          className="outline-none border-[1px] w-full border-[#d3d3d3] py-[5px] px-[10px] text-[14px] text-[#000] mb-[5px]"
        />
        {errors[id] && <small className="text-error">{errors[id]?.message}</small>}
    </div>
  )
}

export default memo(InputForm)