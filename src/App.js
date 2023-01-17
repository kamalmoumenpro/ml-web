import "./App.css";
import DocsBody from "./Body/DocsBody/DocsBody";
// import '../node_modules/highlight.js/styles/magula.css'
import hljs from "./highlight/highlight";
import { useEffect } from "react";


function App() {
  useEffect(()=>{
    hljs.highlightAll()
  },[])
  return (
    <div className="root-container">
      <div className="page-wrapper">
        <div className="app-header">
          <div className="left-menu">
            <div className="branding"></div>
            <div className="menu-container">
              <a className="nav-item" href="/">
                {" "}
                Overview
              </a>
              <a className="nav-item active" href="/">
                {" "}
                Documentation
              </a>
              <a className="nav-item" href="/">
                {" "}
                Examples
              </a>
            </div>
          </div>
          <div className="right-menu"> right menu</div>
        </div>
        <div className="page-body">
          <div className="docs-nav">
            <div class="side-nav side-nav-padded">
              <div className="side-nav-section">
                <div className="side-nav-header">Data Modeling</div>
                <a className="scroll-link side-nav-item" href="a">
                  Linear Regression
                </a>
              </div>
            </div>
          </div>
          <div className="docs-body">
            <DocsBody />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
