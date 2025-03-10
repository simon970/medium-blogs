import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { useBlogs } from "../hooks"

export const Blogs=()=>{
    const {loading,blogs} = useBlogs();
  
    if(loading){
        return <div>
            Loading...
        </div>
    }

    return <div>
        <Appbar></Appbar>
    <div className="flex justify-center">
        <div className="">
            {blogs.map(blog=><BlogCard id={blog.id} authorName={blog.author.name || "Anonymous"} title={blog.title} content={blog.content} publishedDate="Mar 9th 2025 "/>)}
        </div>
        </div>
    </div>
}