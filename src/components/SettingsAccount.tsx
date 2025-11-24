import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Settings, Download, Trash2, Info } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';

interface SettingsAccountProps {
  onLogout: () => void;
}

export function SettingsAccount({ onLogout }: SettingsAccountProps) {
  const exportHealthData = () => {
    const data = {
      profile: localStorage.getItem('healthyVN_familyProfile'),
      diary: localStorage.getItem('healthyVN_diary'),
      goals: localStorage.getItem('healthyVN_goals'),
      studyPlan: localStorage.getItem('healthyVN_studyPlan'),
      exportDate: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `healthy-vietnam-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast.success('Đã xuất dữ liệu sức khỏe!');
  };

  const deleteAllData = () => {
    const currentUser = localStorage.getItem('healthyVN_currentUser');
    const users = localStorage.getItem('healthyVN_users');
    
    localStorage.clear();
    
    // Restore users but remove current user
    if (users && currentUser) {
      const usersObj = JSON.parse(users);
      delete usersObj[currentUser];
      localStorage.setItem('healthyVN_users', JSON.stringify(usersObj));
    }

    toast.success('Đã xóa toàn bộ dữ liệu!');
    setTimeout(() => {
      onLogout();
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-4 border-blue-200">
        <CardHeader className="bg-gradient-to-r from-blue-400 to-indigo-400 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-6 h-6" />
            Cài Đặt & Tài Khoản
          </CardTitle>
          <CardDescription className="text-blue-100">
            Quản lý dữ liệu và tài khoản của bạn
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg border-2 border-green-200">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-green-700 mb-1">Xuất dữ liệu sức khỏe</h4>
                  <p className="text-sm text-gray-600">Tải xuống toàn bộ dữ liệu của bạn</p>
                </div>
                <Button
                  onClick={exportHealthData}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Xuất dữ liệu
                </Button>
              </div>
            </div>

            <div className="p-4 bg-white rounded-lg border-2 border-red-200">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-red-700 mb-1">Xóa tài khoản</h4>
                  <p className="text-sm text-gray-600">Xóa vĩnh viễn tất cả dữ liệu</p>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Xóa tài khoản
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Bạn có chắc chắn?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Hành động này không thể hoàn tác. Tất cả dữ liệu của bạn sẽ bị xóa vĩnh viễn.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Hủy</AlertDialogCancel>
                      <AlertDialogAction onClick={deleteAllData} className="bg-red-600">
                        Xóa vĩnh viễn
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* App Info */}
      <Card className="border-4 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
        <CardHeader className="bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <Info className="w-6 h-6" />
            Thông Tin Ứng Dụng
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-3 text-center">
            <div className="text-6xl mb-4">❤️</div>
            <h3 className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Healthy Vietnam
            </h3>
            <p className="text-gray-600">Phiên bản 1.0</p>
            <div className="p-4 bg-white rounded-lg border-2 border-purple-200">
              <p className="text-sm text-gray-700">
                Phát triển bởi <strong>Healthy Vietnam Team</strong>
              </p>
              <p className="text-sm text-purple-600 mt-1">
                Trưởng nhóm: Thân Vũ Hà Anh
              </p>
            </div>

            <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border-2 border-blue-200 text-left">
              <h4 className="mb-2 text-center">Tính năng đặc biệt:</h4>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>✅ Dự đoán sức khỏe đa thế hệ (F1-F5)</li>
                <li>✅ Phát hiện bất thường tăng trưởng</li>
                <li>✅ Kế hoạch cân nặng cá nhân hóa</li>
                <li>✅ Chuyên biệt cho vùng núi</li>
                <li>✅ Tích hợp giáo dục - sức khỏe</li>
                <li>✅ Đánh giá sinh sản toàn diện</li>
              </ul>
            </div>

            <p className="text-xs text-gray-500 mt-4">
              © 2025 Healthy Vietnam. All rights reserved.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Security Info */}
      <Card className="border-4 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
        <CardHeader className="bg-gradient-to-r from-green-400 to-emerald-400 text-white rounded-t-lg">
          <CardTitle>Bảo Mật & Quyền Riêng Tư</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-3 text-sm">
            <p>🔒 <strong>Mã hóa:</strong> Dữ liệu được lưu trữ cục bộ trên thiết bị của bạn</p>
            <p>🔐 <strong>Bảo mật:</strong> Mật khẩu được mã hóa SHA-256</p>
            <p>💾 <strong>Lưu trữ:</strong> Tất cả dữ liệu chỉ lưu trên trình duyệt của bạn</p>
            <p>🚫 <strong>Không chia sẻ:</strong> Chúng tôi không thu thập hay chia sẻ dữ liệu của bạn</p>
            <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-300 mt-4">
              <p className="text-yellow-800 text-xs">
                ⚠️ <strong>Lưu ý:</strong> Figma Make không dành cho việc thu thập thông tin cá nhân nhạy cảm hoặc dữ liệu y tế thực. Đây chỉ là ứng dụng demo.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
