import axios from "axios";
import { useState } from "react";
import './App.css';



function App() {
  const [image, setImage] = useState(null);
  const [resultImage, setResultImage] = useState(null);
  const [detections, setDetections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("detection");

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!image) return;
    const formData = new FormData();
    formData.append("image", image);

    try {
      setLoading(true);
      setResultImage(null);
      setDetections([]);

      const res = await axios.post("https://objectdetection-diiz.onrender.com/api/detect/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        timeout: 300000, // 5 min max
      });

      setResultImage(`data:image/jpeg;base64,${res.data.image}`);
      setDetections(res.data.detections || []); // ✅ FIX: match backend key
    } catch (err) {
      console.error("❌ Upload failed:", err);
      alert("Detection failed. Check server logs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <div className="container">
          <h1>Object Detection System</h1>
          <nav className="nav-tabs">
            <button 
              className={activeTab === "detection" ? "tab active" : "tab"} 
              onClick={() => setActiveTab("detection")}
            >
              Detection
            </button>
            <button 
              className={activeTab === "about" ? "tab active" : "tab"} 
              onClick={() => setActiveTab("about")}
            >
              About
            </button>
          </nav>
        </div>
      </header>

      <main className="main-content container">
        {activeTab === "detection" ? (
          <>
            {/* Upload Section */}
            <section className="upload-section card">
              <h2>Upload Image for Object Detection</h2>
              <p>Select an image to detect objects using our AI-powered detection system</p>
              
              <div className="upload-area">
                <label htmlFor="file-input" className="file-input-label">
                  <div className="upload-placeholder">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="17 8 12 3 7 8"></polyline>
                      <line x1="12" y1="3" x2="12" y2="15"></line>
                    </svg>
                    <p>{image ? image.name : "Choose an image or drag it here"}</p>
                  </div>
                  <input 
                    id="file-input" 
                    type="file" 
                    onChange={handleImageChange} 
                    className="file-input" 
                  />
                </label>
                
                <button
                  onClick={handleUpload}
                  disabled={!image || loading}
                  className="detect-button"
                >
                  {loading ? (
                    <>
                      <span className="spinner"></span>
                      Processing...
                    </>
                  ) : "Detect Objects"}
                </button>
              </div>
            </section>

            {/* Results Section */}
            {loading && (
              <section className="loading-section card">
                <div className="loading-content">
                  <div className="loading-spinner"></div>
                  <h3>Detecting Objects</h3>
                  <p>Our AI is analyzing your image. This may take a few moments...</p>
                </div>
              </section>
            )}

            {resultImage && (
              <section className="results-section">
                <div className="card">
                  <h2>Detection Results</h2>
                  <div className="image-container">
                    <img
                      src={resultImage}
                      alt="Detection result"
                      className="result-image"
                    />
                  </div>
                </div>

                {detections?.headers && detections?.rows && (
                  <div className="card detections-table">
                    <h2>Detected Objects</h2>
                    <div className="table-container">
                      <table>
                        <thead>
                          <tr>
                            {detections.headers.map((h, idx) => (
                              <th key={idx}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {detections.rows.map((row, i) => (
                            <tr key={i}>
                              {row.map((cell, j) => (
                                <td key={j}>{cell}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </section>
            )}
          </>
        ) : (
          <section className="about-section card">
            <h2>About Our Object Detection System</h2>
            <div className="about-content">
              <div className="about-text">
                <p>
                  This advanced object detection system uses cutting-edge AI technology to identify and locate objects within images. 
                  Simply upload an image, and our system will process it to detect various objects, providing detailed information about each detection.
                </p>
                
                <h3>How It Works</h3>
                <ol>
                  <li>Upload an image using the drag and drop interface or file browser</li>
                  <li>Our system processes the image using sophisticated computer vision algorithms</li>
                  <li>View the results with bounding boxes around detected objects</li>
                  <li>Examine the detailed information table about each detected object</li>
                </ol>
                
                <h3>Technology</h3>
                <p>
                  The system utilizes a deep learning model trained on millions of images to accurately identify objects across various categories. 
                  The backend processes images efficiently while the frontend provides an intuitive interface for interacting with the detection results.
                </p>
              </div>
              
              <div className="features-grid">
                <div className="feature-box">
                  <div className="feature-icon">⚡</div>
                  <h4>Fast Processing</h4>
                  <p>Quick detection with our optimized AI algorithms</p>
                </div>
                
                <div className="feature-box">
                  <div className="feature-icon">🎯</div>
                  <h4>High Accuracy</h4>
                  <p>Precise object recognition with minimal false positives</p>
                </div>
                
                <div className="feature-box">
                  <div className="feature-icon">🔍</div>
                  <h4>Detailed Analysis</h4>
                  <p>Comprehensive information about each detected object</p>
                </div>
                
                <div className="feature-box">
                  <div className="feature-icon">📱</div>
                  <h4>Mobile Friendly</h4>
                  <p>Works seamlessly on all devices and screen sizes</p>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Object Detection System</h3>
              <p>Powered by advanced AI and computer vision technology</p>
            </div>
            
            <div className="footer-section">
              <h4>Links</h4>
              <ul>
                <li><a href="#privacy">Privacy Policy</a></li>
                <li><a href="#terms">Terms of Service</a></li>
                <li><a href="#contact">Contact Us</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>Connect</h4>
              <div className="social-links">
                <a href="#twitter" aria-label="Twitter"></a>
                <a href="#github" aria-label="GitHub">🐙</a>
                <a href="#linkedin" aria-label="LinkedIn">🔗</a>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Object Detection System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
