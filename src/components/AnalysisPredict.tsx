// ============================================
// FILE: AnalysisPredict.tsx - COMPONENT DỰ ĐOÁN ĐA THẾ HỆ
// Mô tả: Component phân tích và dự đoán chiều cao, cân nặng, nguy cơ bệnh cho 5 thế hệ (F1-F5)
// Chức năng chính:
// - Dự đoán chiều cao và cân nặng cho con cháu đến 5 thế hệ
// - Phân tích nguy cơ bệnh di truyền từ tiền sử gia đình
// - Hiển thị dữ liệu hồ sơ gia đình
// - Gợi ý phòng bệnh và lịch tiêm chủng
// ============================================

// Import React hooks
import { useState, useEffect } from 'react'; // useState: quản lý state, useEffect: xử lý side effects

// Import UI components từ shadcn/ui
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'; // Card components để hiển thị nội dung
import { Button } from './ui/button'; // Button component
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'; // Tabs để chuyển đổi giữa các tab

// Import icons từ lucide-react
import { 
  TrendingUp,    // Icon xu hướng tăng - dùng cho dự đoán
  Users,         // Icon người dùng - dùng cho gia đình
  Shield,        // Icon khiên - dùng cho phòng bệnh
  Syringe,       // Icon kim tiêm - dùng cho tiêm chủng
  Database,      // Icon database - dùng cho dữ liệu
  AlertCircle    // Icon cảnh báo - dùng cho thông báo
} from 'lucide-react';

// Import toast để hiển thị thông báo
import { toast } from 'sonner';

// ============================================
// INTERFACE - Định nghĩa kiểu dữ liệu
// ============================================

/**
 * Interface định nghĩa cấu trúc dữ liệu của một thành viên gia đình
 * Chứa tất cả thông tin cần thiết để phân tích sức khỏe và dự đoán
 */
interface FamilyMember {
  relation: string;        // Mối quan hệ: "self", "father", "mother", "spouse", "sibling"
  name: string;            // Họ và tên
  age: string;             // Tuổi (dạng string để dễ nhập liệu)
  height: string;          // Chiều cao (cm) - dùng string để xử lý input
  weight: string;          // Cân nặng (kg) - dùng string để xử lý input
  bust: string;            // Số đo vòng 1 (cm)
  waist: string;           // Số đo vòng 2 (cm)
  hip: string;             // Số đo vòng 3 (cm)
  medicalHistory: string;  // Tiền sử bệnh tật - quan trọng cho dự đoán di truyền
  bloodType: string;       // Nhóm máu (A, B, AB, O)
}

// ============================================
// MAIN COMPONENT
// ============================================

export function AnalysisPredict() {
  // ============================================
  // STATE MANAGEMENT
  // ============================================
  
  /**
   * State lưu thế hệ được chọn (1-5)
   * - 1: F1 (con)
   * - 2: F2 (cháu)
   * - 3: F3 (chắt)
   * - 4: F4 (chút)
   * - 5: F5 (chít)
   */
  const [selectedGeneration, setSelectedGeneration] = useState<number>(1);
  
  /**
   * State lưu dữ liệu của 5 thành viên gia đình
   * Mỗi thành viên có thể có dữ liệu (FamilyMember) hoặc null (chưa nhập)
   */
  const [familyData, setFamilyData] = useState<{
    self: FamilyMember | null;     // Dữ liệu bản thân
    father: FamilyMember | null;   // Dữ liệu cha
    mother: FamilyMember | null;   // Dữ liệu mẹ
    spouse: FamilyMember | null;   // Dữ liệu vợ/chồng
    sibling: FamilyMember | null;  // Dữ liệu anh/chị/em
  }>({
    // Khởi tạo tất cả là null (chưa có dữ liệu)
    self: null,
    father: null,
    mother: null,
    spouse: null,
    sibling: null
  });

  // ============================================
  // SIDE EFFECTS - Load dữ liệu khi component mount
  // ============================================
  
  /**
   * useEffect chạy 1 lần khi component được render lần đầu
   * Mục đích: Load dữ liệu hồ sơ gia đình từ localStorage
   */
  useEffect(() => {
    // Bước 1: Lấy ID của user hiện tại từ localStorage
    // Nếu không có thì dùng 'default' làm ID mặc định
    const currentUserId = localStorage.getItem('healthyVN_currentUser') || 'default';
    
    /**
     * Hàm helper để load dữ liệu 1 thành viên từ localStorage
     * @param key - Khóa để xác định thành viên (self, father, mother, spouse, sibling)
     * @returns FamilyMember object hoặc null nếu không có dữ liệu
     */
    const loadMember = (key: string): FamilyMember | null => {
      // Tạo key duy nhất: profile_{userId}_{memberKey}
      // Ví dụ: profile_demo_self, profile_demo_father
      const data = localStorage.getItem(`profile_${currentUserId}_${key}`);
      
      // Nếu có dữ liệu, parse từ JSON string thành object
      // Nếu không có, trả về null
      return data ? JSON.parse(data) : null;
    };

    // Bước 2: Load dữ liệu của tất cả 5 thành viên và cập nhật state
    setFamilyData({
      self: loadMember('self'),       // Load dữ liệu bản thân
      father: loadMember('father'),   // Load dữ liệu cha
      mother: loadMember('mother'),   // Load dữ liệu mẹ
      spouse: loadMember('spouse'),   // Load dữ liệu vợ/chồng
      sibling: loadMember('sibling')  // Load dữ liệu anh/chị/em
    });
  }, []); // Dependency array rỗng = chỉ chạy 1 lần khi mount

  // ============================================
  // CALCULATION FUNCTIONS - Các hàm tính toán
  // ============================================
  
  /**
   * Hàm dự đoán chiều cao cho thế hệ tương lai
   * Logic: Dựa trên chiều cao của cha mẹ + bonus theo thế hệ
   * 
   * @param generation - Thế hệ cần dự đoán (1-5)
   * @returns Object chứa chiều cao min và max (dạng range)
   * 
   * Công thức khoa học:
   * - Chiều cao con = (Chiều cao cha + Chiều cao mẹ) / 2
   * - Mỗi thế hệ tăng thêm 1.5cm do cải thiện dinh dưỡng và môi trường
   * - Cho phép sai số ±5cm
   */
  const predictHeight = (generation: number) => {
    // Lấy dữ liệu từ state
    const { self, father, mother, spouse } = familyData;
    
    // Biến lưu chiều cao cơ sở để tính toán
    let baseHeight = 168; // Mặc định là chiều cao trung bình người Việt (168cm)
    
    // TH1: Nếu có đầy đủ dữ liệu cha mẹ
    if (father && mother && father.height && mother.height) {
      // Convert string sang số để tính toán
      const fatherHeight = parseFloat(father.height);
      const motherHeight = parseFloat(mother.height);
      
      // Công thức: Chiều cao con = trung bình chiều cao cha mẹ
      // Đây là công thức cơ bản trong di truyền học
      baseHeight = (fatherHeight + motherHeight) / 2;
    } 
    // TH2: Nếu không có dữ liệu cha mẹ nhưng có dữ liệu bản thân
    else if (self && self.height) {
      // Dùng chiều cao bản thân làm cơ sở
      baseHeight = parseFloat(self.height);
    }
    // TH3: Nếu không có dữ liệu gì, giữ baseHeight = 168 (mặc định)
    
    /**
     * Tính bonus theo thế hệ
     * Mỗi thế hệ tăng 1.5cm do:
     * - Dinh dưỡng tốt hơn
     * - Chăm sóc y tế tốt hơn
     * - Điều kiện sống cải thiện
     * 
     * Ví dụ:
     * - F1 (gen 1): (1-1) * 1.5 = 0cm (không có bonus)
     * - F2 (gen 2): (2-1) * 1.5 = 1.5cm
     * - F3 (gen 3): (3-1) * 1.5 = 3cm
     */
    const generationBonus = (generation - 1) * 1.5;
    
    // Tính chiều cao dự đoán = chiều cao cơ sở + bonus thế hệ
    const predictedHeight = baseHeight + generationBonus;
    
    // Trả về dạng range (min-max) với sai số ±5cm
    // Math.round: Làm tròn số để dễ đọc
    return {
      min: Math.round(predictedHeight - 5),  // Chiều cao tối thiểu
      max: Math.round(predictedHeight + 5)   // Chiều cao tối đa
    };
  };

  /**
   * Hàm dự đoán cân nặng dựa trên chiều cao dự đoán
   * Logic: Sử dụng BMI lý tưởng để tính cân nặng phù hợp
   * 
   * @param generation - Thế hệ cần dự đoán (1-5)
   * @returns Object chứa cân nặng min và max (kg)
   * 
   * Công thức BMI: BMI = Cân nặng (kg) / (Chiều cao (m))²
   * => Cân nặng = BMI × (Chiều cao / 100)²
   */
  const predictWeight = (generation: number) => {
    // Bước 1: Lấy dự đoán chiều cao cho thế hệ này
    const heightPrediction = predictHeight(generation);
    
    // Bước 2: Tính chiều cao trung bình từ min và max
    const avgHeight = (heightPrediction.min + heightPrediction.max) / 2;
    
    /**
     * Bước 3: Sử dụng BMI lý tưởng để tính cân nặng
     * BMI lý tưởng cho người Châu Á: 18.5 - 23
     * Chọn 20.5 làm trung bình (giữa khoảng)
     */
    const idealBMI = 20.5;
    
    /**
     * Bước 4: Tính cân nặng từ công thức BMI
     * - avgHeight / 100: Chuyển cm sang m (vì công thức BMI dùng m)
     * - (avgHeight / 100)²: Bình phương chiều cao
     * - idealBMI * ...: Nhân với BMI để ra cân nặng
     */
    const weight = (idealBMI * (avgHeight / 100) * (avgHeight / 100));
    
    // Bước 5: Trả về dạng range với sai số ±4kg
    return {
      min: Math.round(weight - 4),  // Cân nặng tối thiểu
      max: Math.round(weight + 4)   // Cân nặng tối đa
    };
  };

  /**
   * Hàm phân tích nguy cơ bệnh dựa trên tiền sử gia đình
   * Logic: Kiểm tra tiền sử bệnh của các thành viên và đánh giá nguy cơ
   * 
   * @param generation - Thế hệ cần đánh giá (1-5)
   * @returns String mô tả mức độ nguy cơ: "Cao", "Trung bình", "Thấp", "Rất thấp"
   * 
   * Nguyên lý y học:
   * - Bệnh di truyền có xu hướng giảm dần qua các thế hệ nếu có phòng ngừa
   * - Càng xa thế hệ bị bệnh, nguy cơ càng thấp
   */
  const analyzeHealthRisk = (generation: number) => {
    // Bước 1: Lấy dữ liệu các thành viên từ state
    const { self, father, mother, sibling } = familyData;
    
    // Bước 2: Tạo mảng chứa tất cả tiền sử bệnh
    const allHistory: string[] = [];
    
    // Thu thập tiền sử bệnh từ từng thành viên (nếu có)
    // toLowerCase(): Chuyển thành chữ thường để dễ so sánh
    if (self?.medicalHistory) allHistory.push(self.medicalHistory.toLowerCase());
    if (father?.medicalHistory) allHistory.push(father.medicalHistory.toLowerCase());
    if (mother?.medicalHistory) allHistory.push(mother.medicalHistory.toLowerCase());
    if (sibling?.medicalHistory) allHistory.push(sibling.medicalHistory.toLowerCase());
    
    // Bước 3: Gộp tất cả tiền sử thành 1 string để dễ tìm kiếm
    // join(' '): Nối các phần tử với khoảng trắng
    const fullHistory = allHistory.join(' ');
    
    /**
     * Bước 4: Đánh giá mức độ nguy cơ dựa trên từ khóa bệnh
     * 
     * Nhóm nguy cơ CAO: Bệnh nghiêm trọng, di truyền cao
     * - Tim: Bệnh tim mạch
     * - Huyết áp: Cao huyết áp
     * - Đái tháo đường: Tiểu đường
     * - Ung thư: Các loại ung thư
     */
    const hasHighRisk = fullHistory.includes('tim') || 
                        fullHistory.includes('huyết áp') || 
                        fullHistory.includes('đái tháo đường') || 
                        fullHistory.includes('ung thư');
    
    /**
     * Nhóm nguy cơ TRUNG BÌNH: Bệnh có thể kiểm soát
     * - Béo phì: Thừa cân, béo
     * - Cholesterol: Mất cân bằng lipid máu
     * - Gan: Bệnh gan
     * - Thận: Bệnh thận
     */
    const hasMediumRisk = fullHistory.includes('béo phì') || 
                          fullHistory.includes('cholesterol') ||
                          fullHistory.includes('gan') || 
                          fullHistory.includes('thận');
    
    /**
     * Bước 5: Đánh giá nguy cơ theo thế hệ
     * Nguyên tắc: Càng xa thế hệ hiện tại, nguy cơ càng giảm
     */
    if (generation === 1) {
      // F1: Thế hệ gần nhất, nguy cơ cao nhất
      return hasHighRisk ? 'Cao' : hasMediumRisk ? 'Trung bình' : 'Thấp';
    } else if (generation === 2) {
      // F2: Nguy cơ giảm 1 cấp so với F1
      return hasHighRisk ? 'Trung bình' : 'Thấp';
    } else {
      // F3-F5: Nguy cơ rất thấp do xa thế hệ hiện tại
      return hasHighRisk ? 'Thấp' : 'Rất thấp';
    }
  };

  // ============================================
  // DATA CONFIGURATION - Cấu hình dữ liệu hiển thị
  // ============================================
  
  /**
   * Mảng cấu hình 5 thế hệ
   * Mỗi object chứa:
   * - gen: Mã thế hệ (F1-F5)
   * - label: Nhãn hiển thị
   * - color: Gradient màu cho button
   */
  const generations = [
    { gen: 'F1', label: 'Thế hệ 1', color: 'from-purple-400 to-pink-400' },
    { gen: 'F2', label: 'Thế hệ 2', color: 'from-pink-400 to-red-400' },
    { gen: 'F3', label: 'Thế hệ 3', color: 'from-red-400 to-orange-400' },
    { gen: 'F4', label: 'Thế hệ 4', color: 'from-orange-400 to-yellow-400' },
    { gen: 'F5', label: 'Thế hệ 5', color: 'from-yellow-400 to-green-400' },
  ];

  /**
   * Hàm phân tích các bệnh di truyền từ tiền sử gia đình
   * Trả về danh sách các bệnh có nguy cơ với gợi ý phòng ngừa
   * 
   * @returns Mảng các object chứa thông tin bệnh
   */
  const analyzeGeneticDiseases = () => {
    // Bước 1: Thu thập tiền sử bệnh từ tất cả thành viên
    const { self, father, mother, sibling } = familyData;
    const allHistory: string[] = [];
    
    if (self?.medicalHistory) allHistory.push(self.medicalHistory.toLowerCase());
    if (father?.medicalHistory) allHistory.push(father.medicalHistory.toLowerCase());
    if (mother?.medicalHistory) allHistory.push(mother.medicalHistory.toLowerCase());
    if (sibling?.medicalHistory) allHistory.push(sibling.medicalHistory.toLowerCase());
    
    // Gộp tất cả tiền sử thành 1 string
    const fullHistory = allHistory.join(' ');
    
    /**
     * Bước 2: Định nghĩa danh sách các bệnh di truyền phổ biến
     * Mỗi bệnh gồm:
     * - name: Tên bệnh
     * - risk: Mức độ nguy cơ (dựa trên tiền sử)
     * - generation: Thế hệ bị ảnh hưởng
     * - prevention: Biện pháp phòng ngừa
     */
    const diseases = [
      { 
        name: 'Tiểu đường type 2', 
        // Nếu tiền sử có "tiểu đường" hoặc "đái tháo đường" => nguy cơ Cao, nếu không => Trung bình
        risk: fullHistory.includes('tiểu đường') || fullHistory.includes('đái tháo đường') ? 'Cao' : 'Trung bình',
        generation: 'F1-F3',  // Ảnh hưởng đến 3 thế hệ
        prevention: 'Kiểm soát cân nặng, ăn uống lành mạnh, tránh đường'
      },
      { 
        name: 'Huyết áp cao', 
        risk: fullHistory.includes('huyết áp') || fullHistory.includes('cao huyết áp') ? 'Cao' : 'Trung bình',
        generation: 'F1-F2',  // Ảnh hưởng 2 thế hệ
        prevention: 'Giảm muối, tập luyện đều đặn, kiểm soát stress'
      },
      { 
        name: 'Bệnh tim mạch', 
        // Logic phức tạp hơn: Có "tim" hoặc "mạch" => Cao, có "cholesterol" => Trung bình, không có gì => Thấp
        risk: fullHistory.includes('tim') || fullHistory.includes('mạch') ? 'Cao' : fullHistory.includes('cholesterol') ? 'Trung bình' : 'Thấp',
        generation: 'F2-F4',  // Ảnh hưởng lâu dài đến F4
        prevention: 'Không hút thuốc, ăn ít chất béo, vận động đều đặn'
      },
      { 
        name: 'Ung thư', 
        risk: fullHistory.includes('ung thư') || fullHistory.includes('u') ? 'Cao' : 'Thấp',
        generation: 'F3-F5',  // Có thể ảnh hưởng đến tận F5
        prevention: 'Khám định kỳ, lối sống lành mạnh, tránh chất độc'
      },
      { 
        name: 'Béo phì', 
        risk: fullHistory.includes('béo') || fullHistory.includes('thừa cân') ? 'Cao' : 'Trung bình',
        generation: 'F1-F2',
        prevention: 'Chế độ ăn cân đối, tập luyện 5-6 lần/tuần'
      },
    ];
    
    // Trả về danh sách bệnh
    return diseases;
  };

  // Gọi hàm phân tích và lưu kết quả vào biến
  const geneticDiseases = analyzeGeneticDiseases();

  /**
   * Lịch tiêm chủng chuẩn theo độ tuổi
   * Dựa trên Chương trình Tiêm chủng mở rộng của Bộ Y tế Việt Nam
   */
  const vaccineSchedule = [
    { age: '0-1 tuổi', vaccines: 'BCG, Viêm gan B, DPT, Hib, Bại liệt' },
    { age: '1-2 tuổi', vaccines: 'Sởi, Rubella, Quai bị, Viêm gan A' },
    { age: '4-6 tuổi', vaccines: 'DPT nhắc lại, Bại liệt nhắc lại' },
    { age: '11-12 tuổi', vaccines: 'HPV (nữ), Tdap nhắc lại' },
    { age: 'Người lớn', vaccines: 'Cúm (hàng năm), COVID-19, Viêm gan B' },
  ];

  // ============================================
  // PRE-CALCULATE DATA - Tính toán trước khi render
  // ============================================
  
  // Kiểm tra xem có dữ liệu nào trong hồ sơ không
  // Dùng để hiển thị cảnh báo nếu chưa nhập dữ liệu
  const hasAnyData = familyData.self || familyData.father || familyData.mother;
  
  // Tính toán các dự đoán cho thế hệ đang được chọn
  const heightPrediction = predictHeight(selectedGeneration);  // Dự đoán chiều cao
  const weightPrediction = predictWeight(selectedGeneration);  // Dự đoán cân nặng
  const healthRisk = analyzeHealthRisk(selectedGeneration);    // Đánh giá nguy cơ bệnh

  // ============================================
  // RENDER UI
  // ============================================
  
  return (
    <div className="space-y-6">
      {/* 
        Section 1: Cảnh báo nếu chưa có dữ liệu 
        Chỉ hiển thị khi !hasAnyData (chưa có dữ liệu gì)
      */}
      {!hasAnyData && (
        <div className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border-4 border-yellow-300 shadow-lg">
          <div className="flex items-start gap-4">
            {/* Icon cảnh báo */}
            <AlertCircle className="w-8 h-8 text-yellow-600 mt-1" />
            <div>
              {/* Tiêu đề cảnh báo */}
              <h3 className="text-yellow-800 mb-2">⚠️ Chưa có dữ liệu hồ sơ gia đình</h3>
              {/* Hướng dẫn */}
              <p className="text-sm text-yellow-700 mb-3">
                Vui lòng nhập thông tin tại tab <strong>"Hồ sơ & Gia đình"</strong> để nhận được dự đoán chính xác nhất.
              </p>
              {/* Ghi chú */}
              <p className="text-xs text-yellow-600">
                💡 Hiện tại đang hiển thị dự đoán theo chuẩn trung bình Việt Nam.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 
        Section 2: Card chính - Dự đoán đa thế hệ
        Chứa tabs để chuyển đổi giữa "Dự đoán" và "Dữ liệu gia đình"
      */}
      <Card className="border-4 border-purple-200 shadow-xl bg-gradient-to-br from-white to-purple-50">
        {/* Header của card với gradient */}
        <CardHeader className="bg-gradient-to-r from-purple-400 to-blue-400 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            {/* Icon xu hướng */}
            <TrendingUp className="w-6 h-6" />
            Dự đoán đa thế hệ (F1-F5)
          </CardTitle>
          <CardDescription className="text-purple-100">
            {/* Mô tả động: Thay đổi tùy theo có dữ liệu hay không */}
            {hasAnyData 
              ? 'Dựa trên dữ liệu hồ sơ gia đình của bạn'  // Nếu có dữ liệu
              : 'Phân tích theo chuẩn trung bình Việt Nam'} {/* Nếu chưa có dữ liệu */}
          </CardDescription>
        </CardHeader>
        
        {/* Nội dung card */}
        <CardContent className="pt-6">
          {/* Tabs component với 2 tab */}
          <Tabs defaultValue="predict" className="space-y-6">
            {/* Danh sách tabs */}
            <TabsList className="grid w-full grid-cols-2 bg-purple-100">
              {/* Tab 1: Dự đoán thế hệ */}
              <TabsTrigger 
                value="predict" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white"
              >
                📊 Dự đoán thế hệ
              </TabsTrigger>
              {/* Tab 2: Dữ liệu gia đình */}
              <TabsTrigger 
                value="familydata" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white"
              >
                👨‍👩‍👧‍👦 Dữ liệu gia đình
              </TabsTrigger>
            </TabsList>

            {/* 
              TAB CONTENT 1: Dự đoán thế hệ
              Hiển thị khi tab "predict" được chọn
            */}
            <TabsContent value="predict" className="space-y-4">
              {/* 
                Phần 1: Buttons chọn thế hệ (F1-F5)
                grid grid-cols-5: Chia thành 5 cột bằng nhau
              */}
              <div className="grid grid-cols-5 gap-3 mb-6">
                {/* Map qua mảng generations để tạo 5 buttons */}
                {generations.map((gen, index) => (
                  <button
                    key={index}
                    // Khi click, cập nhật selectedGeneration
                    onClick={() => setSelectedGeneration(index + 1)}
                    // Conditional className: Thay đổi style dựa trên button có được chọn không
                    className={`p-4 rounded-xl border-4 transition-all ${
                      selectedGeneration === index + 1
                        ? `bg-gradient-to-r ${gen.color} text-white border-white shadow-lg scale-105`  // Style khi được chọn
                        : 'bg-white border-gray-200 hover:border-purple-300'  // Style khi không được chọn
                    }`}
                  >
                    {/* Mã thế hệ: F1, F2, ... */}
                    <div className="text-2xl mb-1">{gen.gen}</div>
                    {/* Nhãn: Thế hệ 1, Thế hệ 2, ... */}
                    <div className="text-xs">{gen.label}</div>
                  </button>
                ))}
              </div>

              {/* 
                Phần 2: 3 Cards hiển thị kết quả dự đoán
                - Chiều cao
                - Cân nặng  
                - Nguy cơ bệnh
              */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Card 1: Chiều cao dự đoán */}
                <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border-2 border-blue-200">
                  <h4 className="mb-2">📏 Chiều cao dự đoán</h4>
                  {/* Hiển thị range chiều cao từ min đến max */}
                  <p className="text-3xl text-blue-600">
                    {heightPrediction.min}-{heightPrediction.max} cm
                  </p>
                  {/* Ghi chú nguồn dữ liệu */}
                  <p className="text-xs text-gray-600 mt-2">
                    {hasAnyData ? 'Dựa trên gen gia đình bạn' : 'Theo chuẩn trung bình VN'}
                  </p>
                  {/* Dấu check nếu có dữ liệu thực */}
                  {hasAnyData && (
                    <p className="text-xs text-blue-600 mt-1">
                      ✓ Đã tính từ dữ liệu thực
                    </p>
                  )}
                </div>

                {/* Card 2: Cân nặng dự đoán */}
                <div className="p-4 bg-gradient-to-br from-green-50 to-lime-50 rounded-lg border-2 border-green-200">
                  <h4 className="mb-2">⚖️ Cân nặng dự đoán</h4>
                  {/* Hiển thị range cân nặng */}
                  <p className="text-3xl text-green-600">
                    {weightPrediction.min}-{weightPrediction.max} kg
                  </p>
                  <p className="text-xs text-gray-600 mt-2">
                    Phạm vi cân nặng khỏe mạnh
                  </p>
                  {hasAnyData && (
                    <p className="text-xs text-green-600 mt-1">
                      ✓ Dựa trên BMI lý tưởng
                    </p>
                  )}
                </div>

                {/* Card 3: Nguy cơ bệnh */}
                <div className="p-4 bg-gradient-to-br from-red-50 to-orange-50 rounded-lg border-2 border-red-200">
                  <h4 className="mb-2">⚠️ Nguy cơ bệnh</h4>
                  {/* 
                    Màu sắc động dựa trên mức độ nguy cơ:
                    - Cao: Đỏ
                    - Trung bình: Vàng
                    - Thấp/Rất thấp: Xanh
                  */}
                  <p className={`text-3xl ${
                    healthRisk === 'Cao' ? 'text-red-600' :
                    healthRisk === 'Trung bình' ? 'text-yellow-600' :
                    'text-green-600'
                  }`}>
                    {healthRisk}
                  </p>
                  <p className="text-xs text-gray-600 mt-2">
                    {hasAnyData ? 'Từ tiền sử gia đình' : 'Ước tính chung'}
                  </p>
                  {hasAnyData && (
                    <p className="text-xs text-orange-600 mt-1">
                      ✓ Phân tích từ hồ sơ
                    </p>
                  )}
                </div>
              </div>

              {/* 
                Phần 3: Box hiển thị nguồn dữ liệu
                Cho người dùng biết dữ liệu nào đã được nhập
              */}
              <div className="mt-6 p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
                <h4 className="mb-3">🧬 Nguồn dữ liệu phân tích</h4>
                {/* Grid 4 cột cho 4 loại dữ liệu */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                  {/* Box 1: Bản thân */}
                  <div className={`p-2 rounded border ${
                    familyData.self 
                      ? 'bg-green-100 border-green-300'  // Xanh nếu đã nhập
                      : 'bg-gray-100 border-gray-300'    // Xám nếu chưa nhập
                  }`}>
                    <p>👤 Bản thân</p>
                    <p className="text-xs text-gray-600">
                      {familyData.self ? '✓ Đã nhập' : '✗ Chưa có'}
                    </p>
                  </div>
                  
                  {/* Box 2: Cha mẹ (cần cả 2 mới tính là đã nhập) */}
                  <div className={`p-2 rounded border ${
                    familyData.father && familyData.mother 
                      ? 'bg-green-100 border-green-300' 
                      : 'bg-gray-100 border-gray-300'
                  }`}>
                    <p>👨👩 Cha mẹ</p>
                    <p className="text-xs text-gray-600">
                      {familyData.father && familyData.mother ? '✓ Đã nhập' : '✗ Chưa có'}
                    </p>
                  </div>
                  
                  {/* Box 3: Vợ/Chồng */}
                  <div className={`p-2 rounded border ${
                    familyData.spouse 
                      ? 'bg-green-100 border-green-300' 
                      : 'bg-gray-100 border-gray-300'
                  }`}>
                    <p>💑 Vợ/Chồng</p>
                    <p className="text-xs text-gray-600">
                      {familyData.spouse ? '✓ Đã nhập' : '✗ Chưa có'}
                    </p>
                  </div>
                  
                  {/* Box 4: Anh/Chị/Em */}
                  <div className={`p-2 rounded border ${
                    familyData.sibling 
                      ? 'bg-green-100 border-green-300' 
                      : 'bg-gray-100 border-gray-300'
                  }`}>
                    <p>👫 Anh/Chị/Em</p>
                    <p className="text-xs text-gray-600">
                      {familyData.sibling ? '✓ Đã nhập' : '✗ Chưa có'}
                    </p>
                  </div>
                </div>
                
                {/* Ghi chú nếu có dữ liệu */}
                {hasAnyData && (
                  <p className="text-xs text-purple-700 mt-3 p-2 bg-white rounded">
                    💡 Dự đoán được tính toán dựa trên dữ liệu thực từ hồ sơ gia đình của bạn
                  </p>
                )}
              </div>

              {/* 
                Phần 4: Chi tiết tính toán (chỉ hiển thị khi có dữ liệu)
                Giải thích cách app tính toán dự đoán
              */}
              {hasAnyData && (
                <div className="mt-4 p-4 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg border-2 border-cyan-200">
                  <h4 className="mb-2">🔬 Chi tiết tính toán</h4>
                  <div className="text-sm space-y-2">
                    {/* Hiển thị chiều cao cha mẹ nếu có */}
                    {familyData.father && familyData.mother && (
                      <p className="text-gray-700">
                        • Chiều cao cha mẹ: {familyData.father.height}cm (cha), {familyData.mother.height}cm (mẹ)
                      </p>
                    )}
                    {/* Giải thích công thức */}
                    <p className="text-gray-700">
                      • Mỗi thế hệ dự đoán tăng thêm 1.5cm nhờ điều kiện dinh dưỡng cải thiện
                    </p>
                    <p className="text-gray-700">
                      • Cân nặng tính theo BMI lý tưởng (18.5-23) cho người Châu Á
                    </p>
                  </div>
                </div>
              )}
            </TabsContent>

            {/* 
              TAB CONTENT 2: Dữ liệu gia đình
              Hiển thị tất cả thông tin đã nhập của các thành viên
            */}
            <TabsContent value="familydata" className="space-y-4">
              <div className="space-y-4">
                {/* Card hiển thị thông tin bản thân */}
                {familyData.self ? (
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border-2 border-blue-300">
                    <h4 className="mb-3">👤 Thông tin bản thân</h4>
                    {/* Grid 2 cột cho các trường thông tin */}
                    <div className="grid md:grid-cols-2 gap-3 text-sm">
                      <p>Họ tên: <strong>{familyData.self.name || 'Chưa nhập'}</strong></p>
                      <p>Tuổi: <strong>{familyData.self.age || 'Chưa nhập'}</strong></p>
                      <p>Chiều cao: <strong>{familyData.self.height || 'Chưa nhập'} cm</strong></p>
                      <p>Cân nặng: <strong>{familyData.self.weight || 'Chưa nhập'} kg</strong></p>
                      <p>Nhóm máu: <strong>{familyData.self.bloodType}</strong></p>
                      {/* Tiền sử bệnh chiếm 2 cột */}
                      <p className="md:col-span-2">Tiền sử bệnh: <strong>{familyData.self.medicalHistory || 'Không'}</strong></p>
                    </div>
                  </div>
                ) : (
                  // Hiển thị placeholder nếu chưa có dữ liệu
                  <div className="p-4 bg-gray-50 rounded-lg border-2 border-gray-200 text-center">
                    <p className="text-gray-600">Chưa nhập thông tin bản thân</p>
                  </div>
                )}

                {/* Grid 2 cột cho thông tin cha và mẹ */}
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Card thông tin cha */}
                  {familyData.father ? (
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border-2 border-blue-300">
                      <h4 className="mb-3">👨 Thông tin cha</h4>
                      <div className="space-y-2 text-sm">
                        <p>Họ tên: <strong>{familyData.father.name || 'Chưa nhập'}</strong></p>
                        <p>Chiều cao: <strong>{familyData.father.height || 'Chưa nhập'} cm</strong></p>
                        <p>Cân nặng: <strong>{familyData.father.weight || 'Chưa nhập'} kg</strong></p>
                        <p>Nhóm máu: <strong>{familyData.father.bloodType}</strong></p>
                        <p>Tiền sử bệnh: <strong>{familyData.father.medicalHistory || 'Không'}</strong></p>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 bg-gray-50 rounded-lg border-2 border-gray-200 text-center">
                      <p className="text-gray-600">Chưa nhập thông tin cha</p>
                    </div>
                  )}

                  {/* Card thông tin mẹ */}
                  {familyData.mother ? (
                    <div className="p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg border-2 border-pink-300">
                      <h4 className="mb-3">👩 Thông tin mẹ</h4>
                      <div className="space-y-2 text-sm">
                        <p>Họ tên: <strong>{familyData.mother.name || 'Chưa nhập'}</strong></p>
                        <p>Chiều cao: <strong>{familyData.mother.height || 'Chưa nhập'} cm</strong></p>
                        <p>Cân nặng: <strong>{familyData.mother.weight || 'Chưa nhập'} kg</strong></p>
                        <p>Nhóm máu: <strong>{familyData.mother.bloodType}</strong></p>
                        <p>Tiền sử bệnh: <strong>{familyData.mother.medicalHistory || 'Không'}</strong></p>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 bg-gray-50 rounded-lg border-2 border-gray-200 text-center">
                      <p className="text-gray-600">Chưa nhập thông tin mẹ</p>
                    </div>
                  )}
                </div>

                {/* Grid 2 cột cho thông tin vợ/chồng và anh chị em */}
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Card thông tin vợ/chồng */}
                  {familyData.spouse ? (
                    <div className="p-4 bg-gradient-to-r from-rose-50 to-pink-50 rounded-lg border-2 border-rose-300">
                      <h4 className="mb-3">💑 Thông tin vợ/chồng</h4>
                      <div className="space-y-2 text-sm">
                        <p>Họ tên: <strong>{familyData.spouse.name || 'Chưa nhập'}</strong></p>
                        <p>Chiều cao: <strong>{familyData.spouse.height || 'Chưa nhập'} cm</strong></p>
                        <p>Cân nặng: <strong>{familyData.spouse.weight || 'Chưa nhập'} kg</strong></p>
                        <p>Nhóm máu: <strong>{familyData.spouse.bloodType}</strong></p>
                        <p>Tiền sử bệnh: <strong>{familyData.spouse.medicalHistory || 'Không'}</strong></p>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 bg-gray-50 rounded-lg border-2 border-gray-200 text-center">
                      <p className="text-gray-600">Chưa nhập thông tin vợ/chồng</p>
                    </div>
                  )}

                  {/* Card thông tin anh/chị/em */}
                  {familyData.sibling ? (
                    <div className="p-4 bg-gradient-to-r from-green-50 to-teal-50 rounded-lg border-2 border-green-300">
                      <h4 className="mb-3">👫 Thông tin anh/chị/em</h4>
                      <div className="space-y-2 text-sm">
                        <p>Họ tên: <strong>{familyData.sibling.name || 'Chưa nhập'}</strong></p>
                        <p>Chiều cao: <strong>{familyData.sibling.height || 'Chưa nhập'} cm</strong></p>
                        <p>Cân nặng: <strong>{familyData.sibling.weight || 'Chưa nhập'} kg</strong></p>
                        <p>Nhóm máu: <strong>{familyData.sibling.bloodType}</strong></p>
                        <p>Tiền sử bệnh: <strong>{familyData.sibling.medicalHistory || 'Không'}</strong></p>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 bg-gray-50 rounded-lg border-2 border-gray-200 text-center">
                      <p className="text-gray-600">Chưa nhập thông tin anh/chị/em</p>
                    </div>
                  )}
                </div>

                {/* Cảnh báo nếu không có dữ liệu nào */}
                {!hasAnyData && (
                  <div className="p-6 bg-yellow-50 rounded-lg border-2 border-yellow-300 text-center">
                    <p className="text-yellow-800 mb-2">📝 Chưa có dữ liệu hồ sơ gia đình</p>
                    <p className="text-sm text-yellow-700">
                      Vui lòng nhập thông tin tại tab <strong>"Hồ sơ & Gia đình"</strong>
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* 
        Section 3: Card gợi ý phòng bệnh
        Hiển thị các bệnh di truyền và cách phòng ngừa
      */}
      <Card className="border-4 border-blue-200 shadow-xl bg-gradient-to-br from-white to-blue-50">
        <CardHeader className="bg-gradient-to-r from-blue-400 to-cyan-400 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-6 h-6" />
            Gợi ý phòng bệnh theo thế hệ
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {/* Map qua danh sách bệnh di truyền */}
            {geneticDiseases.map((disease, index) => (
              <div key={index} className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border-2 border-blue-200">
                <div className="flex justify-between items-start mb-2">
                  {/* Tên bệnh */}
                  <h4 className="flex-1">{disease.name}</h4>
                  {/* Badge mức độ nguy cơ với màu tương ứng */}
                  <span className={`px-3 py-1 rounded-full text-xs ${
                    disease.risk === 'Cao' ? 'bg-red-200 text-red-800' :      // Đỏ cho nguy cơ cao
                    disease.risk === 'Trung bình' ? 'bg-yellow-200 text-yellow-800' :  // Vàng cho TB
                    'bg-green-200 text-green-800'  // Xanh cho thấp
                  }`}>
                    {disease.risk}
                  </span>
                </div>
                {/* Thế hệ bị ảnh hưởng */}
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Ảnh hưởng:</strong> {disease.generation}
                </p>
                {/* Biện pháp phòng ngừa */}
                <p className="text-sm text-blue-700">
                  <strong>Phòng ngừa:</strong> {disease.prevention}
                </p>
              </div>
            ))}
          </div>

          {/* Box chiến lược phòng ngừa dài hạn */}
          <div className="mt-6 p-4 bg-yellow-50 rounded-lg border-2 border-yellow-300">
            <h4 className="mb-2">💡 Chiến lược phòng ngừa dài hạn</h4>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>Xây dựng lối sống lành mạnh từ thế hệ hiện tại</li>
              <li>Khám sức khỏe định kỳ và sàng lọc bệnh di truyền</li>
              <li>Giáo dục con cháu về tiền sử bệnh lý gia đình</li>
              <li>Duy trì cân nặng hợp lý và tập luyện đều đặn</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* 
        Section 4: Card lịch tiêm chủng
        Hiển thị lịch tiêm chủng theo độ tuổi
      */}
      <Card className="border-4 border-green-200 shadow-xl bg-gradient-to-br from-white to-green-50">
        <CardHeader className="bg-gradient-to-r from-green-400 to-teal-400 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <Syringe className="w-6 h-6" />
            Lịch tiêm chủng thông minh
          </CardTitle>
          <CardDescription className="text-green-100">
            Theo độ tuổi và giới tính
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-3">
            {/* Map qua lịch tiêm chủng */}
            {vaccineSchedule.map((schedule, index) => (
              <div key={index} className="p-4 bg-gradient-to-r from-green-50 to-teal-50 rounded-lg border-2 border-green-200">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div className="flex items-center gap-3">
                    {/* Số thứ tự trong vòng tròn */}
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-teal-400 flex items-center justify-center text-white">
                      {index + 1}
                    </div>
                    <div>
                      {/* Độ tuổi */}
                      <h4 className="mb-1">{schedule.age}</h4>
                      {/* Danh sách vaccine */}
                      <p className="text-sm text-gray-600">{schedule.vaccines}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Box lưu ý quan trọng */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
            <h4 className="mb-2">📋 Lưu ý quan trọng</h4>
            <ul className="text-sm space-y-1 list-disc list-inside text-gray-700">
              <li>Tuân thủ lịch tiêm chủng mở rộng quốc gia</li>
              <li>Tham khảo ý kiến bác sĩ trước khi tiêm</li>
              <li>Ghi chép đầy đủ sổ tiêm chủng</li>
              <li>Một số vaccine cần tiêm nhắc lại định kỳ</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ============================================
// KẾT THÚC FILE AnalysisPredict.tsx
// ============================================
// Tóm tắt chức năng:
// 1. Load dữ liệu hồ sơ gia đình từ localStorage
// 2. Tính toán dự đoán chiều cao dựa trên gen cha mẹ + bonus thế hệ
// 3. Tính toán cân nặng lý tưởng dựa trên BMI chuẩn Châu Á
// 4. Phân tích nguy cơ bệnh từ tiền sử gia đình
// 5. Hiển thị dữ liệu cho 5 thế hệ (F1-F5)
// 6. Gợi ý phòng bệnh và lịch tiêm chủng
// ============================================
