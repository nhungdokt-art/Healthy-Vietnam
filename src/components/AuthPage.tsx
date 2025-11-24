// Import các thư viện và components cần thiết
import { useState } from 'react'; // Hook để quản lý state trong React
import { Heart, User, Lock, Mail, Phone } from 'lucide-react'; // Import các icon từ thư viện lucide-react
import { Button } from './ui/button'; // Component button từ shadcn/ui
import { Input } from './ui/input'; // Component input từ shadcn/ui
import { Label } from './ui/label'; // Component label từ shadcn/ui
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'; // Các component card từ shadcn/ui
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'; // Component tabs để chuyển đổi giữa đăng nhập và đăng ký
import { toast } from 'sonner@2.0.3'; // Thư viện hiển thị thông báo toast

// Định nghĩa kiểu dữ liệu cho props của component AuthPage
interface AuthPageProps {
  onLogin: (username: string) => void; // Hàm callback được gọi khi đăng nhập thành công, nhận username làm tham số
}

// Component chính xử lý đăng nhập và đăng ký
export function AuthPage({ onLogin }: AuthPageProps) {
  // State quản lý dữ liệu form đăng nhập
  // identifier: có thể là username, email hoặc số điện thoại
  // password: mật khẩu người dùng nhập
  const [loginData, setLoginData] = useState({ identifier: '', password: '' });
  
  // State quản lý dữ liệu form đăng ký
  // Chứa tất cả thông tin cần thiết để tạo tài khoản mới
  const [registerData, setRegisterData] = useState({
    username: '', // Tên đăng nhập duy nhất
    email: '', // Địa chỉ email
    phone: '', // Số điện thoại
    password: '', // Mật khẩu
    confirmPassword: '' // Xác nhận mật khẩu (phải khớp với password)
  });

  // Tạo tài khoản demo mặc định khi component được mount lần đầu
  // useState được dùng như useEffect ở đây (chạy 1 lần khi component render)
  useState(() => {
    // Lấy dữ liệu users từ localStorage, nếu không có thì trả về object rỗng {}
    const users = JSON.parse(localStorage.getItem('healthyVN_users') || '{}');
    
    // Kiểm tra xem đã có user nào trong hệ thống chưa
    if (Object.keys(users).length === 0) {
      // Tạo tài khoản demo để test
      const demoUsers = {
        'demo': { // Tài khoản demo
          email: 'demo@healthyvietnam.com',
          phone: '0123456789',
          password: '123456',
          createdAt: new Date().toISOString() // Lưu thời gian tạo tài khoản
        }
      };
      
      // Lưu tài khoản demo vào localStorage
      localStorage.setItem('healthyVN_users', JSON.stringify(demoUsers));
      console.log('Đã tạo tài khoản demo'); // Log ra console để debug
    }
  });

  // Hàm xử lý đăng nhập
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault(); // Ngăn form tự động submit và reload trang
    
    // Lấy danh sách tất cả users từ localStorage
    const users = JSON.parse(localStorage.getItem('healthyVN_users') || '{}');
    
    // Loại bỏ khoảng trắng thừa ở đầu và cuối chuỗi identifier
    const identifier = loginData.identifier.trim();
    
    // Biến để lưu username tìm được
    let foundUsername = '';
    
    // Bước 1: Kiểm tra xem identifier có phải là username không
    // Nếu users[identifier] tồn tại, nghĩa là identifier chính là username
    if (users[identifier]) {
      foundUsername = identifier;
    } else {
      // Bước 2: Nếu không phải username, tìm kiếm bằng email hoặc số điện thoại
      // Duyệt qua tất cả users trong object
      for (const [username, userData] of Object.entries(users) as [string, any][]) {
        // So sánh identifier với email hoặc phone của từng user
        if (userData.email === identifier || userData.phone === identifier) {
          foundUsername = username; // Lưu username nếu tìm thấy
          break; // Dừng vòng lặp vì đã tìm thấy
        }
      }
    }
    
    // Bước 3: Kiểm tra xem đã tìm thấy user và mật khẩu có đúng không
    if (foundUsername && users[foundUsername].password === loginData.password) {
      // Đăng nhập thành công
      toast.success('Đăng nhập thành công!'); // Hiển thị thông báo thành công
      onLogin(foundUsername); // Gọi callback để thông báo cho component cha
    } else {
      // Đăng nhập thất bại (không tìm thấy user hoặc mật khẩu sai)
      toast.error('Tên đăng nhập/Số điện thoại/Email hoặc mật khẩu không đúng!');
    }
  };

  // Hàm xử lý đăng ký tài khoản mới
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault(); // Ngăn form tự động submit
    
    // Bước 1: Kiểm tra xem mật khẩu và xác nhận mật khẩu có khớp không
    if (registerData.password !== registerData.confirmPassword) {
      toast.error('Mật khẩu xác nhận không khớp!');
      return; // Dừng hàm nếu mật khẩu không khớp
    }

    // Bước 2: Kiểm tra độ dài mật khẩu (tối thiểu 6 ký tự)
    if (registerData.password.length < 6) {
      toast.error('Mật khẩu phải có ít nhất 6 ký tự!');
      return; // Dừng hàm nếu mật khẩu quá ngắn
    }

    // Bước 3: Lấy danh sách users hiện tại từ localStorage
    const users = JSON.parse(localStorage.getItem('healthyVN_users') || '{}');
    
    // Bước 4: Kiểm tra xem username đã tồn tại chưa
    if (users[registerData.username]) {
      toast.error('Tên đăng nhập đã tồn tại!');
      return; // Dừng hàm nếu username đã được sử dụng
    }

    // Bước 5: Tạo user mới và thêm vào object users
    users[registerData.username] = {
      email: registerData.email, // Lưu email
      phone: registerData.phone, // Lưu số điện thoại
      password: registerData.password, // Lưu mật khẩu (trong thực tế nên mã hóa)
      createdAt: new Date().toISOString() // Lưu thời gian tạo tài khoản
    };

    // Bước 6: Lưu danh sách users đã cập nhật vào localStorage
    localStorage.setItem('healthyVN_users', JSON.stringify(users));
    
    // Hiển thị thông báo thành công
    toast.success('Đăng ký thành công! Vui lòng đăng nhập.');
    
    // Bước 7: Reset form đăng ký về trạng thái ban đầu
    setRegisterData({
      username: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: ''
    });
  };

  // Render giao diện
  return (
    // Container chính với gradient background và căn giữa
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo & Title - Phần header của trang */}
        <div className="text-center mb-8">
          {/* Logo icon với hiệu ứng pulse (nhấp nháy) */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 rounded-full mb-4 shadow-lg animate-pulse">
            <Heart className="w-10 h-10 text-white" />
          </div>
          {/* Tiêu đề chính với gradient text */}
          <h1 className="bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
            Healthy Vietnam
          </h1>
          {/* Mô tả ngắn */}
          <p className="text-gray-600 mt-2">Chăm sóc sức khỏe toàn diện cho người Việt</p>
        </div>

        {/* Card chứa form đăng nhập/đăng ký */}
        <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
          {/* Header của card */}
          <CardHeader>
            <CardTitle className="text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Chào mừng bạn!
            </CardTitle>
            <CardDescription className="text-center">
              Đăng nhập hoặc tạo tài khoản mới
            </CardDescription>
          </CardHeader>
          
          {/* Nội dung chính của card */}
          <CardContent>
            {/* Tabs để chuyển đổi giữa form đăng nhập và đăng ký */}
            <Tabs defaultValue="login" className="w-full">
              {/* Danh sách các tab */}
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Đăng nhập</TabsTrigger>
                <TabsTrigger value="register">Đăng ký</TabsTrigger>
              </TabsList>

              {/* Tab content: Form đăng nhập */}
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  {/* Field nhập username/email/phone */}
                  <div className="space-y-2">
                    <Label htmlFor="login-identifier">Tên đăng nhập / Số điện thoại / Email</Label>
                    <div className="relative">
                      {/* Icon email bên trái input */}
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      {/* Input field với padding bên trái để chừa chỗ cho icon */}
                      <Input
                        id="login-identifier"
                        type="text"
                        placeholder="Nhập username, số điện thoại hoặc email"
                        className="pl-10"
                        value={loginData.identifier}
                        // Cập nhật state khi user nhập liệu
                        onChange={(e) => setLoginData({ ...loginData, identifier: e.target.value })}
                        required // Bắt buộc phải nhập
                      />
                    </div>
                  </div>

                  {/* Field nhập mật khẩu */}
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Mật khẩu</Label>
                    <div className="relative">
                      {/* Icon khóa bên trái input */}
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      {/* Input type password để ẩn ký tự */}
                      <Input
                        id="login-password"
                        type="password"
                        placeholder="Nhập mật khẩu"
                        className="pl-10"
                        value={loginData.password}
                        // Cập nhật state khi user nhập mật khẩu
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        required // Bắt buộc phải nhập
                      />
                    </div>
                  </div>

                  {/* Button submit form đăng nhập */}
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                  >
                    Đăng nhập
                  </Button>

                  {/* Box hiển thị thông tin tài khoản demo */}
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm mb-2">🔑 <strong>Tài khoản demo:</strong></p>
                    <div className="text-xs space-y-1">
                      {/* Tài khoản demo */}
                      <p>• Username: <code className="bg-white px-2 py-1 rounded">demo</code> | Mật khẩu: <code className="bg-white px-2 py-1 rounded">123456</code></p>
                      {/* Hướng dẫn thêm */}
                      <p className="text-gray-600 mt-2">Hoặc dùng email/SĐT: demo@healthyvietnam.com / 0123456789</p>
                    </div>
                  </div>
                </form>
              </TabsContent>

              {/* Tab content: Form đăng ký */}
              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  {/* Field nhập tên đăng nhập */}
                  <div className="space-y-2">
                    <Label htmlFor="register-username">Tên đăng nhập</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="register-username"
                        type="text"
                        placeholder="Chọn tên đăng nhập"
                        className="pl-10"
                        value={registerData.username}
                        onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  {/* Field nhập email */}
                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="register-email"
                        type="email" // Tự động validate format email
                        placeholder="example@email.com"
                        className="pl-10"
                        value={registerData.email}
                        onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  {/* Field nhập số điện thoại */}
                  <div className="space-y-2">
                    <Label htmlFor="register-phone">Số điện thoại</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="register-phone"
                        type="tel" // Type tel cho số điện thoại
                        placeholder="0912345678"
                        className="pl-10"
                        value={registerData.phone}
                        onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  {/* Field nhập mật khẩu */}
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Mật khẩu</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="register-password"
                        type="password"
                        placeholder="Tối thiểu 6 ký tự"
                        className="pl-10"
                        value={registerData.password}
                        onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  {/* Field xác nhận mật khẩu */}
                  <div className="space-y-2">
                    <Label htmlFor="register-confirm">Xác nhận mật khẩu</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="register-confirm"
                        type="password"
                        placeholder="Nhập lại mật khẩu"
                        className="pl-10"
                        value={registerData.confirmPassword}
                        onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  {/* Button submit form đăng ký */}
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                  >
                    Đăng ký
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Footer với thông tin đội ngũ phát triển */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Healthy Vietnam 1.0 - Phát triển bởi Healthy Vietnam Team<br />
          (Trưởng nhóm: Thân Vũ Hà Anh)
        </p>
      </div>
    </div>
  );
}
