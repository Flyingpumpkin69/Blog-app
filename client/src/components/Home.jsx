import { TiDelete } from 'react-icons/ti';
import { BsFillPenFill } from 'react-icons/bs';
import { useState, useEffect } from 'react';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [editContent, setEditContent] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null); // Changed to null
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    const response = await fetch('https://blog-backend-zuuz.onrender.com/getBlog');
    const data = await response.json();
    setPosts(data);
  };

  const deletePost = async (id) => {
    const response = await fetch(`https://blog-backend-zuuz.onrender.com/delete/${id}`, {
      method: 'DELETE',
    });
    if (response.status === 200) {
      alert('Blog deleted successfully');
      getPosts();
    } else {
      alert('Something went wrong');
    }
  };

  const updatePost = async (id) => {
    const response = await fetch(`https://blog-backend-zuuz.onrender.com/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, description }), // Fixed typo "stringfy" to "stringify"
    });
    if (response.status === 200) {
      alert('Blog updated successfully');
      getPosts();
    } else {
      alert('Something went wrong');
    }
  };

  return (
    <div className="mt-10">
      {posts.map((post) => (
        <div className="w-[50vw] border-2 mx-auto" key={post._id}>
          <div className="flex justify-end text-xl my-2 gap-3">
            <BsFillPenFill
              onClick={() => {
                setEditContent(!editContent);
                setSelectedPost(post._id); // Set the selected post ID
                setTitle(post.title);
                setDescription(post.description);
              }}
              className="text-gray hover:text-green-700 hover:text-xl"
            />
            <TiDelete
              className="text-gray hover:text-red-700 hover:text-xl"
              onClick={() => {
                deletePost(post._id);
              }}
            />
          </div>
          <h2 className="font-bold" contentEditable={editContent} onInput={(e) => setTitle(e.target.innerText)}>
            {post.title}
          </h2>
          <h4 contentEditable={editContent} onInput={(e) => setDescription(e.target.innerText)}>
            {post.description}
          </h4>
          <button
            className={`${selectedPost === post._id && editContent ? 'block' : 'hidden'} text-gray bg-orange-200 hover:bg-orange-900 px-2 py-3 my-2 rounded-md`}
            onClick={() => {
              updatePost(post._id);
            }}
          >
            SAVE
          </button>
        </div>
      ))}
    </div>
  );
};

export default Home;
