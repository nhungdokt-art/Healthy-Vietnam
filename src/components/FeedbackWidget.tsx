import React, { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner';

export function FeedbackWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!feedback.trim()) {
      toast.error('Vui lòng nhập nội dung feedback');
      return;
    }

    setIsSubmitting(true);
    try {
      // Lưu feedback vào localStorage (hoặc có thể gửi tới backend)
      const feedbackList = JSON.parse(localStorage.getItem('healthyVN_feedbacks') || '[]');
      const newFeedback = {
        id: Date.now().toString(),
        text: feedback,
        timestamp: new Date().toLocaleString('vi-VN'),
        user: localStorage.getItem('healthyVN_currentUser') || 'Ẩn danh'
      };
      feedbackList.push(newFeedback);
      localStorage.setItem('healthyVN_feedbacks', JSON.stringify(feedbackList));

      toast.success('✅ Cảm ơn bạn! Feedback đã được ghi nhận.');
      setFeedback('');
      setIsOpen(false);
    } catch (error) {
      console.error('Lỗi lưu feedback:', error);
      toast.error('❌ Có lỗi khi gửi feedback. Vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Nút feedback nổi ở góc trái dưới */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 z-40 bg-gradient-to-br from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white p-4 rounded-full shadow-lg transition-all hover:shadow-xl transform hover:scale-110"
        title="Gửi feedback"
        aria-label="Feedback"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageSquare className="w-6 h-6" />
        )}
      </button>

      {/* Modal feedback */}
      {isOpen && (
        <div className="fixed bottom-24 left-6 z-50 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 p-6 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-cyan-500" />
              Góp ý & Phản hồi
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-3">
            <Textarea
              placeholder="Chia sẻ ý kiến của bạn về ứng dụng..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="resize-none h-24 focus:ring-2 focus:ring-cyan-500"
              disabled={isSubmitting}
            />

            <div className="flex gap-2">
              <Button
                onClick={() => setIsOpen(false)}
                variant="outline"
                className="flex-1"
                disabled={isSubmitting}
              >
                Đóng
              </Button>
              <Button
                onClick={handleSubmit}
                className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
                disabled={isSubmitting || !feedback.trim()}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Gửi...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Gửi
                  </>
                )}
              </Button>
            </div>

            <p className="text-xs text-gray-500 text-center">
              Cảm ơn bạn đã giúp chúng tôi cải thiện! 💙
            </p>
          </div>
        </div>
      )}
    </>
  );
}
