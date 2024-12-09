import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { SearchBox } from './components/SearchBox';
import { FilterBar } from './components/FilterBar';
import { SearchResults } from './components/SearchResults';
import { BlogForm } from './components/BlogForm';
import { getBlogPosts, saveBlogPost, deleteBlogPost } from './utils/storage';
import { PREDEFINED_CATEGORIES } from './utils/categories';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPosts(getBlogPosts());
  }, []);

  const activeCategories = useMemo(() => {
    const usedCategories = new Set(posts.map((post) => post.category));
    return PREDEFINED_CATEGORIES.filter(category => usedCategories.has(category));
  }, [posts]);

  const filteredResults = useMemo(() => {
    return posts.filter((result) => {
      const matchesSearch = result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || result.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [posts, searchQuery, selectedCategory]);

  const handleAddPost = (data) => {
    const newPost = saveBlogPost(data);
    setPosts(prev => [...prev, newPost]);
  };

  const handleDeletePost = (id) => {
    deleteBlogPost(id);
    setPosts(prev => prev.filter(post => post.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Blog Posts</h1>
          <p className="text-gray-600">Create and manage your blog posts</p>
        </div>

        <div className="space-y-6">
          <BlogForm onSubmit={handleAddPost} />

          <SearchBox
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          <FilterBar
            categories={activeCategories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />

          <SearchResults 
            results={filteredResults}
            onDelete={handleDeletePost}
          />
        </div>
      </div>
    </div>
  );
}

export default App;