import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
// 한글 글꼴 (사이트 안에 직접 포함)
import 'pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css';
import '@fontsource/gowun-batang/400.css';
import '@fontsource/ibm-plex-mono/400.css';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
