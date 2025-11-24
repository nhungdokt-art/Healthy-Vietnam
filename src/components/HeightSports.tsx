import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Ruler, TrendingUp, Dumbbell } from 'lucide-react';
import { Checkbox } from './ui/checkbox';
import { toast } from 'sonner';

const sportsData = [
  // Tăng chiều cao (10 môn)
  { name: 'Bóng rổ', category: 'Tăng chiều cao', icon: '🏀' },
  { name: 'Bóng chuyền', category: 'Tăng chiều cao', icon: '🏐' },
  { name: 'Bơi lội', category: 'Tăng chiều cao', icon: '🏊' },
  { name: 'Cầu lông', category: 'Tăng chiều cao', icon: '🏸' },
  { name: 'Nhảy dây', category: 'Tăng chiều cao', icon: '🪢' },
  { name: 'Yoga', category: 'Tăng chiều cao', icon: '🧘' },
  { name: 'Đu xà đơn', category: 'Tăng chiều cao', icon: '🤸' },
  { name: 'Leo núi', category: 'Tăng chiều cao', icon: '🧗' },
  { name: 'Pilates', category: 'Tăng chiều cao', icon: '🤸‍♀️' },
  { name: 'Giãn cơ', category: 'Tăng chiều cao', icon: '🤸' },
  
  // Sức khỏe tổng thể (10 môn)
  { name: 'Chạy bộ', category: 'Sức khỏe tổng thể', icon: '🏃' },
  { name: 'Đạp xe', category: 'Sức khỏe tổng thể', icon: '🚴' },
  { name: 'Aerobic', category: 'Sức khỏe tổng thể', icon: '💃' },
  { name: 'Zumba', category: 'Sức khỏe tổng thể', icon: '💃' },
  { name: 'Bóng đá', category: 'Sức khỏe tổng thể', icon: '⚽' },
  { name: 'Tennis', category: 'Sức khỏe tổng thể', icon: '🎾' },
  { name: 'Bóng bàn', category: 'Sức khỏe tổng thể', icon: '🏓' },
  { name: 'Võ thuật', category: 'Sức khỏe tổng thể', icon: '🥋' },
  { name: 'Boxing', category: 'Sức khỏe tổng thể', icon: '🥊' },
  { name: 'Taekwondo', category: 'Sức khỏe tổng thể', icon: '🥋' },
  
  // Thể hình & Sức mạnh (4 môn)
  { name: 'Gym', category: 'Thể hình', icon: '🏋️' },
  { name: 'Crossfit', category: 'Thể hình', icon: '🏋️‍♀️' },
  { name: 'Calisthenics', category: 'Thể hình', icon: '💪' },
  { name: 'Weightlifting', category: 'Thể hình', icon: '🏋️' },
  
  // Thư giãn & Cân bằng (3 môn)
  { name: 'Thiền', category: 'Thư giãn', icon: '🧘‍♂️' },
  { name: 'Tai Chi', category: 'Thư giãn', icon: '🧘' },
  { name: 'Qigong', category: 'Thư giãn', icon: '🧘‍♀️' },
  
  // Dưới nước (4 môn)
  { name: 'Lặn', category: 'Dưới nước', icon: '🤿' },
  { name: 'Lướt sóng', category: 'Dưới nước', icon: '🏄' },
  { name: 'Kayak', category: 'Dưới nước', icon: '🚣' },
  { name: 'Water Polo', category: 'Dưới nước', icon: '🤽' },
  
  // Ngoài trời (4 môn)
  { name: 'Đi bộ đường dài', category: 'Ngoài trời', icon: '🥾' },
  { name: 'Cắm trại', category: 'Ngoài trời', icon: '⛺' },
  { name: 'Chèo thuyền', category: 'Ngoài trời', icon: '🚣' },
  { name: 'Leo núi thể thao', category: 'Ngoài trời', icon: '🧗‍♂️' },
  
  // Trượt (4 môn)
  { name: 'Trượt tuyết', category: 'Trượt', icon: '⛷️' },
  { name: 'Trượt băng', category: 'Trượt', icon: '⛸️' },
  { name: 'Trượt ván', category: 'Trượt', icon: '🛹' },
  { name: 'Trượt patin', category: 'Trượt', icon: '🛼' },
  
  // Các môn khác (11 môn)
  { name: 'Bắn cung', category: 'Kỹ năng', icon: '🏹' },
  { name: 'Golf', category: 'Kỹ năng', icon: '⛳' },
  { name: 'Đua xe đạp', category: 'Tốc độ', icon: '🚴‍♂️' },
  { name: 'Marathon', category: 'Sức bền', icon: '🏃‍♀️' },
  { name: 'Bơi sải', category: 'Kỹ thuật', icon: '🏊‍♂️' },
  { name: 'Bơi ếch', category: 'Kỹ thuật', icon: '🏊‍♀️' },
  { name: 'Bơi ngửa', category: 'Kỹ thuật', icon: '🏊' },
  { name: 'Bóng ném', category: 'Nhóm', icon: '🤾' },
  { name: 'Rugby', category: 'Nhóm', icon: '🏉' },
  { name: 'Cricket', category: 'Nhóm', icon: '🏏' },
  { name: 'Hockey', category: 'Nhóm', icon: '🏑' },
];

export function HeightSports() {
  // State cho input
  const [currentHeight, setCurrentHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [fatherHeight, setFatherHeight] = useState('');
  const [motherHeight, setMotherHeight] = useState('');
  
  // Nutrition scores (4 components)
  const [proteinScore, setProteinScore] = useState([5]);
  const [calciumScore, setCalciumScore] = useState([5]);
  const [vitaminDScore, setVitaminDScore] = useState([5]);
  const [zincScore, setZincScore] = useState([5]);
  
  // Sleep & Activity
  const [sleepHours, setSleepHours] = useState('8');
  const [bedtime, setBedtime] = useState('22:00');
  const [activityLevel, setActivityLevel] = useState('moderate');
  const [pubertiesYears, setPubertiesYears] = useState('');
  
  // Sports selection
  const [selectedSports, setSelectedSports] = useState<string[]>([]);
  
  // Results
  const [maxHeight, setMaxHeight] = useState<number | null>(null);
  const [heightAnalysis, setHeightAnalysis] = useState<string>('');
  const [effort200, setEffort200] = useState(false);
  const [predicted200Uncapped, setPredicted200Uncapped] = useState<number | null>(null);
  const [predicted200Capped, setPredicted200Capped] = useState<number | null>(null);

  const calculateMaxHeight = () => {
    if (!currentHeight || !age) {
      toast.error('Vui lòng nhập chiều cao hiện tại và tuổi!');
      return;
    }

    const H_current = parseFloat(currentHeight);
    const A = parseFloat(age);
    const W = weight ? parseFloat(weight) : 60;
    const pubYears = pubertiesYears ? parseFloat(pubertiesYears) : 0;
    
    // Tính chiều cao di truyền
    const H_father = fatherHeight ? parseFloat(fatherHeight) : 170;
    const H_mother = motherHeight ? parseFloat(motherHeight) : 160;
    let H_gen = (H_father + H_mother) / 2;
    if (gender === 'male') H_gen += 6.5;
    else H_gen -= 6.5;

    // ========== TÍNH TĂNG TRƯỞNG TỰ NHIÊN TỪ DẬY THI (20-30cm) ==========
    // Tăng trưởng từ dậy thì độc lập với lối sống (đó là cơ sở sinh học)
    let pubbertyGrowth = 0; // cm từ dậy thì
    
    if (pubYears < 0.5) {
      // Chưa dậy thì hoặc vừa bắt đầu: kỳ vọng 20-30cm tổng cộng
      pubbertyGrowth = gender === 'male' ? 25 : 22; // Nam 25cm, Nữ 22cm (trung bình)
    } else if (pubYears >= 0.5 && pubYears < 2) {
      // Đang dậy thì mạnh: còn lại ~15-20cm
      pubbertyGrowth = gender === 'male' ? 18 : 16;
    } else if (pubYears >= 2 && pubYears < 3.5) {
      // Cuối giai đoạn dậy thì mạnh: còn lại ~5-10cm
      pubbertyGrowth = gender === 'male' ? 8 : 6;
    } else if (pubYears >= 3.5 && pubYears < 5) {
      // Cuối cùng của dậy thì: còn ~2-3cm
      pubbertyGrowth = 2;
    } else {
      // Sau dậy thì (>5 năm): hầu như không tăng từ dậy thì nữa
      pubbertyGrowth = 0.2;
    }

    // Nếu tuổi ≥ 25: không tăng nữa
    if (A >= 25) {
      pubbertyGrowth = 0;
    }

    // ========== TÍNH BONUS TỪ LỐI SỐNG (TỐI ĐA +12cm) ==========
    // Dinh dưỡng (Max +5cm) - Trọng số 40%
    let nutritionBonus = 0;
    const proteinScore_val = proteinScore[0];
    const calciumScore_val = calciumScore[0];
    const vitaminDScore_val = vitaminDScore[0];
    const zincScore_val = zincScore[0];
    
    const avgNutrition = (proteinScore_val + calciumScore_val + vitaminDScore_val + zincScore_val) / 4;
    nutritionBonus = (avgNutrition / 10) * 5; // 0 đến +5cm
    
    // Giấc ngủ (Max +4cm) - Trọng số 30%
    let sleepBonus = 0;
    const sleepHourNum = parseFloat(sleepHours);
    const bedtimeHour = parseInt(bedtime.split(':')[0]);
    
    if (bedtimeHour <= 22 && sleepHourNum >= 9) {
      sleepBonus = 4; // Ngủ trước 22:00 + ≥9h = +4cm
    } else if (bedtimeHour <= 23 && sleepHourNum >= 8) {
      sleepBonus = 2.5; // Ngủ trước 23:00 + ≥8h = +2.5cm
    } else if (bedtimeHour >= 24 || sleepHourNum < 7) {
      sleepBonus = 0; // Ngủ muộn hay ngủ ít = 0cm
    } else {
      sleepBonus = 1; // Trung bình
    }
    
    // Vận động (Max +3cm) - Trọng số 20%
    let sportBonus = 0;
    const selectedSportCount = selectedSports.length;
    const heightBoostingSports = ['Bơi lội', 'Bóng rổ', 'Bóng chuyền', 'Nhảy dây', 'Yoga', 'Đu xà đơn', 'Leo núi', 'Pilates', 'Giãn cơ'];
    
    let boostingSportCount = 0;
    selectedSports.forEach(sport => {
      if (heightBoostingSports.includes(sport)) boostingSportCount++;
    });
    
    if (boostingSportCount >= 3) {
      sportBonus = 3; // +3cm
    } else if (boostingSportCount >= 1 || selectedSportCount >= 2) {
      sportBonus = 1.5; // +1.5cm
    } else if (selectedSportCount > 0) {
      sportBonus = 0.5; // +0.5cm
    } else {
      sportBonus = 0; // Không vận động
    }
    
    // BMI (Max +1cm, Min -2cm) - Trọng số 10%
    let bmiBonus = 0;
    const heightInMeters = H_current / 100;
    const BMI = W / (heightInMeters * heightInMeters);
    
    if (BMI >= 18.5 && BMI <= 23) {
      bmiBonus = 1; // Cân nặng chuẩn → +1cm
    } else if (BMI > 25) {
      bmiBonus = -2; // Béo phì → -2cm (Phạt)
    } else if (BMI < 18.5) {
      bmiBonus = 0.5; // Gầy → +0.5cm
    }
    
    // Nhân với trọng số từng yếu tố
    const weightedLifestyleBonus = 
      (nutritionBonus * 0.40) +
      (sleepBonus * 0.30) +
      (sportBonus * 0.20) +
      (bmiBonus * 0.10);

    // Hệ số thời gian: lifestyle tác động tốt nhất khi còn đang dậy thì (pubYears < 3)
    let K_Time = 1.0;
    if (pubYears <= 0) {
      K_Time = 1.0; // Chưa dậy thì: 100% tác động
    } else if (pubYears >= 1 && pubYears <= 3) {
      K_Time = 0.8; // Đang dậy thì mạnh: 80% tác động
    } else if (pubYears > 3) {
      K_Time = 0.3; // Cuối dậy thì: chỉ 30% tác động
    }
    
    const lifestyleBonusApplied = weightedLifestyleBonus * K_Time;

    // ========== TÍNH CHIỀU CAO DỰ ĐOÁN CUỐI CÙNG ==========
    let predictedHeight = 0;
    
    if (A >= 25) {
      predictedHeight = H_current;
    } else {
      // Tổng tăng: từ dậy thì + từ lối sống
      const totalGrowth = pubbertyGrowth + lifestyleBonusApplied;
      predictedHeight = H_current + totalGrowth;
      
      // KHÔNG cap theo H_gen — lifestyle tốt CÓ THỂ vượt ước tính gen
      // Nhưng hiển thị cả hai giá trị để người dùng so sánh
    }

    // ========== KỊ CHẾ NỖ LỰC 200% ==========
    // Giả định đạt +12cm tối đa từ lối sống
    const lifestyle200Bonus = 12 * K_Time;
    const predictedHeight200Uncapped = H_current + pubbertyGrowth + lifestyle200Bonus;
    const predictedHeight200Capped = Math.min(predictedHeight200Uncapped, H_gen);

    setMaxHeight(Math.round(predictedHeight * 10) / 10);
    setPredicted200Uncapped(Math.round(predictedHeight200Uncapped * 10) / 10);
    setPredicted200Capped(Math.round(predictedHeight200Capped * 10) / 10);

    // Phân tích
    const heightGain = Math.round((predictedHeight - H_current) * 10) / 10;
    let analysis = `📏 Chiều cao dự đoán: ${Math.round(predictedHeight * 10) / 10} cm\n`;
    analysis += `📈 Có thể tăng thêm: ${heightGain > 0 ? '+' : ''}${heightGain} cm\n\n`;
    
    if (A >= 25) {
      analysis += '⚠️ Tuổi 25+: Hầu như không tăng chiều cao nữa.\n';
    } else if (A >= 20) {
      analysis += '📌 Tuổi 20-25: Chỉ có thể tăng thêm 1-2cm nữa.\n';
    } else {
      analysis += '✅ Tuổi < 20: Vẫn có tiềm năng tăng trưởng.\n';
    }

    // Phân tích dậy thì
    if (pubYears > 0) {
      if (pubYears > 5) {
        analysis += '\n⚠️ Dậy thì sớm: Ít thời gian tăng trưởng. Hãy tập luyện ngay!\n';
      } else if (pubYears < 2) {
        analysis += '\n✅ Dậy thì muộn: Vẫn có tiềm năng cao. Tập luyện sẽ hiệu quả tốt.\n';
      } else {
        analysis += '\n📌 Dậy thì bình thường: Vẫn còn thời gian tăng trưởng.\n';
      }
    }

    // Phân tích chi tiết các yếu tố lối sống
    if (avgNutrition < 5) {
      analysis += '\n🍎 Cải thiện dinh dưỡng sẽ giúp tăng chiều cao.\n';
    } else if (avgNutrition >= 7) {
      analysis += '\n✅ Dinh dưỡng tốt! Đây là yếu tố quan trọng nhất (+40% tác động).\n';
    }

    if (sleepHourNum < 8) {
      analysis += '😴 Ngủ đủ 8-9 giờ mỗi đêm trước 22h rất quan trọng để tiết HGH.\n';
    } else {
      analysis += '✅ Giấc ngủ tốt! Điều này tối ưu 30% tác động của lối sống.\n';
    }

    if (selectedSports.length === 0) {
      analysis += '🏀 Tập thể thao kéo giãn (Bơi/Bóng rổ) ≥3 lần/tuần sẽ tối ưu chiều cao.\n';
    } else if (boostingSportCount >= 3) {
      analysis += '✅ Các môn thể thao bạn chọn tốt cho tăng chiều cao!\n';
    }

    analysis += `\n📊 O-HPM Analysis:\n`;
    analysis += `• Dinh dưỡng: ${nutritionBonus.toFixed(1)}cm (40% trọng số)\n`;
    analysis += `• Giấc ngủ: ${sleepBonus.toFixed(1)}cm (30% trọng số)\n`;
    analysis += `• Thể thao: ${sportBonus.toFixed(1)}cm (20% trọng số)\n`;
    analysis += `• BMI: ${bmiBonus > 0 ? '+' : ''}${bmiBonus.toFixed(1)}cm (10% trọng số)\n`;
    analysis += `• Hệ số thời gian: ${(K_Time * 100).toFixed(0)}%\n`;

    setHeightAnalysis(analysis);
    toast.success('Phân tích thành công!');
  };

  const toggleSport = (sport: string) => {
    if (selectedSports.includes(sport)) {
      setSelectedSports(selectedSports.filter(s => s !== sport));
    } else {
      setSelectedSports([...selectedSports, sport]);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-4 border-cyan-200 shadow-xl bg-gradient-to-br from-white to-cyan-50">
        <CardHeader className="bg-gradient-to-r from-cyan-500 to-green-500 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <Ruler className="w-6 h-6" />
            Dự Đoán Chiều Cao Tối Đa
          </CardTitle>
          <CardDescription className="text-cyan-100">
            Công thức 7 yếu tố: Di truyền, Tuổi, Dinh dưỡng, Giãn cơ, Giấc ngủ, Vận động, BMI & Dậy thì
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-6 space-y-6">
          <div className="mb-2 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <label className="flex items-center gap-2">
              <Checkbox checked={effort200} onCheckedChange={(v:any)=>setEffort200(!!v)} />
              <span className="text-sm font-medium">Bật chế độ <strong>"Nỗ lực 200%"</strong> (Mô phỏng kịch bản tối ưu)</span>
            </label>
            <p className="text-xs text-gray-600 mt-2">Khi bật, ứng dụng sẽ hiển thị kịch bản tối ưu giả định (+12cm từ lối sống) để bạn so sánh kế hoạch hiện tại và kịch bản tối đa. Lưu ý: Đây là mô phỏng tham khảo, không thay thế lời khuyên bác sĩ.</p>
          </div>
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Chiều cao hiện tại (cm) *</Label>
              <Input
                type="number"
                value={currentHeight}
                onChange={(e) => setCurrentHeight(e.target.value)}
                placeholder="VD: 170"
                className="border-2 border-cyan-300"
              />
            </div>
            <div>
              <Label>Cân nặng (kg)</Label>
              <Input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="VD: 60"
                className="border-2 border-cyan-300"
              />
            </div>
            <div>
              <Label>Tuổi *</Label>
              <Input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="VD: 16"
                className="border-2 border-cyan-300"
              />
            </div>
            <div>
              <Label>Giới tính</Label>
              <Select value={gender} onValueChange={(value: any) => setGender(value)}>
                <SelectTrigger className="border-2 border-cyan-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Nam</SelectItem>
                  <SelectItem value="female">Nữ</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Family Height */}
          <Card className="bg-white border-2 border-purple-200">
            <CardHeader>
              <CardTitle className="text-sm">👨‍👩‍👧 Di truyền gia đình</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div>
                <Label>Chiều cao cha (cm)</Label>
                <Input
                  type="number"
                  value={fatherHeight}
                  onChange={(e) => setFatherHeight(e.target.value)}
                  placeholder="VD: 175"
                  className="border-2 border-purple-200"
                />
              </div>
              <div>
                <Label>Chiều cao mẹ (cm)</Label>
                <Input
                  type="number"
                  value={motherHeight}
                  onChange={(e) => setMotherHeight(e.target.value)}
                  placeholder="VD: 160"
                  className="border-2 border-purple-200"
                />
              </div>
            </CardContent>
          </Card>

          {/* Puberty */}
          <Card className="bg-white border-2 border-red-200">
            <CardHeader>
              <CardTitle className="text-sm">👨 Dậy thì</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Label>Đã dậy thì (năm)</Label>
                <Input
                  type="number"
                  step="0.5"
                  value={pubertiesYears}
                  onChange={(e) => setPubertiesYears(e.target.value)}
                  placeholder="VD: 2 (2 năm trước)"
                  className="border-2 border-red-200"
                />
                <p className="text-xs text-gray-500 mt-1">Nhập số năm đã dậy thì (VD: 1.5 = 1 năm rưỡi)</p>
              </div>
            </CardContent>
          </Card>

          {/* Nutrition */}
          <Card className="bg-white border-2 border-green-200">
            <CardHeader>
              <CardTitle className="text-sm">🥗 Dinh dưỡng (4 thành phần)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Protein: {proteinScore[0]}/10</Label>
                <Slider
                  value={proteinScore}
                  onValueChange={setProteinScore}
                  min={0}
                  max={10}
                  step={1}
                  className="w-full"
                />
              </div>
              <div>
                <Label>Canxi: {calciumScore[0]}/10</Label>
                <Slider
                  value={calciumScore}
                  onValueChange={setCalciumScore}
                  min={0}
                  max={10}
                  step={1}
                  className="w-full"
                />
              </div>
              <div>
                <Label>Vitamin D: {vitaminDScore[0]}/10</Label>
                <Slider
                  value={vitaminDScore}
                  onValueChange={setVitaminDScore}
                  min={0}
                  max={10}
                  step={1}
                  className="w-full"
                />
              </div>
              <div>
                <Label>Kẽm: {zincScore[0]}/10</Label>
                <Slider
                  value={zincScore}
                  onValueChange={setZincScore}
                  min={0}
                  max={10}
                  step={1}
                  className="w-full"
                />
              </div>
            </CardContent>
          </Card>

          {/* Sleep & Activity */}
          <Card className="bg-white border-2 border-indigo-200">
            <CardHeader>
              <CardTitle className="text-sm">😴 Giấc ngủ & 💪 Vận động</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Giờ ngủ mỗi đêm</Label>
                <Input
                  type="number"
                  step="0.5"
                  value={sleepHours}
                  onChange={(e) => setSleepHours(e.target.value)}
                  placeholder="VD: 8"
                  className="border-2 border-indigo-200"
                />
              </div>
              <div>
                <Label>Thời gian ngủ (ưu tiên trước 22h)</Label>
                <Input
                  type="time"
                  value={bedtime}
                  onChange={(e) => setBedtime(e.target.value)}
                  className="border-2 border-indigo-200"
                />
              </div>
              <div>
                <Label>Mức độ vận động</Label>
                <Select value={activityLevel} onValueChange={setActivityLevel}>
                  <SelectTrigger className="border-2 border-indigo-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedentary">Ít động (dưới 3h/tuần)</SelectItem>
                    <SelectItem value="light">Nhẹ (3-5h/tuần)</SelectItem>
                    <SelectItem value="moderate">Trung bình (5-7h/tuần)</SelectItem>
                    <SelectItem value="active">Tích cực (7-10h/tuần)</SelectItem>
                    <SelectItem value="very-active">Rất tích cực (trên 10h/tuần)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Sports Selection */}
          <Card className="bg-white border-2 border-orange-200">
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Dumbbell className="w-5 h-5" />
                Lựa chọn môn thể thao
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {sportsData.map(sport => (
                  <Button
                    key={sport.name}
                    onClick={() => toggleSport(sport.name)}
                    variant={selectedSports.includes(sport.name) ? 'default' : 'outline'}
                    className={selectedSports.includes(sport.name) ? 'bg-orange-500 text-white' : 'border-orange-200'}
                    size="sm"
                  >
                    {sport.icon} {sport.name}
                  </Button>
                ))}
              </div>
              {selectedSports.length > 0 && (
                <div className="mt-4 p-3 bg-orange-50 rounded-lg">
                  <p className="text-sm text-gray-700">
                    ✓ Đã chọn <strong>{selectedSports.length}</strong> môn thể thao
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Button
            onClick={calculateMaxHeight}
            size="lg"
            className="w-full bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-white"
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Tính Chiều Cao Tối Đa
          </Button>
        </CardContent>
      </Card>

      {/* Results */}
      {maxHeight !== null && (
        <>
          <Card className="border-4 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
            <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-t-lg">
              <CardTitle>📊 Kết Quả Dự Đoán</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="text-center p-6 bg-white rounded-xl border-2 border-green-300">
                <div className="text-6xl text-green-600 font-bold mb-2">{maxHeight} cm</div>
                <p className="text-gray-700 mb-4">Chiều cao tối đa dự đoán</p>
                <div className="text-lg text-gray-600">
                  Tăng thêm: <span className="text-green-600 font-bold">+{(maxHeight - parseFloat(currentHeight || '0')).toFixed(1)} cm</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg border-2 border-blue-200 whitespace-pre-wrap text-sm text-gray-700">
                {heightAnalysis}
              </div>
            </CardContent>
          </Card>
          {/* 200% Effort simulation */}
          {effort200 && (
            <Card className="border-4 border-yellow-300 bg-gradient-to-br from-yellow-50 to-amber-50 mt-4">
              <CardHeader className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-t-lg">
                <CardTitle>🚀 Kịch bản Nỗ lực 200% (Mô phỏng tối ưu)</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="text-center p-6 bg-white rounded-xl border-2 border-yellow-300">
                  <div className="text-4xl text-yellow-700 font-bold mb-2">{(predicted200Uncapped ?? 0).toFixed(1)} cm</div>
                  <p className="text-gray-700 mb-2">Kịch bản tối ưu (không giới hạn theo ước tính di truyền)</p>
                  <div className="text-gray-600">Nếu giới hạn theo di truyền, giá trị tương đương: <strong className="text-yellow-700">{(predicted200Capped ?? 0).toFixed(1)} cm</strong></div>
                </div>

                <div className="mt-6 p-4 bg-white rounded-lg text-sm text-gray-700">
                  <p className="font-bold">Lịch mẫu 1 ngày "Nỗ lực 200%"</p>
                  <ol className="list-decimal list-inside mt-2">
                    <li>06:00 — Thức dậy, 1 cốc nước, nhảy dây 500 cái hoặc đu xà 5 phút.</li>
                    <li>06:30 — Bữa sáng giàu protein + 1 ly sữa.</li>
                    <li>09:30 — Bữa phụ: sữa chua/hạt.</li>
                    <li>17:00 — Tập chính 60 phút: bơi/nhảy/đu xà/bóng rổ (cường độ cao).</li>
                    <li>18:30 — Bữa tối: nhiều thịt/cá, rau xanh; hạn chế đường.</li>
                    <li>21:00 — Thả lỏng, tắt thiết bị; 21:30 lên giường; 22:00 ngủ sâu.</li>
                  </ol>
                  <p className="mt-2 text-xs text-gray-600">Ghi chú: Đây là mô phỏng tối ưu hóa lối sống; thực hiện lâu dài cần giám sát dinh dưỡng và y tế.</p>
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 to-amber-50">
            <CardHeader>
              <CardTitle className="text-lg">💡 Lời Khuyên Để Đạt Chiều Cao Tối Đa</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-white rounded-lg">
                <p className="font-bold text-sm mb-1">🥗 Dinh dưỡng:</p>
                <ul className="text-sm text-gray-700 list-disc list-inside">
                  <li>Bổ sung Protein, Canxi, Vitamin D, Kẽm</li>
                  <li>Uống sữa 2 lần/ngày</li>
                  <li>Ăn cá, trứng, rau xanh</li>
                </ul>
              </div>
              <div className="p-3 bg-white rounded-lg">
                <p className="font-bold text-sm mb-1">😴 Giấc ngủ:</p>
                <ul className="text-sm text-gray-700 list-disc list-inside">
                  <li>Ngủ 8-9 giờ mỗi đêm</li>
                  <li>Đi ngủ trước 22h</li>
                  <li>Phòng ngủ tối và mát mẻ</li>
                </ul>
              </div>
              <div className="p-3 bg-white rounded-lg">
                <p className="font-bold text-sm mb-1">🏀 Tập luyện:</p>
                <ul className="text-sm text-gray-700 list-disc list-inside">
                  <li>Bơi lội, bóng rổ, nhảy dây</li>
                  <li>Giãn cơ mỗi ngày 30 phút</li>
                  <li>Đu xà 10 phút/ngày</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </>

      )}
    </div>
  );
}
