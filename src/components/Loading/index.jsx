import "./index.css";

export default function Loading({ isFullScreen = true }) {
  return (
    <div
      className={`d-flex justify-content-center align-items-center flex-column gap-2 ${
        isFullScreen ? "loading-full-screen" : "loading-container"
      }`}
    >
      <div className="spinner-border" role="status"></div>
      <span className="sr-only visually-visible">Loading...</span>
    </div>
  );
}
