import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { BookOpen, Target, Plus, Trash2, Check } from 'lucide-react';
import { toast } from 'sonner';

interface DiaryEntry {
  id: string;
  date: string;
  weight: string;
  height: string;
  mood: string;
  note: string;
}

interface Goal {
  id: string;
  title: string;
  target: string;
  deadline: string;
  completed: boolean;
}

export function DiaryGoals() {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [newEntry, setNewEntry] = useState({
    date: new Date().toISOString().split('T')[0],
    weight: '',
    height: '',
    mood: '',
    note: ''
  });
  const [newGoal, setNewGoal] = useState({
    title: '',
    target: '',
    deadline: ''
  });

  useEffect(() => {
    const savedDiary = localStorage.getItem('healthyVN_diary');
    const savedGoals = localStorage.getItem('healthyVN_goals');
    if (savedDiary) setDiaryEntries(JSON.parse(savedDiary));
    if (savedGoals) setGoals(JSON.parse(savedGoals));
  }, []);

  const saveDiaryEntry = () => {
    if (!newEntry.weight || !newEntry.height) {
      toast.error('Vui lòng nhập đầy đủ thông tin!');
      return;
    }

    const entry: DiaryEntry = {
      id: Date.now().toString(),
      ...newEntry
    };

    const updated = [entry, ...diaryEntries];
    setDiaryEntries(updated);
    localStorage.setItem('healthyVN_diary', JSON.stringify(updated));
    
    setNewEntry({
      date: new Date().toISOString().split('T')[0],
      weight: '',
      height: '',
      mood: '',
      note: ''
    });
    
    toast.success('Đã lưu nhật ký sức khỏe!');
  };

  const deleteEntry = (id: string) => {
    const updated = diaryEntries.filter(e => e.id !== id);
    setDiaryEntries(updated);
    localStorage.setItem('healthyVN_diary', JSON.stringify(updated));
    toast.success('Đã xóa mục nhật ký!');
  };

  const addGoal = () => {
    if (!newGoal.title || !newGoal.target) {
      toast.error('Vui lòng nhập đầy đủ thông tin mục tiêu!');
      return;
    }

    const goal: Goal = {
      id: Date.now().toString(),
      ...newGoal,
      completed: false
    };

    const updated = [goal, ...goals];
    setGoals(updated);
    localStorage.setItem('healthyVN_goals', JSON.stringify(updated));
    
    setNewGoal({
      title: '',
      target: '',
      deadline: ''
    });
    
    toast.success('Đã thêm mục tiêu mới!');
  };

  const toggleGoal = (id: string) => {
    const updated = goals.map(g => 
      g.id === id ? { ...g, completed: !g.completed } : g
    );
    setGoals(updated);
    localStorage.setItem('healthyVN_goals', JSON.stringify(updated));
    toast.success('Đã cập nhật trạng thái mục tiêu!');
  };

  const deleteGoal = (id: string) => {
    const updated = goals.filter(g => g.id !== id);
    setGoals(updated);
    localStorage.setItem('healthyVN_goals', JSON.stringify(updated));
    toast.success('Đã xóa mục tiêu!');
  };

  return (
    <div className="space-y-6">
      {/* Health Diary */}
      <Card className="bg-gradient-to-r from-teal-50 to-cyan-50 border-4 border-teal-200">
        <CardHeader className="bg-gradient-to-r from-teal-400 to-cyan-400 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-6 h-6" />
            Nhật Ký Sức Khỏe
          </CardTitle>
          <CardDescription className="text-teal-100">
            Ghi chép và theo dõi tình trạng sức khỏe hàng ngày
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Ngày</Label>
              <Input
                type="date"
                value={newEntry.date}
                onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
                className="border-2 border-teal-200"
              />
            </div>
            <div>
              <Label>Tâm trạng</Label>
              <select
                value={newEntry.mood}
                onChange={(e) => setNewEntry({ ...newEntry, mood: e.target.value })}
                className="w-full p-2 border-2 border-teal-200 rounded-md"
              >
                <option value="">Chọn tâm trạng</option>
                <option value="😊">😊 Vui vẻ</option>
                <option value="😐">😐 Bình thường</option>
                <option value="😔">😔 Buồn</option>
                <option value="😫">😫 Mệt mỏi</option>
                <option value="💪">💪 Tràn đầy năng lượng</option>
              </select>
            </div>
            <div>
              <Label>Cân nặng (kg)</Label>
              <Input
                type="number"
                step="0.1"
                value={newEntry.weight}
                onChange={(e) => setNewEntry({ ...newEntry, weight: e.target.value })}
                placeholder="VD: 65.5"
                className="border-2 border-teal-200"
              />
            </div>
            <div>
              <Label>Chiều cao (cm)</Label>
              <Input
                type="number"
                step="0.1"
                value={newEntry.height}
                onChange={(e) => setNewEntry({ ...newEntry, height: e.target.value })}
                placeholder="VD: 170"
                className="border-2 border-teal-200"
              />
            </div>
          </div>

          <div>
            <Label>Ghi chú</Label>
            <Textarea
              value={newEntry.note}
              onChange={(e) => setNewEntry({ ...newEntry, note: e.target.value })}
              placeholder="Ghi chú về sức khỏe, hoạt động, chế độ ăn uống..."
              className="border-2 border-teal-200"
              rows={3}
            />
          </div>

          <Button
            onClick={saveDiaryEntry}
            className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600"
          >
            <Plus className="w-4 h-4 mr-2" />
            Lưu nhật ký
          </Button>

          {/* Diary Entries List */}
          <div className="space-y-3 mt-6">
            <h4>Lịch sử nhật ký:</h4>
            {diaryEntries.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Chưa có nhật ký nào</p>
            ) : (
              diaryEntries.map(entry => (
                <div key={entry.id} className="p-4 bg-white rounded-lg border-2 border-teal-200">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-sm text-gray-600">{new Date(entry.date).toLocaleDateString('vi-VN')}</p>
                      <p className="text-lg">{entry.mood}</p>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteEntry(entry.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <p>Cân nặng: <span className="text-teal-600">{entry.weight} kg</span></p>
                    <p>Chiều cao: <span className="text-teal-600">{entry.height} cm</span></p>
                  </div>
                  {entry.note && (
                    <p className="mt-2 text-sm text-gray-700 bg-teal-50 p-2 rounded">{entry.note}</p>
                  )}
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Health Goals */}
      <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-4 border-orange-200">
        <CardHeader className="bg-gradient-to-r from-orange-400 to-red-400 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <Target className="w-6 h-6" />
            Mục Tiêu Sức Khỏe
          </CardTitle>
          <CardDescription className="text-orange-100">
            Đặt và theo dõi mục tiêu sức khỏe của bạn
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-1">
              <Label>Mục tiêu</Label>
              <Input
                value={newGoal.title}
                onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                placeholder="VD: Giảm cân"
                className="border-2 border-orange-200"
              />
            </div>
            <div>
              <Label>Chỉ tiêu</Label>
              <Input
                value={newGoal.target}
                onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
                placeholder="VD: 60kg"
                className="border-2 border-orange-200"
              />
            </div>
            <div>
              <Label>Hạn chót</Label>
              <Input
                type="date"
                value={newGoal.deadline}
                onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                className="border-2 border-orange-200"
              />
            </div>
          </div>

          <Button
            onClick={addGoal}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
          >
            <Plus className="w-4 h-4 mr-2" />
            Thêm mục tiêu
          </Button>

          {/* Goals List */}
          <div className="space-y-3 mt-6">
            <h4>Danh sách mục tiêu:</h4>
            {goals.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Chưa có mục tiêu nào</p>
            ) : (
              goals.map(goal => (
                <div
                  key={goal.id}
                  className={`p-4 rounded-lg border-2 ${
                    goal.completed
                      ? 'bg-green-50 border-green-300'
                      : 'bg-white border-orange-200'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleGoal(goal.id)}
                          className={goal.completed ? 'bg-green-500 text-white' : ''}
                        >
                          <Check className="w-4 h-4" />
                        </Button>
                        <h4 className={goal.completed ? 'line-through text-gray-500' : ''}>
                          {goal.title}
                        </h4>
                      </div>
                      <p className="text-sm text-gray-600 mt-2 ml-10">
                        Chỉ tiêu: <span className="text-orange-600">{goal.target}</span>
                      </p>
                      {goal.deadline && (
                        <p className="text-sm text-gray-600 ml-10">
                          Hạn: {new Date(goal.deadline).toLocaleDateString('vi-VN')}
                        </p>
                      )}
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteGoal(goal.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
