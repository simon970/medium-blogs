import { Link } from "react-router-dom"


interface BlogCardProps{
    authorName: string,
    title:string,
    content:string,
    publishedDate: string,
    id:string
}


export const BlogCard=({authorName,title,content,publishedDate,id}:BlogCardProps)=>{
    return <Link to={`/blog/${id}`}>
     <div className="p-4 border-b border-slate-200 w-screen max-w-screen-md">
        <div className="flex" >
            <div >
            <Avatar name={authorName}/> 
            </div>
            
            <div className="font-extralight pl-2 text-sm flex justify-center flex-col">
            {authorName}
            </div>
            <div className="pl-2 font-thin font-slate-200 text-sm flex justify-center flex-col">
            . {publishedDate}
            </div>
            
        </div>
        <div className="text-xl font-bold pt-2">
            {title}
        </div>
        <div className="text-md font-thin">
            {content.length>100? content.slice(0,100)+"...": content}
        </div>
        <div className="text-slate-500 text-sm font-thin pt-2">
           {`${Math.ceil(content.length/100)} Minute(s) read`}
        </div>

    </div> 
    </Link>
}

interface AvatarProps{
    name:string,
    onClick?:()=>void
}

export function Avatar({name}:AvatarProps){
    
    return <div className="cursor-pointer relative inline-flex items-center justify-center w-6 h-6 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
    <span  className="font-medium text-gray-600 dark:text-gray-300">{name[0]}</span>
     
</div>

}