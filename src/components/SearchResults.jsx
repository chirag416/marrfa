import React from 'react';
import PropTypes from 'prop-types';
import { Calendar, Trash2 } from 'lucide-react';

export function SearchResults({ results, onDelete }) {
  if (results.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No results found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {results.map((result) => (
        <article
          key={result.id}
          className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-blue-500">{result.category}</span>
            <div className="flex items-center gap-4">
              <div className="flex items-center text-gray-500 text-sm">
                <Calendar className="h-4 w-4 mr-1" />
                {result.date}
              </div>
              {onDelete && (
                <button
                  onClick={() => onDelete(result.id)}
                  className="text-red-500 hover:text-red-600 transition-colors"
                  title="Delete post"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
          <h2 className="text-xl font-semibold mb-2">{result.title}</h2>
          <p className="text-gray-600">{result.excerpt}</p>
        </article>
      ))}
    </div>
  );
}

SearchResults.propTypes = {
  results: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    excerpt: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  })).isRequired,
  onDelete: PropTypes.func,
};