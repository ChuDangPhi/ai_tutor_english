# WEB HỌC TIẾNG ANH VỚI TRỢ LÝ ẢO AI - TÀI LIỆU PHÂN TÍCH CHỨC NĂNG VÀ PHI CHỨC NĂNG

## 📋 TỔNG QUAN DỰ ÁN

**Tên dự án:** Web Học Tiếng Anh với Trợ lý Ảo AI  
**Mô tả:** Website hỗ trợ học tiếng Anh cho người Việt Nam sử dụng công nghệ AI  
**Công nghệ:** FastAPI, Python, SQLite, OpenAI/Gemini API  
**Tác giả:** ChuDangPhi  

---

## 🎯 CHỨC NĂNG CHÍNH (FUNCTIONAL REQUIREMENTS)

### 1. QUẢN LÝ NGƯỜI DÙNG
#### 1.1 Đăng ký tài khoản
- **Mô tả:** Học viên có thể tạo tài khoản mới
- **Input:** Email, mật khẩu, tên đầy đủ, trình độ tiếng Anh hiện tại
- **Output:** Tài khoản được tạo thành công
- **Quy tắc nghiệp vụ:**
  - Email phải duy nhất
  - Mật khẩu tối thiểu 8 ký tự
  - Xác định trình độ ban đầu (A1-C2)

#### 1.2 Đăng nhập
- **Mô tả:** Học viên đăng nhập vào hệ thống
- **Input:** Email, mật khẩu
- **Output:** JWT token, thông tin học viên
- **Quy tắc nghiệp vụ:**
  - Xác thực thông tin đăng nhập
  - Tạo session token có thời hạn

#### 1.3 Quản lý hồ sơ
- **Mô tả:** Cập nhật thông tin cá nhân và mục tiêu học tập
- **Input:** Tên, avatar, trình độ mục tiêu, sở thích chủ đề
- **Output:** Thông tin được cập nhật

### 2. CHỨC NĂNG AI TUTORING - HỌC TIẾNG ANH
#### 2.1 Hội thoại thông minh (AI Conversation)
- **Mô tả:** AI trò chuyện với học viên bằng tiếng Anh
- **Input:** Tin nhắn của học viên (text/voice)
- **Output:** Phản hồi từ AI teacher, sửa lỗi ngữ pháp
- **AI Models:** OpenAI GPT, Google Gemini
- **Tính năng:**
  - Điều chỉnh độ khó theo level
  - Chủ đề đa dạng: daily life, business, travel, etc.
  - Phát âm chuẩn (Text-to-Speech)

#### 2.2 Kiểm tra ngữ pháp tự động
- **Mô tả:** AI phân tích và sửa lỗi ngữ pháp
- **Input:** Câu tiếng Anh của học viên
- **Output:** Câu đã được sửa, giải thích lỗi chi tiết

#### 2.3 Luyện phát âm (Pronunciation Practice)
- **Mô tả:** AI đánh giá và cải thiện phát âm
- **Input:** File âm thanh của học viên
- **Output:** Điểm số phát âm, gợi ý cải thiện
- **Công nghệ:** Speech-to-Text, phonetic analysis

#### 2.4 Đề xuất bài học cá nhân hóa
- **Mô tả:** AI đề xuất nội dung phù hợp trình độ
- **Input:** Level hiện tại, điểm yếu, sở thích
- **Output:** Kế hoạch học tập cá nhân

#### 2.5 Chấm bài tự động
- **Mô tả:** AI chấm bài tập và đưa ra feedback
- **Input:** Bài làm của học viên
- **Output:** Điểm số, nhận xét chi tiết

### 3. QUẢN LÝ HỌC TẬP
#### 3.1 Theo dõi tiến độ học tập
- **Mô tả:** Ghi nhận và hiển thị tiến độ học tiếng Anh
- **Input:** Hoạt động học tập hàng ngày
- **Output:** Báo cáo tiến độ, thống kê kỹ năng
- **Metrics:**
  - Listening, Speaking, Reading, Writing scores
  - Vocabulary learned
  - Grammar topics mastered

#### 3.2 Lưu trữ lịch sử học tập
- **Mô tả:** Lưu các cuộc hội thoại và bài học
- **Input:** Dữ liệu học tập
- **Output:** Lịch sử có thể ôn tập lại

#### 3.3 Từ điển cá nhân
- **Mô tả:** Lưu từ vựng đã học và cần ôn tập
- **Input:** Từ vựng mới gặp
- **Output:** Danh sách từ vựng với ví dụ

### 4. NỘI DUNG HỌC TẬP
#### 4.1 Phân loại theo kỹ năng
- **Listening:** Nghe hiểu audio, video
- **Speaking:** Luyện nói, phát âm


#### 4.2 Phân cấp độ (CEFR Standard)
- **A1-A2:** Beginner (Người mới bắt đầu)
- **B1-B2:** Intermediate (Trung cấp)
- **C1-C2:** Advanced (Nâng cao)

#### 4.3 Chủ đề đa dạng
- **Daily Life:** Cuộc sống hàng ngày
- **Business English:** Tiếng Anh thương mại
- **Travel:** Du lịch
- **Academic:** Học thuật
- **IELTS/TOEIC Preparation:** Luyện thi

---

## ⚡ YÊU CẦU PHI CHỨC NĂNG (NON-FUNCTIONAL REQUIREMENTS)

### 1. HIỆU SUẤT (PERFORMANCE)
#### 1.1 Thời gian phản hồi
- **API Response Time:** < 300ms
- **AI Response Time:** < 3 giây (text), < 5 giây (voice)
- **Database Query:** < 100ms
- **Audio Processing:** < 2 giây

#### 1.2 Throughput
- **Concurrent Users:** Hỗ trợ 200 học viên đồng thời
- **API Requests:** 2000 requests/phút
- **Voice Processing:** 50 concurrent sessions

### 2. KHẢ NĂNG MỞ RỘNG (SCALABILITY)
#### 2.1 Horizontal Scaling
- Khả năng triển khai multiple instances
- Load balancer hỗ trợ

#### 2.2 Database Scaling
- Hỗ trợ database replication
- Caching mechanism (Redis)

### 3. BẢO MẬT (SECURITY)
#### 3.1 Authentication & Authorization
- **JWT Token:** Thời hạn 30 phút
- **Password:** Mã hóa bcrypt
- **API Keys:** Bảo mật trong environment variables

#### 3.2 Data Protection
- **HTTPS:** Bắt buộc cho production
- **SQL Injection:** Sử dụng ORM parameterized queries
- **Rate Limiting:** 60 requests/phút per user

### 4. ĐỘ TIN CẬY (RELIABILITY)
#### 4.1 Uptime
- **Target:** 99.9% uptime
- **Backup:** Tự động backup database hàng ngày

#### 4.2 Error Handling
- Graceful error messages
- Logging system đầy đủ


## 🏗️ KIẾN TRÚC HỆ THỐNG

### Kiến trúc tổng quan:
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Web Frontend  │    │   FastAPI       │    │   Database      │
│   (React/Vue)   │◄──►│   Backend       │◄──►│   (SQLite)      │
│   English UI    │    │   API Server    │    │   User Data     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                              │
                              ▼
                       ┌─────────────────┐
                       │   AI Services   │
                       │ OpenAI/Gemini   │
                       │ Speech-to-Text  │
                       │ Text-to-Speech  │
                       └─────────────────┘
```

### Cấu trúc thư mục:
```
english_learning_ai/
├── app/
│   ├── core/           # Core configuration
│   ├── models/         # User, Progress, Lesson models
│   ├── routers/        # API endpoints
│   │   ├── auth.py     # Authentication
│   │   ├── conversation.py  # AI Chat
│   │   ├── pronunciation.py # Speech processing
│   │   └── progress.py      # Learning progress
│   ├── schemas/        # Pydantic schemas
│   ├── services/       # AI integration services
│   │   ├── openai_service.py
│   │   ├── speech_service.py
│   │   └── grammar_service.py
│   └── utils/          # Utilities
├── tests/              # Unit tests
├── docs/               # Documentation
└── requirements.txt    # Dependencies
```

---

## 📊 SƠ ĐỒ CHỨC NĂNG (FUNCTIONAL DIAGRAM)

### Use Case Diagram:
```
                    English Learning AI System
                           
    Student                                    Teacher/Admin
       │                                         │
       ├── Register Account                      ├── Manage Students
       ├── Login/Logout                          ├── Monitor Progress
       ├── Start Conversation ──┐                ├── View Analytics
       ├── Practice Pronunciation│                ├── Create Lessons
       ├── Submit Writing        │                └── Manage Content
       ├── Take Grammar Quiz     │
       ├── View Progress         │
       ├── Review Vocabulary     │
       └── Chat History          │
                                │
                    ┌───────────▼────────────┐
                    │     AI Teacher         │
                    │                        │
                    ├── Conversation Practice
                    ├── Grammar Correction
                    ├── Pronunciation Assessment
                    ├── Writing Feedback
                    ├── Vocabulary Teaching
                    ├── Progress Tracking
                    └── Personalized Lessons
```

### Data Flow Diagram:
```
Student Input ──► Web Interface ──► Authentication ──► Learning Service
(Text/Voice)                                                │
                                                           ▼
Database ◄── Progress Tracking ◄── AI Processing ◄────────┘
   │                              │
   │                              ├── Grammar Analysis
   │                              ├── Speech Recognition
   │                              ├── Conversation AI
   │                              └── Feedback Generation
   ▼                              │
Learning ◄── Format Response ◄────┘
Report
```

---

## 🔄 QUY TRÌNH HOẠT ĐỘNG

### 1. Quy trình đăng ký và đánh giá trình độ:
1. Student nhập thông tin → Validation → Level assessment test → Save profile → Welcome orientation

### 2. Quy trình luyện hội thoại với AI:
1. Student chọn topic → AI generates conversation starter → Student responds → AI analyzes & replies → Save conversation history

### 3. Quy trình chấm phát âm:
1. Student records voice → Speech-to-Text → Phonetic analysis → Compare with native speaker → Return pronunciation score & tips

### 4. Quy trình học từ vựng:
1. AI introduces new words → Context examples → Student practices → Quiz/Test → Add to personal dictionary → Schedule review

---

## 📈 METRICS VÀ KPI

### Technical Metrics:
- Response time < 300ms
- Uptime > 99.9%
- Error rate < 0.1%
- Test coverage > 85%
- Speech recognition accuracy > 95%
- Grammar correction accuracy > 98%

### Business Metrics:
- Student retention rate > 70%
- Daily active users
- Lessons completed per day
- CEFR level improvement rate
- Student satisfaction score > 4.5/5
- Average study time per session
- Vocabulary words learned per week

### Learning Effectiveness Metrics:
- Speaking fluency improvement
- Pronunciation accuracy score
- Grammar mistake reduction rate
- Vocabulary retention rate
- IELTS/TOEIC score improvement

---

*Tài liệu này sẽ được cập nhật theo quá trình phát triển dự án*

---

