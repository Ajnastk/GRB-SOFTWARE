const TextInput = ({value,onChange,onCancel,onSubmit}) => {
    return (
      <div className="relative w-full max-w-lg mt-10 mx-auto px-4 sm:px-0">
        {/* Input Field */}
        <input
          id="text-input"
          type="text"
          placeholder=""
          className="peer input input-bordered w-full h-40 text-lg bg-slate-50 border-blue-500 text-black placeholder-transparent focus:ring-blue-600"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        
        {/* Floating Label */}
        <label
          htmlFor="text-input"
          className="absolute left-4 px-3 top-3 text-gray-400 text-lg transition-all peer-placeholder-shown:top-16 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-lg peer-focus:top-4 peer-focus:text-blue-600 peer-focus:text-sm"
        >
          Share details of your own experience at this place
        </label>
        
        {/* Buttons */}
        <div className="mt-6 flex justify-end flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">

        <button
            className="bg-gray-500 text-white py-2 px-6 rounded-md hover:bg-gray-600 w-full sm:w-auto"
            onClick={onCancel}
          >
            Cancel
          </button>
        <button
            className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 w-full sm:w-auto"
            onClick={onSubmit}
          >
           submit
          </button>
        </div>
      </div>
    );
  };
  
  export default TextInput;