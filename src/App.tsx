import { useState, useEffect } from 'react';
import { Users, Brain, FileText, TrendingUp, Baby, Heart, GraduationCap, BookOpen, AlertTriangle, Target, Mountain, Settings, LogOut, Milk, Dumbbell } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Button } from './components/ui/button';
import { ProfileFamily } from './components/ProfileFamily';
import { AnalysisPredict } from './components/AnalysisPredict';
import { TreatmentProtocol } from './components/TreatmentProtocol';
import { HeightSports } from './components/HeightSports';
import { Pregnancy } from './components/Pregnancy';
import { StudyPlanner } from './components/StudyPlanner';
import { DiaryGoals } from './components/DiaryGoals';
import { GrowthAbnormality } from './components/GrowthAbnormality';
import { WeightPlan } from './components/WeightPlan';
import { MountainProgram } from './components/MountainProgram';
import { SettingsAccount } from './components/SettingsAccount'; 
import { AuthPage } from './components/AuthPage';
import LandingPage from './components/LandingPage';
import { InfantMother } from './components/InfantMother';
import AIAssistant from './components/AIAssistant';
import { HeightTraining } from './components/HeightTraining';
import { FeedbackWidget } from './components/FeedbackWidget';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<string>('');
  const [showLanding, setShowLanding] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem('healthyVN_currentUser');
    if (user) {
      setIsAuthenticated(true);
      setCurrentUser(user);
      setShowLanding(false);
    }
  }, []);

  const handleLogin = (username: string) => {
    setIsAuthenticated(true);
    setCurrentUser(username);
    setShowLanding(false);
    localStorage.setItem('healthyVN_currentUser', username);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser('');
    setShowLanding(true);
    localStorage.removeItem('healthyVN_currentUser');
  };

  const handleNavigateToAuth = () => {
    setShowLanding(false);
  };

  if (!isAuthenticated) {
    if (showLanding) {
      return <LandingPage onNavigateToAuth={handleNavigateToAuth} />;
    }
    return <AuthPage onLogin={handleLogin} />;
  }

  return (
    <>
      <Toaster position="top-center" richColors />
      <FeedbackWidget />
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white p-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="flex items-center gap-2">
              <Heart className="w-8 h-8 animate-pulse" />
              Healthy Vietnam
            </h1>
            <p className="text-pink-100 text-sm mt-1">Hệ thống chăm sóc sức khỏe toàn diện cho người Việt</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm opacity-90">Xin chào,</p>
              <p>{currentUser}</p>
            </div>
            <Button 
              onClick={handleLogout}
              variant="outline"
              className="bg-white/20 border-white/40 text-white hover:bg-white/30"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Đăng xuất
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid grid-cols-7 lg:grid-cols-14 gap-2 h-auto p-2 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg">
            <TabsTrigger value="profile" className="flex flex-col items-center gap-1 p-3 data-[state=active]:bg-gradient-to-br data-[state=active]:from-pink-500 data-[state=active]:to-purple-500 data-[state=active]:text-white rounded-lg transition-all">
              <Users className="w-5 h-5" />
              <span className="text-xs">Hồ sơ</span>
            </TabsTrigger>
            
            <TabsTrigger value="analysis" className="flex flex-col items-center gap-1 p-3 data-[state=active]:bg-gradient-to-br data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white rounded-lg transition-all">
              <Brain className="w-5 h-5" />
              <span className="text-xs">Dự đoán</span>
            </TabsTrigger>
            
            <TabsTrigger value="treatment" className="flex flex-col items-center gap-1 p-3 data-[state=active]:bg-gradient-to-br data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white rounded-lg transition-all">
              <FileText className="w-5 h-5" />
              <span className="text-xs">Điều trị</span>
            </TabsTrigger>
            
            <TabsTrigger value="height" className="flex flex-col items-center gap-1 p-3 data-[state=active]:bg-gradient-to-br data-[state=active]:from-cyan-500 data-[state=active]:to-green-500 data-[state=active]:text-white rounded-lg transition-all">
              <TrendingUp className="w-5 h-5" />
              <span className="text-xs">Chiều cao</span>
            </TabsTrigger>
            
            <TabsTrigger value="pregnancy" className="flex flex-col items-center gap-1 p-3 data-[state=active]:bg-gradient-to-br data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white rounded-lg transition-all">
              <Baby className="w-5 h-5" />
              <span className="text-xs">Thai kỳ</span>
            </TabsTrigger>
            
            <TabsTrigger value="infant" className="flex flex-col items-center gap-1 p-3 data-[state=active]:bg-gradient-to-br data-[state=active]:from-teal-500 data-[state=active]:to-lime-500 data-[state=active]:text-white rounded-lg transition-all">
              <Milk className="w-5 h-5" />
              <span className="text-xs">Sơ sinh</span>
            </TabsTrigger>
            
            <TabsTrigger value="training" className="flex flex-col items-center gap-1 p-3 data-[state=active]:bg-gradient-to-br data-[state=active]:from-lime-500 data-[state=active]:to-yellow-500 data-[state=active]:text-white rounded-lg transition-all">
              <Dumbbell className="w-5 h-5" />
              <span className="text-xs">Tập luyện</span>
            </TabsTrigger>
            
            <TabsTrigger value="study" className="flex flex-col items-center gap-1 p-3 data-[state=active]:bg-gradient-to-br data-[state=active]:from-yellow-500 data-[state=active]:to-orange-500 data-[state=active]:text-white rounded-lg transition-all">
              <GraduationCap className="w-5 h-5" />
              <span className="text-xs">Ôn thi</span>
            </TabsTrigger>
            
            <TabsTrigger value="diary" className="flex flex-col items-center gap-1 p-3 data-[state=active]:bg-gradient-to-br data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white rounded-lg transition-all">
              <BookOpen className="w-5 h-5" />
              <span className="text-xs">Nhật ký</span>
            </TabsTrigger>
            
            <TabsTrigger value="abnormality" className="flex flex-col items-center gap-1 p-3 data-[state=active]:bg-gradient-to-br data-[state=active]:from-red-500 data-[state=active]:to-pink-500 data-[state=active]:text-white rounded-lg transition-all">
              <AlertTriangle className="w-5 h-5" />
              <span className="text-xs">Bất thường</span>
            </TabsTrigger>
            
            <TabsTrigger value="weight" className="flex flex-col items-center gap-1 p-3 data-[state=active]:bg-gradient-to-br data-[state=active]:from-pink-500 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg transition-all">
              <Target className="w-5 h-5" />
              <span className="text-xs">Cân nặng</span>
            </TabsTrigger>
            
            <TabsTrigger value="mountain" className="flex flex-col items-center gap-1 p-3 data-[state=active]:bg-gradient-to-br data-[state=active]:from-purple-600 data-[state=active]:to-indigo-500 data-[state=active]:text-white rounded-lg transition-all">
              <Mountain className="w-5 h-5" />
              <span className="text-xs">Núi rừng</span>
            </TabsTrigger>
            
            <TabsTrigger value="settings" className="flex flex-col items-center gap-1 p-3 data-[state=active]:bg-gradient-to-br data-[state=active]:from-indigo-500 data-[state=active]:to-blue-600 data-[state=active]:text-white rounded-lg transition-all">
              <Settings className="w-5 h-5" />
              <span className="text-xs">Cài đặt</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile"><ProfileFamily /></TabsContent>
          <TabsContent value="analysis"><AnalysisPredict /></TabsContent>
          <TabsContent value="treatment"><TreatmentProtocol /></TabsContent>
          <TabsContent value="height"><HeightSports /></TabsContent>
          <TabsContent value="pregnancy"><Pregnancy /></TabsContent>
          <TabsContent value="infant"><InfantMother /></TabsContent>
          <TabsContent value="training"><HeightTraining /></TabsContent>
          <TabsContent value="study"><StudyPlanner /></TabsContent>
          <TabsContent value="diary"><DiaryGoals /></TabsContent>
          <TabsContent value="abnormality"><GrowthAbnormality /></TabsContent>
          <TabsContent value="weight"><WeightPlan /></TabsContent>
          <TabsContent value="mountain"><MountainProgram /></TabsContent>
          <TabsContent value="settings"><SettingsAccount onLogout={handleLogout} /></TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <div className="bg-gradient-to-r from-purple-900 to-blue-900 text-white p-6 mt-12">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm opacity-90">
            Healthy Vietnam 1.0 - Phát triển bởi Healthy Vietnam Team
          </p>
          <p className="text-sm opacity-75 mt-1">
            👑 Thân Vũ Hà Anh — Trưởng nhóm · AI & Công nghệ<br/>
            💻 "Dẫn đầu đổi mới – kiến tạo trí tuệ vì sức khỏe Việt Nam."<br/><br/>
            🎨 Ngô Thủy Tiên — Mỹ thuật & Nghệ thuật<br/>
            🖌️ "Thổi hồn sáng tạo vào từng khung hình vì cộng đồng khỏe đẹp."
          </p>
        </div>
      </div>
    </div>
    </>
  );
}
