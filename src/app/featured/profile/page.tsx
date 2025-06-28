"use client";
import React, { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp, Trash2, User, Mail, Briefcase, Megaphone, FileText, MessageCircle } from 'lucide-react';
import axios from 'axios';
import { Send } from 'lucide-react'
import {  formatDistanceToNow } from "date-fns";
import poppins from '@/styles/font';

export type Role = {
  id: number;
  roleName: string;
  filled: number;
  gigId: number;
  applications: application[]
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
  likes: []; // Add likes property
  comments: ForumComment[]; // Add comments property
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
  collabApplications: application[];
  collabGigs: CollabGig[];
  forumPosts: ForumPost[];
  forumComments: ForumComment[];
  marketplaceProducts: MarketplaceProduct[];
};


export type application = {

  id: number;
  message: string;
  createdAt: string;
  postId: number;
  gigName: string;
  roleName: string;
  gigId: number;
  roleId: number;
}


function ProfilePage() {


  const [data, setData] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {

    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/all`, {
          withCredentials: true,
        });

        setData(response.data);
        console.log("The data is", data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
      finally {
        setLoading(false);
      }
    };

    fetchUserData();
// eslint-disable-next-line react-hooks/exhaustive-deps
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

  const [applications, setApplications] = useState<application[]>([]);

  const [posts, setPosts] = useState<ForumPost[]>([]); // Initialize with empty array if data is not available

  const [comments, setComments] = useState<ForumComment[]>([]); // Initialize comments state

  const [expandedSections, setExpandedSections] = useState({
    gigs: false,
    ads: false,
    posts: false,
    comments: false,
    applications: false
  });

  const toggleSection = (section: 'gigs' | 'ads' | 'posts' | 'comments' | 'applications') => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const deleteGig = async (id: number) => {
    console.log("Deleting gig with id:", id);
    setGigs(prev => prev.filter(gig => gig.id !== id));
    const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/collab/collab?id=${id}`, {
      withCredentials: true
    }
    )
    console.log("the response is", response);
  };

  const deleteAd = async (id: number) => {
    setAds(prev => prev.filter(ad => ad.id !== id));
    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/shop/delete?id=${id}`, {
      withCredentials: true
    }
    )
  };

  const deletePost = async (id: number) => {
    setPosts(prev => prev.filter(post => post.id !== id));
    const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/forum/delete?id=${id}`, {
      withCredentials: true
    }
    )
    console.log("the response is", response);
  };

  const deleteComment = async (id: number) => {
    setComments(prev => prev.filter(comment => comment.id !== id));
    try {
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/forum/comment/delete?id=${id}`, {
        withCredentials: true
      });
      console.log("Comment deletion response:", response);
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const deleteApplication = async (id: number) => {
    setApplications(prev => prev.filter(comment => comment.id !== id));
    try {
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/collab/collab?id=${id}`, {
        withCredentials: true
      });
      console.log("Comment deletion response:", response);
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  
  // Extract applications with context
  const extractApplications = (gigs: CollabGig[]) => {
    const allApplications = [] as application[];

    gigs.forEach(gig => {
      gig.roles.forEach(role => {
        role.applications.forEach(app => {
          allApplications.push({
            ...app,
            gigName: gig.name,
            roleName: role.roleName,
            gigId: gig.id,
            roleId: role.id
          });
        });
      });
    });

    return allApplications;
  };



  useEffect(() => {

    console.log("Gigs:", gigs);
    const allApplications = extractApplications(gigs);
    setApplications(allApplications);
    console.log("Extracted applications:", allApplications);
    console.log(comments)

  }, [gigs])

if (loading) {
    return (
      <div className={`min-h-screen bg-gray-950 text-white flex items-center justify-center w-full ${poppins.className}`}>
        <div className="flex flex-col items-center space-y-6">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-gray-800 border-t-cyan-500 rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-cyan-400 rounded-full animate-spin animation-delay-150"></div>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold text-cyan-400 mb-2">Loading your profile</h3>
            <p className="text-gray-400">Finding stuff</p>
          </div>
        </div>
      </div>
    );
  }

  return (


    <div className="bg-gray-950 min-h-screen w-full px-4 sm:px-6 lg:px-8 xxs:mt-10 md:mt-3"  style={{ fontFamily: 'Poppins, sans-serif' }}>
      { loading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="text-white text-xl sm:text-2xl">Loading...</div>
        </div>
      ) :
      <div className="container w-full max-w-6xl mx-auto py-6 sm:py-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">My Profile</h1>
          <div className="w-16 sm:w-24 h-1 bg-blue-500 mx-auto"></div>
        </div>

        {/* User Info Card */}
        <div className="bg-gray-900 rounded-xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 border border-gray-800 w-full">
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <div className="text-center sm:text-left">
              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-3">
                <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mx-auto sm:mx-0" />
                {data ? (
                  <span className="text-lg sm:text-xl font-semibold text-white">{data.username}</span>
                ) : "loading"}
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mx-auto sm:mx-0" />
                {data ? (<span className="text-sm sm:text-base text-gray-300 break-all">{data.email}</span>)
                  : "loading"}
              </div>
            </div>
          </div>
        </div>

        {/* Gigs Section */}
        <div className="bg-gray-900 rounded-xl mb-4 sm:mb-6 border border-gray-800 overflow-hidden">
          <button
            onClick={() => toggleSection('gigs')}
            className="w-full p-4 sm:p-6 flex items-center justify-between hover:bg-gray-800 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">My Gigs ({gigs.length})</h2>
            </div>
            {expandedSections.gigs ?
              <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" /> :
              <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
            }
          </button>

          {expandedSections.gigs && (
            <div className="border-t border-gray-800">
              {gigs.length === 0 ? (
                <div className="p-4 sm:p-6 text-center text-gray-400">No gigs found</div>
              ) : (
                gigs.map((gig) => (
                  <div key={gig.id} className="p-4 sm:p-6 border-b border-gray-800 last:border-b-0 hover:bg-gray-800 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-3 sm:space-y-0">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base sm:text-lg font-semibold text-white mb-2 break-words">{gig.name}</h3>
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-6 text-xs sm:text-sm">
                          <span className="text-gray-300">Roles: <span className="text-blue-400">{gig.roles.length}</span></span>
                          <span className="text-gray-300">Created: <span className="text-green-400">{formatDistanceToNow(new Date(gig.createdAt))} ago</span></span>
                        </div>
                      </div>
                      <button
                        onClick={() => deleteGig(gig.id)}
                        className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors self-end sm:self-center"
                        title="Delete gig"
                      >
                        <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Ads Section */}
        <div className="bg-gray-900 rounded-xl mb-4 sm:mb-6 border border-gray-800 overflow-hidden">
          <button
            onClick={() => toggleSection('ads')}
            className="w-full p-4 sm:p-6 flex items-center justify-between hover:bg-gray-800 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <Megaphone className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">My Ads ({ads.length})</h2>
            </div>
            {expandedSections.ads ?
              <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" /> :
              <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
            }
          </button>

          {expandedSections.ads && (
            <div className="border-t border-gray-800">
              {ads.length === 0 ? (
                <div className="p-4 sm:p-6 text-center text-gray-400">No ads found</div>
              ) : (
                ads.map((ad) => (
                  <div key={ad.id} className="p-4 sm:p-6 border-b border-gray-800 last:border-b-0 hover:bg-gray-800 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-3 sm:space-y-0">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base sm:text-lg font-semibold text-white mb-2 break-words">{ad.name}</h3>
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-6 text-xs sm:text-sm">
                          <span className="text-gray-300">Price <span className="text-orange-400">{ad.price}</span></span>
                          <span className="text-gray-300">Created: <span className="text-green-400">{formatDistanceToNow(new Date(ad.createdAt))} ago</span></span>
                        </div>
                      </div>
                      <button
                        onClick={() => deleteAd(ad.id)}
                        className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors self-end sm:self-center"
                        title="Delete ad"
                      >
                        <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Posts Section */}
        <div className="bg-gray-900 rounded-xl mb-4 sm:mb-6 border border-gray-800 overflow-hidden">
          <button
            onClick={() => toggleSection('posts')}
            className="w-full p-4 sm:p-6 flex items-center justify-between hover:bg-gray-800 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">My Posts ({posts.length})</h2>
            </div>
            {expandedSections.posts ?
              <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" /> :
              <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
            }
          </button>

          {expandedSections.posts && (
            <div className="border-t border-gray-800">
              {posts.length === 0 ? (
                <div className="p-4 sm:p-6 text-center text-gray-400">No posts found</div>
              ) : (
                posts.map((post) => (
                  <div key={post.id} className="p-4 sm:p-6 border-b border-gray-800 last:border-b-0 hover:bg-gray-800 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-3 sm:space-y-0">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base sm:text-lg font-semibold text-white mb-2 break-words">{post.title}</h3>
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-6 text-xs sm:text-sm">
                          <span className="text-gray-300">Likes: <span className="text-pink-400">{post.likes.length}</span></span>
                          <span className="text-gray-300">Comments: <span className="text-cyan-400">{post.comments.length}</span></span>
                          <span className="text-gray-300">Created: <span className="text-gray-400">{formatDistanceToNow(new Date(post.createdAt))} ago</span></span>
                        </div>
                      </div>
                      <button
                        onClick={() => deletePost(post.id)}
                        className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors self-end sm:self-center"
                        title="Delete post"
                      >
                        <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Comments Section */}
        <div className="bg-gray-900 rounded-xl mb-4 sm:mb-6 border border-gray-800 overflow-hidden">
          <button
            onClick={() => toggleSection('comments')}
            className="w-full p-4 sm:p-6 flex items-center justify-between hover:bg-gray-800 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">My Comments ({comments.length})</h2>
            </div>
            {expandedSections.comments ?
              <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" /> :
              <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
            }
          </button>

          {expandedSections.comments && (
            <div className="border-t border-gray-800">
              {comments.length === 0 ? (
                <div className="p-4 sm:p-6 text-center text-gray-400">No comments found</div>
              ) : (
                comments.map((comment) => (
                  <div key={comment.id} className="p-4 sm:p-6 border-b border-gray-800 last:border-b-0 hover:bg-gray-800 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between space-y-3 sm:space-y-0">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm sm:text-base text-white mb-2 break-words">{comment.content}</p>
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-6 text-xs sm:text-sm">
                          <span className="text-gray-300">Post ID: <span className="text-blue-400">{comment.postId}</span></span>
                          <span className="text-gray-300">Created: <span className="text-gray-400">{formatDistanceToNow(new Date(comment.createdAt))} ago</span></span>
                        </div>
                      </div>
                      <button
                        onClick={() => deleteComment(comment.id)}
                        className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors self-end sm:self-start"
                        title="Delete comment"
                      >
                        <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Applications Section */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
          <button
            onClick={() => toggleSection('applications')}
            className="w-full p-4 sm:p-6 flex items-center justify-between hover:bg-gray-800 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <Send className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">My applications ({applications.length})</h2>
            </div>
            {expandedSections.applications ?
              <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" /> :
              <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
            }
          </button>

          {expandedSections.applications && (
            <div className="border-t border-gray-800">
              {applications.length === 0 ? (
                <div className="p-4 sm:p-6 text-center text-gray-400">No applications found</div>
              ) : (
                applications.map((app) => (
                  <div key={app.id} className="p-4 sm:p-6 border-b border-gray-800 last:border-b-0 hover:bg-gray-800 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between space-y-3 sm:space-y-0">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm sm:text-base text-white mb-2 break-words">{app.message}</p>
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-6 text-xs sm:text-sm">
                          <span className="text-gray-300">Post ID: <span className="text-blue-400">{app.postId}</span></span>
                          <span className="text-gray-300">Created: <span className="text-gray-400">{formatDistanceToNow(new Date(app.createdAt))} ago</span></span>
                        </div>
                      </div>
                      <button
                        onClick={() => deleteApplication(app.id)}
                        className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors self-end sm:self-start"
                        title="Delete application"
                      >
                        <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

      </div>
}
    </div>
  );
}

export default ProfilePage;