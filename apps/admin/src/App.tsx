import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";

import Dashboard from "@/components/Dashboard";
import PostManagement from "@/components/PostManagement";
import Analytics from "@/components/Analytics";
import Login from "@/components/Login";
import ProtectedRoute from "@/components/ProtectedRoute";

import { AuthProvider, useAuth } from "@shared/admin-auth/src/AuthContext";

type TabType = "dashboard" | "posts" | "analytics";

function AdminContent() {
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "posts":
        return <PostManagement />;
      case "analytics":
        return <Analytics />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <nav className="bg-slate-700 text-white p-4 shadow-md">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Admin Panel</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-300 text-sm">{user?.email}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors text-sm"
            >
              로그아웃
            </button>
          </div>
        </div>
        <div className="flex gap-4 flex-col md:flex-row mt-4">
          <button
            className={`px-4 py-2 rounded transition-colors ${
              activeTab === "dashboard"
                ? "bg-blue-500 text-white"
                : "text-gray-300 hover:bg-gray-600 hover:text-white"
            }`}
            onClick={() => setActiveTab("dashboard")}
          >
            대시보드
          </button>
          <button
            className={`px-4 py-2 rounded transition-colors ${
              activeTab === "posts"
                ? "bg-blue-500 text-white"
                : "text-gray-300 hover:bg-gray-600 hover:text-white"
            }`}
            onClick={() => setActiveTab("posts")}
          >
            포스팅 관리
          </button>
          <button
            className={`px-4 py-2 rounded transition-colors ${
              activeTab === "analytics"
                ? "bg-blue-500 text-white"
                : "text-gray-300 hover:bg-gray-600 hover:text-white"
            }`}
            onClick={() => setActiveTab("analytics")}
          >
            방문자 데이터
          </button>
        </div>
      </nav>
      <main className="flex-1 p-8 max-w-6xl mx-auto w-full">
        {renderContent()}
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<AdminContent />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
