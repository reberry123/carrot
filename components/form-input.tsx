interface FormInputProps {
    type: string;
    placeholder: string;
    required: boolean;
    errors: string[];
    name: string;
}

export default function FormInput({type, placeholder, required, errors, name}: FormInputProps) {
    return (
        <div className="flex flex-col gap-3">
            <input className={`w-96 h-12 rounded-full
            outline-none border-2 
            ${!errors.length ? "border-gray-300 focus:ring-gray-400" : "border-red-300 focus:ring-red-400"}
            focus:ring-offset-2 focus:ring-2
            transition-shadow
            px-5`}
            name={name}
            type={type}
            placeholder={placeholder}
            required={required}
            />
            {errors.map((error, index) => (
                <span key={index} className="w-96 text-left text-red-500 text-sm">
                    {error}
                </span>
            ))}
            
        </div>
        
    )
}