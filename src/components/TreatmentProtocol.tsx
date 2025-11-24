import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { FileText, Search } from 'lucide-react';

export function TreatmentProtocol() {
  const [searchTerm, setSearchTerm] = useState('');

  const diseases = [
    // Hô hấp
    {
      name: 'Cảm cúm',
      shouldDo: ['Nghỉ ngơi đầy đủ', 'Uống nhiều nước', 'Dùng thuốc hạ sốt khi cần', 'Giữ ấm cơ thể'],
      shouldEat: ['Súp gà', 'Trái cây giàu vitamin C (cam, chanh)', 'Mật ong', 'Gừng', 'Cháo', 'Nước ép trái cây'],
      category: 'Hô hấp'
    },
    {
      name: 'Viêm họng',
      shouldDo: ['Súc miệng nước muối', 'Uống nhiều nước ấm', 'Tránh hút thuốc', 'Giữ ẩm không khí'],
      shouldEat: ['Mật ong', 'Trà gừng', 'Súp ấm', 'Sữa chua', 'Kem mềm', 'Nước chanh ấm'],
      category: 'Hô hấp'
    },
    {
      name: 'Viêm phổi',
      shouldDo: ['Nằm nghỉ tuyệt đối', 'Uống thuốc kháng sinh theo đơn', 'Theo dõi nhiệt độ', 'Khám bác sĩ ngay'],
      shouldEat: ['Súp dinh dưỡng', 'Nước ép', 'Trái cây tươi', 'Sữa chua', 'Mật ong', 'Gừng'],
      category: 'Hô hấp'
    },
    {
      name: 'Hen suyễn',
      shouldDo: ['Tránh dị nguyên', 'Mang thuốc xịt bên người', 'Tập thở', 'Theo dõi triệu chứng'],
      shouldEat: ['Cá hồi', 'Rau xanh', 'Hạt lanh', 'Trái cây họ berry', 'Trà xanh', 'Nghệ'],
      category: 'Hô hấp'
    },
    {
      name: 'Viêm xoang',
      shouldDo: ['Rửa mũi nước muối', 'Xông hơi', 'Uống nhiều nước', 'Nghỉ ngơi đầy đủ'],
      shouldEat: ['Súp nóng', 'Gừng', 'Tỏi', 'Ớt', 'Nước chanh', 'Mật ong'],
      category: 'Hô hấp'
    },
    
    // Tiêu hóa
    {
      name: 'Đau dạ dày',
      shouldDo: ['Ăn nhỏ nhiều bữa', 'Tránh stress', 'Không nằm ngay sau ăn', 'Khám bác sĩ nếu kéo dài'],
      shouldEat: ['Cháo loãng', 'Chuối chín', 'Sữa chua không đường', 'Khoai lang', 'Bí đỏ', 'Yến mạch'],
      category: 'Tiêu hóa'
    },
    {
      name: 'Táo bón',
      shouldDo: ['Uống nhiều nước', 'Vận động nhẹ nhàng', 'Đi vệ sinh đúng giờ', 'Tránh stress'],
      shouldEat: ['Rau xanh', 'Trái cây giàu chất xơ', 'Yến mạch', 'Khoai lang', 'Chuối chín', 'Nước ép dưa hấu'],
      category: 'Tiêu hóa'
    },
    {
      name: 'Tiêu chảy',
      shouldDo: ['Uống nước muối đường', 'Nghỉ ngơi', 'Ăn nhạt', 'Khám bác sĩ nếu kéo dài >3 ngày'],
      shouldEat: ['Cháo', 'Chuối', 'Bánh quy giòn', 'Táo nghiền', 'Nước dừa', 'Nước gạo'],
      category: 'Tiêu hóa'
    },
    {
      name: 'Trào ngược dạ dày',
      shouldDo: ['Nâng cao đầu giường', 'Ăn tối sớm 3h trước khi ngủ', 'Tránh quần áo bó sát', 'Giảm cân nếu thừa'],
      shouldEat: ['Yến mạch', 'Rau xanh', 'Chuối', 'Dưa chuột', 'Gừng', 'Khoai lang'],
      category: 'Tiêu hóa'
    },
    {
      name: 'Viêm đại tràng',
      shouldDo: ['Ăn nhẹ dễ tiêu', 'Uống đủ nước', 'Giảm stress', 'Theo dõi thực phẩm kích ứng'],
      shouldEat: ['Cháo', 'Cá hấp', 'Chuối chín', 'Khoai tây nghiền', 'Rau luộc', 'Nước súp'],
      category: 'Tiêu hóa'
    },
    
    // Tim mạch
    {
      name: 'Huyết áp cao',
      shouldDo: ['Giảm muối ăn', 'Tập luyện nhẹ nhàng', 'Kiểm tra huyết áp thường xuyên', 'Quản lý stress'],
      shouldEat: ['Rau xanh', 'Trái cây tươi', 'Cá hồi', 'Yến mạch', 'Tỏi', 'Hạt óc chó'],
      category: 'Tim mạch'
    },
    {
      name: 'Huyết áp thấp',
      shouldDo: ['Uống đủ nước', 'Ăn nhiều bữa nhỏ', 'Tránh đứng dậy đột ngột', 'Tăng muối vừa phải'],
      shouldEat: ['Nước muối', 'Cafe nhẹ', 'Socola đen', 'Trứng', 'Thịt đỏ', 'Nước dừa'],
      category: 'Tim mạch'
    },
    {
      name: 'Cholesterol cao',
      shouldDo: ['Tập aerobic 30 phút/ngày', 'Giảm mỡ bão hòa', 'Kiểm tra định kỳ', 'Bỏ thuốc lá'],
      shouldEat: ['Yến mạch', 'Cá hồi', 'Hạt lanh', 'Rau xanh', 'Đậu nành', 'Trái cây tươi'],
      category: 'Tim mạch'
    },
    {
      name: 'Suy tim',
      shouldDo: ['Hạn chế muối nghiêm ngặt', 'Theo dõi cân nặng hàng ngày', 'Uống thuốc đúng giờ', 'Khám định kỳ'],
      shouldEat: ['Cá nước lạnh', 'Rau củ tươi', 'Ngũ cốc nguyên hạt', 'Đậu', 'Nước dừa', 'Trái cây'],
      category: 'Tim mạch'
    },
    
    // Chuyển hóa
    {
      name: 'Tiểu đường',
      shouldDo: ['Kiểm soát đường huyết', 'Tập thể dục đều đặn', 'Khám định kỳ', 'Tuân thủ dùng thuốc'],
      shouldEat: ['Rau xanh', 'Ngũ cốc nguyên hạt', 'Cá', 'Quả bơ', 'Hạnh nhân', 'Rau củ ít tinh bột'],
      category: 'Chuyển hóa'
    },
    {
      name: 'Gout (Bệnh gút)',
      shouldDo: ['Uống nhiều nước', 'Giảm cân', 'Tránh rượu bia', 'Nghỉ ngơi khi đau'],
      shouldEat: ['Nước cherry', 'Cam', 'Cà phê nhẹ', 'Rau xanh', 'Trứng', 'Sữa ít béo'],
      category: 'Chuyển hóa'
    },
    {
      name: 'Gan nhiễm mỡ',
      shouldDo: ['Giảm cân 5-10%', 'Tập thể dục thường xuyên', 'Hạn chế đường', 'Bỏ rượu hoàn toàn'],
      shouldEat: ['Rau xanh', 'Cá hồi', 'Yến mạch', 'Hạt óc chó', 'Trà xanh', 'Quả bơ'],
      category: 'Chuyển hóa'
    },
    
    // Máu
    {
      name: 'Thiếu máu',
      shouldDo: ['Ăn đủ bữa', 'Tăng cường nghỉ ngơi', 'Khám và xét nghiệm', 'Bổ sung sắt theo chỉ định'],
      shouldEat: ['Thịt đỏ', 'Gan', 'Rau bina', 'Trứng', 'Đậu đỏ', 'Trái cây giàu vitamin C'],
      category: 'Máu'
    },
    {
      name: 'Xuất huyết',
      shouldDo: ['Ép chặt vết thương', 'Nâng cao vùng chảy máu', 'Giữ yên lặng', 'Gọi cấp cứu nếu nhiều'],
      shouldEat: ['Rau xanh', 'Trái cây họ berry', 'Gan', 'Đậu nành', 'Cá', 'Nước ép cà chua'],
      category: 'Máu'
    },
    
    // Thần kinh
    {
      name: 'Mất ngủ',
      shouldDo: ['Giữ giờ giấc đều đặn', 'Tránh caffeine buổi tối', 'Tắm nước ấm', 'Tạo môi trường thoáng mát'],
      shouldEat: ['Sữa ấm', 'Chuối', 'Hạnh nhân', 'Trà hoa cúc', 'Yến mạch', 'Mật ong'],
      category: 'Thần kinh'
    },
    {
      name: 'Đau đầu',
      shouldDo: ['Nghỉ ngơi trong phòng tối', 'Massage nhẹ', 'Uống đủ nước', 'Tránh ánh sáng mạnh'],
      shouldEat: ['Nước', 'Trái cây tươi', 'Hạnh nhân', 'Cá hồi', 'Gừng', 'Trà bạc hà'],
      category: 'Thần kinh'
    },
    {
      name: 'Stress/Lo âu',
      shouldDo: ['Tập yoga/thiền', 'Vận động thể thao', 'Nói chuyện với người thân', 'Ngủ đủ giấc'],
      shouldEat: ['Socola đen', 'Trái cây họ berry', 'Trà xanh', 'Cá hồi', 'Hạt bí', 'Yến mạch'],
      category: 'Thần kinh'
    },
    {
      name: 'Đau thần kinh tọa',
      shouldDo: ['Nghỉ ngơi', 'Chườm nóng/lạnh luân phiên', 'Vật lý trị liệu', 'Tập giãn cơ nhẹ'],
      shouldEat: ['Nghệ', 'Gừng', 'Cá hồi', 'Rau xanh', 'Quả óc chó', 'Trái cây họ berry'],
      category: 'Thần kinh'
    },
    
    // Xương khớp
    {
      name: 'Viêm khớp',
      shouldDo: ['Tập luyện nhẹ nhàng', 'Giữ ấm khớp', 'Kiểm soát cân nặng', 'Vật lý trị liệu'],
      shouldEat: ['Cá hồi', 'Quả óc chó', 'Nghệ', 'Rau xanh', 'Trái cây họ berry', 'Dầu ô liu'],
      category: 'Xương khớp'
    },
    {
      name: 'Loãng xương',
      shouldDo: ['Tập tạ nhẹ', 'Tắm nắng buổi sáng', 'Bổ sung canxi', 'Tránh ngã'],
      shouldEat: ['Sữa', 'Phô mai', 'Cá hồi', 'Rau xanh đậm', 'Trứng', 'Nấm'],
      category: 'Xương khớp'
    },
    {
      name: 'Đau lưng',
      shouldDo: ['Chườm nóng', 'Nằm nghỉ tư thế đúng', 'Tập giãn cơ', 'Massage nhẹ'],
      shouldEat: ['Nghệ', 'Gừng', 'Cá hồi', 'Rau xanh', 'Quả óc chó', 'Trái cây tươi'],
      category: 'Xương khớp'
    },
    
    // Da liễu
    {
      name: 'Mụn trứng cá',
      shouldDo: ['Rửa mặt 2 lần/ngày', 'Không nặn mụn', 'Dùng kem không dầu', 'Giảm stress'],
      shouldEat: ['Rau xanh', 'Trái cây tươi', 'Cá hồi', 'Hạt lanh', 'Nước', 'Trà xanh'],
      category: 'Da liễu'
    },
    {
      name: 'Viêm da/Chàm',
      shouldDo: ['Giữ da ẩm', 'Tránh nước nóng', 'Không gãi', 'Dùng kem dưỡng'],
      shouldEat: ['Cá hồi', 'Hạt lanh', 'Rau xanh', 'Trái cây họ berry', 'Hạt óc chó', 'Dầu ô liu'],
      category: 'Da liễu'
    },
    
    // Nội tiết
    {
      name: 'Suy giáp',
      shouldDo: ['Uống thuốc hormone đều', 'Khám định kỳ', 'Tập thể dục nhẹ', 'Ngủ đủ giấc'],
      shouldEat: ['Hải sản', 'Trứng', 'Thịt', 'Sữa', 'Rau xanh', 'Nấm'],
      category: 'Nội tiết'
    }
  ];

  const filteredDiseases = diseases.filter(disease =>
    disease.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Card className="border-4 border-blue-200 shadow-xl bg-gradient-to-br from-white to-blue-50">
        <CardHeader className="bg-gradient-to-r from-blue-400 to-cyan-400 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-6 h-6" />
            Phác đồ điều trị
          </CardTitle>
          <CardDescription className="text-blue-100">
            30 bệnh với phác đồ chi tiết "Nên làm" và "Nên ăn"
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Tìm kiếm bệnh..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-2 border-blue-300"
              />
            </div>
          </div>

          <div className="space-y-4">
            {filteredDiseases.map((disease, index) => (
              <Card key={index} className="border-2 border-blue-200 hover:shadow-lg transition-shadow bg-gradient-to-br from-white to-blue-50">
                <CardHeader className="bg-gradient-to-r from-blue-100 to-cyan-100 pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{disease.name}</CardTitle>
                    <span className="px-3 py-1 bg-blue-500 text-white rounded-full text-xs">
                      {disease.category}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <Tabs defaultValue="do" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="do">✅ Nên làm</TabsTrigger>
                      <TabsTrigger value="eat">🍽️ Nên ăn</TabsTrigger>
                    </TabsList>
                    <TabsContent value="do" className="mt-4">
                      <ul className="space-y-2">
                        {disease.shouldDo.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 p-2 bg-green-50 rounded border border-green-200">
                            <span className="text-green-600 mt-0.5">✓</span>
                            <span className="text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </TabsContent>
                    <TabsContent value="eat" className="mt-4">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {disease.shouldEat.map((food, idx) => (
                          <div key={idx} className="p-3 bg-orange-50 rounded-lg border border-orange-200 text-center text-sm">
                            🍴 {food}
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredDiseases.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">Không tìm thấy bệnh phù hợp</p>
            </div>
          )}

          <div className="mt-6 p-4 bg-red-50 rounded-lg border-2 border-red-200">
            <h4 className="mb-2 text-red-800">⚠️ Lưu ý quan trọng</h4>
            <ul className="text-sm space-y-1 list-disc list-inside text-gray-700">
              <li>Thông tin chỉ mang tính chất tham khảo</li>
              <li>Luôn tham khảo ý kiến bác sĩ trước khi điều trị</li>
              <li>Không tự ý ngừng thuốc đang điều trị</li>
              <li>Đến cơ sở y tế khi triệu chứng nghiêm trọng</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
