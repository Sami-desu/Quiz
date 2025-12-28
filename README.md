## Đây là bài tập nhà trường giao
## Đề bài
# Sản phẩm sáng tạo tạo bởi AI 
Mỗi nhóm phải tạo ít nhất 1 sản phẩm có sử dụng công cụ AI.
Hình thức sản phẩm (chọn 1 hoặc kết hợp):
Video ngắn (từ 30s trở lên)
Truyện tranh / comic
Infographic
Bài hát / đoạn nhạc
Câu chuyện ngắn / kịch bản 
Chatbot mô phỏng (không cần code phức tạp)
Sản phẩm sáng tạo khác 
Yêu cầu:Phải nêu rõ công cụ AI đã sử dụng
Sản phẩm phù hợp với chủ đề đã chọn
Có ý nghĩa truyền thông / giáo dục / minh họa
Ví dụ công cụ AI có thể dùng:
ChatGPT (viết nội dung, kịch bản)
Canva AI (infographic, poster)
DALL·E / Midjourney (hình ảnh)
Veo3 (video)
Suno / Soundraw (âm nhạc)……

# Vì vậy sản phẩm này hoàn toàn do sự hỗ trợ của Gemini 2.5 pro và Github Copilot làm ra

# Quiz Học Tập Thông Minh

Một ứng dụng web trắc nghiệm học tập tương tác, được xây dựng bằng React, TypeScript và Tailwind CSS. Ứng dụng tích hợp chatbot Gemini AI để hỗ trợ người dùng giải đáp thắc mắc và nâng cao trải nghiệm học tập.

## Tính năng

-   **Giao diện hiện đại**: Thiết kế đẹp mắt, responsive với hiệu ứng mượt mà.
-   **Nhiều môn học**: Cung cấp các bài trắc nghiệm đa dạng về Toán, Khoa học, Lịch sử, và nhiều hơn nữa.
-   **Tạo đề bằng AI**: Các câu hỏi được tạo động bằng Gemini, đảm bảo mỗi lần làm bài là một trải nghiệm mới.
-   **Tính giờ làm bài**: Thử thách người dùng với thời gian giới hạn cho mỗi bài quiz.
-   **Trợ lý AI (Chatbot)**: Tích hợp Google Gemini để trả lời các câu hỏi liên quan đến học tập.
-   **Bảo mật đáp án**: Đáp án được AI chấm điểm phía sau, không lưu trữ ở client để tránh gian lận.

## Hướng dẫn sử dụng

### Dành cho Người dùng (Sử dụng trực tiếp trên web)

1.  **Lấy API Key**:
    -   Truy cập [Google AI Studio](https://aistudio.google.com/app/apikey).
    -   Đăng nhập bằng tài khoản Google của bạn.
    -   Nhấn vào **"Create API key"** để tạo một key mới.
    -   Sao chép (copy) API key vừa tạo.

2.  **Khởi động ứng dụng**:
    -   Khi truy cập trang web, bạn sẽ thấy một hộp thoại yêu cầu nhập API Key.
    -   Dán API key của bạn vào ô nhập liệu và nhấn **"Bắt đầu"**.
    -   Bây giờ bạn có thể bắt đầu làm bài trắc nghiệm và sử dụng chatbot.

### Dành cho Lập trình viên (Chạy trên máy local)

Dự án này sử dụng Vite làm công cụ build. Bạn cần có [Node.js](https://nodejs.org/) đã được cài đặt.

1.  **Clone repository**:
    ```bash
    git clone <repository-url>
    cd <repository-folder>
    ```

2.  **Cài đặt các thư viện**:
    ```bash
    npm install
    ```

3.  **Tạo file `.env.local`**:
    -   Trong thư mục gốc của dự án, sao chép file `.env.example` (nếu có) hoặc tạo một file mới có tên là `.env.local`.

4.  **Thêm API Key**:
    -   Mở file `.env.local` và thêm dòng sau, thay `YOUR_API_KEY_HERE` bằng API key bạn đã lấy từ Google AI Studio:
        ```
        VITE_API_KEY=YOUR_API_KEY_HERE
        ```
    -   **Lưu ý**: Tên biến phải bắt đầu bằng `VITE_` để Vite có thể đọc được.

5.  **Chạy ứng dụng**:
    -   Khởi động server phát triển bằng lệnh:
        ```bash
        npm run dev
        ```
    -   Mở trình duyệt và truy cập vào địa chỉ được cung cấp 
    -   Ứng dụng sẽ tự động đọc API key và bạn sẽ vào thẳng trang chủ.

6.  **Build để triển khai (Deploy)**:
    -   Khi bạn đã sẵn sàng deploy, chạy lệnh sau:
        ```bash
        npm run build
        ```
    -   Lệnh này sẽ tạo ra một thư mục `dist` chứa tất cả các file tĩnh đã được tối ưu. Bạn có thể host thư mục này trên bất kỳ dịch vụ nào như GitHub Pages, Vercel, hoặc Netlify.

---

Cảm ơn bạn đã sử dụng ứng dụng!
