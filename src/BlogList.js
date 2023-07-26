import { Link } from "react-router-dom";
import useFetch from "./usefetch";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";

const BlogList = ({posts,username,handleDelete, handleEdit, isEditing }) => {
    const {id} = useParams();
    const {data:post,error,isPending} =useFetch('http://localhost:8000/posts' + id);
    
    const history = useHistory();
    
    
   
    return (  
        <div className="blogList">
            <h2>{username}</h2>
           
              {posts.map((post) => (
            <div className='blog-preview' key={post.id}>
               <Link to={`/posts/${post.id}`}>
                <h3> {post.username}</h3>
                {/* <p>created this post at </p> Display the timestamp */}
                <p>{post.body}</p>
                
                </Link>   
        </div>    
           ))}
           
        </div>
    
    );
}
 
export default BlogList;