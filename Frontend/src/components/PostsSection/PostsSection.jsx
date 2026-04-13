import { useEffect, useState } from 'react';
import { getAllPosts } from '../../services/postService';
import './PostsSection.css';

function PostsSection() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getAllPosts().then(data => setPosts(data));
  }, []);

  if (posts.length === 0) return null;

  const featured = posts[0];
  const sidePosts = posts.slice(1, 3);

  return (
    <section className="posts-section">
      <h2 className="posts-heading">Senaste nytt</h2>
      <div className="posts-grid">
        <div className="posts-featured">
          {featured.imageUrl && (
            <img src={featured.imageUrl} alt={featured.title} className="posts-featured-img" />
          )}
          <div className="posts-featured-body">
            <span className="posts-date">{new Date(featured.createdAt).toLocaleDateString('sv-SE')}</span>
            <h3 className="posts-featured-title">{featured.title}</h3>
            <p className="posts-featured-excerpt">{featured.content}</p>
          </div>
        </div>

        <div className="posts-side">
          {sidePosts.map(post => (
            <div key={post.id} className="posts-side-card">
              {post.imageUrl && (
                <img src={post.imageUrl} alt={post.title} className="posts-side-img" />
              )}
              <div className="posts-side-body">
                <h4 className="posts-side-title">{post.title}</h4>
                <span className="posts-date">{new Date(post.createdAt).toLocaleDateString('sv-SE')}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PostsSection;