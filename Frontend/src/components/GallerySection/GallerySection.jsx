import { useEffect, useState } from 'react';
import { getAllGalleryItems } from '../../services/GalleryService';
import './GallerySection.css';

function GallerySection() {
  const [images, setImages] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    getAllGalleryItems().then(data => setImages(data));
  }, []);

  return (
    <section className="gallery-section">
      <h2 className="gallery-heading">Galleri</h2>

      <div className="gallery-grid">
        {images.map(image => (
          <div key={image.id} className="gallery-item" onClick={() => setSelected(image)}>
            <img src={image.imageUrl} alt={image.caption || 'Galleribild'} className="gallery-img" />
            {image.caption && (
              <div className="gallery-caption">{image.caption}</div>
            )}
          </div>
        ))}
      </div>

      {selected && (
        <div className="gallery-lightbox" onClick={() => setSelected(null)}>
          <div className="gallery-lightbox-content" onClick={e => e.stopPropagation()}>
            <button className="gallery-lightbox-close" onClick={() => setSelected(null)}>✕</button>
            <img src={selected.imageUrl} alt={selected.caption || 'Galleribild'} className="gallery-lightbox-img" />
            {selected.caption && (
              <p className="gallery-lightbox-caption">{selected.caption}</p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default GallerySection;