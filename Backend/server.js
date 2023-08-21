const express = require('express')
const app = express()
const port = 5000;
const BlogPost = require("./model/BlogPost");

const cors = require('cors')
const {connectDb} = require('./Db')
//middlewares
app.use(express.json());
app.use(cors());
connectDb()

//routes
app.post('/postblog',async (req,res)=>{ 
     let blog = new BlogPost({
        title: req.body.title,
        description: req.body.description,
     })
     await blog.save();
    res.json({message:"Blog post save successfully", blog})
})

//get
app.get('/getBlog', async (req, res) => {
    try {
      const blogs = await BlogPost.find(); // Use await to fetch the blog posts
      if (!blogs || blogs.length === 0) {
        res.status(404).json({ message: "No blog posts found" }); // Respond with a 404 status and message
      } else {
        res.json(blogs); // Respond with the array of blog posts
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" }); // Respond with a 500 status and message
    }
  });
  //ROUTE3 : DELETE
  app.delete('/delete/:id',async (req,res)=>{
    let blog = await BlogPost.findByIdAndDelete(req.params.id);
    if(!blog){
        res.status(404).json({message:"no Blog Found"})
    }
    res.status(200).json({message:"Blog deleted successfuly"})
  })
//ROUTE4 : UPDATE
app.put('/update/:id', async (req, res) => {
    try {
      let blog = await BlogPost.findById(req.params.id);
      
      if (!blog) {
        return res.status(404).json({ message: "No blog found" });
      }
  
      if (!req.body.title && !req.body.description) {
        return res.json({ message: "Please provide an update" });
      }
  
      if (req.body.title) {
        blog.title = req.body.title;
      }
  
      if (req.body.description) {
        blog.description = req.body.description;
      }
  
      await blog.save();
      res.status(200).json({ message: "Blog updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
}
})



//listen
app.listen(port,()=>{
console.log(`server is running on ${port}`)
})
