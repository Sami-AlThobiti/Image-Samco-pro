import React, { useState } from 'react';

// --- 1. الأيقونات (مدمجة) ---
const Icons = {
  Sparkles: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L12 3Z"/></svg>,
  Sun: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>,
  Moon: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>,
  Download: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>,
  Loader2: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="spin"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>,
  AlertCircle: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>,
};

export default function App() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(true);
  const [size, setSize] = useState('1024x1024'); 
  
  const sizes = [
    { id: '1024x1024', label: 'مربع (1:1)', icon: '▢' },
    { id: '1024x1792', label: 'طولي (ستوري)', icon: '▯' },
    { id: '1792x1024', label: 'عريض (يوتيوب)', icon: '▭' }
  ];

  const generateImage = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setImageLoading(true);
    setError('');
    setResult(null);

    try {
      // 1. توليد رقم عشوائي لضمان عدم تكرار الصورة
      const randomSeed = Math.floor(Math.random() * 999999999);
      
      // 2. تنظيف النص وتشفيره بشكل صحيح للرابط
      const cleanPrompt = prompt.replace(/[^\w\s\u0600-\u06FF]/g, ' '); // السماح بالعربية والإنجليزية فقط
      const finalPrompt = encodeURIComponent(cleanPrompt);
      
      let width = 1024;
      let height = 1024;
      if (size === '1024x1792') { width = 1024; height = 1792; } 
      if (size === '1792x1024') { width = 1792; height = 1024; } 

      // 3. بناء الرابط مع إضافة enhance=true لتحسين الفهم
      const imageUrl = `https://image.pollinations.ai/prompt/${finalPrompt}?width=${width}&height=${height}&seed=${randomSeed}&nologo=true&enhance=true&model=flux`;
      
      // وضع الرابط مباشرة
      setResult(imageUrl);
      
    } catch (err) {
      setError("حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.");
      setLoading(false);
      setImageLoading(false);
    }
  };

  return (
    <div className={`app-container ${darkMode ? 'dark' : 'light'}`} dir="rtl">
      {/* --- التصميم المدمج (CSS) --- */}
      <style>{`
        * { box-sizing: border-box; font-family: system-ui, -apple-system, sans-serif; }
        body { margin: 0; padding: 0; }
        
        .app-container { min-height: 100vh; transition: background 0.3s, color 0.3s; }
        .app-container.dark { background-color: #0f172a; color: white; }
        .app-container.light { background-color: #f8fafc; color: #1e293b; }

        nav { 
          padding: 1rem 1.5rem; 
          display: flex; justify-content: space-between; align-items: center; 
          border-bottom: 1px solid; position: sticky; top: 0; z-index: 50;
          backdrop-filter: blur(10px);
        }
        .dark nav { border-color: #334155; background-color: rgba(15, 23, 42, 0.9); }
        .light nav { border-color: #e2e8f0; background-color: rgba(255, 255, 255, 0.9); }

        .logo { display: flex; align-items: center; gap: 0.75rem; }
        .logo-icon { background: linear-gradient(to right, #a855f7, #ec4899); padding: 0.5rem; border-radius: 0.75rem; color: white; display: flex; }
        .logo-text { font-size: 1.5rem; font-weight: bold; background: linear-gradient(to right, #c084fc, #db2777); -webkit-background-clip: text; color: transparent; margin: 0; }

        .theme-btn { padding: 0.5rem; border-radius: 9999px; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
        .dark .theme-btn { background-color: #1e293b; color: #fbbf24; }
        .light .theme-btn { background-color: #e2e8f0; color: #475569; }

        main { max-width: 56rem; margin: 0 auto; padding: 2rem 1rem; }
        .hero { text-align: center; margin-bottom: 2.5rem; }
        .hero h2 { font-size: 2.5rem; font-weight: 800; margin-bottom: 1rem; margin-top: 0; }
        .hero p { font-size: 1.125rem; opacity: 0.8; }

        .control-card { 
          padding: 1.5rem; border-radius: 1.5rem; 
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
          margin-bottom: 2rem; border: 1px solid;
        }
        .dark .control-card { background-color: #1e293b; border-color: #334155; }
        .light .control-card { background-color: white; border-color: #f1f5f9; }

        textarea { 
          width: 100%; height: 8rem; padding: 1rem; border-radius: 1rem; 
          font-size: 1.125rem; resize: none; outline: none; border: 1px solid;
          margin-bottom: 1.5rem; display: block;
        }
        .dark textarea { background-color: #0f172a; color: white; border-color: #334155; }
        .light textarea { background-color: #f8fafc; color: #334155; border-color: #e2e8f0; }
        textarea:focus { border-color: #a855f7; box-shadow: 0 0 0 2px rgba(168, 85, 247, 0.2); }

        .controls { display: flex; flex-direction: column; gap: 1rem; }
        @media (min-width: 768px) { .controls { flex-direction: row; justify-content: space-between; } }

        .size-buttons { display: flex; gap: 0.5rem; background-color: rgba(0,0,0,0.1); padding: 0.25rem; border-radius: 0.75rem; }
        .size-btn { 
          display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; 
          border-radius: 0.5rem; border: none; cursor: pointer; font-weight: 500; font-size: 0.875rem;
          background: transparent; color: inherit; opacity: 0.7;
        }
        .size-btn.active { background: linear-gradient(to right, #9333ea, #db2777); color: white; opacity: 1; }
        
        .generate-btn { 
          display: flex; align-items: center; gap: 0.5rem; padding: 0.75rem 2rem; 
          border-radius: 0.75rem; border: none; cursor: pointer; font-weight: bold; color: white;
          background: linear-gradient(to right, #2563eb, #9333ea); transition: transform 0.1s;
        }
        .generate-btn:hover { opacity: 0.9; transform: scale(1.02); }
        .generate-btn:disabled { background: #64748b; cursor: not-allowed; opacity: 0.7; transform: none; }

        .error-box { background-color: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.2); color: #ef4444; padding: 1rem; border-radius: 0.75rem; display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.5rem; }
        
        .result-card { border-radius: 1.5rem; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); position: relative; min-height: 300px; }
        .image-container { background-color: #000; display: flex; justify-content: center; align-items: center; min-height: 400px; width: 100%; position: relative; }
        .image-container img { max-height: 600px; width: auto; max-width: 100%; object-fit: contain; display: block; }
        
        .loading-overlay { 
          position: absolute; top: 0; left: 0; right: 0; bottom: 0; 
          background: rgba(0,0,0,0.7); display: flex; flex-direction: column; 
          justify-content: center; align-items: center; color: white; z-index: 10;
        }

        .result-footer { padding: 1.5rem; display: flex; justify-content: space-between; align-items: center; }
        .dark .result-footer { background-color: #1e293b; }
        .light .result-footer { background-color: white; }
        
        .download-btn { display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1.5rem; background-color: #16a34a; color: white; text-decoration: none; border-radius: 0.75rem; font-weight: 500; }
        
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>

      {/* --- الهيكل --- */}
      <nav>
        <div className="logo">
          <div className="logo-icon"><Icons.Sparkles /></div>
          <h1 className="logo-text">Image Samco pro</h1>
        </div>
        <button onClick={() => setDarkMode(!darkMode)} className="theme-btn">
          {darkMode ? <Icons.Sun /> : <Icons.Moon />}
        </button>
      </nav>

      <main>
        <div className="hero">
          <h2>حول خيالك إلى واقع</h2>
          <p>اكتب وصفاً دقيقاً لما تتخيله، وسيقوم الذكاء الاصطناعي برسمه لك في ثوانٍ.</p>
        </div>

        <div className="control-card">
          <div style={{ position: 'relative' }}>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="مثال: قطة رائد فضاء تجلس على سطح القمر تشرب القهوة، رسم زيتي..."
            />
          </div>

          <div className="controls">
            <div className="size-buttons">
              {sizes.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSize(s.id)}
                  className={`size-btn ${size === s.id ? 'active' : ''}`}
                >
                  <span>{s.icon}</span>
                  {s.label}
                </button>
              ))}
            </div>

            <button
              onClick={generateImage}
              disabled={loading || !prompt}
              className="generate-btn"
            >
              {loading ? <><Icons.Loader2 /> جاري المعالجة...</> : <><Icons.Sparkles /> توليد الصورة</>}
            </button>
          </div>
        </div>

        {error && (
          <div className="error-box">
            <Icons.AlertCircle />
            <p>{error}</p>
          </div>
        )}

        {result && (
          <div className="result-card">
            <div className="image-container">
              {imageLoading && (
                <div className="loading-overlay">
                  <div style={{ transform: 'scale(1.5)', marginBottom: '1rem' }}><Icons.Loader2 /></div>
                  <p>جاري تحميل الصورة من السيرفر...</p>
                </div>
              )}
              
              <img 
                src={result} 
                alt="Generated AI Art" 
                onLoad={() => {
                  setLoading(false);
                  setImageLoading(false);
                }}
                onError={() => {
                  setLoading(false);
                  setImageLoading(false);
                  setError("فشل تحميل الصورة. يرجى المحاولة بوصف مختلف.");
                }}
                style={{ opacity: imageLoading ? 0 : 1, transition: 'opacity 0.5s' }}
              />
            </div>
            
            {!imageLoading && !error && (
              <div className="result-footer">
                <div>
                  <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1.1rem' }}>النتيجة النهائية</h3>
                  <p style={{ margin: 0, fontSize: '0.875rem', opacity: 0.7 }}>تم التوليد بواسطة Pollinations AI</p>
                </div>
                <a href={result} target="_blank" rel="noreferrer" className="download-btn">
                  <Icons.Download />
                  تحميل
                </a>
              </div>
            )}
          </div>
        )}
      </main>

      <footer style={{ textAlign: 'center', padding: '2rem', opacity: 0.6, fontSize: '0.875rem' }}>
        © 2024 Image Samco pro - Developed on GitHub Codespaces
      </footer>
    </div>
  );
}