import React, { useState } from 'react';
import { Heart, TrendingUp, Activity, Brain, Baby, Mountain, Apple, Moon, Target, Users, Settings, BookOpen, ArrowRight, CheckCircle2, Mail, Sparkles, Award, Globe, FileText, AlertTriangle, GraduationCap, Lock } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import aiThanhImage from 'figma:asset/1656acb0c4957ca20e9663027e23d1356e2b3e92.png';
import teamImage from 'figma:asset/6a42a1fc6745b3035339d1fba17af9faaf5ed7cf.png';

interface LandingPageProps {
  onNavigateToAuth: () => void;
}

export default function LandingPage({ onNavigateToAuth }: LandingPageProps) {
  const [activeSection, setActiveSection] = useState('home');

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const features = [
    {
      icon: Users,
      emoji: '👤',
      title: 'QUẢN LÝ HỒ SƠ SỨC KHỎE',
      items: [
        '📝 Hồ sơ cá nhân và gia đình + anh/chị/em',
        '📊 Theo dõi chỉ số cơ thể',
        '📏 Đánh giá số đo 3 vòng',
        '👨‍👩‍👧‍👦 Tiền sử bệnh gia đình'
      ],
      color: 'from-blue-500 to-indigo-500'
    },
    {
      icon: Brain,
      emoji: '🔬',
      title: 'PHÂN TÍCH & DỰ ĐOÁN SỨC KHỎE',
      items: [
        '⚖️ Phân tích BMI và cân nặng lý tưởng',
        '📈 So sánh với chuẩn Việt Nam',
        '🧬 Dự đoán di truyền (F1-F5)',
        '⚠️ Đánh giá nguy cơ bệnh tật'
      ],
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: FileText,
      emoji: '🏥',
      title: 'PHÁC ĐỒ ĐIỀU TRỊ & PHÒNG NGỪA',
      items: [
        '💊 30 bệnh với phác đồ chi tiết',
        '🛡️ Biện pháp phòng bệnh',
        '🍎 Hướng dẫn dinh dưỡng theo bệnh',
        '💉 Khuyến nghị vắc-xin theo độ tuổi'
      ],
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: TrendingUp,
      emoji: '📏',
      title: 'CHIỀU CAO & PHÁT TRIỂN THỂ CHẤT',
      items: [
        '📐 Dự đoán chiều cao tối đa',
        '💪 Bài tập tăng chiều cao',
        '🏀 50 môn thể thao để người dùng chọn',
        '📊 Đánh giá phát triển thể chất'
      ],
      color: 'from-cyan-500 to-blue-500'
    },
    {
      icon: Baby,
      emoji: '🤰',
      title: 'CHĂM SÓC THAI KỲ & SINH SẢN',
      items: [
        '📅 Phác đồ thai kỳ theo giai đoạn',
        '👶 Tính ngày dự sinh',
        '🔍 Ước lượng khả năng có con + chiều cao & cân nặng',
        '🍼 Dinh dưỡng cho mẹ bầu'
      ],
      color: 'from-pink-500 to-rose-500'
    },
    {
      icon: AlertTriangle,
      emoji: '⚠️',
      title: 'PHÁT HIỆN BẤT THƯỜNG TĂNG TRƯỞNG',
      items: [
        '📐 Đánh giá số đo chi tiết cơ thể',
        '🔍 Phát hiện dấu hiệu bất thường',
        '🏥 Gợi ý hội chứng có thể',
        '📈 Theo dõi lịch sử phát triển'
      ],
      color: 'from-red-500 to-orange-500'
    },
    {
      icon: Target,
      emoji: '⚖️',
      title: 'KẾ HOẠCH CÂN NẶNG CÁ NHÂN HÓA',
      items: [
        '🎯 Kế hoạch tăng/giảm/giữ cân',
        '🍽️ Thực đơn dinh dưỡng cá nhân',
        '💪 Bài tập phù hợp mục tiêu',
        '📅 Lịch trình thực hiện'
      ],
      color: 'from-amber-500 to-orange-500'
    },
    {
      icon: GraduationCap,
      emoji: '📚',
      title: 'HỖ TRỢ ÔN THI HỌC SINH',
      items: [
        '📖 Tạo kế hoạch ôn thi',
        '⏰ Thời khóa biểu học tập',
        '🍎 Kế hoạch ăn uống, ngủ nghỉ tránh mệt mỏi',
        '🏆 Hệ thống huy hiệu khen thưởng'
      ],
      color: 'from-teal-500 to-cyan-500'
    },
    {
      icon: Mountain,
      emoji: '🏔️',
      title: 'CHUYÊN BIỆT VÙNG CAO',
      items: [
        '🥗 Dinh dưỡng giá rẻ địa phương',
        '💪 Bài tập phù hợp địa hình',
        '🤰 Chăm sóc mẹ bầu vùng cao',
        '📏 Chuẩn chiều cao vùng miền'
      ],
      color: 'from-green-600 to-emerald-600'
    },
    {
      icon: BookOpen,
      emoji: '📝',
      title: 'THEO DÕI SỨC KHỎE HÀNG NGÀY',
      items: [
        '📔 Nhật ký sức khỏe cá nhân',
        '🎯 Quản lý mục tiêu sức khỏe',
        '📊 Theo dõi tiến độ thực hiện',
        '🔔 Nhắc nhở chăm sóc sức khỏe'
      ],
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Lock,
      emoji: '🔐',
      title: 'BẢO MẬT & CÁ NHÂN HÓA',
      items: [
        '🔒 Đăng nhập an toàn',
        '🎨 Tùy chỉnh giao diện',
        '📤 Xuất dữ liệu sức khỏe',
        '💾 Lưu trữ thông tin cá nhân'
      ],
      color: 'from-indigo-500 to-purple-500'
    },
    {
      icon: Baby,
      emoji: '👶',
      title: 'SỨC KHỎE TRẺ SƠ SINH & MẸ SAU SINH',
      items: [
        '🍼 Theo dõi phát triển trẻ 0-12 tháng',
        '🧷 Lịch tiêm chủng thông minh',
        '🍎 Dinh dưỡng mẹ & bé toàn diện',
        '💊 Sức khỏe & tâm lý mẹ sau sinh',
        '🧬 Di truyền & phát triển tương lai',
        '🌙 Phân tích giấc ngủ trẻ sơ sinh',
        '👣 Phát triển vận động & trí não',
        '🧾 Nhật ký & lịch trình chăm sóc'
      ],
      color: 'from-rose-400 to-pink-400'
    },
    {
      icon: Activity,
      emoji: '🏋️‍♀️',
      title: 'TẬP LUYỆN TĂNG CHIỀU CAO',
      items: [
        '📊 Phân tích cơ sở khoa học (5 yếu tố)',
        '🧘 7 bài tập kéo giãn hàng ngày',
        '🏀 Môn thể thao khuyến khích',
        '🌙 Giấc ngủ & hormone tăng trưởng',
        '🍽️ Dinh dưỡng hỗ trợ chiều cao',
        '🧬 Dự đoán chiều cao tối đa (đến 25 tuổi)',
        '🧠 Phân tích tư thế & cột sống',
        '📅 Kế hoạch 30 ngày tăng chiều cao'
      ],
      color: 'from-lime-500 to-green-500'
    }
  ];

  const caseStudies = [
    {
      name: 'Bé Bo – 7 tuổi',
      story: 'Khi nhập dữ liệu 1m15 & 15kg, app cảnh báo nguy cơ nhẹ cân. Sau 3 tháng áp dụng thực đơn AI Thanh gợi ý, bé tăng lên 17kg, năng lượng học tập tốt hơn, ngủ sâu hơn 1.2 giờ mỗi ngày.',
      color: 'from-pink-500 to-rose-500'
    },
    {
      name: 'Bé Ben – Anh trai của Bo (11 tuổi, 1m35 & 25kg)',
      story: 'App phát hiện thiếu sắt và protein, gợi ý món ăn giàu dinh dưỡng địa phương – sau 2 tháng, cân nặng ổn định ở 28kg, không còn mệt khi học buổi chiều.',
      color: 'from-blue-500 to-cyan-500'
    }
  ];

  const teamMembers = [
    {
      name: 'Thân Vũ Hà Anh',
      role: 'Trưởng nhóm · AI & Công nghệ',
      icon: '👑',
      quote: '"Dẫn đầu đổi mới – kiến tạo trí tuệ vì sức khỏe Việt Nam."',
      color: 'from-blue-500 to-indigo-500'
    },
    {
      name: 'Ngô Thủy Tiên',
      role: 'Mỹ thuật & Nghệ thuật',
      icon: '🎨',
      quote: '"Thổi hồn sáng tạo vào từng khung hình vì cộng đồng khỏe đẹp."',
      color: 'from-pink-500 to-purple-500'
    }
  ];

  const sdgs = [
    { number: 3, title: 'Sức khỏe tốt và cuộc sống hạnh phúc', color: 'bg-green-500' },
    { number: 4, title: 'Giáo dục chất lượng', color: 'bg-red-500' },
    { number: 5, title: 'Bình đẳng giới', color: 'bg-orange-500' },
    { number: 10, title: 'Giảm bất bình đẳng', color: 'bg-pink-500' },
    { number: 1, title: 'Xóa nghèo', color: 'bg-yellow-500' },
    { number: 2, title: 'Xóa đói', color: 'bg-amber-500' },
    { number: 8, title: 'Tăng trưởng kinh tế', color: 'bg-purple-500' },
    { number: 17, title: 'Quan hệ đối tác vì mục tiêu', color: 'bg-blue-500' }
  ];

  const impacts = [
    { icon: Activity, title: 'Giảm tải bệnh học đường', color: 'from-red-400 to-pink-400' },
    { icon: Heart, title: 'Nâng cao ý thức chăm sóc bản thân', color: 'from-pink-400 to-rose-400' },
    { icon: Users, title: 'Gắn kết gia đình – nhà trường – xã hội', color: 'from-purple-400 to-indigo-400' },
    { icon: Mountain, title: 'Hỗ trợ vùng cao tiếp cận kiến thức sức khỏe', color: 'from-green-400 to-emerald-400' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-purple-100 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 p-2 rounded-2xl shadow-lg">
                <Heart className="w-8 h-8 text-white" fill="white" />
              </div>
              <div>
                <h1 className="text-xl bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                  🌿 Healthy Vietnam
                </h1>
              </div>
            </div>
            
            <div className="hidden lg:flex items-center gap-6">
              <button onClick={() => scrollToSection('home')} className="text-gray-600 hover:text-purple-600 transition-colors">🏠 Trang chủ</button>
              <button onClick={() => scrollToSection('features')} className="text-gray-600 hover:text-purple-600 transition-colors">💡 Tính năng</button>
              <button onClick={() => scrollToSection('case-study')} className="text-gray-600 hover:text-purple-600 transition-colors">📊 Case Study</button>
              <button onClick={() => scrollToSection('team')} className="text-gray-600 hover:text-purple-600 transition-colors">👩‍💻 Nhóm phát triển</button>
              <button onClick={() => scrollToSection('sdgs')} className="text-gray-600 hover:text-purple-600 transition-colors">🌍 SDGs & Tác động xã hội</button>
              <button onClick={() => scrollToSection('contact')} className="text-gray-600 hover:text-purple-600 transition-colors">📬 Liên hệ</button>
            </div>

            <Button 
              onClick={onNavigateToAuth}
              className="bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 hover:from-green-500 hover:via-emerald-500 hover:to-teal-500 text-white shadow-lg"
            >
              Dùng thử ngay
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-200/30 via-purple-200/30 to-blue-200/30" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Hero Image */}
            <div className="mb-12 flex justify-center">
              <div className="relative w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src={teamImage} 
                  alt="Healthy Vietnam Team" 
                  className="w-full h-auto"
                />
              </div>
            </div>

            <div className="text-center">
              <Badge className="mb-6 bg-gradient-to-r from-pink-500 to-purple-500 text-white border-none text-lg px-6 py-2">
                🌿 HEALTHY VIETNAM – ỨNG DỤNG SỨC KHỎE HỌC ĐƯỜNG THÔNG MINH
              </Badge>
              
              <h2 className="text-4xl md:text-5xl mb-6 text-gray-800">
                💫 "Công nghệ Việt – Vì sức khỏe Việt"
              </h2>
              
              <h3 className="text-3xl md:text-4xl mb-6 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                Ứng dụng AI đầu tiên tại Việt Nam theo dõi sức khỏe học đường & phát triển toàn diện học sinh
              </h3>
              
              <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
                Healthy Vietnam giúp học sinh, phụ huynh và nhà trường chủ động theo dõi BMI, dinh dưỡng, giấc ngủ, sức khỏe tinh thần – hướng tới thế hệ Việt khỏe mạnh, hạnh phúc và học tốt hơn.
              </p>

              <div className="flex flex-wrap gap-4 justify-center mb-16">
                <Button 
                  onClick={onNavigateToAuth}
                  size="lg"
                  className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 text-white text-lg px-8 py-6 shadow-2xl"
                >
                  Dùng thử ứng dụng
                  <Sparkles className="w-5 h-5 ml-2" />
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-2 border-purple-500 text-purple-600 hover:bg-purple-50 text-lg px-8 py-6"
                  onClick={() => scrollToSection('features')}
                >
                  Khảo sát sức khỏe
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* App Introduction */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-4xl md:text-5xl mb-6 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              📲 AI Việt Nam đồng hành cùng sức khỏe học đường
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              Healthy Vietnam 1.0 là ứng dụng được phát triển bởi học sinh Trường Tiểu học & THCS FPT – kết hợp giữa AI phân tích dữ liệu sức khỏe, giáo dục dinh dưỡng, và hỗ trợ y tế học đường.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border-2 border-pink-200 hover:shadow-xl transition-all">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full flex items-center justify-center">
                  <Activity className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl mb-2 text-gray-800">Giao diện thân thiện</h3>
                <p className="text-gray-600">Thiết kế anime/cartoon đầy màu sắc, dễ sử dụng</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-200 hover:shadow-xl transition-all">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-400 to-indigo-400 rounded-full flex items-center justify-center">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl mb-2 text-gray-800">AI phân tích thông minh</h3>
                <p className="text-gray-600">Dự đoán chính xác & khuyến nghị cá nhân hóa</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-200 hover:shadow-xl transition-all">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl mb-2 text-gray-800">Biểu đồ BMI/BMR dễ hiểu</h3>
                <p className="text-gray-600">Theo dõi sự phát triển một cách trực quan</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Features */}
      <section id="features" className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              🏥 HEALTHY VIETNAM - CÁC TÍNH NĂNG CHÍNH
            </h2>
            <p className="text-gray-600 text-lg">13 nhóm tính năng toàn diện cho sức khỏe cộng đồng</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="border-2 border-transparent hover:border-purple-200 hover:shadow-2xl transition-all group">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center mb-4">
                      <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg mb-3`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <div className="text-3xl mb-2">{feature.emoji}</div>
                      <h3 className="text-sm text-gray-800">{feature.title}</h3>
                    </div>
                    <ul className="space-y-2">
                      {feature.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-600">
                          <span className="text-xs leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Case Study */}
      <section id="case-study" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              📊 CASE STUDY – CÂU CHUYỆN NGƯỜI DÙNG
            </h2>
            <p className="text-gray-600 text-lg">Những thay đổi thực sự từ người dùng của chúng tôi</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
            {caseStudies.map((study, index) => (
              <Card key={index} className="border-2 border-transparent hover:border-purple-200 hover:shadow-2xl transition-all">
                <CardContent className="p-8">
                  <div className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${study.color} text-white mb-4`}>
                    {index === 0 ? '📘' : '📗'} {study.name}
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {study.story}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="max-w-3xl mx-auto bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 border-l-4 border-purple-500">
            <div className="flex items-start gap-4">
              <div className="text-4xl">💬</div>
              <div>
                <p className="text-lg text-gray-700 italic mb-2">
                  "Healthy Vietnam giúp gia đình tôi hiểu rõ sức khỏe con hơn – giờ mỗi bữa ăn đều là bài học nhỏ về khoa học."
                </p>
                <p className="text-purple-600">— Phụ huynh bé Bo</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Thanh Character */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
                🤖 NHÂN VẬT AI THANH
              </h2>
              <p className="text-gray-600 text-lg">Đang phát triển & sẽ ra mắt trong thời gian gần</p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <div className="bg-white rounded-3xl p-8 shadow-2xl border-2 border-purple-200">
                  <h3 className="text-2xl mb-4 text-gray-800">
                    "Tôi là AI Thanh – Trí tuệ Việt vì sức khỏe Việt."
                  </h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    Đại diện cho công nghệ nhân văn, AI Thanh giúp phân tích dữ liệu, dự đoán nguy cơ sức khỏe và khơi dậy nhận thức sống lành mạnh.
                  </p>
                  <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-4 border-l-4 border-purple-500">
                    <p className="text-lg text-gray-800 italic">
                      🗣️ "Không chỉ học máy – mà khiến máy học được lòng người."
                    </p>
                  </div>
                  <div className="mt-6 space-y-2 text-sm text-gray-600">
                    <p>📏 Chiều cao: 1m75</p>
                    <p>⚖️ Cân nặng: 65kg</p>
                    <p>📐 Số đo: 90-65-90</p>
                    <p>🗺️ Hiểu biết: 34 tỉnh thành Việt Nam</p>
                  </div>
                </div>
              </div>

              <div className="order-1 md:order-2">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-400 rounded-3xl blur-2xl opacity-20"></div>
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                    <img 
                      src={aiThanhImage} 
                      alt="AI Thanh" 
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Development */}
      <section id="team" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              🧍‍♀️ NHÓM PHÁT TRIỂN HEALTHY VIETNAM
            </h2>
            <p className="text-gray-600 text-lg">Đội ngũ sáng tạo đằng sau ứng dụng</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
            {teamMembers.map((member, index) => (
              <Card key={index} className="border-2 border-transparent hover:border-purple-200 hover:shadow-2xl transition-all">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-16 h-16 bg-gradient-to-br ${member.color} rounded-full flex items-center justify-center text-3xl`}>
                      {member.icon}
                    </div>
                    <div>
                      <h3 className="text-xl text-gray-800">{member.name}</h3>
                      <p className="text-purple-600">{member.role}</p>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border-l-4 border-purple-400">
                    <p className="text-gray-700 italic">{member.quote}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Team Image */}
          <div className="max-w-4xl mx-auto">
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-purple-200">
              <img 
                src={teamImage} 
                alt="Healthy Vietnam Development Team" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SDGs Section */}
      <section id="sdgs" className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              🌍 HEALTHY VIETNAM & CÁC MỤC TIÊU PHÁT TRIỂN BỀN VỮNG (SDGs)
            </h2>
            <p className="text-gray-600 text-lg mb-6">Ứng dụng liên kết với 8 SDGs chính</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12">
            {sdgs.map((sdg, index) => (
              <Card key={index} className="border-2 border-transparent hover:border-green-200 hover:shadow-xl transition-all group cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 mx-auto mb-3 ${sdg.color} rounded-full flex items-center justify-center text-white text-2xl shadow-lg group-hover:scale-110 transition-transform`}>
                    {sdg.number}
                  </div>
                  <p className="text-sm text-gray-700">{sdg.title}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="max-w-3xl mx-auto text-center">
            <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-green-200">
              <p className="text-2xl text-gray-800 mb-4">
                💚 "Một ứng dụng nhỏ – tác động lớn cho tương lai Việt Nam khỏe mạnh và hạnh phúc."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Impact */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              💼 TÁC ĐỘNG XÃ HỘI
            </h2>
            <p className="text-gray-600 text-lg">Những giá trị mà Healthy Vietnam mang lại cho cộng đồng</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {impacts.map((impact, index) => {
              const Icon = impact.icon;
              return (
                <Card key={index} className="border-2 border-transparent hover:border-purple-200 hover:shadow-xl transition-all group">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${impact.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg text-gray-800">{impact.title}</h3>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl mb-6">
              ✉️ LIÊN HỆ & DÙNG THỬ
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Bắt đầu hành trình chăm sóc sức khỏe toàn diện cùng Healthy Vietnam
            </p>

            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 mb-8">
              <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm opacity-80">Email</p>
                    <p className="text-lg">healthyvietnam2025@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 justify-center mb-12">
              <Button 
                onClick={onNavigateToAuth}
                size="lg"
                className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-6 shadow-2xl"
              >
                Đăng ký ngay - Miễn phí
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/20 text-lg px-8 py-6"
                onClick={() => scrollToSection('features')}
              >
                Tìm hiểu thêm
                <Sparkles className="w-5 h-5 ml-2" />
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <h3 className="text-xl mb-3">Avatar AI Thanh</h3>
                <div className="rounded-xl overflow-hidden border-2 border-white/20">
                  <img src={aiThanhImage} alt="AI Thanh Avatar" className="w-full h-auto" />
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <h3 className="text-xl mb-3">Avatar Đội Ngũ</h3>
                <div className="rounded-xl overflow-hidden border-2 border-white/20">
                  <img src={teamImage} alt="Team Avatar" className="w-full h-auto" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-purple-900 to-blue-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-6 h-6" fill="white" />
            <span className="text-xl">Healthy Vietnam 1.0</span>
          </div>
          <p className="text-sm opacity-75">
            © 2025 Healthy Vietnam. Phát triển bởi học sinh Trường Tiểu học & THCS FPT
          </p>
          <p className="text-sm opacity-75 mt-2">
            Công nghệ Việt – Vì sức khỏe Việt 🇻🇳
          </p>
        </div>
      </footer>
    </div>
  );
}
