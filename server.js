import express from 'express';
import cors from 'cors';
import Anthropic from '@anthropic-ai/sdk';

const app = express();
app.use(cors());
app.use(express.json());

const client = new Anthropic();

const SYSTEM_PROMPT = `Bạn là một chuyên gia sức khỏe và dinh dưỡng giàu kinh nghiệm của Ứng dụng Healthy Vietnam. 
Bạn giúp người dùng (đặc biệt là thanh thiếu niên) về các vấn đề sức khỏe, dinh dưỡng, phát triển chiều cao, tập luyện và lối sống lành mạnh.

Hướng dẫn tư vấn:
1. Luôn lắng nghe và hiểu nhu cầu cụ thể của người dùng
2. Cung cấp lời khuyên dựa trên khoa học và chứng minh
3. Khuyến khích lối sống lành mạnh: ăn uống cân bằng, tập thể dục đều đặn, ngủ đủ giấc
4. Nếu vấn đề y tế nghiêm trọng, khuyên người dùng tham khảo ý kiến bác sĩ
5. Sử dụng ngôn ngữ thân thiện, dễ hiểu, có chứa emoji để tăng tính hấp dẫn
6. Trả lời bằng Tiếng Việt

Các lĩnh vực chuyên môn:
- 📊 Dinh dưỡng: Protein, Canxi, Vitamin D, Kẽm, Calo, Chất béo, Carbohydrate
- 📏 Tăng chiều cao: Di truyền, vận động, giấc ngủ, dinh dưỡng, BMI, môi trường
- 💪 Tập luyện: Bóng rổ, bơi lội, yoga, nhảy dây, cầu lông, đu xà, giãn cơ
- 😴 Giấc ngủ: Thời gian ngủ lý tưởng, giờ ngủ tốt nhất, chất lượng giấc ngủ
- ⚖️ Cân nặng & BMI: Chỉ số BMI, cân nặng lý tưởng, cách duy trì sức khỏe
- 🏥 Sức khỏe chung: Phòng bệnh, khỏe mạnh, miễn dịch, năng lượng

Lưu ý:
- Không chẩn đoán bệnh, chỉ cung cấp thông tin tổng quát
- Nếu người dùng mô tả các triệu chứng bệnh, hãy khuyên gặp bác sĩ
- Tôn trọng riêng tư và không yêu cầu thông tin cá nhân nhạy cảm
- Giữ vui vẻ, hỗ trợ và tích cực`;

app.post('/api/chat', async (req, res) => {
  try {
    const { message, history, profile } = req.body;

    if (!message || message.trim().length === 0) {
      return res.status(400).json({ error: 'Vui lòng nhập tin nhắn' });
    }

    // Construct messages for the LLM: include system prompt, optional history, optional profile info
    const messagesForModel = [];

    if (SYSTEM_PROMPT) {
      // Anthropic SDK supports 'system' param separately; we still pass it via 'system' below
    }

    if (Array.isArray(history)) {
      history.forEach(h => {
        if (h && h.role && h.content) {
          messagesForModel.push({ role: h.role, content: h.content });
        }
      });
    }

    // Add profile summary if provided
    if (profile && typeof profile === 'object') {
      const profileSummary = `User profile: ${Object.entries(profile).map(([k,v]) => `${k}: ${v}`).join('; ')}`;
      messagesForModel.push({ role: 'user', content: profileSummary });
    }

    // Add the current user message at the end
    messagesForModel.push({ role: 'user', content: message });

    // Add commercial persona reminder to system prompt
    const systemWithPersona = SYSTEM_PROMPT + '\n\nHãy ký danh là "HV AI (Gemini)", trả lời bằng tiếng Việt, phong cách thương mại thân thiện, ngắn gọn, kèm CTA khi phù hợp.';

    const response = await client.messages.create({
      model: process.env.ANTHROPIC_MODEL || 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      system: systemWithPersona,
      messages: messagesForModel
    });

    const assistantMessage = Array.isArray(response.content) && response.content[0].type === 'text' ? response.content[0].text : '';

    res.json({ success: true, message: assistantMessage });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({
      success: false,
      error: 'Có lỗi xảy ra. Vui lòng thử lại sau.'
    });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`AI Server chạy trên port ${PORT}`);
});
