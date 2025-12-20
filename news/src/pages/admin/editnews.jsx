import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate ,useLocation} from "react-router-dom";

export default function EditNews() {

const location =useLocation() //get values
  console.log(location)
  



  const [id, setId] = useState(location.state.id);
  const [title, setTitle] = useState(location.state.title);
  const [content, setContent] = useState(location.state.content);
  const [category, setCategory] = useState(location.state.category);
  const [date, setDate] = useState(location.state.date);
  const navigate=useNavigate()
  
  
  
  async function handleSubmit() {
    console.log(
      id,
      title,
      content,
      category,
      
      date)
    
  
   const token=localStorage.getItem("token")
   if(token){
   const result = await axios .put("http://localhost:3005/api/news/" +id,{
    //what should i want 
    title :title,
    content : content,
    category :category,
    date : date
   },{
    headers:{
        Authorization : "Bearer "+token
    }
   })

   console.log(result)
   toast.success("news added successfull")
   navigate("/admin/news")


   }else{
    toast.error("please login first")
   }
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Add News</h2>
     <p className="text-sm italic text-gray-500 mt-1">
  Here you can add news articles.
</p>

      <div className="space-y-4">
        {/* ID */}
        <div className="flex justify-between items-center border-b pb-2">
          <span className="font-medium text-gray-700 w-1/4">ID</span>
          <input
            disabled
            type="number"
            placeholder="Enter ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="w-3/4 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        {/* Title */}
        <div className="flex justify-between items-center border-b pb-2">
          <span className="font-medium text-gray-700 w-1/4">Title</span>
          <input
            type="text"
            placeholder="Enter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-3/4 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        {/* Content */}
        <div className="flex justify-between items-start border-b pb-2">
          <span className="font-medium text-gray-700 w-1/4">Content</span>
          <textarea
            placeholder="Write news content..."
            rows="4"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-3/4 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          ></textarea>
        </div>

        {/* Category */}
        <div className="flex justify-between items-center border-b pb-2">
          <span className="font-medium text-gray-700 w-1/4">Category</span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-3/4 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          >
            <option value="">Select Category</option>
            <option value="Sports">Sports</option>
            <option value="Business">Business</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Politics">Politics</option>
            <option value="Technology">Technology</option>
          </select>
        </div>

        {/* Date */}
        <div className="flex justify-between items-center border-b pb-2">
          <span className="font-medium text-gray-700 w-1/4">Date</span>
          <input
           
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-3/4 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-6 text-right">
  <button
    onClick={() => navigate("/admin/news/add")}
    className="bg-gray-400 text-white px-6 py-2 rounded-xl hover:bg-gray-500 transition mr-4"
  >
    Cancel
  </button>
  <button
    onClick={handleSubmit}
    className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
  >
    update News
  </button>
</div>

    </div>
  );
}
