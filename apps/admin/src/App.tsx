import { useState } from 'react'
import './index.css'
import Dashboard from './components/Dashboard'
import PostManagement from './components/PostManagement'
import Analytics from './components/Analytics'

type TabType = 'dashboard' | 'posts' | 'analytics'

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard')

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />
      case 'posts':
        return <PostManagement />
      case 'analytics':
        return <Analytics />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <nav className="bg-slate-700 text-white p-4 shadow-md">
        <h1 className="text-xl font-bold mb-4">Admin Panel</h1>
        <div className="flex gap-4 flex-col md:flex-row">
          <button 
            className={`px-4 py-2 rounded transition-colors ${
              activeTab === 'dashboard' 
                ? 'bg-blue-500 text-white' 
                : 'text-gray-300 hover:bg-gray-600 hover:text-white'
            }`}
            onClick={() => setActiveTab('dashboard')}
          >
            대시보드
          </button>
          <button 
            className={`px-4 py-2 rounded transition-colors ${
              activeTab === 'posts' 
                ? 'bg-blue-500 text-white' 
                : 'text-gray-300 hover:bg-gray-600 hover:text-white'
            }`}
            onClick={() => setActiveTab('posts')}
          >
            포스팅 관리
          </button>
          <button 
            className={`px-4 py-2 rounded transition-colors ${
              activeTab === 'analytics' 
                ? 'bg-blue-500 text-white' 
                : 'text-gray-300 hover:bg-gray-600 hover:text-white'
            }`}
            onClick={() => setActiveTab('analytics')}
          >
            방문자 데이터
          </button>
        </div>
      </nav>
      <main className="flex-1 p-8 max-w-6xl mx-auto w-full">
        {renderContent()}
      </main>
    </div>
  )
}

export default App
