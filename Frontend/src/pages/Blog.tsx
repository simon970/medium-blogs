import { FullBlog } from "../components/FullBlog";
import { useBlog } from "../hooks"
import { useParams } from "react-router-dom";

export const Blog= ()=>{
    const id = useParams()
    const {blog,loading} = useBlog({
        id:  id 
    });
    if(loading || !blog){
        return <div>
            Loading..
        </div>
    }
    return <div>
        <FullBlog blog={blog}/>
    </div>
} 