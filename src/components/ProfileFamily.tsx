import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { toast } from 'sonner';
import { User, Users, TrendingUp } from 'lucide-react';

interface FamilyMember {
  relation: string;
  name: string;
  age: string;
  height: string;
  weight: string;
  bust: string;
  waist: string;
  hip: string;
  medicalHistory: string;
  bloodType: string;
}

export function ProfileFamily() {
  const currentUser = { id: localStorage.getItem('healthyVN_currentUser') || 'default' };
  const [profileData, setProfileData] = useState<FamilyMember>({
    relation: 'Bản thân',
    name: '',
    age: '',
    height: '',
    weight: '',
    bust: '',
    waist: '',
    hip: '',
    medicalHistory: '',
    bloodType: 'A'
  });

  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [noSiblings, setNoSiblings] = useState(false);
  const [selectedMember, setSelectedMember] = useState<string>('self');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [region, setRegion] = useState<'urban' | 'mountain'>('urban');

  const handleSaveProfile = () => {
    const key = `profile_${currentUser?.id}_${selectedMember}`;
    localStorage.setItem(key, JSON.stringify(profileData));
    toast.success('Đã lưu hồ sơ thành công!');
  };

  const calculateBMI = () => {
    const height = parseFloat(profileData.height) / 100;
    const weight = parseFloat(profileData.weight);
    if (height && weight) {
      const bmi = weight / (height * height);
      return bmi.toFixed(1);
    }
    return null;
  };

  const evaluateBody = () => {
    const bust = parseFloat(profileData.bust);
    const waist = parseFloat(profileData.waist);
    const hip = parseFloat(profileData.hip);

    if (bust && waist && hip) {
      const waistHipRatio = waist / hip;
      const bustWaistDiff = bust - waist;
      const hipWaistDiff = hip - waist;

      if (waistHipRatio < 0.7 && bustWaistDiff > 20 && hipWaistDiff > 25) {
        return { status: 'Tuyệt vời', color: 'text-green-600', advice: 'Số đo rất cân đối!' };
      } else if (waistHipRatio < 0.8) {
        return { status: 'Tốt', color: 'text-blue-600', advice: 'Số đo khá cân đối' };
      } else if (waistHipRatio < 0.85) {
        return { status: 'Trung bình', color: 'text-yellow-600', advice: 'Nên tập luyện thêm' };
      } else {
        return { status: 'Cần cải thiện', color: 'text-red-600', advice: 'Nên có chế độ tập luyện và ăn uống' };
      }
    }
    return null;
  };

  const predictChildBloodType = () => {
    const fatherBlood = localStorage.getItem(`profile_${currentUser?.id}_father`)
      ? JSON.parse(localStorage.getItem(`profile_${currentUser?.id}_father`)!).bloodType
      : null;
    const motherBlood = localStorage.getItem(`profile_${currentUser?.id}_mother`)
      ? JSON.parse(localStorage.getItem(`profile_${currentUser?.id}_mother`)!).bloodType
      : null;

    if (fatherBlood && motherBlood) {
      const possible = [];
      if (fatherBlood === 'O' && motherBlood === 'O') possible.push('O');
      else if (fatherBlood === 'A' && motherBlood === 'A') possible.push('A', 'O');
      else if (fatherBlood === 'B' && motherBlood === 'B') possible.push('B', 'O');
      else if (fatherBlood === 'AB' || motherBlood === 'AB') possible.push('A', 'B', 'AB');
      else possible.push('A', 'B', 'O');
      
      return possible.join(', ');
    }
    return 'Chưa có dữ liệu cha mẹ';
  };

  const compareWithStandard = () => {
    const height = parseFloat(profileData.height);
    const weight = parseFloat(profileData.weight);
    
    if (!height || !weight) return null;

    // Chuẩn chiều cao
    const heightStandards = {
      urban: {
        male: { heightMin: 168, heightMax: 173 },
        female: { heightMin: 160, heightMax: 165 }
      },
      mountain: {
        male: { heightMin: 150, heightMax: 155 },
        female: { heightMin: 145, heightMax: 150 }
      }
    };

    const heightStd = heightStandards[region][gender];
    const avgHeight = (heightStd.heightMin + heightStd.heightMax) / 2;

    // So sánh chiều cao
    let heightStatus = '';
    let heightColor = '';
    if (height > avgHeight + 5) {
      heightStatus = 'Cao';
      heightColor = 'text-green-600';
    } else if (height < avgHeight - 5) {
      heightStatus = 'Lùn';
      heightColor = 'text-red-600';
    } else {
      heightStatus = 'Trung bình';
      heightColor = 'text-blue-600';
    }

    // Tính BMI
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);

    // Chuẩn BMI cho người Châu Á
    const bmiIdealMin = 18.5;
    const bmiIdealMax = 23;
    const bmiOverweight = 25;
    const bmiObese = 30;

    // Tính cân nặng lý tưởng dựa trên chiều cao thực tế của người dùng
    const idealWeightMin = bmiIdealMin * (heightInMeters * heightInMeters);
    const idealWeightMax = bmiIdealMax * (heightInMeters * heightInMeters);
    const idealWeightAvg = (idealWeightMin + idealWeightMax) / 2;

    // So sánh cân nặng dựa trên BMI
    let weightStatus = '';
    let weightColor = '';
    let weightAdvice = '';
    
    if (bmi < 16) {
      weightStatus = 'Gầy nghiêm trọng';
      weightColor = 'text-red-700';
      weightAdvice = 'Cần tăng cân ngay! Tư vấn bác sĩ dinh dưỡng.';
    } else if (bmi < 17) {
      weightStatus = 'Gầy mức độ vừa';
      weightColor = 'text-red-600';
      weightAdvice = 'Cần tăng cân. Ăn nhiều protein, carb, chất béo lành mạnh.';
    } else if (bmi < 18.5) {
      weightStatus = 'Gầy nhẹ';
      weightColor = 'text-orange-600';
      weightAdvice = 'Nên tăng thêm ít cân. Tăng calo 300-500 kcal/ngày.';
    } else if (bmi < 23) {
      weightStatus = 'Lý tưởng';
      weightColor = 'text-green-600';
      weightAdvice = 'Cân nặng hoàn hảo! Hãy duy trì lối sống hiện tại.';
    } else if (bmi < 25) {
      weightStatus = 'Hơi thừa cân';
      weightColor = 'text-yellow-600';
      weightAdvice = 'Nên giảm nhẹ. Tăng vận động, giảm 200-300 kcal/ngày.';
    } else if (bmi < 30) {
      weightStatus = 'Thừa cân';
      weightColor = 'text-orange-600';
      weightAdvice = 'Cần giảm cân. Giảm 500 kcal/ngày, tập 5-6 lần/tuần.';
    } else {
      weightStatus = 'Béo phì';
      weightColor = 'text-red-600';
      weightAdvice = 'Cần giảm cân nghiêm túc. Nên tư vấn bác sĩ & chuyên gia dinh dưỡng.';
    }

    return {
      height: heightStatus,
      heightColor,
      heightDiff: (height - avgHeight).toFixed(1),
      weight: weightStatus,
      weightColor,
      weightDiff: (weight - idealWeightAvg).toFixed(1),
      bmi: bmi.toFixed(1),
      idealWeightMin: idealWeightMin.toFixed(1),
      idealWeightMax: idealWeightMax.toFixed(1),
      weightAdvice,
      heightStandard: heightStd
    };
  };

  const bmi = calculateBMI();
  const bodyEval = evaluateBody();
  const comparison = compareWithStandard();

  return (
    <div className="space-y-6">
      <Card className="border-4 border-pink-200 shadow-xl bg-gradient-to-br from-white to-pink-50">
        <CardHeader className="bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <User className="w-6 h-6" />
            Hồ sơ & Gia đình
          </CardTitle>
          <CardDescription className="text-pink-100">
            Quản lý thông tin sức khỏe đa thế hệ
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 bg-pink-100">
              <TabsTrigger value="profile" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-500 data-[state=active]:text-white">
                👤 Nhập hồ sơ
              </TabsTrigger>
              <TabsTrigger value="compare" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white">
                📊 So sánh chuẩn VN
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-4">
          <div className="mb-6">
            <Label>Chọn thành viên</Label>
            <Select value={selectedMember} onValueChange={(value: string) => {
              setSelectedMember(value);
              const saved = localStorage.getItem(`profile_${currentUser?.id}_${value}`);
              if (saved) {
                setProfileData(JSON.parse(saved));
              } else {
                setProfileData({
                  relation: value === 'self' ? 'Bản thân' : value === 'father' ? 'Cha' : value === 'mother' ? 'Mẹ' : value === 'spouse' ? 'Vợ/Chồng' : 'Anh/Chị/Em',
                  name: '',
                  age: '',
                  height: '',
                  weight: '',
                  bust: '',
                  waist: '',
                  hip: '',
                  medicalHistory: '',
                  bloodType: 'A'
                });
              }
            }}>
              <SelectTrigger className="border-2 border-pink-300">
                <SelectValue placeholder="Chọn thành viên" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="self">👤 Bản thân</SelectItem>
                <SelectItem value="father">👨 Cha</SelectItem>
                <SelectItem value="mother">👩 Mẹ</SelectItem>
                <SelectItem value="spouse">💑 Vợ/Chồng</SelectItem>
                <SelectItem value="sibling">👫 Anh/Chị/Em</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {selectedMember === 'sibling' && (
            <div className="flex items-center space-x-2 mb-4 p-3 bg-yellow-50 rounded-lg border-2 border-yellow-200">
              <Checkbox 
                id="no-siblings" 
                checked={noSiblings}
                onCheckedChange={(checked: any) => setNoSiblings(checked as boolean)}
              />
              <label htmlFor="no-siblings" className="text-sm cursor-pointer">
                Tôi không có anh/chị/em
              </label>
            </div>
          )}

          {!(selectedMember === 'sibling' && noSiblings) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Họ và tên</Label>
                <Input
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  placeholder="Nhập họ và tên"
                  className="border-2 border-pink-200"
                />
              </div>

              <div className="space-y-2">
                <Label>Tuổi</Label>
                <Input
                  type="number"
                  value={profileData.age}
                  onChange={(e) => setProfileData({ ...profileData, age: e.target.value })}
                  placeholder="Tuổi"
                  className="border-2 border-pink-200"
                />
              </div>

              <div className="space-y-2">
                <Label>Chiều cao (cm)</Label>
                <Input
                  type="number"
                  value={profileData.height}
                  onChange={(e) => setProfileData({ ...profileData, height: e.target.value })}
                  placeholder="Chiều cao"
                  className="border-2 border-pink-200"
                />
              </div>

              <div className="space-y-2">
                <Label>Cân nặng (kg)</Label>
                <Input
                  type="number"
                  value={profileData.weight}
                  onChange={(e) => setProfileData({ ...profileData, weight: e.target.value })}
                  placeholder="Cân nặng"
                  className="border-2 border-pink-200"
                />
              </div>

              <div className="space-y-2">
                <Label>Vòng 1 (cm)</Label>
                <Input
                  type="number"
                  value={profileData.bust}
                  onChange={(e) => setProfileData({ ...profileData, bust: e.target.value })}
                  placeholder="Vòng 1"
                  className="border-2 border-pink-200"
                />
              </div>

              <div className="space-y-2">
                <Label>Vòng 2 (cm)</Label>
                <Input
                  type="number"
                  value={profileData.waist}
                  onChange={(e) => setProfileData({ ...profileData, waist: e.target.value })}
                  placeholder="Vòng 2"
                  className="border-2 border-pink-200"
                />
              </div>

              <div className="space-y-2">
                <Label>Vòng 3 (cm)</Label>
                <Input
                  type="number"
                  value={profileData.hip}
                  onChange={(e) => setProfileData({ ...profileData, hip: e.target.value })}
                  placeholder="Vòng 3"
                  className="border-2 border-pink-200"
                />
              </div>

              <div className="space-y-2">
                <Label>Nhóm máu</Label>
                <Select value={profileData.bloodType} onValueChange={(value: string) => setProfileData({ ...profileData, bloodType: value })}>
                  <SelectTrigger className="border-2 border-pink-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A">A</SelectItem>
                    <SelectItem value="B">B</SelectItem>
                    <SelectItem value="AB">AB</SelectItem>
                    <SelectItem value="O">O</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label>Tiền sử bệnh lý</Label>
                <Input
                  value={profileData.medicalHistory}
                  onChange={(e) => setProfileData({ ...profileData, medicalHistory: e.target.value })}
                  placeholder="Nhập tiền sử bệnh lý (nếu có)"
                  className="border-2 border-pink-200"
                />
              </div>
            </div>
          )}

          {bmi && (
            <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border-2 border-blue-200">
              <h3 className="mb-2">Chỉ số BMI</h3>
              <p className="text-3xl text-blue-600">{bmi}</p>
              <p className="text-sm text-gray-600 mt-1">
                {parseFloat(bmi) < 18.5 ? 'Thiếu cân' :
                 parseFloat(bmi) < 23 ? 'Bình thường' :
                 parseFloat(bmi) < 25 ? 'Thừa cân nhẹ' :
                 parseFloat(bmi) < 30 ? 'Thừa cân' : 'Béo phì'}
              </p>
            </div>
          )}

          {bodyEval && (
            <div className={`mt-4 p-4 rounded-lg border-2 ${bodyEval.color.includes('green') ? 'bg-green-50 border-green-200' : bodyEval.color.includes('blue') ? 'bg-blue-50 border-blue-200' : bodyEval.color.includes('yellow') ? 'bg-yellow-50 border-yellow-200' : 'bg-red-50 border-red-200'}`}>
              <h3 className="mb-2">Đánh giá số đo 3 vòng</h3>
              <p className={`text-2xl ${bodyEval.color}`}>{bodyEval.status}</p>
              <p className="text-sm text-gray-600 mt-1">{bodyEval.advice}</p>
            </div>
          )}

          <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border-2 border-purple-200">
            <h3 className="mb-2">🧬 Dự đoán nhóm máu con cái</h3>
            <p className="text-lg text-purple-600">{predictChildBloodType()}</p>
          </div>

          <Button onClick={handleSaveProfile} className="w-full mt-6 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
            Lưu hồ sơ
          </Button>
            </TabsContent>

            <TabsContent value="compare" className="space-y-4">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <Label>Giới tính</Label>
                  <Select value={gender} onValueChange={(value: 'male' | 'female') => setGender(value)}>
                    <SelectTrigger className="border-2 border-blue-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">👨 Nam</SelectItem>
                      <SelectItem value="female">👩 Nữ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Khu vực</Label>
                  <Select value={region} onValueChange={(value: 'urban' | 'mountain') => setRegion(value)}>
                    <SelectTrigger className="border-2 border-blue-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="urban">🏙️ Thành thị</SelectItem>
                      <SelectItem value="mountain">🏔️ Vùng núi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {comparison ? (
                <div className="space-y-4">
                  <div className="p-5 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border-2 border-blue-300">
                    <h3 className="mb-4 text-blue-700">📏 Kết quả so sánh với chuẩn Việt Nam</h3>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      {/* Chiều cao */}
                      <div className="p-4 bg-white rounded-lg border-2 border-blue-200">
                        <p className="text-sm text-gray-600 mb-2">Chiều cao của bạn:</p>
                        <p className="text-3xl mb-2">{profileData.height} cm</p>
                        <p className={`text-2xl mb-2 ${comparison.heightColor}`}>{comparison.height}</p>
                        <p className="text-sm text-gray-600">
                          {parseFloat(comparison.heightDiff) > 0 ? 'Cao hơn' : 'Thấp hơn'} chuẩn:{' '}
                          <strong>{Math.abs(parseFloat(comparison.heightDiff))} cm</strong>
                        </p>
                        <div className="mt-3 p-2 bg-blue-50 rounded text-xs">
                          <p>Chuẩn {region === 'urban' ? 'Thành thị' : 'Vùng núi'} VN: {comparison.heightStandard.heightMin}-{comparison.heightStandard.heightMax} cm</p>
                        </div>
                      </div>

                      {/* Cân nặng & BMI */}
                      <div className="p-4 bg-white rounded-lg border-2 border-green-200">
                        <p className="text-sm text-gray-600 mb-2">Cân nặng & BMI của bạn:</p>
                        <div className="flex items-baseline gap-3 mb-2">
                          <p className="text-3xl">{profileData.weight} kg</p>
                          <p className="text-xl text-purple-600">BMI: {comparison.bmi}</p>
                        </div>
                        <p className={`text-2xl mb-2 ${comparison.weightColor}`}>{comparison.weight}</p>
                        <p className="text-sm text-gray-600">
                          {parseFloat(comparison.weightDiff) > 0 ? 'Nặng hơn' : 'Nhẹ hơn'} lý tưởng:{' '}
                          <strong>{Math.abs(parseFloat(comparison.weightDiff))} kg</strong>
                        </p>
                        <div className="mt-3 p-2 bg-green-50 rounded text-xs">
                          <p>Cân nặng lý tưởng cho {profileData.height}cm:</p>
                          <p className="mt-1"><strong>{comparison.idealWeightMin}-{comparison.idealWeightMax} kg</strong></p>
                          <p className="text-gray-500 mt-1">(Dựa trên BMI 18.5-23)</p>
                        </div>
                      </div>
                    </div>

                    {/* Khuyến nghị */}
                    <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border-2 border-purple-200">
                      <h4 className="text-purple-700 mb-3">💡 Khuyến nghị cá nhân hóa:</h4>
                      
                      {/* Khuyến nghị chiều cao */}
                      <div className="mb-3 p-3 bg-white rounded-lg">
                        <p className="text-sm mb-1">🎯 <strong>Về chiều cao:</strong></p>
                        {comparison.height === 'Lùn' && (
                          <>
                            <p className="text-sm text-gray-700">• Tập kéo giãn, bơi lội, bóng rổ/bóng chuyền để tối ưu chiều cao (nếu dưới 20 tuổi). Bổ sung canxi, vitamin D.</p>
                            <p className="text-xs text-gray-500 mt-1">* Từ 20-25 tuổi chỉ tăng 1-2cm, sau 25 tuổi không tăng nữa</p>
                          </>
                        )}
                        {comparison.height === 'Cao' && (
                          <p className="text-sm text-green-700">• ✅ Chiều cao tốt hơn chuẩn VN. Duy trì dinh dưỡng cân đối.</p>
                        )}
                        {comparison.height === 'Trung bình' && (
                          <>
                            <p className="text-sm text-blue-700">• ✅ Chiều cao trong chuẩn VN. Có thể tối ưu thêm nếu dưới 20 tuổi.</p>
                            <p className="text-xs text-gray-500 mt-1">* Từ 20-25 tuổi chỉ tăng 1-2cm, sau 25 tuổi không tăng nữa</p>
                          </>
                        )}
                      </div>

                      {/* Khuyến nghị cân nặng dựa trên BMI */}
                      <div className="p-3 bg-white rounded-lg">
                        <p className="text-sm mb-1">⚖️ <strong>Về cân nặng (BMI: {comparison.bmi}):</strong></p>
                        <p className={`text-sm ${comparison.weightColor}`}>• {comparison.weightAdvice}</p>
                        
                        {parseFloat(comparison.bmi) < 18.5 && (
                          <div className="mt-2 text-xs text-gray-600">
                            <p>📋 Lời khuyên tăng cân:</p>
                            <p>- Ăn 5-6 bữa nhỏ/ngày thay vì 3 bữa lớn</p>
                            <p>- Uống sữa, smoothie, nước ép trái cây giữa các bữa</p>
                            <p>- Ăn nhiều: gạo lứt, yến mạch, thịt, cá, trứng, hạt</p>
                            <p>- Tập gym để tăng cơ, không chỉ tăng mỡ</p>
                          </div>
                        )}
                        
                        {parseFloat(comparison.bmi) >= 25 && (
                          <div className="mt-2 text-xs text-gray-600">
                            <p>📋 Lời khuyên giảm cân:</p>
                            <p>- Giảm tinh bột trắng (cơm, bánh mì), tăng rau xanh</p>
                            <p>- Hạn chế đồ chiên, rán, đồ ngọt, nước có ga</p>
                            <p>- Cardio 30-45 phút/ngày (chạy, bơi, đạp xe)</p>
                            <p>- Uống 2-3L nước/ngày, ăn tối trước 7h tối</p>
                          </div>
                        )}
                      </div>

                      <div className="mt-3 p-2 bg-blue-50 rounded text-xs text-gray-600">
                        <p>🌟 Chung: Ngủ đủ 7-8h/đêm • Vận động 30-60 phút/ngày • Uống đủ nước 2-2.5L/ngày</p>
                      </div>
                    </div>

                    {/* Biểu đồ so sánh */}
                    <div className="mt-4 p-4 bg-white rounded-lg border-2 border-gray-200">
                      <h4 className="mb-3">📊 Vị trí của bạn so với chuẩn</h4>
                      <div className="space-y-4">
                        {/* Biểu đồ chiều cao */}
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Thấp</span>
                            <span>Trung bình</span>
                            <span>Cao</span>
                          </div>
                          <div className="h-8 bg-gradient-to-r from-red-200 via-blue-200 to-green-200 rounded-full relative">
                            <div 
                              className="absolute top-0 w-4 h-8 bg-blue-600 rounded-full border-2 border-white shadow-lg"
                              style={{ 
                                left: `${Math.max(0, Math.min(100, ((parseFloat(profileData.height) - (comparison.heightStandard.heightMin - 10)) / 30) * 100))}%`,
                                transform: 'translateX(-50%)'
                              }}
                            />
                          </div>
                          <p className="text-xs text-center mt-1 text-gray-600">Chiều cao: {profileData.height} cm</p>
                        </div>

                        {/* Biểu đồ BMI */}
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Gầy</span>
                            <span>Lý tưởng</span>
                            <span>Thừa cân</span>
                            <span>Béo phì</span>
                          </div>
                          <div className="h-8 bg-gradient-to-r from-red-200 via-green-200 via-yellow-200 to-red-300 rounded-full relative">
                            <div 
                              className="absolute top-0 w-4 h-8 bg-purple-600 rounded-full border-2 border-white shadow-lg"
                              style={{ 
                                left: `${Math.max(0, Math.min(100, ((parseFloat(comparison.bmi) - 16) / 19) * 100))}%`,
                                transform: 'translateX(-50%)'
                              }}
                            />
                          </div>
                          <div className="flex justify-between text-xs mt-1 text-gray-500">
                            <span>16</span>
                            <span>18.5</span>
                            <span>23</span>
                            <span>25</span>
                            <span>30</span>
                            <span>35</span>
                          </div>
                          <p className="text-xs text-center mt-1 text-gray-600">BMI của bạn: {comparison.bmi}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-8 bg-yellow-50 rounded-lg border-2 border-yellow-300 text-center">
                  <p className="text-yellow-800">⚠️ Vui lòng nhập chiều cao và cân nặng ở tab "Nhập hồ sơ" trước</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card className="border-4 border-blue-200 shadow-xl bg-gradient-to-br from-white to-blue-50">
        <CardHeader className="bg-gradient-to-r from-blue-400 to-cyan-400 text-white rounded-t-lg">
          <CardTitle>📊 Chuẩn sức khỏe Việt Nam</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border-2 border-blue-200">
              <h4 className="text-blue-700 mb-3">🏙️ Chuẩn Thành Thị Việt Nam</h4>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="bg-white p-3 rounded border border-blue-200">
                  <p className="mb-1"><strong>👨 Nam giới:</strong></p>
                  <p className="text-sm">Chiều cao: ~ 1m68-1m73</p>
                  <p className="text-sm">Cân nặng: 58-68kg</p>
                </div>
                <div className="bg-white p-3 rounded border border-pink-200">
                  <p className="mb-1"><strong>👩 Nữ giới:</strong></p>
                  <p className="text-sm">Chiều cao: ~ 1m60-1m65</p>
                  <p className="text-sm">Cân nặng: 50-58kg</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border-2 border-green-200">
              <h4 className="text-green-700 mb-3">🏔️ Chuẩn Vùng Núi Việt Nam</h4>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="bg-white p-3 rounded border border-green-200">
                  <p className="mb-1"><strong>👨 Nam giới:</strong></p>
                  <p className="text-sm">Chiều cao: ~ 1m50-1m55</p>
                  <p className="text-sm">Cân nặng: 45-53kg</p>
                </div>
                <div className="bg-white p-3 rounded border border-green-200">
                  <p className="mb-1"><strong>👩 Nữ giới:</strong></p>
                  <p className="text-sm">Chiều cao: ~ 1m45-1m50</p>
                  <p className="text-sm">Cân nặng: 40-48kg</p>
                </div>
              </div>
              <p className="text-xs text-gray-600 mt-3">
                💡 Do điều kiện địa lý (thiếu oxy ở độ cao), dinh dưỡng và yếu tố di truyền
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
