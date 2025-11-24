import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { Slider } from './ui/slider';
import { Dumbbell, TrendingUp, Moon, Utensils, Activity, Calendar, Camera, Target } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function HeightTraining() {
  // Yếu tố phân tích
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [currentHeight, setCurrentHeight] = useState('');
  const [diet, setDiet] = useState('average');
  const [sleep, setSleep] = useState('7');
  const [activityLevel, setActivityLevel] = useState('moderate');

  // Bài tập
  const [selectedExercises, setSelectedExercises] = useState<string[]>([]);

  // Môn thể thao
  const [selectedSports, setSelectedSports] = useState<string[]>([]);

  // Giấc ngủ
  const [bedtime, setBedtime] = useState('22:00');

  // Dinh dưỡng
  const [nutritionScore, setNutritionScore] = useState([7]);

  // Chiều cao dự đoán
  const [parentHeight1, setParentHeight1] = useState('');
  const [parentHeight2, setParentHeight2] = useState('');

  const growthExercises = [
    { name: 'Căng người kiểu mèo bò (Cat-Cow Stretch)', duration: '10 phút', emoji: '🐱' },
    { name: 'Kéo giãn toàn thân đứng (Full Body Stretch)', duration: '15 phút', emoji: '🙆' },
    { name: 'Cúi gập người chạm chân (Toe Touch)', duration: '10 phút', emoji: '🙇' },
    { name: 'Đu xà 10 phút/ngày', duration: '10 phút', emoji: '🤸' },
    { name: 'Nhảy dây nhẹ', duration: '200-300 lần', emoji: '🪢' },
    { name: 'Yoga tư thế rắn hổ mang (Cobra Pose)', duration: '15 phút', emoji: '🐍' },
    { name: 'Kéo giãn chân nằm (Leg Stretch)', duration: '10 phút', emoji: '🦵' },
  ];

  const allSports = [
    // Tăng chiều cao
    { name: 'Bơi lội', category: 'Tăng chiều cao', benefit: 'Kéo giãn toàn thân', emoji: '🏊' },
    { name: 'Bóng rổ', category: 'Tăng chiều cao', benefit: 'Nhảy cao kích thích xương', emoji: '🏀' },
    { name: 'Bóng chuyền', category: 'Tăng chiều cao', benefit: 'Nhảy & kéo giãn', emoji: '🏐' },
    { name: 'Cầu lông', category: 'Tăng chiều cao', benefit: 'Nhảy & vận động linh hoạt', emoji: '🏸' },
    { name: 'Nhảy dây', category: 'Tăng chiều cao', benefit: 'Kích thích xương chân', emoji: '🪢' },
    { name: 'Yoga', category: 'Tăng chiều cao', benefit: 'Kéo giãn cột sống', emoji: '🧘' },
    { name: 'Đu xà đơn', category: 'Tăng chiều cao', benefit: 'Kéo giãn cột sống', emoji: '🤸' },
    { name: 'Leo núi', category: 'Tăng chiều cao', benefit: 'Kéo giãn toàn thân', emoji: '🧗' },
    { name: 'Pilates', category: 'Tăng chiều cao', benefit: 'Tăng độ dẻo', emoji: '🤸‍♀️' },
    { name: 'Giãn cơ', category: 'Tăng chiều cao', benefit: 'Tăng độ linh hoạt', emoji: '🤸' },
    
    // Sức khỏe tổng thể
    { name: 'Chạy bộ', category: 'Sức khỏe tổng thể', benefit: 'Tim mạch khỏe', emoji: '🏃' },
    { name: 'Đạp xe', category: 'Sức khỏe tổng thể', benefit: 'Cơ đùi khỏe', emoji: '🚴' },
    { name: 'Aerobic', category: 'Sức khỏe tổng thể', benefit: 'Đốt calo', emoji: '💃' },
    { name: 'Zumba', category: 'Sức khỏe tổng thể', benefit: 'Vui vẻ & năng động', emoji: '💃' },
    { name: 'Bóng đá', category: 'Sức khỏe tổng thể', benefit: 'Sức bền & phối hợp', emoji: '⚽' },
    { name: 'Tennis', category: 'Sức khỏe tổng thể', benefit: 'Phản xạ nhanh', emoji: '🎾' },
    { name: 'Bóng bàn', category: 'Sức khỏe tổng thể', benefit: 'Tập trung cao', emoji: '🏓' },
    { name: 'Võ thuật', category: 'Sức khỏe tổng thể', benefit: 'Tự vệ & kỷ luật', emoji: '🥋' },
    { name: 'Boxing', category: 'Sức khỏe tổng thể', benefit: 'Sức mạnh & dẻo dai', emoji: '🥊' },
    { name: 'Taekwondo', category: 'Sức khỏe tổng thể', benefit: 'Linh hoạt & đá cao', emoji: '🥋' },
    
    // Thể hình & Sức mạnh
    { name: 'Gym', category: 'Thể hình', benefit: 'Tăng cơ bắp', emoji: '🏋️' },
    { name: 'Crossfit', category: 'Thể hình', benefit: 'Sức mạnh toàn diện', emoji: '🏋️‍♀️' },
    { name: 'Calisthenics', category: 'Thể hình', benefit: 'Sức mạnh tự thân', emoji: '💪' },
    { name: 'Weightlifting', category: 'Thể hình', benefit: 'Sức nâng tối đa', emoji: '🏋️' },
    
    // Thư giãn & Cân bằng
    { name: 'Thiền', category: 'Thư giãn', benefit: 'Giảm stress', emoji: '🧘‍♂️' },
    { name: 'Tai Chi', category: 'Thư giãn', benefit: 'Cân bằng & thư giãn', emoji: '🧘' },
    { name: 'Qigong', category: 'Thư giãn', benefit: 'Năng lượng nội tại', emoji: '🧘‍♀️' },
    
    // Dưới nước
    { name: 'Lặn', category: 'Dưới nước', benefit: 'Khám phá biển', emoji: '🤿' },
    { name: 'Lướt sóng', category: 'Dưới nước', benefit: 'Cân bằng trên sóng', emoji: '🏄' },
    { name: 'Kayak', category: 'Dưới nước', benefit: 'Tay & vai khỏe', emoji: '🚣' },
    { name: 'Water Polo', category: 'Dưới nước', benefit: 'Sức bền cao', emoji: '🤽' },
    
    // Ngoài trời
    { name: 'Đi bộ đường dài', category: 'Ngoài trời', benefit: 'Khám phá thiên nhiên', emoji: '🥾' },
    { name: 'Cắm trại', category: 'Ngoài trời', benefit: 'Kỹ năng sinh tồn', emoji: '⛺' },
    { name: 'Chèo thuyền', category: 'Ngoài trời', benefit: 'Tay & vai khỏe', emoji: '🚣' },
    { name: 'Leo núi thể thao', category: 'Ngoài trời', benefit: 'Sức mạnh toàn thân', emoji: '🧗‍♂️' },
    
    // Trượt
    { name: 'Trượt tuyết', category: 'Trượt', benefit: 'Cân bằng & mạo hiểm', emoji: '⛷️' },
    { name: 'Trượt băng', category: 'Trượt', benefit: 'Duyên dáng & cân bằng', emoji: '⛸️' },
    { name: 'Trượt ván', category: 'Trượt', benefit: 'Phối hợp & linh hoạt', emoji: '🛹' },
    { name: 'Trượt patin', category: 'Trượt', benefit: 'Chân khỏe', emoji: '🛼' },
    
    // Các môn khác
    { name: 'Bắn cung', category: 'Kỹ năng', benefit: 'Tập trung cao', emoji: '🏹' },
    { name: 'Golf', category: 'Kỹ năng', benefit: 'Chính xác & kiên nhẫn', emoji: '⛳' },
    { name: 'Đua xe đạp', category: 'Tốc độ', benefit: 'Sức bền & tốc độ', emoji: '🚴‍♂️' },
    { name: 'Marathon', category: 'Sức bền', benefit: 'Sức bền tối đa', emoji: '🏃‍♀️' },
    { name: 'Bơi sải', category: 'Kỹ thuật', benefit: 'Kéo giãn vai & lưng', emoji: '🏊‍♂️' },
    { name: 'Bơi ếch', category: 'Kỹ thuật', benefit: 'Kéo giãn ngực', emoji: '🏊‍♀️' },
    { name: 'Bơi ngửa', category: 'Kỹ thuật', benefit: 'Tốt cho cột sống', emoji: '🏊' },
    { name: 'Bóng ném', category: 'Nhóm', benefit: 'Phối hợp đội', emoji: '🤾' },
    { name: 'Rugby', category: 'Nhóm', benefit: 'Sức mạnh & chiến thuật', emoji: '🏉' },
    { name: 'Cricket', category: 'Nhóm', benefit: 'Phản xạ & chính xác', emoji: '🏏' },
    { name: 'Hockey', category: 'Nhóm', benefit: 'Tốc độ & kỹ năng', emoji: '🏑' },
  ];

  const calculateGrowthPotential = () => {
    if (!age || !currentHeight) {
      return null;
    }

    const ageNum = parseFloat(age);
    let score = 0;

    // Di truyền (60-70%) - không tính ở đây vì chưa có dữ liệu
    // Dinh dưỡng (20-25%)
    if (diet === 'excellent') score += 25;
    else if (diet === 'good') score += 20;
    else if (diet === 'average') score += 10;
    else score += 5;

    // Giấc ngủ (10%)
    const sleepHours = parseFloat(sleep);
    if (sleepHours >= 8 && sleepHours <= 9) score += 10;
    else if (sleepHours >= 7) score += 7;
    else score += 3;

    // Thể thao (10-15%)
    if (activityLevel === 'very-active') score += 15;
    else if (activityLevel === 'active') score += 12;
    else if (activityLevel === 'moderate') score += 8;
    else score += 3;

    // Tâm lý & môi trường (5-10%) - giả định tốt
    score += 5;

    return {
      score,
      level: score >= 45 ? 'Rất tốt' : score >= 35 ? 'Tốt' : score >= 25 ? 'Trung bình' : 'Cần cải thiện'
    };
  };

  const predictMaxHeight = () => {
    if (!parentHeight1 || !parentHeight2 || !currentHeight || !age) return null;

    const h1 = parseFloat(parentHeight1);
    const h2 = parseFloat(parentHeight2);
    const current = parseFloat(currentHeight);
    const ageNum = parseFloat(age);

    // Chiều cao di truyền
    let geneticHeight = 0;
    if (gender === 'male') {
      geneticHeight = (h1 + h2 + 13) / 2;
    } else {
      geneticHeight = (h1 + h2 - 13) / 2;
    }

    // Nếu >= 25 tuổi
    if (ageNum >= 25) {
      return { max: current, canGrow: 0, note: 'Sau 25 tuổi không tăng nữa' };
    }

    // Nếu 20-24 tuổi
    if (ageNum >= 20) {
      const maxGrowth = 2; // Tối đa 2cm
      return { 
        max: current + maxGrowth, 
        canGrow: maxGrowth, 
        note: 'Từ 20-25 tuổi chỉ tăng 1-2cm' 
      };
    }

    // Dưới 20 tuổi
    const remainingGrowth = (geneticHeight - current) * (1 + (nutritionScore[0] - 5) * 0.05);
    const bonus = activityLevel === 'very-active' ? 3 : activityLevel === 'active' ? 2 : 1;
    const maxHeight = current + remainingGrowth + bonus;

    return {
      max: Math.min(maxHeight, geneticHeight + 8),
      canGrow: Math.min(maxHeight, geneticHeight + 8) - current,
      note: 'Còn thời gian tăng trưởng tốt'
    };
  };

  const potential = calculateGrowthPotential();
  const heightPrediction = predictMaxHeight();

  const create30DayChallenge = () => {
    if (!age || selectedExercises.length === 0) {
      toast.error('Vui lòng nhập tuổi và chọn ít nhất 1 bài tập!');
      return;
    }

    const challenge = {
      startDate: new Date().toISOString(),
      age,
      exercises: selectedExercises,
      sports: selectedSports,
      sleepGoal: sleep,
      bedtimeGoal: bedtime,
      nutritionScore: nutritionScore[0]
    };

    localStorage.setItem('healthyVN_30dayChallenge', JSON.stringify(challenge));
    toast.success('Đã tạo kế hoạch 30 ngày thành công! 🎯');
  };

  return (
    <div className="space-y-6">
      <Card className="border-4 border-blue-200 shadow-xl bg-gradient-to-br from-white to-blue-50">
        <CardHeader className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <Dumbbell className="w-6 h-6" />
            🏋️‍♀️ Module Tập Luyện Tăng Chiều Cao
          </CardTitle>
          <CardDescription className="text-blue-100">
            8 tính năng chuyên sâu cho mọi lứa tuổi - đặc biệt học sinh & thanh thiếu niên
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs defaultValue="analysis" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 gap-2 h-auto p-2 bg-blue-100">
              <TabsTrigger value="analysis" className="flex flex-col items-center gap-1 p-2 data-[state=active]:bg-gradient-to-br data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white rounded-lg text-xs">
                <Activity className="w-4 h-4" />
                <span>Phân tích</span>
              </TabsTrigger>
              
              <TabsTrigger value="exercises" className="flex flex-col items-center gap-1 p-2 data-[state=active]:bg-gradient-to-br data-[state=active]:from-cyan-500 data-[state=active]:to-teal-500 data-[state=active]:text-white rounded-lg text-xs">
                <Dumbbell className="w-4 h-4" />
                <span>Bài tập</span>
              </TabsTrigger>
              
              <TabsTrigger value="sports" className="flex flex-col items-center gap-1 p-2 data-[state=active]:bg-gradient-to-br data-[state=active]:from-teal-500 data-[state=active]:to-green-500 data-[state=active]:text-white rounded-lg text-xs">
                <Target className="w-4 h-4" />
                <span>50 Môn</span>
              </TabsTrigger>
              
              <TabsTrigger value="sleep" className="flex flex-col items-center gap-1 p-2 data-[state=active]:bg-gradient-to-br data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white rounded-lg text-xs">
                <Moon className="w-4 h-4" />
                <span>Giấc ngủ</span>
              </TabsTrigger>
              
              <TabsTrigger value="nutrition" className="flex flex-col items-center gap-1 p-2 data-[state=active]:bg-gradient-to-br data-[state=active]:from-emerald-500 data-[state=active]:to-lime-500 data-[state=active]:text-white rounded-lg text-xs">
                <Utensils className="w-4 h-4" />
                <span>Dinh dưỡng</span>
              </TabsTrigger>
              
              <TabsTrigger value="predict" className="flex flex-col items-center gap-1 p-2 data-[state=active]:bg-gradient-to-br data-[state=active]:from-lime-500 data-[state=active]:to-yellow-500 data-[state=active]:text-white rounded-lg text-xs">
                <TrendingUp className="w-4 h-4" />
                <span>Dự đoán</span>
              </TabsTrigger>
              
              <TabsTrigger value="posture" className="flex flex-col items-center gap-1 p-2 data-[state=active]:bg-gradient-to-br data-[state=active]:from-yellow-500 data-[state=active]:to-orange-500 data-[state=active]:text-white rounded-lg text-xs">
                <Camera className="w-4 h-4" />
                <span>Tư thế</span>
              </TabsTrigger>
              
              <TabsTrigger value="challenge" className="flex flex-col items-center gap-1 p-2 data-[state=active]:bg-gradient-to-br data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white rounded-lg text-xs">
                <Calendar className="w-4 h-4" />
                <span>30 ngày</span>
              </TabsTrigger>
            </TabsList>

            {/* 1. Phân tích cơ sở khoa học */}
            <TabsContent value="analysis" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Tuổi</Label>
                  <Input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="VD: 16"
                    className="border-2 border-blue-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Giới tính</Label>
                  <Select value={gender} onValueChange={(value: 'male' | 'female') => setGender(value)}>
                    <SelectTrigger className="border-2 border-blue-300">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">👨 Nam</SelectItem>
                      <SelectItem value="female">👩 Nữ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Chiều cao hiện tại (cm)</Label>
                  <Input
                    type="number"
                    value={currentHeight}
                    onChange={(e) => setCurrentHeight(e.target.value)}
                    placeholder="VD: 160"
                    className="border-2 border-blue-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Chế độ ăn</Label>
                  <Select value={diet} onValueChange={setDiet}>
                    <SelectTrigger className="border-2 border-blue-300">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="poor">Kém</SelectItem>
                      <SelectItem value="average">Trung bình</SelectItem>
                      <SelectItem value="good">Tốt</SelectItem>
                      <SelectItem value="excellent">Rất tốt</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Giờ ngủ/đêm</Label>
                  <Input
                    type="number"
                    value={sleep}
                    onChange={(e) => setSleep(e.target.value)}
                    placeholder="VD: 8"
                    className="border-2 border-blue-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Mức độ vận động</Label>
                  <Select value={activityLevel} onValueChange={setActivityLevel}>
                    <SelectTrigger className="border-2 border-blue-300">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sedentary">Ít vận động</SelectItem>
                      <SelectItem value="light">Nhẹ (1-2 ngày/tuần)</SelectItem>
                      <SelectItem value="moderate">Vừa (3-4 ngày/tuần)</SelectItem>
                      <SelectItem value="active">Nhiều (5-6 ngày/tuần)</SelectItem>
                      <SelectItem value="very-active">Rất nhiều (hàng ngày)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {potential && (
                <div className="p-5 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border-2 border-blue-300">
                  <h4 className="mb-4">📊 Tỷ lệ tăng trưởng tiềm năng</h4>
                  
                  <div className="mb-4">
                    <div className="flex justify-between mb-2">
                      <span>Điểm tổng hợp</span>
                      <span className="text-blue-600">{potential.score}/55</span>
                    </div>
                    <Progress value={(potential.score / 55) * 100} className="h-4" />
                    <p className="text-sm text-gray-600 mt-2">Mức độ: <strong>{potential.level}</strong></p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-white rounded-lg">
                      <h5 className="mb-2">📈 Yếu tố ảnh hưởng:</h5>
                      <table className="w-full text-sm">
                        <tbody>
                          <tr className="border-b">
                            <td className="py-2">Di truyền</td>
                            <td className="text-right">60-70%</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2">Dinh dưỡng</td>
                            <td className="text-right">20-25%</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2">Thể thao</td>
                            <td className="text-right">10-15%</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2">Giấc ngủ</td>
                            <td className="text-right">10%</td>
                          </tr>
                          <tr>
                            <td className="py-2">Tâm lý & Môi trường</td>
                            <td className="text-right">5-10%</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="p-4 bg-yellow-50 rounded-lg">
                      <h5 className="mb-2">💡 Khuyến nghị:</h5>
                      <ul className="text-sm space-y-1 list-disc list-inside">
                        {potential.score < 35 && (
                          <>
                            <li>Cải thiện chế độ dinh dưỡng</li>
                            <li>Tăng cường tập luyện</li>
                            <li>Ngủ đủ 8-9 giờ/đêm</li>
                          </>
                        )}
                        <li>Tập các bài kéo giãn mỗi ngày</li>
                        <li>Chơi thể thao tăng chiều cao</li>
                        <li>Bổ sung canxi & vitamin D</li>
                        <li>Ngủ trước 22h</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>

            {/* 2. Bài tập kéo giãn */}
            <TabsContent value="exercises" className="space-y-4">
              <div className="p-4 bg-cyan-50 rounded-lg border-2 border-cyan-200">
                <h4 className="mb-4">🤸 7 bài tập kéo giãn hàng ngày</h4>
                <div className="grid md:grid-cols-2 gap-3">
                  {growthExercises.map((exercise, index) => (
                    <div 
                      key={index}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedExercises.includes(exercise.name)
                          ? 'bg-gradient-to-br from-cyan-500 to-blue-500 text-white border-cyan-600'
                          : 'bg-white border-cyan-200 hover:border-cyan-400'
                      }`}
                      onClick={() => {
                        if (selectedExercises.includes(exercise.name)) {
                          setSelectedExercises(selectedExercises.filter(e => e !== exercise.name));
                        } else {
                          setSelectedExercises([...selectedExercises, exercise.name]);
                        }
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-3xl">{exercise.emoji}</span>
                        <div>
                          <p className="mb-1">{exercise.name}</p>
                          <p className={`text-sm ${selectedExercises.includes(exercise.name) ? 'text-cyan-100' : 'text-gray-600'}`}>
                            ⏱️ {exercise.duration}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                <h5 className="mb-3">📋 Lịch tập khuyến nghị</h5>
                <div className="space-y-2">
                  <div className="p-3 bg-white rounded-lg">
                    <p className="mb-1">🌅 <strong>Buổi sáng (6:00-7:00):</strong></p>
                    <p className="text-sm">Kéo giãn toàn thân + Yoga rắn hổ mang + Cúi gập người</p>
                  </div>
                  <div className="p-3 bg-white rounded-lg">
                    <p className="mb-1">🌆 <strong>Buổi chiều (16:00-17:00):</strong></p>
                    <p className="text-sm">Đu xà 10 phút + Nhảy dây 200 lần + Bơi/Bóng rổ</p>
                  </div>
                  <div className="p-3 bg-white rounded-lg">
                    <p className="mb-1">🌙 <strong>Buổi tối (20:00-21:00):</strong></p>
                    <p className="text-sm">Kéo giãn nhẹ nhàng + Yoga thư giãn trước khi ngủ</p>
                  </div>
                </div>
                <p className="text-xs text-gray-600 mt-3">
                  ⏰ Thời gian: 20-30 phút mỗi buổi, 5-6 ngày/tuần
                </p>
              </div>

              {selectedExercises.length > 0 && (
                <div className="p-4 bg-green-50 rounded-lg border-2 border-green-200">
                  <p className="mb-2">✅ Bạn đã chọn {selectedExercises.length} bài tập:</p>
                  <ul className="text-sm space-y-1">
                    {selectedExercises.map((ex, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="text-green-600">✓</span>
                        <span>{ex}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </TabsContent>

            {/* 3. 50 môn thể thao */}
            <TabsContent value="sports" className="space-y-4">
              <div className="mb-4">
                <Input
                  placeholder="🔍 Tìm kiếm môn thể thao..."
                  className="border-2 border-teal-300"
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 max-h-[600px] overflow-y-auto">
                {allSports.map((sport, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border-2 cursor-pointer transition-all text-center ${
                      selectedSports.includes(sport.name)
                        ? 'bg-gradient-to-br from-teal-500 to-green-500 text-white border-teal-600'
                        : 'bg-white border-teal-200 hover:border-teal-400'
                    }`}
                    onClick={() => {
                      if (selectedSports.includes(sport.name)) {
                        setSelectedSports(selectedSports.filter(s => s !== sport.name));
                      } else {
                        setSelectedSports([...selectedSports, sport.name]);
                      }
                    }}
                  >
                    <div className="text-3xl mb-2">{sport.emoji}</div>
                    <p className="text-sm mb-1">{sport.name}</p>
                    <p className={`text-xs ${selectedSports.includes(sport.name) ? 'text-teal-100' : 'text-gray-600'}`}>
                      {sport.category}
                    </p>
                  </div>
                ))}
              </div>

              {selectedSports.length > 0 && (
                <div className="p-4 bg-green-50 rounded-lg border-2 border-green-200">
                  <p className="mb-2">✅ Bạn đã chọn {selectedSports.length} môn thể thao:</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedSports.map((sport, idx) => (
                      <span key={idx} className="px-3 py-1 bg-green-500 text-white rounded-full text-sm">
                        {sport}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                <h5 className="mb-2">🏆 Top môn thể thao tăng chiều cao:</h5>
                <ol className="text-sm space-y-1 list-decimal list-inside">
                  <li>Bơi lội - Kéo giãn toàn thân, giảm áp lực lên xương</li>
                  <li>Bóng rổ - Nhảy cao kích thích hormone tăng trưởng</li>
                  <li>Bóng chuyền - Kết hợp nhảy & kéo giãn</li>
                  <li>Yoga - Kéo giãn cột sống, cải thiện tư thế</li>
                  <li>Đu xà đơn - Kéo giãn cột sống trực tiếp</li>
                </ol>
              </div>
            </TabsContent>

            {/* 4. Giấc ngủ & Hormone */}
            <TabsContent value="sleep" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Số giờ ngủ/đêm</Label>
                  <Input
                    type="number"
                    value={sleep}
                    onChange={(e) => setSleep(e.target.value)}
                    placeholder="VD: 8"
                    className="border-2 border-purple-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Giờ đi ngủ</Label>
                  <Input
                    type="time"
                    value={bedtime}
                    onChange={(e) => setBedtime(e.target.value)}
                    className="border-2 border-purple-300"
                  />
                </div>
              </div>

              <div className="p-5 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border-2 border-purple-300">
                <h4 className="mb-4">🌙 Giấc ngủ & Hormone tăng trưởng (GH)</h4>
                
                <div className="space-y-4">
                  <div className="p-4 bg-white rounded-lg">
                    <h5 className="mb-3">⏰ Giờ vàng hormone tăng trưởng:</h5>
                    <div className="grid md:grid-cols-2 gap-3">
                      <div className="p-3 bg-yellow-50 rounded border-2 border-yellow-300">
                        <p className="mb-1">🌟 <strong>22h-1h sáng</strong></p>
                        <p className="text-sm">GH tiết ra mạnh nhất (80%)</p>
                      </div>
                      <div className="p-3 bg-orange-50 rounded border-2 border-orange-300">
                        <p className="mb-1">🌅 <strong>5h-7h sáng</strong></p>
                        <p className="text-sm">GH tiết ra đợt 2 (20%)</p>
                      </div>
                    </div>
                  </div>

                  {bedtime && (
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <p className="mb-2">Giờ đi ngủ của bạn: <strong>{bedtime}</strong></p>
                      {(() => {
                        const hour = parseInt(bedtime.split(':')[0]);
                        if (hour <= 21) return <p className="text-sm text-green-600">✅ Tuyệt vời! Đi ngủ rất sớm</p>;
                        if (hour === 22) return <p className="text-sm text-green-600">🌟 Rất tốt! Đúng giờ vàng</p>;
                        if (hour === 23) return <p className="text-sm text-yellow-600">👍 Khá tốt nhưng nên sớm hơn</p>;
                        return <p className="text-sm text-red-600">❌ Quá muộn! Nên ngủ trước 22h</p>;
                      })()}
                    </div>
                  )}

                  <div className="p-4 bg-green-50 rounded-lg">
                    <h5 className="mb-2">💡 Tips ngủ tốt:</h5>
                    <ul className="text-sm space-y-1 list-disc list-inside">
                      <li>Ngủ đủ 8-10 giờ/đêm (thanh thiếu niên)</li>
                      <li>Đi ngủ trước 22h để tận dụng giờ vàng GH</li>
                      <li>Tắt điện thoại 30 phút trước khi ngủ</li>
                      <li>Phòng tối, mát (18-22°C)</li>
                      <li>Không ăn no trước khi ngủ 2 tiếng</li>
                      <li>Tắm nước ấm trước khi ngủ</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-red-50 rounded-lg border-2 border-red-200">
                    <p className="text-sm text-red-800">⚠️ <strong>Tránh:</strong></p>
                    <ul className="text-xs mt-2 space-y-1 list-disc list-inside">
                      <li>Thức khuya xem phim, chơi game</li>
                      <li>Uống caffeine sau 15h</li>
                      <li>Dùng điện thoại trên giường</li>
                      <li>Ngủ không đều giờ</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* 5. Dinh dưỡng */}
            <TabsContent value="nutrition" className="space-y-4">
              <div className="space-y-2">
                <Label>Chất lượng dinh dưỡng: {nutritionScore[0]}/10</Label>
                <Slider
                  value={nutritionScore}
                  onValueChange={setNutritionScore}
                  min={0}
                  max={10}
                  step={1}
                  className="w-full"
                />
                <p className="text-sm text-gray-600">
                  {nutritionScore[0] < 4 ? 'Kém' : nutritionScore[0] < 7 ? 'Trung bình' : nutritionScore[0] < 9 ? 'Tốt' : 'Rất tốt'}
                </p>
              </div>

              <div className="p-5 bg-gradient-to-r from-green-50 to-lime-50 rounded-lg border-2 border-green-300">
                <h4 className="mb-4">🍽️ Dinh dưỡng hỗ trợ chiều cao</h4>
                
                <div className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-3">
                    <div className="p-3 bg-white rounded-lg">
                      <p className="text-sm mb-2">🥛 <strong>Canxi</strong></p>
                      <p className="text-xs mb-2">Xây dựng xương chắc khỏe</p>
                      <p className="text-xs text-gray-600">Sữa, phô mai, cá nhỏ, rau xanh</p>
                    </div>
                    <div className="p-3 bg-white rounded-lg">
                      <p className="text-sm mb-2">☀️ <strong>Vitamin D3</strong></p>
                      <p className="text-xs mb-2">Hấp thụ canxi</p>
                      <p className="text-xs text-gray-600">Cá hồi, trứng, tắm nắng sáng</p>
                    </div>
                    <div className="p-3 bg-white rounded-lg">
                      <p className="text-sm mb-2">🥩 <strong>Protein</strong></p>
                      <p className="text-xs mb-2">Xây dựng cơ & xương</p>
                      <p className="text-xs text-gray-600">Thịt, cá, trứng, đậu</p>
                    </div>
                    <div className="p-3 bg-white rounded-lg">
                      <p className="text-sm mb-2">🥬 <strong>Vitamin K2</strong></p>
                      <p className="text-xs mb-2">Đưa canxi vào xương</p>
                      <p className="text-xs text-gray-600">Rau xanh, phô mai</p>
                    </div>
                    <div className="p-3 bg-white rounded-lg">
                      <p className="text-sm mb-2">🦪 <strong>Kẽm</strong></p>
                      <p className="text-xs mb-2">Tăng trưởng tế bào</p>
                      <p className="text-xs text-gray-600">Hải sản, thịt bò, hạt</p>
                    </div>
                    <div className="p-3 bg-white rounded-lg">
                      <p className="text-sm mb-2">🥜 <strong>Magie</strong></p>
                      <p className="text-xs mb-2">Chuyển hóa vitamin D</p>
                      <p className="text-xs text-gray-600">Hạt, chuối, rau xanh</p>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h5 className="mb-3">🍱 Thực đơn mẫu 1 ngày:</h5>
                    <div className="space-y-2">
                      <div className="p-2 bg-white rounded">
                        <p className="text-sm mb-1"><strong>Sáng:</strong></p>
                        <p className="text-xs">Trứng + Sữa tươi + Yến mạch + Chuối</p>
                      </div>
                      <div className="p-2 bg-white rounded">
                        <p className="text-sm mb-1"><strong>Trưa:</strong></p>
                        <p className="text-xs">Cơm gạo lứt + Cá hồi + Rau chân vịt + Đậu hũ</p>
                      </div>
                      <div className="p-2 bg-white rounded">
                        <p className="text-sm mb-1"><strong>Xế:</strong></p>
                        <p className="text-xs">Sữa chua + Hạt óc chó + Táo</p>
                      </div>
                      <div className="p-2 bg-white rounded">
                        <p className="text-sm mb-1"><strong>Tối:</strong></p>
                        <p className="text-xs">Súp xương + Thịt gà + Rau củ + Trái cây</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-red-50 rounded-lg">
                    <p className="text-sm text-red-800 mb-2">🚫 <strong>Tránh:</strong></p>
                    <ul className="text-xs space-y-1 list-disc list-inside">
                      <li>Đồ ngọt, nước có ga (ức chế GH)</li>
                      <li>Fast food (ít dinh dưỡng)</li>
                      <li>Uống caffeine quá nhiều</li>
                      <li>Ăn muộn sau 20h</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* 6. Dự đoán chiều cao tối đa */}
            <TabsContent value="predict" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Chiều cao cha/mẹ 1 (cm)</Label>
                  <Input
                    type="number"
                    value={parentHeight1}
                    onChange={(e) => setParentHeight1(e.target.value)}
                    placeholder="VD: 170"
                    className="border-2 border-yellow-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Chiều cao cha/mẹ 2 (cm)</Label>
                  <Input
                    type="number"
                    value={parentHeight2}
                    onChange={(e) => setParentHeight2(e.target.value)}
                    placeholder="VD: 160"
                    className="border-2 border-yellow-300"
                  />
                </div>
              </div>

              {heightPrediction && (
                <div className="p-5 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border-2 border-yellow-300">
                  <h4 className="mb-4">📏 Chiều cao tối đa dự đoán</h4>
                  
                  <div className="text-center p-6 bg-white rounded-xl border-2 border-yellow-400">
                    <TrendingUp className="w-16 h-16 mx-auto mb-4 text-yellow-600" />
                    <p className="text-6xl text-yellow-600 mb-2">{heightPrediction.max.toFixed(1)} cm</p>
                    <p className="text-lg text-gray-700 mb-2">≈ {(heightPrediction.max / 100).toFixed(2)} m</p>
                    <p className="text-sm text-gray-600">Có thể tăng thêm: <strong>{heightPrediction.canGrow.toFixed(1)} cm</strong></p>
                    <p className="text-sm text-orange-600 mt-2">📌 {heightPrediction.note}</p>
                  </div>

                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <h5 className="mb-2">💡 Để đạt chiều cao tối đa:</h5>
                    <ul className="text-sm space-y-1 list-disc list-inside">
                      <li>Tập kéo giãn hàng ngày 20-30 phút</li>
                      <li>Chơi bóng rổ/bóng chuyền/bơi lội</li>
                      <li>Ăn đầy đủ canxi, vitamin D, protein</li>
                      <li>Ngủ trước 22h, đủ 8-10 giờ/đêm</li>
                      <li>Tránh stress, giữ tâm trạng vui vẻ</li>
                    </ul>
                  </div>
                </div>
              )}
            </TabsContent>

            {/* 7. Phân tích tư thế & Cột sống */}
            <TabsContent value="posture" className="space-y-4">
              <div className="p-5 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border-2 border-orange-300">
                <h4 className="mb-4">📸 Phân tích tư thế & Cột sống</h4>
                
                <div className="space-y-4">
                  <div className="p-4 bg-white rounded-lg border-2 border-orange-200 text-center">
                    <Camera className="w-16 h-16 mx-auto mb-3 text-orange-500" />
                    <p className="mb-2">Chức năng phân tích tư thế bằng AI</p>
                    <p className="text-sm text-gray-600 mb-4">Sẽ được phát triển trong phiên bản sau</p>
                    <Button className="bg-gradient-to-r from-orange-500 to-red-500">
                      <Camera className="w-4 h-4 mr-2" />
                      Chụp ảnh phân tích
                    </Button>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h5 className="mb-3">✅ Tư thế đúng:</h5>
                    <div className="grid md:grid-cols-3 gap-3">
                      <div className="p-3 bg-white rounded">
                        <p className="text-sm mb-1">🧍 <strong>Đứng:</strong></p>
                        <p className="text-xs">• Vai thẳng<br/>• Lưng thẳng<br/>• Đầu không cúi</p>
                      </div>
                      <div className="p-3 bg-white rounded">
                        <p className="text-sm mb-1">🪑 <strong>Ngồi:</strong></p>
                        <p className="text-xs">• Lưng dựa ghế<br/>• Chân chạm sàn<br/>• Màn hình ngang mắt</p>
                      </div>
                      <div className="p-3 bg-white rounded">
                        <p className="text-sm mb-1">🚶 <strong>Đi:</strong></p>
                        <p className="text-xs">• Ngực mở<br/>• Vai thả lỏng<br/>• Nhìn thẳng</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-red-50 rounded-lg">
                    <p className="text-sm text-red-800 mb-2">❌ <strong>Tư thế sai thường gặp:</strong></p>
                    <ul className="text-xs space-y-1 list-disc list-inside">
                      <li>Gù lưng khi ngồi → Giảm 2-5cm chiều cao nhìn</li>
                      <li>Cúi đầu nhìn điện thoại → Đau cổ, vẹo cột sống</li>
                      <li>Ngồi lệch một bên → Vẹo cột sống</li>
                      <li>Đi chúi vai → Giảm tự tin & chiều cao</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg">
                    <h5 className="mb-2">💡 Bài tập chỉnh tư thế:</h5>
                    <ul className="text-sm space-y-1 list-disc list-inside">
                      <li>Wall angel (dựa tường duỗi tay)</li>
                      <li>Cobra stretch (tư thế rắn hổ mang)</li>
                      <li>Cat-Cow (tư thế mèo bò)</li>
                      <li>Plank (chống đẩy tĩnh)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* 8. Kế hoạch 30 ngày */}
            <TabsContent value="challenge" className="space-y-4">
              <div className="p-5 bg-gradient-to-r from-red-50 to-pink-50 rounded-lg border-2 border-red-300">
                <h4 className="mb-4">🎯 Kế hoạch 30 ngày tăng chiều cao</h4>
                
                <div className="space-y-4">
                  <div className="p-4 bg-white rounded-lg">
                    <h5 className="mb-3">📋 Tổng quan kế hoạch:</h5>
                    <div className="grid md:grid-cols-2 gap-3">
                      <div className="p-3 bg-blue-50 rounded">
                        <p className="text-sm mb-1">🤸 <strong>Tập luyện:</strong></p>
                        <p className="text-xs">20-30 phút/ngày<br/>5-6 ngày/tuần</p>
                      </div>
                      <div className="p-3 bg-green-50 rounded">
                        <p className="text-sm mb-1">🍽️ <strong>Ăn uống:</strong></p>
                        <p className="text-xs">Tăng canxi & protein<br/>Giảm đường & fast food</p>
                      </div>
                      <div className="p-3 bg-purple-50 rounded">
                        <p className="text-sm mb-1">🌙 <strong>Giấc ngủ:</strong></p>
                        <p className="text-xs">Trước 22h mỗi tối<br/>8-10 giờ/đêm</p>
                      </div>
                      <div className="p-3 bg-yellow-50 rounded">
                        <p className="text-sm mb-1">📊 <strong>Theo dõi:</strong></p>
                        <p className="text-xs">Đo chiều cao mỗi tuần<br/>Ghi nhật ký hàng ngày</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h5 className="mb-3">📅 Lịch mẫu 1 tuần:</h5>
                    <div className="space-y-2">
                      {[
                        { day: 'Thứ 2', activity: 'Bơi 30 phút 🏊' },
                        { day: 'Thứ 3', activity: 'Yoga + Kéo giãn 25 phút 🧘' },
                        { day: 'Thứ 4', activity: 'Đu xà 10 phút + Nhảy dây 200 lần 🤸' },
                        { day: 'Thứ 5', activity: 'Bóng rổ 30 phút 🏀' },
                        { day: 'Thứ 6', activity: 'Bơi 30 phút 🏊' },
                        { day: 'Thứ 7', activity: 'Bóng chuyền 30 phút 🏐' },
                        { day: 'Chủ nhật', activity: 'Nghỉ ngơi + Kéo giãn nhẹ 15 phút 🧘‍♀️' },
                      ].map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center p-2 bg-white rounded">
                          <span className="text-sm">{item.day}</span>
                          <span className="text-sm">{item.activity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={create30DayChallenge}
                    className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
                    size="lg"
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    Bắt đầu thử thách 30 ngày
                  </Button>

                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <p className="text-sm mb-2">💡 <strong>Mẹo thành công:</strong></p>
                    <ul className="text-xs space-y-1 list-disc list-inside">
                      <li>Đặt mục tiêu rõ ràng (VD: tăng 1cm trong 30 ngày)</li>
                      <li>Ghi nhật ký hàng ngày</li>
                      <li>Tìm bạn cùng tập để động viên nhau</li>
                      <li>Đo chiều cao mỗi tuần vào cùng 1 thời điểm</li>
                      <li>Kiên trì là chìa khóa - không bỏ cuộc!</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
