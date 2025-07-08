export default function TextInput({ value, onChange, onCancel, onSubmit }) {
    //  return (
    //   <div className=" relative mt-10 max-w-xl mx-auto">
    //     {/* Input Field */}
    //     <textarea
    //       id="text-area"
    //       placeholder=""
    //       rows={4}
    //       className="peer w-full h-40 px-4 py-6 text-lg text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2  focus:ring-blue-600 focus:outline-none placeholder-transparent resize-none"
    //       value={value}
    //       onChange={(e) => onChange(e.target.value)}
    //     />
        
    //     {/* Floating Label */}
    //     <label
    //       htmlFor="text-area"
    //       className="absolute left-1 w-[280px] px-2 top-10 text-gray-400 text-sm transition-all bg-gray-50  peer-focus:-top-6 peer-focus:rounded-sm peer-focus:text-blue-600 peer-focus:text-sm "
    //     >
    //       Share details of your own experience at this place
    //     </label>
        
    //     {/* Buttons */}
    //     <div className="mt-6 flex justify-end flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">

    //     <button
    //         className="bg-gray-500 text-white py-2 px-6 rounded-md hover:bg-gray-600 w-full sm:w-auto"
    //         onClick={onCancel}
    //       >
    //         Cancel
    //       </button>
    //     <button
    //         className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 w-full sm:w-auto"
    //         onClick={onSubmit}
    //       >
    //        submit
    //       </button>
    //     </div>
    //   </div>
    // );
     return (
    <div className="w-full mt-6 space-y-4">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Please share your feedback..."
        className="w-full h-32 p-4 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="flex gap-3">
        <button
          onClick={onSubmit}
          className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-xl font-medium hover:bg-blue-700 transition-colors"
        >
          Submit
        </button>
        <button
          onClick={onCancel}
          className="flex-1 bg-gray-700 text-white py-3 px-6 rounded-xl font-medium hover:bg-gray-600 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
