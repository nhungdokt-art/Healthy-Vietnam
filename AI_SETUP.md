# Hướng dẫn sử dụng AI Assistant

## Cấu hình API Key

### 1. Lấy API Key từ Anthropic Claude

1. Truy cập: https://console.anthropic.com/
2. Đăng nhập hoặc tạo tài khoản
3. Vào "API Keys" và tạo một API key mới
4. Copy API key

### 2. Cấu hình .env file

Mở file `.env` trong thư mục gốc của dự án:

```
ANTHROPIC_API_KEY=your_actual_api_key_here
```

Thay `your_actual_api_key_here` bằng API key thực của bạn.

## Chạy ứng dụng

### Terminal 1 - Chạy server AI

```bash
npm run server
```

Server sẽ chạy trên `http://localhost:3001`

### Terminal 2 - Chạy ứng dụng React

```bash
npm run dev
```

Ứng dụng sẽ chạy trên `http://localhost:3000`

## Các tính năng AI Assistant

✅ **Tư vấn dinh dưỡng**: Hỏi về protein, canxi, vitamin, v.v.
✅ **Lời khuyên tăng chiều cao**: Chi tiết về 7 yếu tố ảnh hưởng
✅ **Giấc ngủ & sức khỏe**: Thời gian ngủ, giờ ngủ lý tưởng
✅ **Tập luyện**: Các môn thể thao giúp tăng chiều cao
✅ **Cân nặng & BMI**: Thông tin về chỉ số sức khỏe

## Fallback Mode

Nếu server AI không khả dụng, ứng dụng sẽ tự động sử dụng các câu trả lời mặc định. Bạn sẽ thấy thông báo lỗi nhưng vẫn có thể trò chuyện với AI.

## Lưu ý

- Lịch sử chat được lưu tự động vào localStorage
- Server AI cần ANTHROPIC_API_KEY để hoạt động
- Đảm bảo cả hai server đang chạy để sử dụng AI thực sự
