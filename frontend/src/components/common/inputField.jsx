const InputField = ({ label, name, type = 'text', value, onChange, placeholder, required = true }) => {
    return (
        <div>
            <div className="flex justify-between mb-2">
                <label className="block text-sm font-semibold text-gray-700">{label}</label>
            </div>
            <input
                type={type}
                name={name}
                required={required}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

export default InputField;