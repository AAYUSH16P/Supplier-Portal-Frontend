import "../../style/LandingPage/GlobalLoader.css";

export default function GlobalLoader() {
  return (
    <div className="global-loader-backdrop">
      <div className="global-loader">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <p>Loading...</p>
    </div>
  );
}
