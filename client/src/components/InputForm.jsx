import React, {memo} from 'react'

const InputForm = ({label, style = "", disabled, hidden, register, errors, defaultValue, id, validate, type = "text", placeholderText}) => {
  return (
    <div className={style}>
        {label && <label htmlFor={id} className='mb-[5px] block text-left'>{label}</label>}
        <input 
          type={type}
          id={id} 
          defaultValue={defaultValue}
          {...register(id, validate)}
          disabled={disabled}
          hidden={hidden}
          placeholder={placeholderText} 
          className="outline-none border-[1px] w-full border-[#d3d3d3] py-[5px] px-[10px] text-[16px] text-[#000] mb-[5px]"
        />
        {errors[id] && <small className="text-error">{errors[id]?.message}</small>}
    </div>
  )
}

export default memo(InputForm)