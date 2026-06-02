import{Post} from "../models/post.model.js";

//creat a post 
const createPost = async(req, res) => {
    try {
        const {name, description, age} = req.body;
        
        if(!name || !description || !age){
            return res.status(400).json({
                message: "All fields are required"
            });
        }
            const post = await Post.create({name, description, age});
            
            res.status(201).json({
                message: " Post created successfully",post
            });
        
    } catch (error) {
        res.status(500).json({
            message: "Internel server error",
            error: error.message
        });
        
    }
}

// to get all the post like insta feed making api
const getPosts = async(req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);

    } catch (error) {
        res.status(500).json({
                message: "Internal server error", error
            });
    
        
    }
}

const updatePost = async (req, res) => {
    try {
        // basic validation if body is emepty or not for checking 

        //ye kese kam karta hai like {name: x , description: y, age:z} -> [name, description, age]
        //{} = truthy
        if(Object.keys(req, res). length === 0){
            return res.status(400).json({
                message: "No data provided for update"
            });
        }

        const post = await Post.findByIdAndUpdate(req.params.id, req.body,
            {new: true});

            if(!post) return res.status(404).json({
                message: "Post not found"
            });

            res.status(200).json({
                message: "post upadated Successfully",post
            });


    } catch (error) {
          res.status(500).json({
                message: "Internal server error", error
            
        })
        
    }
}

const deletePost = async (req, res) => {
    try {
        
        const deleted = await Post.findByIdAndDelete(req.params.id);
        if(!deleted) return res.status(404).json({
            message:"Post deleted Successfully"
        });

        res.status(200).json({
            message: "psot successfully deleted"
        })

    } catch (error) {
          res.status(500).json({
                message: "Internal server error", error
            
        })
    }
}

export{
    createPost,
    getPosts,
    updatePost,
    deletePost 
};