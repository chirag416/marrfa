import { PREDEFINED_CATEGORIES } from './categories';
import { mockResults } from '../data/mockData';

const STORAGE_KEY = 'blog_posts';
const INITIALIZED_KEY = 'blog_posts_initialized';

function initializeData() {
  const initialPosts = mockResults.map(post => ({
    ...post,
    category: PREDEFINED_CATEGORIES[Math.floor(Math.random() * PREDEFINED_CATEGORIES.length)]
  }));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialPosts));
  localStorage.setItem(INITIALIZED_KEY, 'true');
  return initialPosts;
}

export function getBlogPosts() {
  const isInitialized = localStorage.getItem(INITIALIZED_KEY);
  if (!isInitialized) {
    return initializeData();
  }

  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return [];
  }
  return JSON.parse(stored);
}

export function saveBlogPost(post) {
  const posts = getBlogPosts();
  const newPost = {
    ...post,
    id: crypto.randomUUID(),
    date: new Date().toISOString().split('T')[0],
  };
  
  posts.push(newPost);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  return newPost;
}

export function deleteBlogPost(id) {
  const posts = getBlogPosts();
  const filtered = posts.filter(post => post.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}