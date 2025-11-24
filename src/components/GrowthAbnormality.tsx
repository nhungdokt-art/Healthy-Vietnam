import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { AlertTriangle, Activity, Eye } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

const syndromes = [
  { name: 'Achondroplasia', traits: ['Chân ngắn', 'Tỷ lệ thân trên/dưới bất thường', 'Đầu to'], severity: 'high' },
  { name: 'Hypochondroplasia', traits: ['Chân ngắn nhẹ', 'Bàn tay ngắn'], severity: 'medium' },
  { name: 'Turner syndrome', traits: ['Lùn nữ', 'Cổ ngắn', 'Vai rộng/hông hẹp'], severity: 'high' },
  { name: 'Noonan syndrome', traits: ['Khuôn mặt đặc biệt', 'Cổ ngắn'], severity: 'medium' },
  { name: 'Russell-Silver syndrome', traits: ['Lùn không cân xứng', 'Đầu to'], severity: 'medium' },
  { name: 'Lùn tuyến yên', traits: ['Lùn cân xứng', 'Phát triển chậm'], severity: 'high' },
  { name: 'Suy giáp bẩm sinh', traits: ['Lùn', 'Phát triển chậm'], severity: 'high' },
  { name: 'Marfan syndrome', traits: ['Cao, gầy', 'Tay chân dài', 'Sải tay > chiều cao'], severity: 'high' },
  { name: 'Hội chứng Sotos', traits: ['Cao bất thường', 'Đầu to', 'Khuôn mặt đặc biệt'], severity: 'medium' },
  { name: 'Gigantism', traits: ['Cao vượt chuẩn', 'Tỷ lệ cơ thể bình thường'], severity: 'high' }
];

const facialFeatures = [
  'Đầu to bất thường',
  'Mắt xa nhau',
  'Tai thấp',
  'Cổ ngắn/dày',
  'Khuôn mặt không cân xứng',
  'Trán cao/rộng'
];

export function GrowthAbnormality() {
  const [data, setData] = useState({
    age: '',
    gender: 'male',
    height: '',
    weight: '',
    armSpan: '',
    legLength: '',
    upperBody: '',
    shoulderWidth: '',
    hipWidth: '',
    headCircumference: ''
  });

  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [abnormalityScore, setAbnormalityScore] = useState<number | null>(null);
  const [suggestedSyndromes, setSuggestedSyndromes] = useState<typeof syndromes>([]);

  const analyzeGrowth = () => {
    if (!data.height || !data.age) {
      toast.error('Vui lòng nhập đầy đủ thông tin cơ bản!');
      return;
    }

    let score = 0;
    const height = parseFloat(data.height);
    const age = parseFloat(data.age);
    const gender = data.gender;

    // Vietnam WHO standards approximation
    const expectedHeight = gender === 'male' 
      ? 168 + (age - 18) * 0.5 
      : 156 + (age - 18) * 0.3;
    
    const heightDiff = Math.abs(height - expectedHeight);
    
    // Height deviation score
    if (heightDiff > 30) score += 4;
    else if (heightDiff > 20) score += 3;
    else if (heightDiff > 10) score += 2;
    else if (heightDiff > 5) score += 1;

    // Body proportions analysis
    if (data.armSpan && data.height) {
      const armSpanRatio = parseFloat(data.armSpan) / height;
      if (Math.abs(armSpanRatio - 1.0) > 0.05) score += 2;
    }

    if (data.legLength && data.upperBody) {
      const legRatio = parseFloat(data.legLength) / parseFloat(data.upperBody);
      if (legRatio < 0.9 || legRatio > 1.1) score += 2;
    }

    if (data.shoulderWidth && data.hipWidth) {
      const shoulderHipRatio = parseFloat(data.shoulderWidth) / parseFloat(data.hipWidth);
      if (gender === 'male' && shoulderHipRatio < 1.0) score += 1;
      if (gender === 'female' && shoulderHipRatio > 1.1) score += 1;
    }

    // Facial features score
    score += selectedFeatures.length * 0.5;

    setAbnormalityScore(Math.min(score, 10));

    // Suggest syndromes based on features
    const suggested = syndromes.filter(syndrome => {
      if (height < expectedHeight - 20) {
        return syndrome.traits.some(t => t.includes('Lùn') || t.includes('ngắn'));
      } else if (height > expectedHeight + 20) {
        return syndrome.traits.some(t => t.includes('Cao') || t.includes('dài'));
      }
      return false;
    });

    setSuggestedSyndromes(suggested);
    toast.success('Đã phân tích xong!');
  };

  const getScoreColor = (score: number) => {
    if (score < 2) return { color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-300', label: 'Bình thường' };
    if (score < 4) return { color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-300', label: 'Cần theo dõi' };
    if (score < 7) return { color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-300', label: 'Nên khám' };
    return { color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-300', label: 'Cần khám ngay' };
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-4 border-red-200">
        <CardHeader className="bg-gradient-to-r from-red-400 to-orange-400 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-6 h-6" />
            Phát Hiện Bất Thường Tăng Trưởng
          </CardTitle>
          <CardDescription className="text-red-100">
            Hệ thống chấm điểm và phân tích hội chứng chuyên sâu
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Tuổi</Label>
              <Input
                type="number"
                value={data.age}
                onChange={(e) => setData({ ...data, age: e.target.value })}
                placeholder="Tuổi"
                className="border-2 border-red-200"
              />
            </div>
            <div>
              <Label>Giới tính</Label>
              <select
                value={data.gender}
                onChange={(e) => setData({ ...data, gender: e.target.value })}
                className="w-full p-2 border-2 border-red-200 rounded-md"
              >
                <option value="male">Nam</option>
                <option value="female">Nữ</option>
              </select>
            </div>
            <div>
              <Label>Chiều cao (cm)</Label>
              <Input
                type="number"
                value={data.height}
                onChange={(e) => setData({ ...data, height: e.target.value })}
                placeholder="Chiều cao"
                className="border-2 border-red-200"
              />
            </div>
          </div>

          {/* Body Proportions */}
          <Card className="bg-white border-2 border-orange-200">
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Tỷ lệ cơ thể (6 chỉ số)
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <Label>Sải tay (cm)</Label>
                <Input
                  type="number"
                  value={data.armSpan}
                  onChange={(e) => setData({ ...data, armSpan: e.target.value })}
                  placeholder="Sải tay"
                  className="border-2 border-orange-200"
                />
              </div>
              <div>
                <Label>Chiều dài chân (cm)</Label>
                <Input
                  type="number"
                  value={data.legLength}
                  onChange={(e) => setData({ ...data, legLength: e.target.value })}
                  placeholder="Chân"
                  className="border-2 border-orange-200"
                />
              </div>
              <div>
                <Label>Thân trên (cm)</Label>
                <Input
                  type="number"
                  value={data.upperBody}
                  onChange={(e) => setData({ ...data, upperBody: e.target.value })}
                  placeholder="Thân trên"
                  className="border-2 border-orange-200"
                />
              </div>
              <div>
                <Label>Rộng vai (cm)</Label>
                <Input
                  type="number"
                  value={data.shoulderWidth}
                  onChange={(e) => setData({ ...data, shoulderWidth: e.target.value })}
                  placeholder="Vai"
                  className="border-2 border-orange-200"
                />
              </div>
              <div>
                <Label>Rộng hông (cm)</Label>
                <Input
                  type="number"
                  value={data.hipWidth}
                  onChange={(e) => setData({ ...data, hipWidth: e.target.value })}
                  placeholder="Hông"
                  className="border-2 border-orange-200"
                />
              </div>
              <div>
                <Label>Vòng đầu (cm)</Label>
                <Input
                  type="number"
                  value={data.headCircumference}
                  onChange={(e) => setData({ ...data, headCircumference: e.target.value })}
                  placeholder="Vòng đầu"
                  className="border-2 border-orange-200"
                />
              </div>
            </CardContent>
          </Card>

          {/* Facial Features */}
          <Card className="bg-white border-2 border-purple-200">
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Đặc điểm khuôn mặt (6 đặc điểm)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {facialFeatures.map(feature => (
                  <div key={feature} className="flex items-center space-x-2">
                    <Checkbox
                      id={feature}
                      checked={selectedFeatures.includes(feature)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedFeatures([...selectedFeatures, feature]);
                        } else {
                          setSelectedFeatures(selectedFeatures.filter(f => f !== feature));
                        }
                      }}
                    />
                    <label htmlFor={feature} className="text-sm cursor-pointer">
                      {feature}
                    </label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Button
            onClick={analyzeGrowth}
            className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
            size="lg"
          >
            <AlertTriangle className="w-4 h-4 mr-2" />
            Phân tích bất thường
          </Button>
        </CardContent>
      </Card>

      {/* Results */}
      {abnormalityScore !== null && (
        <>
          <Card className={`border-4 ${getScoreColor(abnormalityScore).border} ${getScoreColor(abnormalityScore).bg}`}>
            <CardHeader className={`bg-gradient-to-r ${getScoreColor(abnormalityScore).color.replace('text-', 'from-')}-400 ${getScoreColor(abnormalityScore).color.replace('text-', 'to-')}-500 text-white rounded-t-lg`}>
              <CardTitle>Điểm Bất Thường</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className={`text-6xl ${getScoreColor(abnormalityScore).color}`}>
                  {abnormalityScore.toFixed(1)}/10
                </div>
                <p className={`text-xl mt-4 ${getScoreColor(abnormalityScore).color}`}>
                  {getScoreColor(abnormalityScore).label}
                </p>
                <div className="mt-6 w-full bg-gray-200 rounded-full h-4">
                  <div
                    className={`h-4 rounded-full ${getScoreColor(abnormalityScore).color.replace('text-', 'bg-')}`}
                    style={{ width: `${(abnormalityScore / 10) * 100}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {suggestedSyndromes.length > 0 && (
            <Card className="border-4 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
              <CardHeader className="bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-t-lg">
                <CardTitle>Hội Chứng Có Thể Liên Quan</CardTitle>
                <CardDescription className="text-purple-100">
                  Dựa trên các đặc điểm đã phân tích
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-3">
                {suggestedSyndromes.map((syndrome, index) => (
                  <div
                    key={syndrome.name}
                    className={`p-4 rounded-lg border-2 ${
                      syndrome.severity === 'high'
                        ? 'bg-red-50 border-red-300'
                        : 'bg-yellow-50 border-yellow-300'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{index + 1}</span>
                      <div className="flex-1">
                        <h4 className={syndrome.severity === 'high' ? 'text-red-700' : 'text-yellow-700'}>
                          {syndrome.name}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Triệu chứng: {syndrome.traits.join(', ')}
                        </p>
                        <p className={`text-xs mt-2 ${syndrome.severity === 'high' ? 'text-red-600' : 'text-yellow-600'}`}>
                          Mức độ: {syndrome.severity === 'high' ? '⚠️ Cần khám ngay' : '⚡ Nên theo dõi'}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="mt-6 p-4 bg-blue-50 rounded-lg border-2 border-blue-300">
                  <p className="text-sm text-blue-700">
                    ℹ️ <strong>Lưu ý:</strong> Đây chỉ là phân tích sơ bộ. Vui lòng tham khảo ý kiến bác sĩ chuyên khoa để được chẩn đoán chính xác.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
