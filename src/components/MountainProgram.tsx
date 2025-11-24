import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Mountain, Heart, DollarSign, AlertCircle, Utensils, Baby } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';

export function MountainProgram() {
  const [selectedTab, setSelectedTab] = useState('nutrition');

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-4 border-green-200">
        <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <Mountain className="w-6 h-6" />
            So Sánh Thành Thị & Vùng Núi
          </CardTitle>
          <CardDescription className="text-green-100">
            Chương trình đặc biệt cho cả hai vùng - Dinh dưỡng siêu rẻ & Bài tập địa hình
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <button
              onClick={() => setSelectedTab('nutrition')}
              className={`p-3 rounded-lg border-2 transition-all ${
                selectedTab === 'nutrition'
                  ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white border-orange-600'
                  : 'bg-white border-orange-200'
              }`}
            >
              <Utensils className="w-5 h-5 mx-auto mb-1" />
              <p className="text-xs">Dinh dưỡng</p>
            </button>
            <button
              onClick={() => setSelectedTab('exercise')}
              className={`p-3 rounded-lg border-2 transition-all ${
                selectedTab === 'exercise'
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white border-green-600'
                  : 'bg-white border-green-200'
              }`}
            >
              <Mountain className="w-5 h-5 mx-auto mb-1" />
              <p className="text-xs">Bài tập</p>
            </button>
            <button
              onClick={() => setSelectedTab('pregnancy')}
              className={`p-3 rounded-lg border-2 transition-all ${
                selectedTab === 'pregnancy'
                  ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white border-pink-600'
                  : 'bg-white border-pink-200'
              }`}
            >
              <Baby className="w-5 h-5 mx-auto mb-1" />
              <p className="text-xs">Mẹ bầu</p>
            </button>
            <button
              onClick={() => setSelectedTab('standards')}
              className={`p-3 rounded-lg border-2 transition-all ${
                selectedTab === 'standards'
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-blue-600'
                  : 'bg-white border-blue-200'
              }`}
            >
              <Heart className="w-5 h-5 mx-auto mb-1" />
              <p className="text-xs">Chuẩn VN</p>
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Low-Cost Nutrition */}
      {selectedTab === 'nutrition' && (
        <div className="space-y-4">
          <Card className="border-4 border-orange-200 bg-gradient-to-br from-orange-50 to-yellow-50">
            <CardHeader className="bg-gradient-to-r from-orange-400 to-yellow-400 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-6 h-6" />
                Dinh Dưỡng Giá Rẻ (15,000-20,000 VNĐ/ngày)
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="p-4 bg-white rounded-lg border-2 border-orange-300">
                <h4 className="mb-3">🌅 Bữa Sáng (5,000 VNĐ)</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Cháo gạo lứt (2,000 VNĐ) + 1 quả trứng (3,000 VNĐ)</li>
                  <li>• Hoặc: Khoai lang luộc (2,000 VNĐ) + đậu phộng rang (3,000 VNĐ)</li>
                </ul>
              </div>

              <div className="p-4 bg-white rounded-lg border-2 border-yellow-300">
                <h4 className="mb-3">☀️ Bữa Trưa (8,000 VNĐ)</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Cơm gạo lứt (2,000 VNĐ)</li>
                  <li>• Canh rau ngót/rau dền (1,000 VNĐ)</li>
                  <li>• Đậu phụ kho (3,000 VNĐ)</li>
                  <li>• Rau luộc bất kỳ (2,000 VNĐ)</li>
                </ul>
              </div>

              <div className="p-4 bg-white rounded-lg border-2 border-orange-300">
                <h4 className="mb-3">🌙 Bữa Tối (7,000 VNĐ)</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Cơm gạo lứt (2,000 VNĐ)</li>
                  <li>• Trứng chiên/luộc (3,000 VNĐ)</li>
                  <li>• Rau xanh tùy mùa (2,000 VNĐ)</li>
                </ul>
              </div>

              <Alert className="bg-blue-50 border-blue-300">
                <AlertCircle className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-800">
                  <strong>Mẹo tiết kiệm:</strong> Mua rau củ tại chợ sáng sớm, trồng rau nhà, nuôi gà để có trứng
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <Card className="border-4 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
            <CardHeader className="bg-gradient-to-r from-green-400 to-emerald-400 text-white rounded-t-lg">
              <CardTitle>Công Thức Nấu Ăn Đặc Biệt</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="p-4 bg-white rounded-lg border-2 border-green-300">
                <h4 className="text-green-700 mb-2">🥬 Canh Rau Ngót Bổ Dưỡng</h4>
                <p className="text-sm mb-2"><strong>Nguyên liệu:</strong> Rau ngót, tép, hành tím, dầu ăn</p>
                <p className="text-sm"><strong>Cách làm:</strong> Phi hành tím, cho nước sôi, thêm rau ngót, nêm vừa ăn. Giàu canxi, sắt, vitamin A.</p>
              </div>

              <div className="p-4 bg-white rounded-lg border-2 border-green-300">
                <h4 className="text-green-700 mb-2">🍚 Cháo Gạo Lứt Tăng Chiều Cao</h4>
                <p className="text-sm mb-2"><strong>Nguyên liệu:</strong> Gạo lứt, đậu xanh, vừng rang</p>
                <p className="text-sm"><strong>Cách làm:</strong> Ngâm gạo lứt 2-3 tiếng, nấu cháo với đậu xanh, rắc vừng. Giàu protein, vitamin B, khoáng chất.</p>
              </div>

              <div className="p-4 bg-white rounded-lg border-2 border-green-300">
                <h4 className="text-green-700 mb-2">🥜 Đậu Phụ Kho Gừng</h4>
                <p className="text-sm mb-2"><strong>Nguyên liệu:</strong> Đậu phụ, gừng, hành, nước tương</p>
                <p className="text-sm"><strong>Cách làm:</strong> Chiên đậu phụ vàng, kho với gừng băm, nước tương. Giàu protein thực vật, canxi.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Mountain Terrain Exercises */}
      {selectedTab === 'exercise' && (
        <Card className="border-4 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
          <CardHeader className="bg-gradient-to-r from-green-400 to-emerald-400 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <Mountain className="w-6 h-6" />
              Bài Tập Tận Dụng Địa Hình Vùng Cao
            </CardTitle>
            <CardDescription className="text-green-100">
              Không cần thiết bị - Dùng thiên nhiên làm phòng tập
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-lg border-2 border-green-300">
                <h4 className="text-green-700 mb-2">🏃 Leo Dốc Tăng Sức Bền</h4>
                <p className="text-sm">Đi bộ/chạy lên dốc 20-30 phút/ngày. Tăng cường cơ chân, tim mạch.</p>
                <p className="text-xs text-green-600 mt-2">⏰ Sáng sớm hoặc chiều mát</p>
              </div>

              <div className="p-4 bg-white rounded-lg border-2 border-green-300">
                <h4 className="text-green-700 mb-2">🪵 Gánh Nước/Củi Tăng Sức Mạnh</h4>
                <p className="text-sm">Gánh nước hoặc củi (tải trọng vừa phải) giúp tăng cơ vai, lưng.</p>
                <p className="text-xs text-green-600 mt-2">⏰ 2-3 lần/ngày, mỗi lần 10-15 phút</p>
              </div>

              <div className="p-4 bg-white rounded-lg border-2 border-green-300">
                <h4 className="text-green-700 mb-2">🌳 Treo Xà Đơn Cây</h4>
                <p className="text-sm">Treo người trên cành cây chắc chắn 30s-1 phút, giúp kéo dài cột sống.</p>
                <p className="text-xs text-green-600 mt-2">⏰ Sáng và tối, 3-5 lần</p>
              </div>

              <div className="p-4 bg-white rounded-lg border-2 border-green-300">
                <h4 className="text-green-700 mb-2">🪨 Trèo Đá/Núi Nhỏ</h4>
                <p className="text-sm">Trèo đá hoặc leo dốc núi nhẹ giúp phát triển toàn thân.</p>
                <p className="text-xs text-green-600 mt-2">⏰ 2-3 lần/tuần, 20-30 phút</p>
              </div>

              <div className="p-4 bg-white rounded-lg border-2 border-green-300">
                <h4 className="text-green-700 mb-2">🏋️ Nâng Đá/Gỗ</h4>
                <p className="text-sm">Dùng đá/khúc gỗ làm tạ tự nhiên. Squat, nâng qua đầu.</p>
                <p className="text-xs text-green-600 mt-2">⏰ 3-4 lần/tuần, 15-20 phút</p>
              </div>

              <div className="p-4 bg-white rounded-lg border-2 border-green-300">
                <h4 className="text-green-700 mb-2">🦘 Nhảy Qua Rạch/Khe Suối</h4>
                <p className="text-sm">Nhảy xa, nhảy cao tự nhiên. Tăng sức bật, phối hợp.</p>
                <p className="text-xs text-green-600 mt-2">⏰ 3 lần/tuần, 10-15 phút</p>
              </div>
            </div>

            <Alert className="bg-yellow-50 border-yellow-300">
              <AlertCircle className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-yellow-800">
                <strong>Lưu ý an toàn:</strong> Luôn đảm bảo an toàn khi tập. Khởi động kỹ. Tráp tập khi trời mưa hoặc địa hình nguy hiểm.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      )}

      {/* Pregnancy Care for Mountain Area */}
      {selectedTab === 'pregnancy' && (
        <Card className="border-4 border-pink-200 bg-gradient-to-br from-pink-50 to-purple-50">
          <CardHeader className="bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <Baby className="w-6 h-6" />
              Chăm Sóc Mẹ Bầu Vùng Cao
            </CardTitle>
            <CardDescription className="text-pink-100">
              Hướng dẫn đặc thù cho vùng sâu vùng xa
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <Alert className="bg-red-50 border-red-300">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                <strong>Cảnh báo khẩn cấp - Cần đến bệnh viện ngay khi:</strong>
                <ul className="mt-2 space-y-1 text-sm">
                  <li>• Chảy máu âm đạo bất thường</li>
                  <li>• Đau bụng dữ dội không giảm</li>
                  <li>• Thai không cử động sau 24 tuần</li>
                  <li>• Sốt cao trên 38.5°C</li>
                  <li>• Phù chân tay đột ngột, nhìn mờ, đau đầu dữ dội</li>
                </ul>
              </AlertDescription>
            </Alert>

            <div className="p-4 bg-white rounded-lg border-2 border-pink-300">
              <h4 className="text-pink-700 mb-3">🍎 Dinh Dưỡng Mẹ Bầu Vùng Cao</h4>
              <div className="space-y-2 text-sm">
                <p><strong>Protein:</strong> Trứng, đậu phụ, thịt gà (nếu có)</p>
                <p><strong>Sắt:</strong> Rau ngót, rau dền, gan (1 lần/tuần)</p>
                <p><strong>Canxi:</strong> Đậu phụ, vừng, rau xanh</p>
                <p><strong>Folate:</strong> Rau xanh lá, đậu các loại</p>
                <p><strong>Bổ sung:</strong> Viên sắt, acid folic (nếu có thể)</p>
              </div>
            </div>

            <div className="p-4 bg-white rounded-lg border-2 border-purple-300">
              <h4 className="text-purple-700 mb-3">🚶 Vận Động An Toàn</h4>
              <ul className="space-y-2 text-sm">
                <li>• Đi bộ nhẹ nhàng 15-20 phút/ngày trên địa hình bằng phẳng</li>
                <li>• Tránh gánh nặng, leo dốc cao</li>
                <li>• Nghỉ ngơi đầy đủ, nằm nghiêng trái khi ngủ</li>
                <li>• Tránh làm việc quá sức</li>
              </ul>
            </div>

            <div className="p-4 bg-white rounded-lg border-2 border-pink-300">
              <h4 className="text-pink-700 mb-3">🏥 Đo Đạc Không Cần Thiết Bị Hiện Đại</h4>
              <ul className="space-y-2 text-sm">
                <li>• <strong>Kiểm tra cử động thai:</strong> Nằm yên, đếm ít nhất 10 cử động trong 2 giờ (sau tuần 28)</li>
                <li>• <strong>Đo chiều cao tử cung:</strong> Dùng thước dây đo từ xương mu đến đáy tử cung (cm ≈ tuần thai)</li>
                <li>• <strong>Nghe tim thai:</strong> Nếu không có máy, cảm nhận cử động thường xuyên</li>
                <li>• <strong>Theo dõi cân nặng:</strong> Nên tăng 10-15kg trong cả thai kỳ</li>
              </ul>
            </div>

            <div className="p-4 bg-white rounded-lg border-2 border-purple-300">
              <h4 className="text-purple-700 mb-3">🌿 Thảo Dược An Toàn (Tham khảo)</h4>
              <ul className="space-y-2 text-sm">
                <li>• <strong>Gừng:</strong> Giảm buồn nôn (lượng nhỏ)</li>
                <li>• <strong>Lá lốt:</strong> Bổ dưỡng, giảm đau lưng</li>
                <li>• <strong>TRÁNH:</strong> Nghệ, hoàng liên, các loại thảo dược gây co tử cung</li>
              </ul>
            </div>

            <Alert className="bg-blue-50 border-blue-300">
              <AlertCircle className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800">
                <strong>Khuyến nghị:</strong> Nên xuống trạm y tế/bệnh viện ít nhất 1 lần/tháng trong 6 tháng đầu, 2 lần/tháng trong 3 tháng cuối. Sinh tại cơ sở y tế nếu có thể.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      )}

      {/* Mountain Standards */}
      {selectedTab === 'standards' && (
        <Card className="border-4 border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50">
          <CardHeader className="bg-gradient-to-r from-blue-400 to-cyan-400 text-white rounded-t-lg">
            <CardTitle>Chuẩn Chiều Cao Riêng Vùng Cao</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-lg border-2 border-blue-300">
                <h4 className="text-blue-700 mb-3">🏙️ Thành Thị Việt Nam</h4>
                <p className="text-sm"><strong>Nam:</strong> ~ 1m68-1m73</p>
                <p className="text-sm"><strong>Nữ:</strong> ~ 1m60-1m65</p>
              </div>

              <div className="p-4 bg-white rounded-lg border-2 border-green-300">
                <h4 className="text-green-700 mb-3">🏔️ Vùng Núi Việt Nam</h4>
                <p className="text-sm"><strong>Nam:</strong> ~ 1m50-1m55</p>
                <p className="text-sm"><strong>Nữ:</strong> ~ 1m45-1m50</p>
              </div>
            </div>

            <Alert className="bg-purple-50 border-purple-300">
              <Heart className="h-4 w-4 text-purple-600" />
              <AlertDescription className="text-purple-800">
                <strong>Lý do khác biệt:</strong> Do điều kiện địa lý (thiếu oxy ở độ cao), dinh dưỡng hạn chế, và yếu tố di truyền qua nhiều thế hệ. Đây là điều bình thường và không ảnh hưởng đến sức khỏe tổng thể nếu cơ thể phát triển cân đối.
              </AlertDescription>
            </Alert>

            <div className="p-4 bg-white rounded-lg border-2 border-orange-300">
              <h4 className="text-orange-700 mb-3">💪 Cách Tối Ưu Chiều Cao Ở Vùng Cao</h4>
              <ul className="space-y-2 text-sm">
                <li>• Đảm bảo dinh dưỡng đầy đủ protein, canxi</li>
                <li>• Vận động thường xuyên (leo núi, gánh vác vừa phải)</li>
                <li>• Ngủ đủ 8-10 giờ/đêm</li>
                <li>• Tiếp cận trạm y tế để bổ sung vi chất nếu cần</li>
                <li>• Phơi nắng đầy đủ để tổng hợp vitamin D</li>
              </ul>
            </div>

            <div className="p-4 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg border-2 border-cyan-300">
              <h4 className="text-cyan-700 mb-3">⚖️ Khuyến Nghị Cân Nặng Phù Hợp</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <p className="text-sm text-blue-700"><strong>🏙️ Thành Thị:</strong></p>
                  <div className="text-sm space-y-1 bg-white p-3 rounded border border-blue-200">
                    <p><strong>Nam 1m68:</strong> 58-63kg (lý tưởng: 63kg)</p>
                    <p><strong>Nam 1m73:</strong> 62-68kg (lý tưởng: 65kg)</p>
                    <p><strong>Nữ 1m60:</strong> 50-55kg (lý tưởng: 52kg)</p>
                    <p><strong>Nữ 1m65:</strong> 53-58kg (lý tưởng: 55kg)</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-sm text-green-700"><strong>🏔️ Vùng Núi:</strong></p>
                  <div className="text-sm space-y-1 bg-white p-3 rounded border border-green-200">
                    <p><strong>Nam 1m50:</strong> 45-50kg (lý tưởng: 48kg)</p>
                    <p><strong>Nam 1m55:</strong> 48-53kg (lý tưởng: 51kg)</p>
                    <p><strong>Nữ 1m45:</strong> 40-45kg (lý tưởng: 43kg)</p>
                    <p><strong>Nữ 1m50:</strong> 43-48kg (lý tưởng: 46kg)</p>
                  </div>
                </div>
              </div>
              <div className="mt-3 p-3 bg-yellow-50 rounded border border-yellow-300">
                <p className="text-xs text-yellow-800">
                  <strong>📊 Công thức BMI:</strong> Cân nặng (kg) ÷ Chiều cao² (m²). Chuẩn khỏe mạnh: 18.5-24.9
                </p>
              </div>
            </div>

            <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border-2 border-green-300">
              <h4 className="text-green-700 mb-3">🍽️ Hướng Dẫn Ăn Uống Để Đạt Chuẩn</h4>
              
              <div className="space-y-4">
                {/* Tăng cân */}
                <div className="bg-white p-4 rounded-lg border-2 border-blue-200">
                  <h5 className="text-blue-700 mb-2">📈 Nếu Cần Tăng Cân (Thiếu cân so với chuẩn)</h5>
                  <div className="text-sm space-y-2">
                    <p className="text-blue-600"><strong>Nguyên tắc:</strong> Tăng 300-500 kcal/ngày</p>
                    <div className="grid md:grid-cols-2 gap-2">
                      <div>
                        <p className="text-xs opacity-75">Thực phẩm nên ăn:</p>
                        <ul className="text-xs space-y-1 mt-1">
                          <li>• Cơm, bánh mì, khoai lang (carb)</li>
                          <li>• Thịt, cá, trứng, đậu phụ (protein)</li>
                          <li>• Bơ đậu phộng, hạt điều (chất béo lành mạnh)</li>
                          <li>• Sữa, sữa chua (nếu có điều kiện)</li>
                          <li>• Chuối, bơ, xoài (trái cây giàu calo)</li>
                        </ul>
                      </div>
                      <div>
                        <p className="text-xs opacity-75">Thực đơn mẫu:</p>
                        <ul className="text-xs space-y-1 mt-1">
                          <li><strong>Sáng:</strong> Cháo trứng + chuối</li>
                          <li><strong>Phụ sáng:</strong> Bánh mì + đậu phộng</li>
                          <li><strong>Trưa:</strong> Cơm + thịt/cá + rau + đậu</li>
                          <li><strong>Phụ chiều:</strong> Sữa + bánh</li>
                          <li><strong>Tối:</strong> Cơm + trứng + rau + canh</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Giảm cân */}
                <div className="bg-white p-4 rounded-lg border-2 border-orange-200">
                  <h5 className="text-orange-700 mb-2">📉 Nếu Cần Giảm Cân (Thừa cân so với chuẩn)</h5>
                  <div className="text-sm space-y-2">
                    <p className="text-orange-600"><strong>Nguyên tắc:</strong> Giảm 300-500 kcal/ngày, không quá nhanh</p>
                    <div className="grid md:grid-cols-2 gap-2">
                      <div>
                        <p className="text-xs opacity-75">Thực phẩm nên ăn:</p>
                        <ul className="text-xs space-y-1 mt-1">
                          <li>• Rau xanh (bông cải, cải bó xôi, rau ngót)</li>
                          <li>• Protein nạc (ức gà, cá, trứng trắng)</li>
                          <li>• Gạo lứt thay gạo trắng</li>
                          <li>• Trái cây ít đường (dưa hấu, đu đủ)</li>
                          <li>• Uống nhiều nước (2-2.5L/ngày)</li>
                        </ul>
                      </div>
                      <div>
                        <p className="text-xs opacity-75">Nên tránh:</p>
                        <ul className="text-xs space-y-1 mt-1">
                          <li>• Đồ chiên, rán nhiều dầu</li>
                          <li>• Nước ngọt, trà sữa</li>
                          <li>• Bánh kẹo, snack</li>
                          <li>• Ăn khuya, ăn no quá no</li>
                          <li>• Thức ăn nhanh, đồ đóng hộp</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Duy trì */}
                <div className="bg-white p-4 rounded-lg border-2 border-green-200">
                  <h5 className="text-green-700 mb-2">✅ Nếu Đã Đạt Chuẩn (Duy trì cân nặng)</h5>
                  <div className="text-sm space-y-2">
                    <p className="text-green-600"><strong>Nguyên tắc:</strong> Cân bằng năng lượng vào - ra</p>
                    <ul className="text-xs space-y-1">
                      <li>• Ăn đa dạng 4 nhóm: Tinh bột, Protein, Chất béo, Rau củ quả</li>
                      <li>• Tỷ lệ đĩa ăn: 50% rau, 25% protein, 25% tinh bột</li>
                      <li>• Ăn 5-6 bữa nhỏ thay vì 3 bữa lớn</li>
                      <li>• Vận động 30-60 phút/ngày</li>
                      <li>• Cân nặng 1 lần/tuần để theo dõi</li>
                      <li>• Ngủ đủ 7-8 giờ/đêm (giấc ngủ ảnh hưởng cân nặng)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <Alert className="bg-red-50 border-red-300">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                <strong>⚠️ Cảnh báo:</strong> Không tự ý nhịn ăn hoàn toàn hoặc giảm cân quá nhanh (&gt;1kg/tuần). Nếu có vấn đề sức khỏe, hãy tham khảo bác sĩ/chuyên viên dinh dưỡng.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
