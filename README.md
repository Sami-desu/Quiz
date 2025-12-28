# Đây là bài tập nhà trường giao
## Sản phẩm sáng tạo tạo bởi AI 
## Vì vậy sản phẩm này hoàn toàn do sự hỗ trợ của Gemini 2.5 pro và Github Copilot làm ra
## Đề bài
Mỗi nhóm phải tạo **ít nhất 01 sản phẩm có sử dụng công cụ AI**.

### Hình thức sản phẩm (chọn 1 hoặc kết hợp)
- Video ngắn (từ 30 giây trở lên)
- Truyện tranh / Comic
- Infographic
- Bài hát / Đoạn nhạc
- Câu chuyện ngắn / Kịch bản
- Chatbot mô phỏng (không cần code phức tạp)
- Hình thức sáng tạo khác

---

## Yêu cầu
- Nêu rõ **công cụ AI đã sử dụng**
- Sản phẩm phù hợp với **chủ đề đã chọn**
- Có **ý nghĩa giáo dục / truyền thông / minh họa**
- Thể hiện được sự sáng tạo của nhóm

------
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
    -   Dán API key của bạn vào ô nhập liệu và nhấn **"Xác nhận"**.
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

3.  **Chạy ứng dụng**:
    -   Khởi động server phát triển bằng lệnh:
        ```bash
        npm run dev
        ```
    -   Mở trình duyệt và truy cập vào địa chỉ được cung cấp (thường là `http://localhost:5173`).
    -   Giống như người dùng thông thường, bạn sẽ được yêu cầu nhập API Key trong giao diện web. Key này sẽ được lưu tạm thời trong `sessionStorage` của trình duyệt.

4.  **Build để triển khai (Deploy)**:
    -   Khi bạn đã sẵn sàng deploy, chạy lệnh sau:
        ```bash
        npm run build
        ```
    -   Lệnh này sẽ tạo ra một thư mục `dist` chứa tất cả các file tĩnh đã được tối ưu. Bạn có thể host thư mục này trên bất kỳ dịch vụ nào như GitHub Pages, Vercel, hoặc Netlify.

---

Cảm ơn bạn đã sử dụng ứng dụng!
