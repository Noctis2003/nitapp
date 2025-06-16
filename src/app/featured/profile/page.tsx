"use client";
import React, { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp, Trash2, User, Mail, Briefcase, Megaphone, FileText, MessageCircle } from 'lucide-react';
import axios from 'axios';
import { set , formatDistanceToNow } from "date-fns";

export type Role = {
  id: number;
  roleName: string;
  filled: number;
  gigId: number;
};

export type CollabGig = {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  userId: number;
  roles: Role[];
};

export type ForumPost = {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  userId: number;
  likes: any[]; // Add likes property
  comments: any[]; // Add comments property
};

export type ForumComment = {
  id: number;
  content: string;
  createdAt: string;
  postId: number;
  userId: number;
};

export type MarketplaceProduct = {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  createdAt: string;
  userId: number;
};

export type User = {
  id: number;
  username: string;
  email: string;
  createdAt: string;
  refreshToken: string;
  collabApplications: any[]; 
  collabGigs: CollabGig[];
  forumPosts: ForumPost[];
  forumComments: ForumComment[];
  marketplaceProducts: MarketplaceProduct[];
};


function ProfilePage() {


const [data, setData] = useState<User | null>(null);
 
useEffect(() => {
   
      const fetchUserData = async () => {
        try {
          const response = await axios.get("http://localhost:4000/user/all", {
            withCredentials: true,
          });
          
          setData(response.data);
          console.log("The data is",data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData();
    
  }, []);



useEffect(() => {
  if (data) {
    console.log("Data is now available:", data);
    setGigs(data.collabGigs || []);
    setAds(data.marketplaceProducts || []);
    setPosts(data.forumPosts || []);
    setComments(data.forumComments || []);
  }
}, [data]);



const [ads, setAds] = useState<MarketplaceProduct[]>([]); // Adjust type as needed
  
const [gigs, setGigs] = useState<CollabGig[]>([]);

 
  const [posts, setPosts] = useState<ForumPost[]>([]); // Initialize with empty array if data is not available

  const [comments, setComments] = useState<ForumComment[]>([]); // Initialize comments state

  const [expandedSections, setExpandedSections] = useState({
    gigs: false,
    ads: false,
    posts: false,
    comments: false
  });

  const toggleSection = (section: 'gigs' | 'ads' | 'posts' | 'comments') => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const deleteGig = async(id:any) => {
    console.log("Deleting gig with id:", id);
    setGigs(prev => prev.filter(gig => gig.id !== id));
  const response =  await axios.delete(`http://localhost:4000/forum/delete?id=${id}`, {
      withCredentials: true
    }
    )
    console.log("the response is", response);
  };

  const deleteAd = async (id:Number) => {
    setAds(prev => prev.filter(ad => ad.id !== id));
    const response =  await axios.delete(`http://localhost:4000/shop/delete?id=${id}`, {
      withCredentials: true
    }
    )
  };

  const deletePost = async (id:Number) => {
    setPosts(prev => prev.filter(post => post.id !== id));
    const response =  await axios.delete(`http://localhost:4000/forum/delete?id=${id}`, {
      withCredentials: true
    }
    )
    console.log("the response is", response);
  };

  const deleteComment = async (id:Number) => {
    setComments(prev => prev.filter(comment => comment.id !== id));
    try {
      const response = await axios.delete(`http://localhost:4000/forum/comment/delete?id=${id}`, {
        withCredentials: true
      });
      console.log("Comment deletion response:", response);
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'text-green-400';
      case 'Completed': return 'text-blue-400';
      case 'In Progress': return 'text-yellow-400';
      case 'Paused': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (

  
    <div className="bg-gray-950 min-h-screen w-full" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-2">My Profile</h1>
          <div className="w-24 h-1 bg-blue-500 mx-auto"></div>
        </div>

        {/* User Info Card */}
        <div className="bg-gray-900 rounded-xl p-8 mb-8 border border-gray-800">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-3 mb-3">
                <User className="w-5 h-5 text-gray-400" />
        {data ? (
  <span className="text-xl font-semibold text-white">{data.username}</span>
) : "loading"}
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-400" />
                { data ?  (<span className="text-gray-300">{data.email}</span>)
    : "loading"}
              </div>
            </div>
          </div>
        </div>

        {/* Gigs Section */}
        <div className="bg-gray-900 rounded-xl mb-6 border border-gray-800 overflow-hidden">
          <button
            onClick={() => toggleSection('gigs')}
            className="w-full p-6 flex items-center justify-between hover:bg-gray-800 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <Briefcase className="w-6 h-6 text-blue-400" />
              <h2 className="text-2xl font-bold text-white">My Gigs ({gigs.length})</h2>
            </div>
            {expandedSections.gigs ? 
              <ChevronUp className="w-6 h-6 text-gray-400" /> : 
              <ChevronDown className="w-6 h-6 text-gray-400" />
            }
          </button>
          
          {expandedSections.gigs && (
            <div className="border-t border-gray-800">
              {gigs.length === 0 ? (
                <div className="p-6 text-center text-gray-400">No gigs found</div>
              ) : (
                gigs.map((gig) => (
                  <div key={gig.id} className="p-6 border-b border-gray-800 last:border-b-0 hover:bg-gray-800 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white mb-2">{gig.name}</h3>
                        <div className="flex items-center space-x-6 text-sm">
                          <span className="text-gray-300">Roles: <span className="text-blue-400">{gig.roles.length}</span></span>
                          <span className="text-gray-300">Created: <span className="text-green-400">{formatDistanceToNow(new Date(gig.createdAt))} ago</span></span>
                         
                        </div>
                      </div>
                      <button
                        onClick={() => deleteGig(gig.id)}
                        className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors"
                        title="Delete gig"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Ads Section */}
        <div className="bg-gray-900 rounded-xl mb-6 border border-gray-800 overflow-hidden">
          <button
            onClick={() => toggleSection('ads')}
            className="w-full p-6 flex items-center justify-between hover:bg-gray-800 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <Megaphone className="w-6 h-6 text-purple-400" />
              <h2 className="text-2xl font-bold text-white">My Ads ({ads.length})</h2>
            </div>
            {expandedSections.ads ? 
              <ChevronUp className="w-6 h-6 text-gray-400" /> : 
              <ChevronDown className="w-6 h-6 text-gray-400" />
            }
          </button>
          
          {expandedSections.ads && (
            <div className="border-t border-gray-800">
              {ads.length === 0 ? (
                <div className="p-6 text-center text-gray-400">No ads found</div>
              ) : (
                ads.map((ad) => (
                  <div key={ad.id} className="p-6 border-b border-gray-800 last:border-b-0 hover:bg-gray-800 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white mb-2">{ad.name}</h3>
                        <div className="flex items-center space-x-6 text-sm">
                        
                          <span className="text-gray-300">Price <span className="text-orange-400">{ad.price}</span></span>
                          <span className="text-gray-300">Created: <span className="text-green-400">{formatDistanceToNow(new Date(ad.createdAt))} ago</span></span>
                        </div>
                      </div>
                      <button
                        onClick={() => deleteAd(ad.id)}
                        className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors"
                        title="Delete ad"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Posts Section */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
          <button
            onClick={() => toggleSection('posts')}
            className="w-full p-6 flex items-center justify-between hover:bg-gray-800 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <FileText className="w-6 h-6 text-green-400" />
              <h2 className="text-2xl font-bold text-white">My Posts ({posts.length})</h2>
            </div>
            {expandedSections.posts ? 
              <ChevronUp className="w-6 h-6 text-gray-400" /> : 
              <ChevronDown className="w-6 h-6 text-gray-400" />
            }
          </button>
          
          {expandedSections.posts && (
            <div className="border-t border-gray-800">
              {posts.length === 0 ? (
                <div className="p-6 text-center text-gray-400">No posts found</div>
              ) : (
                posts.map((post) => (
                  <div key={post.id} className="p-6 border-b border-gray-800 last:border-b-0 hover:bg-gray-800 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white mb-2">{post.title}</h3>
                        <div className="flex items-center space-x-6 text-sm">
                          <span className="text-gray-300">Likes: <span className="text-pink-400">{post.likes.length}</span></span>
                          <span className="text-gray-300">Comments: <span className="text-cyan-400">{post.comments.length}</span></span>
                          <span className="text-gray-300">Created: <span className="text-gray-400">{formatDistanceToNow(new Date(post.createdAt))} ago</span></span>
                        </div>
                      </div>
                      <button
                        onClick={() => deletePost(post.id)}
                        className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors"
                        title="Delete post"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Comments Section */}
        <div className="bg-gray-900 rounded-xl mt-6 border border-gray-800 overflow-hidden">
          <button
            onClick={() => toggleSection('comments')}
            className="w-full p-6 flex items-center justify-between hover:bg-gray-800 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <MessageCircle className="w-6 h-6 text-yellow-400" />
              <h2 className="text-2xl font-bold text-white">My Comments ({comments.length})</h2>
            </div>
            {expandedSections.comments ? 
              <ChevronUp className="w-6 h-6 text-gray-400" /> : 
              <ChevronDown className="w-6 h-6 text-gray-400" />
            }
          </button>
          
          {expandedSections.comments && (
            <div className="border-t border-gray-800">
              {comments.length === 0 ? (
                <div className="p-6 text-center text-gray-400">No comments found</div>
              ) : (
                comments.map((comment) => (
                  <div key={comment.id} className="p-6 border-b border-gray-800 last:border-b-0 hover:bg-gray-800 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-white mb-2">{comment.content}</p>
                        <div className="flex items-center space-x-6 text-sm">
                          <span className="text-gray-300">Post ID: <span className="text-blue-400">{comment.postId}</span></span>
                          <span className="text-gray-300">Created: <span className="text-gray-400">{formatDistanceToNow(new Date(comment.createdAt))} ago</span></span>
                        </div>
                      </div>
                      <button
                        onClick={() => deleteComment(comment.id)}
                        className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors"
                        title="Delete comment"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;