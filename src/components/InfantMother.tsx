import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Textarea } from './ui/textarea';
import { Progress } from './ui/progress';
import { Baby, Heart, Utensils, Moon, Activity, Calendar, Syringe, Smile } from 'lucide-react';
import { toast } from 'sonner';

export function InfantMother() {
  // 1. Theo dõi phát triển trẻ sơ sinh
  const [babyAge, setBabyAge] = useState('');
  const [babyWeight, setBabyWeight] = useState('');
  const [babyHeight, setBabyHeight] = useState('');
  const [headCircumference, setHeadCircumference] = useState('');

  // 2. Lịch tiêm chủng
  const [birthDate, setBirthDate] = useState('');

  // 3. Dinh dưỡng
  const [feedingType, setFeedingType] = useState('breast');
  const [hasAllergies, setHasAllergies] = useState(false);

  // 4. Sức khỏe mẹ sau sinh
  const [daysPostpartum, setDaysPostpartum] = useState('');
  const [moodScore, setMoodScore] = useState('7');

  // 5. Di truyền & phát triển
  const [parentHeight1, setParentHeight1] = useState('');
  const [parentHeight2, setParentHeight2] = useState('');

  // 6. Giấc ngủ
  const [sleepHours, setSleepHours] = useState('');
  const [napFrequency, setNapFrequency] = useState('');

  // 7. Phát triển vận động
  const [milestoneAge, setMilestoneAge] = useState('');

  // 8. Nhật ký
  const [diaryNote, setDiaryNote] = useState('');

  // Chuẩn WHO cho trẻ sơ sinh
  const getWHOStandard = (ageMonths: number, gender: 'boy' | 'girl' = 'boy') => {
    const standards: any = {
      boy: {
        0: { weight: [2.5, 4.4], height: [46.1, 53.7], head: [31.9, 37.9] },
        1: { weight: [3.4, 5.8], height: [50.8, 58.6], head: [35.1, 40.9] },
        2: { weight: [4.3, 7.1], height: [54.4, 62.4], head: [36.8, 42.6] },
        3: { weight: [5.0, 8.0], height: [57.3, 65.5], head: [38.1, 43.9] },
        6: { weight: [6.4, 9.8], height: [63.3, 71.9], head: [40.9, 46.5] },
        9: { weight: [7.6, 11.2], height: [67.7, 76.5], head: [42.8, 48.4] },
        12: { weight: [8.6, 12.4], height: [71.0, 80.2], head: [44.2, 49.8] },
      },
      girl: {
        0: { weight: [2.4, 4.2], height: [45.4, 52.9], head: [31.5, 37.3] },
        1: { weight: [3.2, 5.5], height: [49.8, 57.6], head: [34.5, 40.3] },
        2: { weight: [4.2, 6.6], height: [53.0, 61.1], head: [36.2, 42.0] },
        3: { weight: [4.8, 7.5], height: [55.6, 64.0], head: [37.4, 43.2] },
        6: { weight: [5.7, 9.3], height: [61.2, 70.3], head: [40.2, 45.8] },
        9: { weight: [7.0, 10.5], height: [65.6, 75.0], head: [42.0, 47.6] },
        12: { weight: [7.9, 11.5], height: [68.9, 78.9], head: [43.4, 49.0] },
      }
    };

    return standards[gender][ageMonths] || standards[gender][0];
  };

  const analyzeInfantGrowth = () => {
    if (!babyAge || !babyWeight || !babyHeight) {
      toast.error('Vui lòng nhập đầy đủ thông tin bé!');
      return null;
    }

    const age = parseFloat(babyAge);
    const weight = parseFloat(babyWeight);
    const height = parseFloat(babyHeight);
    
    const standard = getWHOStandard(age);
    
    // Phân tích cân nặng
    let weightStatus = '';
    let weightColor = '';
    if (weight < standard.weight[0]) {
      weightStatus = 'Nhẹ cân (Cần theo dõi)';
      weightColor = 'text-orange-600';
    } else if (weight > standard.weight[1]) {
      weightStatus = 'Nặng cân (Cần theo dõi)';
      weightColor = 'text-orange-600';
    } else {
      weightStatus = 'Bình thường';
      weightColor = 'text-green-600';
    }

    // Phân tích chiều cao
    let heightStatus = '';
    let heightColor = '';
    if (height < standard.height[0]) {
      heightStatus = 'Thấp (Cần theo dõi)';
      heightColor = 'text-orange-600';
    } else if (height > standard.height[1]) {
      heightStatus = 'Cao';
      heightColor = 'text-green-600';
    } else {
      heightStatus = 'Bình thường';
      heightColor = 'text-green-600';
    }

    return {
      weightStatus,
      weightColor,
      heightStatus,
      heightColor,
      standard
    };
  };

  // Lịch tiêm chủng Việt Nam 2025
  const vietnamVaccineSchedule = [
    { age: '0 ngày', vaccine: 'BCG (Lao)', location: 'Bệnh viện' },
    { age: '0 ngày', vaccine: 'Viêm gan B (mũi 1)', location: 'Bệnh viện' },
    { age: '2 tháng', vaccine: 'Viêm gan B (mũi 2)', location: 'Trạm y tế' },
    { age: '2 tháng', vaccine: 'DPT (Bạch hầu, Ho gà, Uốn ván - mũi 1)', location: 'Trạm y tế' },
    { age: '2 tháng', vaccine: 'Hib (mũi 1)', location: 'Trạm y tế' },
    { age: '2 tháng', vaccine: 'Viêm gan B (mũi 2)', location: 'Trạm y tế' },
    { age: '3 tháng', vaccine: 'Bại liệt (OPV - mũi 1)', location: 'Trạm y tế' },
    { age: '4 tháng', vaccine: 'DPT (mũi 2)', location: 'Trạm y tế' },
    { age: '4 tháng', vaccine: 'Hib (mũi 2)', location: 'Trạm y tế' },
    { age: '4 tháng', vaccine: 'Bại liệt (OPV - mũi 2)', location: 'Trạm y tế' },
    { age: '5 tháng', vaccine: 'Viêm gan B (mũi 3)', location: 'Trạm y tế' },
    { age: '6 tháng', vaccine: 'DPT (mũi 3)', location: 'Trạm y tế' },
    { age: '6 tháng', vaccine: 'Hib (mũi 3)', location: 'Trạm y tế' },
    { age: '6 tháng', vaccine: 'Bại liệt (OPV - mũi 3)', location: 'Trạm y tế' },
    { age: '9 tháng', vaccine: 'Sởi (mũi 1)', location: 'Trạm y tế' },
    { age: '12 tháng', vaccine: 'Viêm gan B (tăng cường)', location: 'Trạm y tế' },
    { age: '18 tháng', vaccine: 'DPT (tăng cường)', location: 'Trạm y tế' },
    { age: '18 tháng', vaccine: 'Sởi (mũi 2)', location: 'Trạm y tế' },
  ];

  // Mốc phát triển
  const developmentMilestones = [
    { age: '0-1', milestones: ['Phản xạ tìm núm vú', 'Nắm tay phản xạ', 'Nhìn theo ánh sáng'] },
    { age: '1-2', milestones: ['Nhấc đầu khi nằm sấp', 'Cười đáp lại', 'Phát ra âm thanh'] },
    { age: '2-3', milestones: ['Nâng đầu và ngực khi nằm sấp', 'Mở bàn tay', 'Với lấy đồ chơi'] },
    { age: '3-4', milestones: ['Lật người', 'Cười khúc khích', 'Bắt chước âm thanh'] },
    { age: '4-6', milestones: ['Ngồi có tựa', 'Chuyển đồ từ tay này sang tay kia', 'Bập bẹ'] },
    { age: '6-9', milestones: ['Ngồi không cần tựa', 'Bò', 'Nói "ba ba", "ma ma"'] },
    { age: '9-12', milestones: ['Đứng có vịn', 'Bước có nắm tay', 'Nói vài từ đơn giản'] },
  ];

  const predictChildHeight = () => {
    if (!parentHeight1 || !parentHeight2) return null;
    
    const h1 = parseFloat(parentHeight1);
    const h2 = parseFloat(parentHeight2);
    
    const boyHeight = ((h1 + h2 + 13) / 2).toFixed(1);
    const girlHeight = ((h1 + h2 - 13) / 2).toFixed(1);
    
    return { boy: boyHeight, girl: girlHeight };
  };

  const analysis = analyzeInfantGrowth();
  const heightPrediction = predictChildHeight();

  const saveDiary = () => {
    if (!diaryNote) {
      toast.error('Vui lòng nhập nội dung ghi chú!');
      return;
    }

    const diary = {
      date: new Date().toISOString(),
      note: diaryNote,
      babyAge,
      babyWeight,
      babyHeight
    };

    const existingDiaries = JSON.parse(localStorage.getItem('healthyVN_babyDiaries') || '[]');
    existingDiaries.push(diary);
    localStorage.setItem('healthyVN_babyDiaries', JSON.stringify(existingDiaries));
    
    toast.success('Đã lưu nhật ký chăm sóc!');
    setDiaryNote('');
  };

  return (
    <div className="space-y-6">
      <Card className="border-4 border-pink-200 shadow-xl bg-gradient-to-br from-white to-pink-50">
        <CardHeader className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <Baby className="w-6 h-6" />
            👶 Sức khỏe trẻ sơ sinh & Mẹ sau sinh
          </CardTitle>
          <CardDescription className="text-pink-100">
            8 tính năng toàn diện theo SDG 3: Sức khỏe và cuộc sống tốt
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs defaultValue="growth" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 gap-2 h-auto p-2 bg-pink-100">
              <TabsTrigger value="growth" className="flex flex-col items-center gap-1 p-2 data-[state=active]:bg-gradient-to-br data-[state=active]:from-pink-500 data-[state=active]:to-purple-500 data-[state=active]:text-white rounded-lg text-xs">
                <Activity className="w-4 h-4" />
                <span>Phát triển</span>
              </TabsTrigger>
              
              <TabsTrigger value="vaccine" className="flex flex-col items-center gap-1 p-2 data-[state=active]:bg-gradient-to-br data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white rounded-lg text-xs">
                <Syringe className="w-4 h-4" />
                <span>Tiêm chủng</span>
              </TabsTrigger>
              
              <TabsTrigger value="nutrition" className="flex flex-col items-center gap-1 p-2 data-[state=active]:bg-gradient-to-br data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white rounded-lg text-xs">
                <Utensils className="w-4 h-4" />
                <span>Dinh dưỡng</span>
              </TabsTrigger>
              
              <TabsTrigger value="mother" className="flex flex-col items-center gap-1 p-2 data-[state=active]:bg-gradient-to-br data-[state=active]:from-cyan-500 data-[state=active]:to-green-500 data-[state=active]:text-white rounded-lg text-xs">
                <Heart className="w-4 h-4" />
                <span>Mẹ sau sinh</span>
              </TabsTrigger>
              
              <TabsTrigger value="genetics" className="flex flex-col items-center gap-1 p-2 data-[state=active]:bg-gradient-to-br data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white rounded-lg text-xs">
                <Activity className="w-4 h-4" />
                <span>Di truyền</span>
              </TabsTrigger>
              
              <TabsTrigger value="sleep" className="flex flex-col items-center gap-1 p-2 data-[state=active]:bg-gradient-to-br data-[state=active]:from-emerald-500 data-[state=active]:to-teal-500 data-[state=active]:text-white rounded-lg text-xs">
                <Moon className="w-4 h-4" />
                <span>Giấc ngủ</span>
              </TabsTrigger>
              
              <TabsTrigger value="milestone" className="flex flex-col items-center gap-1 p-2 data-[state=active]:bg-gradient-to-br data-[state=active]:from-teal-500 data-[state=active]:to-orange-500 data-[state=active]:text-white rounded-lg text-xs">
                <Smile className="w-4 h-4" />
                <span>Vận động</span>
              </TabsTrigger>
              
              <TabsTrigger value="diary" className="flex flex-col items-center gap-1 p-2 data-[state=active]:bg-gradient-to-br data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white rounded-lg text-xs">
                <Calendar className="w-4 h-4" />
                <span>Nhật ký</span>
              </TabsTrigger>
            </TabsList>

            {/* 1. Theo dõi phát triển */}
            <TabsContent value="growth" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Tuổi bé (tháng)</Label>
                  <Input
                    type="number"
                    value={babyAge}
                    onChange={(e) => setBabyAge(e.target.value)}
                    placeholder="VD: 6"
                    className="border-2 border-pink-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Cân nặng (kg)</Label>
                  <Input
                    type="number"
                    step="0.1"
                    value={babyWeight}
                    onChange={(e) => setBabyWeight(e.target.value)}
                    placeholder="VD: 7.5"
                    className="border-2 border-pink-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Chiều cao (cm)</Label>
                  <Input
                    type="number"
                    step="0.1"
                    value={babyHeight}
                    onChange={(e) => setBabyHeight(e.target.value)}
                    placeholder="VD: 67"
                    className="border-2 border-pink-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Vòng đầu (cm)</Label>
                  <Input
                    type="number"
                    step="0.1"
                    value={headCircumference}
                    onChange={(e) => setHeadCircumference(e.target.value)}
                    placeholder="VD: 43"
                    className="border-2 border-pink-300"
                  />
                </div>
              </div>

              {analysis && (
                <div className="space-y-4 mt-6">
                  <div className="p-5 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border-2 border-blue-300">
                    <h4 className="mb-4">📊 Kết quả so sánh với chuẩn WHO</h4>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 bg-white rounded-lg">
                        <p className="text-sm text-gray-600 mb-2">Cân nặng</p>
                        <p className={`text-2xl mb-2 ${analysis.weightColor}`}>{analysis.weightStatus}</p>
                        <p className="text-sm text-gray-600">
                          Chuẩn WHO: {analysis.standard.weight[0]} - {analysis.standard.weight[1]} kg
                        </p>
                        <p className="text-sm mt-1">Bé: <strong>{babyWeight} kg</strong></p>
                      </div>

                      <div className="p-4 bg-white rounded-lg">
                        <p className="text-sm text-gray-600 mb-2">Chiều cao</p>
                        <p className={`text-2xl mb-2 ${analysis.heightColor}`}>{analysis.heightStatus}</p>
                        <p className="text-sm text-gray-600">
                          Chuẩn WHO: {analysis.standard.height[0]} - {analysis.standard.height[1]} cm
                        </p>
                        <p className="text-sm mt-1">Bé: <strong>{babyHeight} cm</strong></p>
                      </div>
                    </div>

                    <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
                      <h5 className="mb-2">💡 Khuyến nghị chăm sóc</h5>
                      <ul className="text-sm space-y-1 list-disc list-inside">
                        <li>Theo dõi cân nặng - chiều cao mỗi tháng</li>
                        <li>Bổ sung dinh dưỡng đầy đủ theo độ tuổi</li>
                        <li>Khám định kỳ tại trạm y tế</li>
                        <li>Nếu lệch chuẩn &gt;15%, hãy gặp bác sĩ nhi khoa</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>

            {/* 2. Lịch tiêm chủng */}
            <TabsContent value="vaccine" className="space-y-4">
              <div className="space-y-2">
                <Label>Ngày sinh của bé</Label>
                <Input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="border-2 border-purple-300"
                />
              </div>

              <div className="p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
                <h4 className="mb-4">💉 Lịch tiêm chủng Việt Nam 2025</h4>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {vietnamVaccineSchedule.map((item, index) => (
                    <div key={index} className="p-3 bg-white rounded-lg border border-purple-200 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-purple-700">📅 {item.age}</p>
                          <p className="text-sm mt-1">{item.vaccine}</p>
                          <p className="text-xs text-gray-600 mt-1">📍 {item.location}</p>
                        </div>
                        <Button size="sm" variant="outline">Đã tiêm</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                <h5 className="mb-2">ℹ️ Lưu ý quan trọng</h5>
                <ul className="text-sm space-y-1 list-disc list-inside">
                  <li>Tiêm chủng đầy đủ giúp bảo vệ bé khỏi các bệnh nguy hiểm</li>
                  <li>Theo dõi phản ứng sau tiêm (sốt nhẹ, sưng đỏ vùng tiêm)</li>
                  <li>Báo bác sĩ nếu bé có phản ứng bất thường</li>
                  <li>Mang theo sổ tiêm chủng mỗi lần đi khám</li>
                </ul>
              </div>
            </TabsContent>

            {/* 3. Dinh dưỡng */}
            <TabsContent value="nutrition" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Hình thức cho bé ăn</Label>
                  <Select value={feedingType} onValueChange={setFeedingType}>
                    <SelectTrigger className="border-2 border-blue-300">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="breast">🤱 Bú mẹ hoàn toàn</SelectItem>
                      <SelectItem value="formula">🍼 Sữa công thức</SelectItem>
                      <SelectItem value="mixed">🤱🍼 Kết hợp</SelectItem>
                      <SelectItem value="solids">🍚 Đã ăn dặm</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Bé có dị ứng không?</Label>
                  <Select value={hasAllergies ? 'yes' : 'no'} onValueChange={(val: any) => setHasAllergies(val === 'yes')}>
                    <SelectTrigger className="border-2 border-blue-300">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="no">Không</SelectItem>
                      <SelectItem value="yes">Có</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-4">
                {/* Cho bé */}
                <div className="p-4 bg-gradient-to-br from-pink-50 to-purple-50 rounded-lg border-2 border-pink-200">
                  <h4 className="mb-3 flex items-center gap-2">
                    <Baby className="w-5 h-5" />
                    Dinh dưỡng cho bé
                  </h4>
                  <div className="space-y-3">
                    {feedingType === 'breast' && (
                      <div className="p-3 bg-white rounded-lg">
                        <p className="text-sm mb-2">🤱 <strong>Bú mẹ hoàn toàn (0-6 tháng)</strong></p>
                        <ul className="text-xs space-y-1 list-disc list-inside">
                          <li>Cho bú theo nhu cầu, 8-12 lần/ngày</li>
                          <li>Mỗi bên vú 10-15 phút</li>
                          <li>Bổ sung vitamin D3 cho bé</li>
                        </ul>
                      </div>
                    )}
                    
                    {feedingType === 'solids' && (
                      <div className="p-3 bg-white rounded-lg">
                        <p className="text-sm mb-2">🍚 <strong>Ăn dặm (từ 6 tháng)</strong></p>
                        <ul className="text-xs space-y-1 list-disc list-inside">
                          <li>Bắt đầu: Cháo loãng, bột ngũ cốc</li>
                          <li>6-8 tháng: Rau xanh, trái cây nghiền</li>
                          <li>8-12 tháng: Thịt, cá, trứng, đậu</li>
                          <li>Tránh: Mật ong (dưới 1 tuổi), muối, đường</li>
                        </ul>
                      </div>
                    )}

                    <div className="p-3 bg-yellow-50 rounded-lg">
                      <p className="text-xs">💡 <strong>Thực đơn mẫu (8 tháng):</strong></p>
                      <p className="text-xs mt-1">• Sáng: Cháo thịt gà + rau bí</p>
                      <p className="text-xs">• Trưa: Cháo cá + cà rốt</p>
                      <p className="text-xs">• Chiều: Trái cây nghiền (chuối, táo)</p>
                      <p className="text-xs">• Tối: Cháo đậu hũ + rau chân vịt</p>
                    </div>
                  </div>
                </div>

                {/* Cho mẹ */}
                <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border-2 border-green-200">
                  <h4 className="mb-3 flex items-center gap-2">
                    <Heart className="w-5 h-5" />
                    Dinh dưỡng cho mẹ
                  </h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-white rounded-lg">
                      <p className="text-sm mb-2">🤱 <strong>Mẹ cho con bú</strong></p>
                      <ul className="text-xs space-y-1 list-disc list-inside">
                        <li>Cần thêm 500 kcal/ngày</li>
                        <li>Uống 2.5-3L nước/ngày</li>
                        <li>Tăng protein (thịt, cá, trứng, đậu)</li>
                        <li>Bổ sung canxi, DHA, sắt</li>
                      </ul>
                    </div>

                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-xs mb-2">🍽️ <strong>Thực đơn mẫu mẹ sau sinh:</strong></p>
                      <p className="text-xs">• Sáng: Cháo gà + trứng + sữa</p>
                      <p className="text-xs">• Trưa: Cơm + cá hồi + rau xanh</p>
                      <p className="text-xs">• Xế: Sữa chua + hạt óc chó</p>
                      <p className="text-xs">• Tối: Súp xương + rau củ</p>
                    </div>

                    <div className="p-3 bg-yellow-50 rounded-lg">
                      <p className="text-xs">🚫 <strong>Tránh:</strong> Rượu, caffeine nhiều, thực phẩm cay nóng</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* 4. Sức khỏe mẹ sau sinh */}
            <TabsContent value="mother" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Số ngày sau sinh</Label>
                  <Input
                    type="number"
                    value={daysPostpartum}
                    onChange={(e) => setDaysPostpartum(e.target.value)}
                    placeholder="VD: 30"
                    className="border-2 border-pink-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Đánh giá tâm trạng (1-10)</Label>
                  <Input
                    type="number"
                    min="1"
                    max="10"
                    value={moodScore}
                    onChange={(e) => setMoodScore(e.target.value)}
                    className="border-2 border-pink-300"
                  />
                  <p className="text-xs text-gray-600">
                    {parseInt(moodScore) >= 7 ? '😊 Tốt' : parseInt(moodScore) >= 5 ? '😐 Trung bình' : '😔 Cần quan tâm'}
                  </p>
                </div>
              </div>

              <div className="p-5 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg border-2 border-pink-300">
                <h4 className="mb-4">💖 Theo dõi sức khỏe & tâm lý mẹ sau sinh</h4>
                
                <div className="space-y-4">
                  <div className="p-4 bg-white rounded-lg">
                    <p className="mb-3">Điểm tâm trạng của bạn: <strong>{moodScore}/10</strong></p>
                    <Progress value={parseInt(moodScore) * 10} className="h-3" />
                    
                    {parseInt(moodScore) < 5 && (
                      <div className="mt-3 p-3 bg-red-50 rounded-lg border border-red-200">
                        <p className="text-sm text-red-700">⚠️ <strong>Cảnh báo:</strong> Bạn có dấu hiệu trầm cảm sau sinh. Hãy gặp bác sĩ hoặc tâm lý học.</p>
                      </div>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm mb-2">✅ <strong>Nên làm:</strong></p>
                      <ul className="text-xs space-y-1 list-disc list-inside">
                        <li>Nghỉ ngơi đủ giấc khi bé ngủ</li>
                        <li>Tập yoga nhẹ phục hồi cơ sàn chậu</li>
                        <li>Nói chuyện với người thân</li>
                        <li>Đi dạo ngoài trời mỗi ngày</li>
                      </ul>
                    </div>

                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-sm mb-2">🧘 <strong>Giảm stress:</strong></p>
                      <ul className="text-xs space-y-1 list-disc list-inside">
                        <li>Nghe nhạc thư giãn</li>
                        <li>Hít thở sâu 5-10 phút/ngày</li>
                        <li>Đọc sách hoặc xem phim nhẹ</li>
                        <li>Nhờ gia đình hỗ trợ chăm con</li>
                      </ul>
                    </div>
                  </div>

                  <div className="p-3 bg-red-50 rounded-lg border-2 border-red-200">
                    <p className="text-sm text-red-800">🚨 <strong>SOS - Gặp bác sĩ ngay nếu:</strong></p>
                    <ul className="text-xs mt-2 space-y-1 list-disc list-inside">
                      <li>Mất ngủ kéo dài &gt;7 ngày</li>
                      <li>Cảm giác tuyệt vọng, không muốn sống</li>
                      <li>Không muốn chăm sóc bé</li>
                      <li>Kiệt sức hoàn toàn</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* 5. Di truyền & Phát triển tương lai */}
            <TabsContent value="genetics" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Chiều cao cha (cm)</Label>
                  <Input
                    type="number"
                    value={parentHeight1}
                    onChange={(e) => setParentHeight1(e.target.value)}
                    placeholder="VD: 170"
                    className="border-2 border-green-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Chiều cao mẹ (cm)</Label>
                  <Input
                    type="number"
                    value={parentHeight2}
                    onChange={(e) => setParentHeight2(e.target.value)}
                    placeholder="VD: 160"
                    className="border-2 border-green-300"
                  />
                </div>
              </div>

              {heightPrediction && (
                <div className="p-5 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border-2 border-green-300">
                  <h4 className="mb-4">🧬 Dự đoán chiều cao tiềm năng của bé</h4>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-white rounded-lg border-2 border-blue-200 text-center">
                      <p className="text-sm text-gray-600 mb-2">Nếu bé là trai 👦</p>
                      <p className="text-4xl text-blue-600 mb-2">{heightPrediction.boy} cm</p>
                      <p className="text-sm text-gray-600">≈ {(parseFloat(heightPrediction.boy) / 100).toFixed(2)} m</p>
                    </div>

                    <div className="p-4 bg-white rounded-lg border-2 border-pink-200 text-center">
                      <p className="text-sm text-gray-600 mb-2">Nếu bé là gái 👧</p>
                      <p className="text-4xl text-pink-600 mb-2">{heightPrediction.girl} cm</p>
                      <p className="text-sm text-gray-600">≈ {(parseFloat(heightPrediction.girl) / 100).toFixed(2)} m</p>
                    </div>
                  </div>

                  <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
                    <h5 className="mb-2">💡 Tối ưu hóa chiều cao cho bé</h5>
                    <ul className="text-sm space-y-1 list-disc list-inside">
                      <li>Dinh dưỡng đầy đủ: Canxi, vitamin D, protein</li>
                      <li>Vận động: Cho bé tập bò, đứng, đi sớm</li>
                      <li>Giấc ngủ: 12-16 giờ/ngày cho trẻ sơ sinh</li>
                      <li>Khám định kỳ theo dõi phát triển xương</li>
                      <li>Tắm nắng buổi sáng 10-15 phút (vitamin D tự nhiên)</li>
                    </ul>
                  </div>

                  <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                    <p className="text-xs text-gray-600">
                      * Công thức Tanner: Nam = (Hcha + Hmẹ + 13) / 2 | Nữ = (Hcha + Hmẹ - 13) / 2<br/>
                      * Kết quả là ước tính, chiều cao thực tế phụ thuộc nhiều yếu tố khác
                    </p>
                  </div>
                </div>
              )}
            </TabsContent>

            {/* 6. Giấc ngủ */}
            <TabsContent value="sleep" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Số giờ ngủ/ngày</Label>
                  <Input
                    type="number"
                    value={sleepHours}
                    onChange={(e) => setSleepHours(e.target.value)}
                    placeholder="VD: 14"
                    className="border-2 border-purple-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Số lần ngủ ngắn/ngày</Label>
                  <Input
                    type="number"
                    value={napFrequency}
                    onChange={(e) => setNapFrequency(e.target.value)}
                    placeholder="VD: 3"
                    className="border-2 border-purple-300"
                  />
                </div>
              </div>

              <div className="p-5 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border-2 border-purple-300">
                <h4 className="mb-4">🌙 Giấc ngủ & Phát triển</h4>
                
                <div className="space-y-4">
                  <div className="p-4 bg-white rounded-lg">
                    <h5 className="mb-3">⏰ Mốc vàng giấc ngủ theo tháng tuổi:</h5>
                    <div className="grid md:grid-cols-2 gap-3">
                      <div className="p-3 bg-blue-50 rounded">
                        <p className="text-sm mb-1"><strong>0-3 tháng:</strong></p>
                        <p className="text-xs">14-17 giờ/ngày (nhiều giấc ngắn)</p>
                      </div>
                      <div className="p-3 bg-green-50 rounded">
                        <p className="text-sm mb-1"><strong>4-11 tháng:</strong></p>
                        <p className="text-xs">12-15 giờ/ngày (2-3 giấc ngủ trưa)</p>
                      </div>
                      <div className="p-3 bg-yellow-50 rounded">
                        <p className="text-sm mb-1"><strong>1-2 tuổi:</strong></p>
                        <p className="text-xs">11-14 giờ/ngày (1-2 giấc ngủ trưa)</p>
                      </div>
                      <div className="p-3 bg-orange-50 rounded">
                        <p className="text-sm mb-1"><strong>3-5 tuổi:</strong></p>
                        <p className="text-xs">10-13 giờ/ngày (1 giấc ngủ trưa)</p>
                      </div>
                    </div>
                  </div>

                  {sleepHours && (
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <p className="mb-2">Bé đang ngủ: <strong>{sleepHours} giờ/ngày</strong></p>
                      {parseFloat(sleepHours) < 12 && (
                        <p className="text-sm text-orange-600">⚠️ Bé đang thiếu ngủ. Nên tăng thời gian ngủ.</p>
                      )}
                      {parseFloat(sleepHours) >= 12 && parseFloat(sleepHours) <= 16 && (
                        <p className="text-sm text-green-600">✅ Thời gian ngủ tốt!</p>
                      )}
                    </div>
                  )}

                  <div className="p-4 bg-green-50 rounded-lg">
                    <h5 className="mb-2">💡 Gợi ý môi trường ngủ tối ưu:</h5>
                    <ul className="text-sm space-y-1 list-disc list-inside">
                      <li>Phòng tối, yên tĩnh (hoặc nhạc ru nhẹ)</li>
                      <li>Nhiệt độ 20-22°C</li>
                      <li>Giường cứng, không gối cho bé dưới 1 tuổi</li>
                      <li>Không để điện thoại/TV gần bé khi ngủ</li>
                      <li>Tắm ấm trước khi ngủ</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* 7. Phát triển vận động & Trí não */}
            <TabsContent value="milestone" className="space-y-4">
              <div className="space-y-2">
                <Label>Tuổi bé (tháng)</Label>
                <Input
                  type="number"
                  value={milestoneAge}
                  onChange={(e) => setMilestoneAge(e.target.value)}
                  placeholder="VD: 6"
                  className="border-2 border-orange-300"
                />
              </div>

              <div className="p-5 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg border-2 border-orange-300">
                <h4 className="mb-4">👣 Mốc phát triển vận động & Trí não</h4>
                
                <div className="space-y-3">
                  {developmentMilestones.map((milestone, index) => (
                    <div key={index} className="p-4 bg-white rounded-lg border border-orange-200">
                      <p className="mb-2"><strong>{milestone.age} tháng</strong></p>
                      <ul className="text-sm space-y-1">
                        {milestone.milestones.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-green-600">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <h5 className="mb-2">🎯 Hoạt động kích thích trí tuệ:</h5>
                  <div className="grid md:grid-cols-2 gap-3 mt-2">
                    <div className="p-3 bg-white rounded">
                      <p className="text-sm mb-1"><strong>0-6 tháng:</strong></p>
                      <p className="text-xs">• Nói chuyện với bé • Hát ru • Cho bé nằm sấp • Treo đồ chơi màu sắc</p>
                    </div>
                    <div className="p-3 bg-white rounded">
                      <p className="text-sm mb-1"><strong>6-12 tháng:</strong></p>
                      <p className="text-xs">• Chơi trò ú òa • Đọc sách tranh • Xếp hình đơn giản • Cho bé tập bò</p>
                    </div>
                  </div>
                </div>

                <div className="mt-3 p-4 bg-red-50 rounded-lg border-2 border-red-200">
                  <p className="text-sm text-red-800">⚠️ <strong>Cảnh báo chậm phát triển (chênh mốc &gt;25%):</strong></p>
                  <ul className="text-xs mt-2 space-y-1 list-disc list-inside">
                    <li>6 tháng: Không biết lật, không cười đáp lại</li>
                    <li>9 tháng: Không biết ngồi, không bập bẹ</li>
                    <li>12 tháng: Không biết đứng vịn, không nói từ đơn giản</li>
                  </ul>
                  <p className="text-xs mt-2">→ Hãy đưa bé đi khám bác sĩ nhi khoa để được tư vấn!</p>
                </div>
              </div>
            </TabsContent>

            {/* 8. Nhật ký & Lịch trình chăm sóc */}
            <TabsContent value="diary" className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Ghi chú hôm nay</Label>
                  <Textarea
                    value={diaryNote}
                    onChange={(e) => setDiaryNote(e.target.value)}
                    placeholder="VD: Bé đã biết lật người hôm nay! Mọc răng đầu tiên..."
                    className="border-2 border-green-300 min-h-[100px]"
                  />
                </div>

                <Button
                  onClick={saveDiary}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Lưu nhật ký chăm sóc
                </Button>
              </div>

              <div className="p-5 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border-2 border-green-300">
                <h4 className="mb-4">📅 Lịch trình chăm sóc hằng ngày</h4>
                
                <div className="space-y-3">
                  <div className="p-3 bg-white rounded-lg">
                    <h5 className="mb-2">⏰ Lịch mẫu cho bé 6 tháng:</h5>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="p-2 bg-yellow-50 rounded">6:00 - Bú sáng</div>
                      <div className="p-2 bg-blue-50 rounded">7:00 - Tắm</div>
                      <div className="p-2 bg-pink-50 rounded">9:00 - Ngủ (1-2h)</div>
                      <div className="p-2 bg-yellow-50 rounded">11:00 - Bú trưa</div>
                      <div className="p-2 bg-green-50 rounded">12:00 - Chơi</div>
                      <div className="p-2 bg-pink-50 rounded">14:00 - Ngủ (1-2h)</div>
                      <div className="p-2 bg-yellow-50 rounded">16:00 - Bú chiều</div>
                      <div className="p-2 bg-purple-50 rounded">18:00 - Tắm tối</div>
                      <div className="p-2 bg-yellow-50 rounded">19:00 - Bú tối</div>
                      <div className="p-2 bg-blue-50 rounded">20:00 - Ngủ đêm</div>
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 rounded-lg">
                    <h5 className="mb-2">🎯 Mốc đáng nhớ cần ghi:</h5>
                    <ul className="text-sm space-y-1 list-disc list-inside">
                      <li>Lần đầu biết cười</li>
                      <li>Lần đầu biết lật</li>
                      <li>Lần đầu ngồi vững</li>
                      <li>Lần đầu bò</li>
                      <li>Lần đầu đứng vững</li>
                      <li>Lần đầu tự đi</li>
                      <li>Mọc răng đầu tiên</li>
                      <li>Nói từ đầu tiên</li>
                    </ul>
                  </div>

                  <div className="p-3 bg-purple-50 rounded-lg">
                    <h5 className="mb-2">📊 Báo cáo tự động:</h5>
                    <p className="text-sm mb-2">Ứng dụng sẽ tự động tổng hợp:</p>
                    <ul className="text-xs space-y-1 list-disc list-inside">
                      <li>Biểu đồ cân nặng - chiều cao theo tuần/tháng</li>
                      <li>Lịch sử tiêm chủng</li>
                      <li>Mốc phát triển đã đạt được</li>
                      <li>Xuất file PDF/CSV để gửi bác sĩ</li>
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
