export default function TextInput({ value, onChange, onCancel, onSubmit }) {
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
