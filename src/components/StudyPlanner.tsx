import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { GraduationCap, Award, Target, Calendar, BookOpen } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

const motivationalQuotes = [
  "Thành công là tổng của những nỗ lực nhỏ lặp đi lặp lại mỗi ngày!",
  "Học hôm nay, thành công ngày mai!",
  "Kiên trì là chìa khóa của mọi thành công!",
  "Hãy tin vào bản thân, bạn có thể làm được!",
  "Mỗi phút học là một bước tiến đến ước mơ!",
  "Đừng bao giờ từ bỏ, ngày mai sẽ tươi sáng hơn!",
  "Nỗ lực không bao giờ phản bội kết quả!",
  "Học là đầu tư tốt nhất cho tương lai!",
  "Hành trình ngàn dặm bắt đầu từ một bước chân!",
  "Bạn giỏi hơn bạn nghĩ! Cố lên!"
];

export function StudyPlanner() {
  const [examType, setExamType] = useState('highschool');
  const [studyTime, setStudyTime] = useState('');
  const [examDate, setExamDate] = useState('');
  const [subjects, setSubjects] = useState<string[]>([]);
  const [score, setScore] = useState('');
  const [randomQuote] = useState(motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]);

  const examTypes = {
    highschool: { name: 'Thi THPT Quốc Gia', subjects: ['Toán', 'Văn', 'Anh', 'Lý', 'Hóa', 'Sinh', 'Sử', 'Địa'] },
    university: { name: 'Thi Đại Học', subjects: ['Toán', 'Lý', 'Hóa', 'Sinh', 'Văn', 'Sử', 'Địa', 'Anh'] },
    midterm: { name: 'Thi Giữa Kỳ', subjects: ['Toán', 'Văn', 'Anh', 'Lý', 'Hóa'] },
    final: { name: 'Thi Cuối Kỳ', subjects: ['Toán', 'Văn', 'Anh', 'Lý', 'Hóa', 'Sinh', 'Sử', 'Địa'] }
  };

  const badges = [
    { min: 90, name: 'Xuất Sắc', icon: '🏆', color: 'from-yellow-400 to-orange-500' },
    { min: 80, name: 'Giỏi', icon: '🥇', color: 'from-blue-400 to-cyan-500' },
    { min: 70, name: 'Khá', icon: '🥈', color: 'from-green-400 to-emerald-500' },
    { min: 60, name: 'Trung Bình Khá', icon: '🥉', color: 'from-purple-400 to-pink-500' },
    { min: 50, name: 'Trung Bình', icon: '📘', color: 'from-gray-400 to-gray-500' },
    { min: 0, name: 'Cần Cố Gắng', icon: '📝', color: 'from-red-400 to-pink-500' }
  ];

  const getBadge = (score: number) => {
    return badges.find(b => score >= b.min) || badges[badges.length - 1];
  };

  const generateStudyPlan = () => {
    if (!examDate || subjects.length === 0) {
      toast.error('Vui lòng chọn ngày thi và môn học!');
      return;
    }

    const daysUntilExam = Math.ceil((new Date(examDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    const hoursPerDay = parseFloat(studyTime) || 4;
    const hoursPerSubject = Math.floor((daysUntilExam * hoursPerDay) / subjects.length);

    const plan = {
      examType,
      examDate,
      daysLeft: daysUntilExam,
      subjects,
      hoursPerDay,
      hoursPerSubject,
      totalHours: daysUntilExam * hoursPerDay
    };

    localStorage.setItem('healthyVN_studyPlan', JSON.stringify(plan));
    toast.success('Đã tạo lịch ôn thi thành công!');
  };

  const savedPlan = localStorage.getItem('healthyVN_studyPlan');
  const plan = savedPlan ? JSON.parse(savedPlan) : null;

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-orange-50 to-yellow-50 border-4 border-orange-200">
        <CardHeader className="bg-gradient-to-r from-orange-400 to-yellow-400 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="w-6 h-6" />
            Ôn Thi Cho Học Sinh
          </CardTitle>
          <CardDescription className="text-orange-100">
            Lập kế hoạch học tập thông minh - Đạt điểm cao & Nhận huy hiệu
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          {/* Motivational Quote */}
          <div className="p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg border-2 border-purple-300 text-center">
            <p className="text-purple-700">💡 {randomQuote}</p>
          </div>

          {/* Exam Setup */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Loại kỳ thi</Label>
              <Select value={examType} onValueChange={setExamType}>
                <SelectTrigger className="border-2 border-orange-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(examTypes).map(([key, value]) => (
                    <SelectItem key={key} value={key}>{value.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Ngày thi</Label>
              <Input
                type="date"
                value={examDate}
                onChange={(e) => setExamDate(e.target.value)}
                className="border-2 border-orange-200"
              />
            </div>

            <div>
              <Label>Số giờ học mỗi ngày</Label>
              <Input
                type="number"
                value={studyTime}
                onChange={(e) => setStudyTime(e.target.value)}
                placeholder="VD: 4"
                className="border-2 border-orange-200"
              />
            </div>

            <div>
              <Label>Điểm số hiện tại (để nhận huy hiệu)</Label>
              <Input
                type="number"
                value={score}
                onChange={(e) => setScore(e.target.value)}
                placeholder="Nhập điểm trung bình"
                max="100"
                className="border-2 border-orange-200"
              />
            </div>
          </div>

          {/* Subject Selection */}
          <div>
            <Label>Chọn môn học cần ôn</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
              {examTypes[examType as keyof typeof examTypes].subjects.map(subject => (
                <Button
                  key={subject}
                  variant={subjects.includes(subject) ? "default" : "outline"}
                  className={subjects.includes(subject) ? "bg-gradient-to-r from-orange-500 to-yellow-500" : ""}
                  onClick={() => {
                    if (subjects.includes(subject)) {
                      setSubjects(subjects.filter(s => s !== subject));
                    } else {
                      setSubjects([...subjects, subject]);
                    }
                  }}
                >
                  {subject}
                </Button>
              ))}
            </div>
          </div>

          <Button
            onClick={generateStudyPlan}
            className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600"
            size="lg"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Tạo lịch ôn thi
          </Button>
        </CardContent>
      </Card>

      {/* Study Plan Display */}
      {plan && (
        <Card className="border-4 border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50">
          <CardHeader className="bg-gradient-to-r from-blue-400 to-cyan-400 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <Target className="w-6 h-6" />
              Kế Hoạch Học Tập
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-white rounded-lg border-2 border-blue-200 text-center">
                <p className="text-sm text-gray-600">Số ngày còn lại</p>
                <p className="text-3xl text-blue-600">{plan.daysLeft}</p>
              </div>
              <div className="p-4 bg-white rounded-lg border-2 border-green-200 text-center">
                <p className="text-sm text-gray-600">Giờ/ngày</p>
                <p className="text-3xl text-green-600">{plan.hoursPerDay}h</p>
              </div>
              <div className="p-4 bg-white rounded-lg border-2 border-purple-200 text-center">
                <p className="text-sm text-gray-600">Tổng số giờ</p>
                <p className="text-3xl text-purple-600">{plan.totalHours}h</p>
              </div>
              <div className="p-4 bg-white rounded-lg border-2 border-orange-200 text-center">
                <p className="text-sm text-gray-600">Giờ/môn</p>
                <p className="text-3xl text-orange-600">{plan.hoursPerSubject}h</p>
              </div>
            </div>

            <div className="p-4 bg-white rounded-lg border-2 border-blue-200">
              <h4 className="mb-3 flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Lịch học từng môn:
              </h4>
              <div className="space-y-2">
                {plan.subjects.map((subject: string, index: number) => (
                  <div key={subject} className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                    <span>{index + 1}. {subject}</span>
                    <span className="text-blue-600">{plan.hoursPerSubject} giờ</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Kế hoạch ăn uống & ngủ nghỉ */}
            <div className="p-4 bg-gradient-to-r from-green-50 to-yellow-50 rounded-lg border-2 border-green-200">
              <h4 className="mb-3 flex items-center gap-2">
                🍽️ Kế hoạch ăn uống & ngủ nghỉ hợp lý
              </h4>
              <div className="space-y-3">
                <div className="p-3 bg-white rounded-lg">
                  <p className="mb-2">🥗 <strong>Chế độ ăn uống:</strong></p>
                  <ul className="text-sm space-y-1 list-disc list-inside">
                    <li>Sáng: Trứng + Sữa + Yến mạch + Trái cây (năng lượng bền vững)</li>
                    <li>Trưa: Cơm gạo lứt + Thịt/Cá + Rau xanh (dinh dưỡng đầy đủ)</li>
                    <li>Xế: Sữa chua + Hạt dinh dưỡng + Chuối (bổ sung năng lượng)</li>
                    <li>Tối: Cháo/Phở + Rau + Trái cây (nhẹ nhàng dễ tiêu)</li>
                  </ul>
                </div>

                <div className="p-3 bg-white rounded-lg">
                  <p className="mb-2">💧 <strong>Uống đủ nước:</strong></p>
                  <ul className="text-sm space-y-1 list-disc list-inside">
                    <li>2-2.5L nước/ngày để não hoạt động tốt</li>
                    <li>Uống nước mỗi 1-2 giờ học</li>
                    <li>Tránh nước ngọt, nước có ga</li>
                  </ul>
                </div>

                <div className="p-3 bg-white rounded-lg">
                  <p className="mb-2">🌙 <strong>Lịch ngủ nghỉ:</strong></p>
                  <ul className="text-sm space-y-1 list-disc list-inside">
                    <li>Ngủ đủ 7-8 giờ/đêm (não ghi nhớ tốt hơn)</li>
                    <li>Ngủ trước 23h để não phục hồi</li>
                    <li>Ngủ trưa 15-20 phút nếu mệt</li>
                    <li>Tắt điện thoại 30 phút trước khi ngủ</li>
                  </ul>
                </div>

                <div className="p-3 bg-white rounded-lg">
                  <p className="mb-2">💪 <strong>Vận động thể thao:</strong></p>
                  <ul className="text-sm space-y-1 list-disc list-inside">
                    <li>Tập thể dục nhẹ 20-30 phút/ngày giữa các buổi học</li>
                    <li>Đi bộ, chạy bộ, hoặc yoga để giảm stress</li>
                    <li>Giãn cơ sau mỗi 2 giờ ngồi học</li>
                  </ul>
                </div>

                <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-300">
                  <p className="mb-2">⚠️ <strong>Tránh trong mùa ôn thi:</strong></p>
                  <ul className="text-sm space-y-1 list-disc list-inside">
                    <li>Thức khuya quá 1h sáng (não mệt mỏi)</li>
                    <li>Nhịn ăn sáng (thiếu năng lượng)</li>
                    <li>Ăn quá nhiều đồ chiên rán, đồ ngọt</li>
                    <li>Uống quá nhiều caffeine (lo âu, mất ngủ)</li>
                    <li>Ngồi học liên tục &gt;2 giờ không nghỉ</li>
                  </ul>
                </div>

                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="mb-2">✅ <strong>Thực đơn mẫu ngày thi:</strong></p>
                  <div className="text-sm space-y-1">
                    <p>• <strong>Sáng (trước thi 1-2h):</strong> Trứng luộc + Chuối + Sữa tươi + Bánh mì nguyên cám</p>
                    <p>• <strong>Mang theo:</strong> Nước lọc + Socola đen + Chuối nhỏ (nếu đói giữa ca thi)</p>
                    <p>• <strong>Trưa:</strong> Cơm gạo lứt + Cá hồi + Rau xanh + Trái cây</p>
                    <p>• <strong>Chiều:</strong> Nghỉ ngơi 15-30 phút, uống nước ấm</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Badge System */}
      {score && (
        <Card className="border-4 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
          <CardHeader className="bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <Award className="w-6 h-6" />
              Huy Hiệu Thành Tích
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            {(() => {
              const badge = getBadge(parseFloat(score));
              return (
                <div className={`p-6 bg-gradient-to-r ${badge.color} rounded-xl text-white text-center`}>
                  <div className="text-6xl mb-3">{badge.icon}</div>
                  <h3 className="text-2xl">{badge.name}</h3>
                  <p className="text-sm opacity-90 mt-2">Điểm số: {score}/100</p>
                </div>
              );
            })()}

            <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-3">
              {badges.map((badge) => (
                <div
                  key={badge.name}
                  className={`p-3 rounded-lg border-2 text-center ${
                    parseFloat(score) >= badge.min
                      ? `bg-gradient-to-r ${badge.color} text-white`
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  <div className="text-2xl">{badge.icon}</div>
                  <p className="text-xs mt-1">{badge.name}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
