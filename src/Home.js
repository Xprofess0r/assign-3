import { useState ,useEffect} from 'react';
import BlogList from './BlogList';
import useFetch from './usefetch';
import { useHistory } from 'react-router-dom';

const Home = () => {
       const{ data: posts,error,} = useFetch('http://localhost:8000/posts');
       const[body,setBody] = useState('');
       const[title,setTitle] = useState('');
       const[isPending,setISPending]=useState(true);
       const history = useHistory();
       const [isPostCreated, setIsPostCreated] = useState(false);

       const[username,setUsername] = useState('');

       const handleShare = (e) =>{
        e.preventDefault();
        const post = {title,body,username};
         //setISPending('true');


        fetch('http://localhost:8000/posts',{
           method:'POST',
           headers:{"Content-type":"application/json"},
           body:JSON.stringify(post)
        }).then(()=>{
           console.log('new post added');
           //setIsPending(false);
      setIsPostCreated(true);
      setTimeout(() => {
        setIsPostCreated(false);
        window.location.reload();
      }, 1000);
    });
          
      }
        useEffect(() => {
        
         setTimeout(() => {
           setISPending(false); // Set loading state to false after data is fetched (simulated with a delay)
         }, 1000);
       }, []);

   
   
    return (  
        <div className="dashBoard">
             <label>
            <input className="username" type="text" placeholder='as username' value={username} onChange={(e) => setUsername(e.target.value)}/>
            </label>
         <button id="share" onClick={handleShare}>Share</button>
         
         <textarea type="text" placeholder='create your post' value={body}
                    onChange={(e) =>setBody(e.target.value)} required></textarea>
                   

     {/* Show the success message if the post is successfully created */}
     {isPostCreated && <div className='warning'>Post created successfully!</div>}

{error && <div>{error}</div>}
{isPending && <div>Loading...</div>}
{posts && <BlogList posts={posts} title="My posts!" />}
            
            </div>
    );
}
 
export default Home;