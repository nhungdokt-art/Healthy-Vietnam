import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Baby, Calendar, Heart } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function Pregnancy() {
  const [lastPeriod, setLastPeriod] = useState('');
  const [dueDate, setDueDate] = useState('');

  const calculateDueDate = () => {
    if (!lastPeriod) {
      toast.error('Vui lòng nhập ngày đầu kỳ kinh cuối');
      return;
    }

    const date = new Date(lastPeriod);
    date.setDate(date.getDate() + 280); // 40 weeks = 280 days
    
    setDueDate(date.toLocaleDateString('vi-VN'));
    toast.success('Đã tính ngày dự sinh!');
  };

  const trimesterCare = [
    {
      name: 'Tam cá nguyệt đầu (0-13 tuần)',
      icon: '🌱',
      care: [
        'Bổ sung acid folic (400-800 mcg/ngày)',
        'Tránh rượu, thuốc lá, caffeine',
        'Ăn nhiều bữa nhỏ để giảm nghén',
        'Khám thai định kỳ',
        'Nghỉ ngơi đầy đủ'
      ],
      nutrition: ['Rau xanh', 'Trái cây', 'Ngũ cốc', 'Thịt nạc', 'Trứng', 'Sữa'],
      warning: 'Giai đoạn quan trọng nhất, tránh va chạm mạnh'
    },
    {
      name: 'Tam cá nguyệt giữa (14-27 tuần)',
      icon: '🌿',
      care: [
        'Tăng cường canxi (1000 mg/ngày)',
        'Tập thể dục nhẹ nhàng',
        'Kiểm soát cân nặng',
        'Siêu âm thai nhi',
        'Mặc quần áo thoải mái'
      ],
      nutrition: ['Cá hồi', 'Sữa', 'Phô mai', 'Đậu phụ', 'Hạnh nhân', 'Rau bina'],
      warning: 'Giai đoạn thoải mái nhất, nhưng vẫn cẩn thận'
    },
    {
      name: 'Tam cá nguyệt cuối (28-40 tuần)',
      icon: '🌳',
      care: [
        'Chuẩn bị đồ dùng cho em bé',
        'Học lớp tiền sản',
        'Theo dõi cử động thai',
        'Tránh nằm ngửa lâu',
        'Chuẩn bị tâm lý sinh nở'
      ],
      nutrition: ['Thực phẩm giàu sắt', 'Nước', 'Chất xơ', 'Protein', 'DHA'],
      warning: 'Gần ngày sinh, đến bệnh viện khi có dấu hiệu chuyển dạ'
    },
    {
      name: 'Hậu sản (sau sinh)',
      icon: '💐',
      care: [
        'Nghỉ ngơi đầy đủ',
        'Ăn uống bổ dưỡng',
        'Vệ sinh sạch sẽ',
        'Cho con bú sớm',
        'Khám lại sau 6 tuần'
      ],
      nutrition: ['Súp gà', 'Cá', 'Rau củ', 'Trái cây', 'Sữa', 'Nước ép'],
      warning: 'Chú ý dấu hiệu nhiễm trùng, băng huyết'
    }
  ];

  const weeklyDevelopment = [
    { week: '4-8', development: 'Thai nhi hình thành các cơ quan chính' },
    { week: '9-12', development: 'Thai nhi có thể nhấm nháp, ngón tay rõ ràng' },
    { week: '13-16', development: 'Có thể biết giới tính, thai nhi nghe được âm thanh' },
    { week: '17-20', development: 'Mẹ cảm nhận được thai động' },
    { week: '21-24', development: 'Thai nhi phát triển phổi, trọng lượng tăng nhanh' },
    { week: '25-28', development: 'Mắt mở ra, não phát triển nhanh' },
    { week: '29-32', development: 'Thai nhi có thể điều hòa nhiệt độ cơ thể' },
    { week: '33-36', development: 'Xương cứng hơn, trọng lượng tiếp tục tăng' },
    { week: '37-40', development: 'Thai nhi đủ tháng, sẵn sàng chào đời' },
  ];

  return (
    <div className="space-y-6">
      <Card className="border-4 border-teal-200 shadow-xl bg-gradient-to-br from-white to-teal-50">
        <CardHeader className="bg-gradient-to-r from-teal-400 to-green-400 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <Baby className="w-6 h-6" />
            Thai kỳ
          </CardTitle>
          <CardDescription className="text-teal-100">
            Chăm sóc toàn diện từ mang thai đến hậu sản
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="p-6 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl border-2 border-pink-200 mb-6">
            <h3 className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5" />
              Tính ngày dự sinh
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Ngày đầu kỳ kinh cuối</Label>
                <Input
                  type="date"
                  value={lastPeriod}
                  onChange={(e) => setLastPeriod(e.target.value)}
                  className="border-2 border-pink-300"
                />
              </div>
              <div className="flex items-end">
                <Button 
                  onClick={calculateDueDate}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                >
                  Tính toán
                </Button>
              </div>
            </div>
            {dueDate && (
              <div className="mt-4 p-4 bg-white rounded-lg border-2 border-pink-300">
                <p className="text-sm text-gray-600">Ngày dự sinh</p>
                <p className="text-3xl text-pink-600">{dueDate}</p>
              </div>
            )}
          </div>

          <Tabs defaultValue="trimester1" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto gap-2">
              {trimesterCare.map((trimester, index) => (
                <TabsTrigger key={index} value={`trimester${index + 1}`} className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-green-500 data-[state=active]:text-white flex flex-col p-3">
                  <span className="text-2xl mb-1">{trimester.icon}</span>
                  <span className="text-xs text-center">{trimester.name.split('(')[0]}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {trimesterCare.map((trimester, index) => (
              <TabsContent key={index} value={`trimester${index + 1}`} className="mt-4">
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-teal-50 to-green-50 rounded-lg border-2 border-teal-200">
                    <h4 className="mb-3 flex items-center gap-2">
                      <Heart className="w-5 h-5 text-teal-600" />
                      Chăm sóc
                    </h4>
                    <ul className="space-y-2">
                      {trimester.care.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <span className="text-teal-600 mt-0.5">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg border-2 border-orange-200">
                    <h4 className="mb-3">🍽️ Dinh dưỡng</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {trimester.nutrition.map((food, idx) => (
                        <div key={idx} className="p-2 bg-white rounded border text-center text-sm">
                          {food}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-red-50 rounded-lg border-2 border-red-200">
                    <h4 className="mb-2 text-red-800">⚠️ Lưu ý</h4>
                    <p className="text-sm text-gray-700">{trimester.warning}</p>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      <Card className="border-4 border-green-200 shadow-xl bg-gradient-to-br from-white to-green-50">
        <CardHeader className="bg-gradient-to-r from-green-400 to-lime-400 text-white rounded-t-lg">
          <CardTitle>📈 Phát triển thai nhi theo tuần</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-3">
            {weeklyDevelopment.map((item, index) => (
              <div key={index} className="p-4 bg-gradient-to-r from-green-50 to-lime-50 rounded-lg border-2 border-green-200 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-lime-400 flex items-center justify-center text-white flex-shrink-0">
                    {item.week}
                  </div>
                  <div className="flex-1">
                    <h4 className="mb-1">Tuần {item.week}</h4>
                    <p className="text-sm text-gray-600">{item.development}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
