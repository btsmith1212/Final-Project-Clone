import React from 'react';

const InputField = ({ label, name, type, value, onChange, required, options }) => {
    return (
        <div className={`${name == "image" || name == "description" ? "basis-full" : "flex-1"} flex flex-col border border-gray rounded-md px-3 py-2 mt-2 ml-2`}>
            <label className={`${name == "price" ? "relative block price-input" : ""}`}>
                {label}
            </label>
            {type === 'textarea' ? (
                <textarea
                    name={name}
                    id={name}
                    value={value}
                    onChange={onChange}
                    required={required}
                    placeholder={`Enter the ${name}`}
                    className="h-20"
                />
            ) : type === 'select' ? (
                <select
                    name={name}
                    id={name}
                    value={value}
                    onChange={onChange}
                    required={required}
                    className={`py-1 pr-2`}
                >
                    <option value="" disabled>Select a {label}</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Home Decor">Home Decor</option>
                    <option value="Media">Media</option>
                    <option value="Plants">Plants</option>
                    <option value="Handmade">Handmade</option>
                </select>
            ) : (
                <input
                    type={type}
                    name={name}
                    id={name}
                    value={value}
                    onChange={onChange}
                    required={required}
                    placeholder={`Enter the ${name}`}
                        className={`py-1 ${name == "price" ? "pl-4" : ""}`}
                />
            )}
        </div>
    );
};

export default InputField;
