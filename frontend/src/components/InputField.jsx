// import React from 'react'

const InputField = ({placeholder, type, className, name, value, onChange}) => {
  return (
    <>
      <input type={type} placeholder={placeholder} required name={name} value={value} onChange={onChange} className={`${className} w-full p-2.5 border border-gray-400 rounded-md outline-orange-500`} />
    </>
  )
}

export default InputField;
