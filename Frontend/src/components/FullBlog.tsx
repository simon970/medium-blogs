import { Blog } from "../hooks"
import { Appbar } from "./Appbar"
import { Avatar } from "./BlogCard"

export const  FullBlog=({blog}:{blog:Blog})=>{
    return <div>
        <Appbar/>
        <div className="flex justify-center">
    <div className="grid grid-cols-12 px-10  w-full pt-10 max-w-screen-xl"> 

      <div className="col-span-8">
       <div className="text-5xl font-extrabold">
         {blog.title}
       </div>
       <div className="text-slate-500 pt-4">
        Posted on 16th March 2023 
       </div>
       <div className="pt-4">
        {blog.content}
       </div> 
      </div>
      <div className="col-span-4">
        <div className="text-slate-600 text-lg ">
        Author
        </div>
        
        <div className="flex">
            <div className="pr-4 flex flex-col justify-center">
                <Avatar name={blog.author.name}></Avatar>
            </div>
            <div>
            <div className="text-xl font-bold">
         {blog.author.name}
        </div>
        <div className="pt-2 text-slate-500">
           Random Catch Phrase about the author's ability to catch the public's attention 
        </div>

            </div>
        

        </div>
        
       
      </div>

    </div>
    </div>
    </div>
}