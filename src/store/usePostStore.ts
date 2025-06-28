import { create } from 'zustand';
import axios from 'axios';

export type Post = {
  id: string;
  title: string;
  description: string;
  user: {
    email: string;
  };
  createdAt: string;
  likes: [];
  comments: [];
};

type PostState = {
  posts: Post[];
  loading: boolean;
  error: string;
  fetchPosts: () => Promise<void>;
  addPost: (post: Post) => void;
};

const usePostStore = create<PostState>((set) => ({
  posts: [],
  loading: true,
  error: '',

  fetchPosts: async () => {
    set({ loading: true, error: '' });
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/forum/get`, {
        withCredentials: true,
      });
      set({ posts: response.data.data, loading: false });
    } catch (error) {
      console.error(error);
      set({ error: 'Failed to fetch posts.', loading: false });
    }
  },

  addPost: (post: Post) =>
    set((state) => ({
      posts: [post, ...state.posts], // Prepend for newest first
    })),
}));

export default usePostStore;
