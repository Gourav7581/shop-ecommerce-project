import './ProductPlaceholder.css';

export default function ProductPlaceholder({ deitySize }) {
  return (
    <div className="snc-tasteful-placeholder" aria-label="Photo coming soon">
      <div className="snc-tasteful-inner">
        <span className="snc-placeholder-glyph">✦</span>
        <span className="snc-placeholder-label">Photo Coming Soon</span>
        {deitySize && <span className="snc-placeholder-size">{deitySize}</span>}
      </div>
    </div>
  );
}
