import Blog from "../models/blogModel.js";
import Joi from "joi";
import multer from "multer";
import fs from "fs";
import Comment from '../models/commentModel.js';


// Set up Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
// Validation schema
const BlogSchema = Joi.object({
  title: Joi.string().min(3).max(30).required(),
  description: Joi.string().required(),
  markdown: Joi.string(),

  img: Joi.string(),
});
const CommentSchema = Joi.object({
  blog:Joi.string().required(),
  comment: Joi.string().required(),
});

// const isAdmin = (req, res, next) => {
//   // Assuming you have stored the user role during authentication
//   const userRole = req.user && req.user.role;

//   if (userRole !== "admin") {
//     return res.status(403).json({ message: "Unauthorized access" });
//   }

//   next();
// };

const BlogController = {
  async create(req, res, next) {
    console.log(req.body);
    try {
      // isAdmin(req, res, next);

      const { title, description, markdown, img } = req.body;
      if (!req.file) {
        return res.status(400).json({ message: "Image file is required" });
      }

      const imgData = fs.readFileSync(req.file.path);

      // Validation
      const { error } = BlogSchema.validate(req.body);
      if (error) {
        return next(error);
      }

      // Create a new Course
      const BlogData = {
        title,
        description,
        markdown,

        img: {
          data: imgData,
          contentType: req.file.mimetype, // Use the mimetype provided by multer
        },
      };
      const blog = new Blog(BlogData);
      // Save the new course to the database
      const result = await blog.save();
      fs.unlinkSync(req.file.path);
      console.log(img);
      res.status(201).json({ result });
    } catch (error) {
      return next(error);
    }
  },
  async createComment(req, res, next) {
    try {
      const { blogId } = req.body;
      const { comment } = req.body;

      // Validate Comment data
    
console.log(comment)
      // Create a new Comment
      const newComment = new Comment({ blog: blogId, comment });
      const savedComment = await newComment.save();

      res.status(201).json({ comment: savedComment });
    } catch (error) {
      return next(error);
    }
  },

  async getAllComment(req , res){
    try {
      const { id } = req.params;
      console.log(id)

      // Find comments associated with the specified blog post
      const comments = await Comment.find({ blog: id });

      if (!comments) {
        return res.status(404).json({ message: "Comments not found." });
      }

      res.json({ comments });
    } catch (error) {
      return next(error);
    }
  
  },
  async update(req, res, next) {
    try {


      const blogId = req.params.id;
      const { title, description, markdown, img } = req.body;

      // Validation
      const { error } = BlogSchema.validate(req.body);
      if (error) {
        return next(error);
      }

      // Update the course in the database
      const result = await Blog.findByIdAndUpdate(
        blogId,
        {
          title, description, markdown,
        },
        { new: true }
      );

      if (!result) {
        return res.status(404).json({ message: "Course not found." });
      }

      res.json({ result });
    } catch (error) {
      return next(error);
    }
  },

  async delete(req, res, next) {
    try {
      // isAdmin(req, res, next);

      const blogId = req.params.id;

      // Delete the course from the database
      const result = await Blog.findByIdAndDelete(courseId);

      if (!result) {
        return res.status(404).json({ message: "Course not found." });
      }

      res.json({ message: "Course deleted successfully." });
    } catch (error) {
      return next(error);
    }
  },

  async get(req, res, next) {
    try {
      const blogs = await Blog.find();
      if (blogs.length === 0) {
        return res.status(404).json({ message: "No blogs found." });
      }
      res.json({ blogs });
    } catch (error) {
      return next(error);
    }
  },
  async getOne(req, res, next) {
    try {
      const blogId = req.params.id;

      // Find the course by ID
      const blog = await Blog.findById(blogId);

      if (!blog) {
        return res.status(404).json({ message: "Blog not found." });
      }

      res.json({ blog });
    } catch (error) {
      return next(error);
    }
  },
};

export { BlogController, upload };
