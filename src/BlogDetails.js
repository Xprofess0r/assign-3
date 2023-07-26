import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import useFetch from "./usefetch";

const BlogDetails = () => {
  const { id } = useParams();
  const history = useHistory();

  const [isEditing, setIsEditing] = useState(false);
  const { data: post, error, isPending, setData: setPost } = useFetch('http://localhost:8000/posts/' + id);
  const [body, setBody] = useState(post?.body || '');
  const [showEditSuccessMessage, setShowEditSuccessMessage] = useState(false);
  const [showDeleteSuccessMessage, setShowDeleteSuccessMessage] = useState(false);

  //for like and dislike
  const [likes, setLikes] = useState(Math.floor(Math.random() * 100));
  const [dislikes, setDislikes] = useState(0);
 
    const handleLike = () => {
      setLikes((prevLikes) => prevLikes + 1);
    };
  
    const handleDislike = () => {
      setLikes((prevLikes) => prevLikes - 1);
    };
  
  
    // Function to simulate small incremental likes and dislikes
    const simulateLikesAndDislikes = () => {
      setLikes((prevLikes) => prevLikes + Math.floor(Math.random() * 3)); // Increment likes by a random number between 0 and 4
      setDislikes((prevDislikes) => prevDislikes + Math.floor(Math.random() * 3)); // Increment dislikes by a random number between 0 and 2
    };
  
    // useEffect to update likes and dislikes every 5 seconds
    useEffect(() => {
      const interval = setInterval(simulateLikesAndDislikes, 10000); // Update likes and dislikes every 5 seconds
      return () => clearInterval(interval);
    }, []);
    
    // const backgroundStyles = {
    //   backgroundImage: 'url("/facebook/src/image/like.png")',
    //   backgroundSize: 'cover',
    //   backgroundPosition: 'center',
    // };
  

  const handleClick = () => {
    fetch('http://localhost:8000/posts/' + post.id, {
      method: 'DELETE'
    }).then(() => {
      setShowDeleteSuccessMessage(true);
      setTimeout(() => {
        history.push('/');
      }, 3000);
    });
  };

  const toggleEditMode = () => {
    setIsEditing((prevIsEditing) => !prevIsEditing);
  };

  const handleShare = async (e) => {
    e.preventDefault();
    const updatedPost = { ...post, body };

    try {
      const response = await fetch(`http://localhost:8000/posts/${id}`, {
        method: 'PUT',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(updatedPost),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setShowEditSuccessMessage(true);
      setTimeout(() => {
        setShowEditSuccessMessage(false);
      }, 3000);

      setPost(updatedPost);
      toggleEditMode();
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  return (
    <div className="blog-details">
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {post && (
        <article>
          {isEditing ? (
            <form>
              <textarea
                defaultValue={post.body}
                name="body"
                onChange={(e) => setBody(e.target.value)}
                required
              ></textarea>
              <div className="edit">
                <button type="submit" onClick={handleShare}>Save</button>
                <button onClick={toggleEditMode}>Cancel</button>
              </div>
            </form>
          ) : (
            <>
              <h2>{post.title}</h2>
              <h3>{post.username}</h3>
              <div>
  <button className="edit-button" onClick={toggleEditMode}>Edit</button>
  <button className="delete-button" onClick={handleClick}>Delete</button>
</div>
              <div className="container">
                <h4>{post.body}</h4>
              </div>
      <div class="react">
        
         <button className="like-button" onClick={handleLike} ></button>
         <button className="dislike-button" onClick={handleDislike}></button>
         
         </div>
         <span>Liked by sassy and {likes} others</span>

            </>
          )}
          {showEditSuccessMessage && <h2 className="warning">Post edited successfully</h2>}
          {showDeleteSuccessMessage && <h2 className="warning">Deleting your post...</h2>}
        </article>
      )}
    </div>
  );
};

export default BlogDetails;
