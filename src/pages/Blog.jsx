import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { FaThumbsUp, FaThumbsDown, FaComment, FaEdit, FaTrash } from 'react-icons/fa'; // Added FaEdit icon
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const BlogPage = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newBlog, setNewBlog] = useState({
    title: '',
    content: ''
  });
  const [showButtons, setShowButtons] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [likeClicked, setLikeClicked] = useState(false);
  const [dislikeClicked, setDislikeClicked] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false); // New state for CKEditor modal
  const [updatedContent, setUpdatedContent] = useState(''); // New state to hold updated content
  const [pagination, setPagination] = useState({
    pageNumber: 0,
    pageSize: 5,
    totalItems: 0,
  })
  

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await axios.get('https://localhost:7209/api/Blog/AllBlogs');
        setBlogPosts(response.data);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      }
    };

    fetchBlogPosts();
  }, []);


  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);


  const openModal = (post) => {
    setSelectedPost(post);
    setShowButtons(true);
  };

  const closeModal = () => {
    setSelectedPost(null);
    setShowButtons(false);
    setShowCommentModal(false);
  };

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBlog(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const addBlogPost = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await axios.post(
        'https://localhost:7209/api/Blog/AddBlog',
        newBlog,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      console.log('New blog post added:', response.data);
      setNewBlog({
        title: '',
        content: ''
      });
      setShowAddForm(false);
      setBlogPosts(prevPosts => [...prevPosts, response.data]);
      toast.success('Blog post added successfully!');
    } catch (error) {
      console.error('Error adding new blog post:', error);
    }
  };

  const handleCommentSubmit = async (postId, comment) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `https://localhost:7209/api/Blog/Comment/${postId}`,
        {
          Content: comment,
          ParentCommentId: null
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      console.log('Comment added:', response.data);
      toast.success('Comment added successfully!');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };


  const handleLikeDislike = async (postId, action) => {
    try {
      const token = localStorage.getItem('token');
      let reactionStatus = null;

      if (selectedPost.ReactionStatus === action) {
        reactionStatus = null;
      } else {
        reactionStatus = action === 'like' ? 1 : 0;
      }

      const response = await axios.post(
        `https://localhost:7209/api/Blog/React/${postId}`,
        { reactionStatus },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      console.log(`${action} added for post ${postId}:`, response.data);
      toast.success(`${action} added successfully for post ${postId}!`);

      if (action === 'like') {
        setLikeClicked(true);
        setDislikeClicked(false);
      } else if (action === 'dislike') {
        setDislikeClicked(true);
        setLikeClicked(false);
      }
    } catch (error) {
      console.error(`Error adding ${action}:`, error);
    }
  };

  const handleOpenEditor = () => {
    setUpdatedContent(selectedPost.content);
    setIsEditorOpen(true);
  };

  const handleUpdateContent = async (postId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `https://localhost:7209/api/Blog/UpdateBlog/${postId}`,
        updatedContent,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json' // Set Content-Type header
          }
        }
      );
      console.log('Blog post updated:', response.data);
      toast.success('Blog post updated successfully!');
    } catch (error) {
      console.error('Error updating blog post:', error);
      if (error.response && error.response.status === 401) {
        // Unauthorized access: Handle accordingly (e.g., redirect to login page)
        // Example: history.push('/login');
      } else {
        // Other errors: Display error message to the user
        toast.error('Failed to update blog post. Please try again later.');
      }
    }
  };

  // const handleDeleteBlog = async (postId, title, content) => {
  //   try {
  //     const token = localStorage.getItem('token');
  //     const response = await axios.delete(
  //       `https://localhost:7209/api/Blog/DeleteBlog/${postId}`,
  //       {
  //         headers: {
  //           'Authorization': `Bearer ${token}`
  //         }
  //         // data: {
  //         //   Title: title,
  //         //   Content: content
  //         // }
  //       }
  //     );
  //     console.log('Blog post deleted:', response.data);
  //     // Add logic to update the UI or perform any other actions after successful deletion
  //     toast.success('Blog post deleted successfully!');
  //   } catch (error) {
  //     console.error('Error deleting blog post:', error);
  //     // Handle the error appropriately, such as displaying an error message to the user
  //   }
  // };

  const handleDeleteBlog = async (postId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(
        `https://localhost:7209/api/Blog/DeleteBlog/${postId}`,

        {
          data: { model: 'bar' },
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      console.log('Blog post deleted:', response.data);
      // Add logic to update the UI or perform any other actions after successful deletion
      toast.success('Blog post deleted successfully!');
    } catch (error) {
      console.error('Error deleting blog post:', error);
      // Handle the error appropriately, such as displaying an error message to the user
    }

  };

  const fetchBlogs = async (sortBy) => {
    try {
      const response = await axios.get(`https://localhost:7209/api/Blog/AllBlogs?sortBy=${sortBy}&PageNumber=1&PageSize=100`);
      setBlogPosts(response.data);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    }
  };
  return (
    <>
      <div className="container mx-auto">
        <ToastContainer />
        <div className="flex justify-between items-center">
          <h1 className="text-3xl text-center font-bold my-8 text-dark" style={{ marginLeft: "600px" }}>Blogs</h1>
        </div>
        {isLoggedIn && (
          <div className="flex justify-end m-0 margin">
            <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2 m-0 " onClick={toggleAddForm}>Add Blog</button>

          </div>
        )}
        <div className="flex">
          <button className="bg-green-500 text-white px-4 py-2 rounded mr-2 m-0" onClick={() => fetchBlogs("recent")}>Recent</button>
          <button className="bg-yellow-500 text-white px-4 py-2 rounded mr-2 m-0" onClick={() => fetchBlogs("popular")}>Popular</button>
          <button className="bg-red-500 text-white px-4 py-2 rounded mr-2 m-0" onClick={() => fetchBlogs("random")}>Random</button>
        </div>
        {showAddForm && (
          <div className="bg-white p-8 rounded-lg shadow-md mt-4">
            <input
              type="text"
              name="title"
              value={newBlog.title}
              onChange={handleInputChange}
              placeholder="Blog Title"
              className="mb-4 w-full p-2 border border-gray-300 rounded-md"
            />
            <CKEditor
              editor={ClassicEditor}
              data={newBlog.content}
              onChange={(event, editor) => {
                const data = editor.getData();
                setNewBlog(prevState => ({
                  ...prevState,
                  content: data.replace(/<p><\/p>/g, '')
                }));
              }}
              className="custom-ckeditor"
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2 m-0" onClick={addBlogPost}>Add Post</button>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {blogPosts.map(blog => (
            <div key={blog.id} className="bg-white p-6 shadow-md rounded-md">
              <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
              <p className="text-gray-600 mb-4">{blog.content}</p>
              <div className="flex justify-between items-center mb-4">
                <button className="text-blue-500 hover:text-blue-700" onClick={() => openModal(blog)}>Readmore</button>
                {isLoggedIn && ( // Render the delete icon only if the user is logged in
                  <FaTrash
                    size={24}
                    className="text-red-500 cursor-pointer"
                    onClick={() => handleDeleteBlog(blog.id)}
                  />
                )}  
              </div>
            </div>
          ))}
        </div>
        {selectedPost && (
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-8 rounded-lg">
              <button className="absolute right-4 top-4 text-gray-500 hover:text-gray-700" onClick={handleOpenEditor}>
                <FaEdit size={24} />
              </button>
              <h2 className="text-2xl font-semibold mb-2">{selectedPost.title}</h2>
              <p className="text-gray-600 mb-4">{selectedPost.content}</p>
              {showButtons && (
                <div className="flex justify-between items-center mb-4">
                  <FaThumbsUp
                    size={24}
                    className={`text-white-500 cursor-pointer ${likeClicked ? 'text-blue-500' : ''}`}
                    onClick={() => handleLikeDislike(selectedPost.id, 'like')}
                  />
                  <FaThumbsDown
                    size={24}
                    className={`text-black-500 cursor-pointer ${dislikeClicked ? 'text-red-500' : ''}`}
                    onClick={() => handleLikeDislike(selectedPost.id, 'dislike')}
                  />
                  <FaComment size={24} className="text-gray-500 cursor-pointer" onClick={() => setShowCommentModal(true)} />
                </div>
              )}
            </div>
          </div>
        )}
        {showCommentModal && (
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-8 rounded-lg">
              <button className="absolute right-4 text-dark" onClick={() => setShowCommentModal(false)}>Close</button>
              <h2 className="text-2xl font-semibold mb-2">Add Comment</h2>
              <textarea
                rows={4}
                placeholder="Enter your comment..."
                className="w-full p-2 border border-gray-300 rounded-md mb-4"
              />
              <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => handleCommentSubmit(selectedPost.id, 'comment')}>Add Comment</button>
            </div>
          </div>
        )}
        {isEditorOpen && (
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-8 rounded-lg">
              <CKEditor
                editor={ClassicEditor}
                data={updatedContent}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setUpdatedContent(data);
                }}
              />
              <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4" onClick={handleUpdateContent(selectedPost.id)}>Update</button>
            </div>
          </div>
        )}
        
      </div>
    </>
  );
};

export default BlogPage;
