import { useState } from "react";
import TextInput from "./TextInput";
import axios from "axios";

const Rating = () => {
  const [selectedRating, setSelectedRating] = useState(0); // No star selected initially
  const [textInput,setTextInput] =useState("");

  const handleRatingChange = (rating) => {
    setSelectedRating(rating); // Update selected rating when a star is clicked
  };

  const handleSubmit= async ()=>{
    if(selectedRating <=3 && textInput.trim()===" "){
      alert("please select a rating");
      return;
    }

    const reviewData ={
      rating:selectedRating,
      description: textInput.trim(),
    };

    try {
      const response=await axios.post("http://localhost:4000/api/review-submit",reviewData);
      alert('Review submitted successfully!');
      console.log(response.data)
    } catch (error) {
      if(error.response){
        alert(`Failed to submit review:${error.response.data.error || "server error"}`);
      }
      else if(error.request){
        alert('Failed to submit review : NO response from server');
      }else{
        alert(`Failed to submit review : ${error.message}`);
      }
  };

};

    const handleCancel=()=>{
      setTextInput('');
      setSelectedRating(0);
    }


  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50">
      <div className="w-[500px] h-[600px] p-8 bg-white border-4 border-gray-300 rounded-lg shadow-lg">
        {/* Star Rating */}
        <div className="mt-6 flex justify-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <div
              key={star}
              className={`mask mask-star-2 cursor-pointer ${
                selectedRating >= star ? "bg-orange-400" : "bg-gray-300"
              }`}
              onClick={() => handleRatingChange(star)}
              style={{
                width: "40px",
                height: "40px",
                margin: "0 5px",
              }}
            ></div>
          ))}
        </div>

        {/* Text Input */}
        <TextInput value={textInput} 
        onChange={setTextInput}
        onCancel={handleCancel}
        onSubmit={handleSubmit}/>
      </div>
    </div>
  );
};

export default Rating;