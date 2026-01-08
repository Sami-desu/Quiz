# 🎓 Quiz Học Tập Thông Minh

> **Sản phẩm sáng tạo sử dụng AI – Bài tập nhà trường**

---

## 📌 Thông tin chung

* **Tên sản phẩm**: Quiz Học Tập Thông Minh
* **Hình thức**: Ứng dụng web + Chatbot AI
* **Công cụ AI sử dụng**:

  * **Google Gemini 2.5 Pro** – tạo câu hỏi trắc nghiệm & chatbot hỗ trợ học tập
  * **GitHub Copilot** – hỗ trợ viết mã nguồn

---

## 🧠 Mô tả sản phẩm

**Quiz Học Tập Thông Minh** là một ứng dụng web trắc nghiệm học tập tương tác, giúp học sinh ôn luyện kiến thức một cách sinh động và hiệu quả. Ứng dụng tích hợp **AI Gemini** để tạo đề thi tự động và hỗ trợ giải đáp thắc mắc trong quá trình học tập.

Sản phẩm hướng đến việc:

* Đổi mới phương pháp học tập
* Tăng tính chủ động và hứng thú cho người học
* Minh họa rõ ràng cho việc **ứng dụng AI trong giáo dục**

---

## ✨ Tính năng nổi bật

* 🎨 **Giao diện hiện đại**
  Thiết kế đẹp mắt, responsive, sử dụng Tailwind CSS với hiệu ứng mượt mà.

* 📚 **Nhiều môn học**
  Hỗ trợ các bài trắc nghiệm về Toán, Khoa học, Lịch sử và nhiều môn khác.

* 🤖 **Tạo câu hỏi bằng AI**
  Gemini tự động sinh câu hỏi, đảm bảo mỗi lần làm bài là một bộ đề mới.

* ⏱ **Tính giờ làm bài**
  Giúp người học rèn luyện kỹ năng quản lý thời gian.

* 💬 **Chatbot AI hỗ trợ học tập**
  Người dùng có thể đặt câu hỏi và nhận giải thích trực tiếp từ AI.

* 🔐 **Bảo mật đáp án**
  Đáp án không lưu ở phía client, hạn chế gian lận trong quá trình làm bài.

---

## 🎯 Ý nghĩa giáo dục

* Giúp học sinh **ôn tập kiến thức hiệu quả** thông qua hình thức trắc nghiệm
* Tạo môi trường học tập **tương tác – cá nhân hóa** nhờ AI
* Góp phần truyền thông về **vai trò của trí tuệ nhân tạo trong giáo dục hiện đại**

---

## 🚀 Hướng dẫn sử dụng

### 👤 Dành cho người dùng (sử dụng trực tiếp trên web)

#### Bước 1: Lấy API Key Gemini

1. Truy cập **Google AI Studio**:
   👉 [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
2. Đăng nhập bằng tài khoản Google
3. Nhấn **Create API key**
4. Sao chép API key vừa tạo

#### Bước 2: Sử dụng ứng dụng

* Mở website của ứng dụng
* Dán API key vào hộp thoại yêu cầu
* Nhấn **Xác nhận** và bắt đầu làm quiz / chat với AI

> 🔒 API key chỉ được lưu tạm thời trong trình duyệt (`sessionStorage`)

---

### 👨‍💻 Dành cho lập trình viên (chạy local)

#### Yêu cầu môi trường

* Đã cài đặt **Node.js**: [https://nodejs.org/](https://nodejs.org/)

#### 1️⃣ Clone dự án

```bash
git clone <repository-url>
cd <repository-folder>
```

#### 2️⃣ Cài đặt thư viện

```bash
npm install
```

#### 3️⃣ Chạy ứng dụng

```bash
npm run dev
```

* Truy cập: `http://localhost:5173`
* Nhập API key Gemini để sử dụng đầy đủ tính năng

#### 4️⃣ Build để deploy

```bash
npm run build
```

* Thư mục `dist/` sẽ được tạo
* Có thể deploy lên **GitHub Pages, Vercel, Netlify**...

---

## 🛠 Công nghệ sử dụng

* **React + TypeScript**
* **Vite**
* **Tailwind CSS**
* **Google Gemini API**

---

## 🙌 Kết luận

**Quiz Học Tập Thông Minh** là một sản phẩm minh họa rõ ràng cho việc ứng dụng AI vào giáo dục học đường. Dự án không chỉ đáp ứng yêu cầu bài tập mà còn mang giá trị thực tiễn và khả năng phát triển trong tương lai.

> ✨ *Cảm ơn thầy/cô và mọi người đã theo dõi sản phẩm của nhóm!*
