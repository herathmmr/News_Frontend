import { CiCirclePlus } from "react-icons/ci";
import { Link } from "react-router-dom";

export default function AdminNews(){
    return(
        <div className="w-full h-full ">
            <Link to="/admin/news/add">
            <CiCirclePlus className="text-[50px] text-blue-600 absolute right-6 bottom-2 cursor-pointer hover:scale-110 transition-transform duration-100 " />
            </Link>
            </div>
    
    )
}