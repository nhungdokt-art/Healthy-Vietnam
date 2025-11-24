import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Target, TrendingDown, TrendingUp, Minus, Utensils, Dumbbell } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function WeightPlan() {
  const [data, setData] = useState({
    age: '',
    gender: 'male',
    height: '',
    weight: '',
    targetWeight: '',
    activityLevel: 'sedentary',
    goal: 'lose'
  });

  const [plan, setPlan] = useState<any>(null);

  const activityLevels = {
    sedentary: { name: 'Ít vận động', multiplier: 1.2 },
    light: { name: 'Vận động nhẹ (1-3 ngày/tuần)', multiplier: 1.375 },
    moderate: { name: 'Vận động vừa (3-5 ngày/tuần)', multiplier: 1.55 },
    active: { name: 'Vận động nhiều (6-7 ngày/tuần)', multiplier: 1.725 },
    veryActive: { name: 'Vận động rất nhiều', multiplier: 1.9 }
  };

  const calculatePlan = () => {
    if (!data.height || !data.weight || !data.targetWeight || !data.age) {
      toast.error('Vui lòng nhập đầy đủ thông tin!');
      return;
    }

    const height = parseFloat(data.height);
    const weight = parseFloat(data.weight);
    const targetWeight = parseFloat(data.targetWeight);
    const age = parseFloat(data.age);

    // Calculate BMR using Mifflin-St Jeor
    let BMR;
    if (data.gender === 'male') {
      BMR = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      BMR = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    // Calculate TDEE
    const TDEE = BMR * activityLevels[data.activityLevel as keyof typeof activityLevels].multiplier;

    // Calculate calorie target
    let calorieTarget;
    if (data.goal === 'lose') {
      calorieTarget = TDEE - 500; // Lose ~0.5kg/week
    } else if (data.goal === 'gain') {
      calorieTarget = TDEE + 300; // Gain ~0.3kg/week
    } else {
      calorieTarget = TDEE; // Maintain
    }

    // Macro distribution
    const proteinCalories = calorieTarget * 0.3;
    const fatCalories = calorieTarget * 0.25;
    const carbCalories = calorieTarget * 0.45;

    const proteinGrams = proteinCalories / 4;
    const fatGrams = fatCalories / 9;
    const carbGrams = carbCalories / 4;

    // Estimate timeline
    const weightDiff = Math.abs(targetWeight - weight);
    const weeksNeeded = data.goal === 'lose' 
      ? Math.ceil(weightDiff / 0.5)
      : Math.ceil(weightDiff / 0.3);

    setPlan({
      BMR: Math.round(BMR),
      TDEE: Math.round(TDEE),
      calorieTarget: Math.round(calorieTarget),
      protein: Math.round(proteinGrams),
      fat: Math.round(fatGrams),
      carbs: Math.round(carbGrams),
      weeksNeeded,
      weightDiff
    });

    toast.success('Đã tạo kế hoạch cân nặng!');
  };

  const workoutPlan = {
    lose: [
      { day: 'Thứ 2', activity: 'Cardio 30 phút + Tập tạ toàn thân' },
      { day: 'Thứ 3', activity: 'HIIT 20 phút + Yoga' },
      { day: 'Thứ 4', activity: 'Chạy bộ 40 phút' },
      { day: 'Thứ 5', activity: 'Tập tạ thượng + Cardio nhẹ' },
      { day: 'Thứ 6', activity: 'Bơi lội hoặc đạp xe 45 phút' },
      { day: 'Thứ 7', activity: 'Tập tạ hạ + Cardio nhẹ' },
      { day: 'Chủ nhật', activity: 'Nghỉ ngơi hoặc đi bộ nhẹ' }
    ],
    gain: [
      { day: 'Thứ 2', activity: 'Tập tạ ngực + vai' },
      { day: 'Thứ 3', activity: 'Tập tạ lưng + tay sau' },
      { day: 'Thứ 4', activity: 'Nghỉ hoặc cardio nhẹ' },
      { day: 'Thứ 5', activity: 'Tập tạ chân' },
      { day: 'Thứ 6', activity: 'Tập tạ tay trước + bụng' },
      { day: 'Thứ 7', activity: 'Tập tạ toàn thân nhẹ' },
      { day: 'Chủ nhật', activity: 'Nghỉ ngơi phục hồi' }
    ],
    maintain: [
      { day: 'Thứ 2', activity: 'Tập tạ toàn thân' },
      { day: 'Thứ 3', activity: 'Cardio 30 phút' },
      { day: 'Thứ 4', activity: 'Nghỉ ngơi' },
      { day: 'Thứ 5', activity: 'Tập tạ toàn thân' },
      { day: 'Thứ 6', activity: 'Cardio hoặc yoga' },
      { day: 'Thứ 7', activity: 'Hoạt động ngoài trời' },
      { day: 'Chủ nhật', activity: 'Nghỉ ngơi' }
    ]
  };

  const mealPlan = {
    lose: {
      breakfast: 'Yến mạch + trứng luộc + cam',
      lunch: 'Cơm gạo lứt + thịt gà + rau xanh',
      dinner: 'Cá hấp + salad rau trộn',
      snack: 'Táo hoặc sữa chua không đường'
    },
    gain: {
      breakfast: 'Bánh mì + trứng + bơ đậu phộng + chuối',
      lunch: 'Cơm trắng + thịt bò + rau + dầu ô liu',
      dinner: 'Cơm + cá hồi + khoai lang + rau',
      snack: 'Hạt dinh dưỡng, sữa, protein shake'
    },
    maintain: {
      breakfast: 'Phở/cơm tấm + trứng',
      lunch: 'Cơm + thịt/cá + rau củ',
      dinner: 'Cơm nhẹ + protein + rau',
      snack: 'Trái cây hoặc sữa chua'
    }
  };

  const goalIcons = {
    lose: <TrendingDown className="w-6 h-6" />,
    gain: <TrendingUp className="w-6 h-6" />,
    maintain: <Minus className="w-6 h-6" />
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-4 border-indigo-200">
        <CardHeader className="bg-gradient-to-r from-indigo-400 to-purple-400 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <Target className="w-6 h-6" />
            Kế Hoạch Cân Nặng Cá Nhân Hóa
          </CardTitle>
          <CardDescription className="text-indigo-100">
            Tính toán TDEE, BMR, phân bổ macro dinh dưỡng chi tiết
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Tuổi</Label>
              <Input
                type="number"
                value={data.age}
                onChange={(e) => setData({ ...data, age: e.target.value })}
                placeholder="Tuổi"
                className="border-2 border-indigo-200"
              />
            </div>
            <div>
              <Label>Giới tính</Label>
              <Select value={data.gender} onValueChange={(value) => setData({ ...data, gender: value })}>
                <SelectTrigger className="border-2 border-indigo-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Nam</SelectItem>
                  <SelectItem value="female">Nữ</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Chiều cao (cm)</Label>
              <Input
                type="number"
                value={data.height}
                onChange={(e) => setData({ ...data, height: e.target.value })}
                placeholder="Chiều cao"
                className="border-2 border-indigo-200"
              />
            </div>
            <div>
              <Label>Cân nặng hiện tại (kg)</Label>
              <Input
                type="number"
                value={data.weight}
                onChange={(e) => setData({ ...data, weight: e.target.value })}
                placeholder="Cân nặng"
                className="border-2 border-indigo-200"
              />
            </div>
            <div>
              <Label>Cân nặng mục tiêu (kg)</Label>
              <Input
                type="number"
                value={data.targetWeight}
                onChange={(e) => setData({ ...data, targetWeight: e.target.value })}
                placeholder="Mục tiêu"
                className="border-2 border-indigo-200"
              />
            </div>
            <div>
              <Label>Mức độ vận động</Label>
              <Select value={data.activityLevel} onValueChange={(value) => setData({ ...data, activityLevel: value })}>
                <SelectTrigger className="border-2 border-indigo-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(activityLevels).map(([key, value]) => (
                    <SelectItem key={key} value={key}>{value.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label>Mục tiêu</Label>
            <div className="grid grid-cols-3 gap-3 mt-2">
              <Button
                variant={data.goal === 'lose' ? 'default' : 'outline'}
                className={data.goal === 'lose' ? 'bg-gradient-to-r from-blue-500 to-cyan-500' : ''}
                onClick={() => setData({ ...data, goal: 'lose' })}
              >
                <TrendingDown className="w-4 h-4 mr-2" />
                Giảm cân
              </Button>
              <Button
                variant={data.goal === 'maintain' ? 'default' : 'outline'}
                className={data.goal === 'maintain' ? 'bg-gradient-to-r from-green-500 to-emerald-500' : ''}
                onClick={() => setData({ ...data, goal: 'maintain' })}
              >
                <Minus className="w-4 h-4 mr-2" />
                Giữ cân
              </Button>
              <Button
                variant={data.goal === 'gain' ? 'default' : 'outline'}
                className={data.goal === 'gain' ? 'bg-gradient-to-r from-orange-500 to-red-500' : ''}
                onClick={() => setData({ ...data, goal: 'gain' })}
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Tăng cân
              </Button>
            </div>
          </div>

          <Button
            onClick={calculatePlan}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
            size="lg"
          >
            Tạo kế hoạch
          </Button>
        </CardContent>
      </Card>

      {plan && (
        <>
          {/* Nutrition Plan */}
          <Card className="border-4 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
            <CardHeader className="bg-gradient-to-r from-green-400 to-emerald-400 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Utensils className="w-6 h-6" />
                Kế Hoạch Dinh Dưỡng
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-white rounded-lg border-2 border-blue-200 text-center">
                  <p className="text-sm text-gray-600">BMR</p>
                  <p className="text-2xl text-blue-600">{plan.BMR}</p>
                  <p className="text-xs text-gray-500">kcal/ngày</p>
                </div>
                <div className="p-4 bg-white rounded-lg border-2 border-purple-200 text-center">
                  <p className="text-sm text-gray-600">TDEE</p>
                  <p className="text-2xl text-purple-600">{plan.TDEE}</p>
                  <p className="text-xs text-gray-500">kcal/ngày</p>
                </div>
                <div className="p-4 bg-white rounded-lg border-2 border-green-200 text-center">
                  <p className="text-sm text-gray-600">Mục tiêu</p>
                  <p className="text-2xl text-green-600">{plan.calorieTarget}</p>
                  <p className="text-xs text-gray-500">kcal/ngày</p>
                </div>
                <div className="p-4 bg-white rounded-lg border-2 border-orange-200 text-center">
                  <p className="text-sm text-gray-600">Thời gian</p>
                  <p className="text-2xl text-orange-600">{plan.weeksNeeded}</p>
                  <p className="text-xs text-gray-500">tuần</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-gradient-to-br from-red-50 to-pink-50 rounded-lg border-2 border-red-200">
                  <p className="text-sm text-gray-600">Protein</p>
                  <p className="text-3xl text-red-600">{plan.protein}g</p>
                  <p className="text-xs text-gray-500">30% calories</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg border-2 border-yellow-200">
                  <p className="text-sm text-gray-600">Fat</p>
                  <p className="text-3xl text-yellow-600">{plan.fat}g</p>
                  <p className="text-xs text-gray-500">25% calories</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border-2 border-blue-200">
                  <p className="text-sm text-gray-600">Carbs</p>
                  <p className="text-3xl text-blue-600">{plan.carbs}g</p>
                  <p className="text-xs text-gray-500">45% calories</p>
                </div>
              </div>

              <div className="p-4 bg-white rounded-lg border-2 border-green-200">
                <h4 className="mb-3">Thực đơn mẫu ({data.goal === 'lose' ? 'Giảm cân' : data.goal === 'gain' ? 'Tăng cân' : 'Giữ cân'}):</h4>
                <div className="space-y-2">
                  <p><strong>🌅 Sáng:</strong> {mealPlan[data.goal as keyof typeof mealPlan].breakfast}</p>
                  <p><strong>☀️ Trưa:</strong> {mealPlan[data.goal as keyof typeof mealPlan].lunch}</p>
                  <p><strong>🌙 Tối:</strong> {mealPlan[data.goal as keyof typeof mealPlan].dinner}</p>
                  <p><strong>🍎 Snack:</strong> {mealPlan[data.goal as keyof typeof mealPlan].snack}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Workout Plan */}
          <Card className="border-4 border-orange-200 bg-gradient-to-br from-orange-50 to-red-50">
            <CardHeader className="bg-gradient-to-r from-orange-400 to-red-400 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Dumbbell className="w-6 h-6" />
                Lịch Tập Luyện 7 Ngày
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-3">
              {workoutPlan[data.goal as keyof typeof workoutPlan].map((workout, index) => (
                <div key={index} className="p-4 bg-white rounded-lg border-2 border-orange-200 flex justify-between items-center">
                  <span className="text-orange-600">{workout.day}</span>
                  <span className="text-gray-700">{workout.activity}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
