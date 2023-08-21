import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const CreateBlog = () => {
  const navigate = useNavigate();

  const postData = async (event) => {
    event.preventDefault();
  
    const title = event.target.title.value;
    const description = event.target.description.value;
  
    const blog = {
      title: title,
      description: description,
    };
  
    try {
      const response = await fetch("http://localhost:5000/postblog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blog),
      });
  
      if (response.ok) {
        toast.success('Blog saved successfully');
        
        event.target.title.value = "";
        event.target.description.value = "";
        setTimeout(() => {
            navigate('/');    
        }, 2000);
         // Use navigate for navigation
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while saving the blog");
    }
  };

  return (
    <>
   <Toaster
  position="top-center"
  reverseOrder={false}
/>
    <div className="font-serif w-[66vw] mx-auto mt-11">

        <div className="text-center ">
        <h1 className='font-bold'>Create Your Blog</h1>
        </div>
        
         <form onSubmit={postData}>
        <div className="flex flex-col">
            <label htmlFor="title">Title : </label>
            
            <input type="text" name='title' className="bg-slate-100 rounded-md p-3 border border-black " rows={2} placeholder="Enter title"/>
        </div>
        
        <div className="flex flex-col">
            <label htmlFor="description">Description : </label>
            <textarea type="text" name="description" className="bg-slate-200  p-3 rounded-md border border-black " rows={10} placeholder="Enter your thoughts"/>
            <button type="submit" className="p-2 m-2 rounded-md  border border-purple-700 hover:box-decoration-clone hover:font-bold  hover:bg-gradient-to-r from-blue-600 to-cyan-200 hover:text-white px-2 shadow-md">post</button>
       
        </div>
        
        
        
        </form>
    </div>
    </>
  )

}

export default CreateBlog