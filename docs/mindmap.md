# 🎯 SƠ ĐỒ HỆ THỐNG WEB LUYỆN NÓI TƯƠNG TỰ ELSA SPEAK

## 1. SƠ ĐỒ KIẾN TRÚC TỔNG QUAN

``
┌─────────────────────────────────────────────────────────────────┐
│                        USER INTERFACE                           │
├─────────────────────────────────────────────────────────────────┤
│                   Web App (React/Vue)                           │                                         
│                  - Speech Recording                             │                            
│                  - Real-time Feedback                           │                
│                  - Progress Tracking                            │                   
└─────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────┐
│                        API GATEWAY                              │
│  - Rate Limiting      │  - Authentication                       │
│  - Load Balancing     │  - Request Routing                      │
└─────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────┐
│                      MICROSERVICES LAYER                        │
├─────────────────┬─────────────────┬─────────────────┬───────────┤
│  User Service   │ Speech Service  │ Lesson Service  │ AI Service│
│  - Profile      │ - STT/TTS       │ - Content       │ - Analysis│
│  - Progress     │ - Pronunciation │ - Exercises     │ - Feedback│
│  - Achievements │ - Recording     │ - Curriculum    │ - Scoring │
└─────────────────┴─────────────────┴─────────────────┴───────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────┐
│                       DATA LAYER                                │
├─────────────────┬─────────────────┬─────────────────┬───────────┤
│  PostgreSQL     │ MongoDB         │ Redis Cache     │ File Store│
│  - User Data    │ - Audio Files   │ - Sessions      │ - Audio   │
│  - Progress     │ - Transcripts   │ - Real-time     │ - Models  │
│  - Scores       │ - Lessons       │ - Analytics     │ - Assets  │
└─────────────────┴─────────────────┴─────────────────┴───────────┘
```

## 2. SƠ ĐỒ LUỒNG LUYỆN NÓI (SPEECH FLOW)

```
[User Opens Lesson] 
        │
        ▼
[Display Word/Sentence]
        │
        ▼
[User Clicks Record] ◄─────────┐
        │                     │
        ▼                     │
[Start Audio Recording]       │
        │                     │
        ▼                     │
[User Speaks] ────────────────┐│
        │                     ││
        ▼                     ││
[Stop Recording]              ││
        │                     ││
        ▼                     ││
[Send Audio to AI Service]    ││
        │                     ││
        ▼                     ││
┌─────────────────────────────┐││
│     AI PROCESSING           │││
│  1. Speech-to-Text          │││
│  2. Pronunciation Analysis  │││
│  3. Accuracy Scoring        │││
│  4. Error Detection         │││
│  5. Feedback Generation     │││
└─────────────────────────────┘││
        │                     ││
        ▼                     ││
[Display Results]             ││
        │                     ││
        ▼                     ││
[Show Score & Feedback]       ││
        │                     ││
        ▼                     ││
[User Choice]                 ││
    │        │                ││
    ▼        ▼                ││
[Retry] ─────┘                │└─ [Next Word/Sentence]
    │                         │
    ▼                         ▼
[Continue] ──────────────────[Complete Lesson]
                              │
                              ▼
                        [Update Progress]
                              │
                              ▼
                        [Show Achievement]
```

## 3. 🎯 SƠ ĐỒ USE CASE

```
                    ┌─────────────────┐
                    │      USER       │
                    └─────────────────┘
                            │
            ┌───────────────┼───────────────┐
            │               │               │
            ▼               ▼               ▼
    ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
    │   STUDENT   │ │   TEACHER   │ │    ADMIN    │
    └─────────────┘ └─────────────┘ └─────────────┘
            │               │               │
    ┌───────┼───────┐       │       ┌───────┼───────┐
    │       │       │       │       │       │       │
    ▼       ▼       ▼       ▼       ▼       ▼       ▼
┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐
│Practice│ │View    │ │Track   │ │Create  │ │Manage  │ │View    │ │System  │
│Speaking│ │Progress│ │Score   │ │Content │ │Classes │ │Reports │ │Config  │
└────────┘ └────────┘ └────────┘ └────────┘ └────────┘ └────────┘ └────────┘
    │           │           │           │           │           │           │
    ▼           ▼           ▼           ▼           ▼           ▼           ▼
┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐
│Record  │ │Get     │ │View    │ │Upload  │ │Assign  │ │Export  │ │Backup  │
│Audio   │ │Feedback│ │History │ │Audio   │ │Lessons │ │Data    │ │Data    │
└────────┘ └────────┘ └────────┘ └────────┘ └────────┘ └────────┘ └────────┘
```

## 4. 📊 SƠ ĐỒ CƠ SỞ DỮ LIỆU (ERD)

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│     USERS       │    │    COURSES      │    │    LESSONS      │
├─────────────────┤    ├─────────────────┤    ├─────────────────┤
│ id (PK)         │    │ id (PK)         │    │ id (PK)         │
│ email           │    │ title           │    │ course_id (FK)  │
│ username        │    │ description     │    │ title           │
│ password_hash   │    │ level           │    │ content         │
│ full_name       │    │ category        │    │ audio_url       │
│ level           │    │ created_at      │    │ phonetic        │
│ created_at      │    │ updated_at      │    │ difficulty      │
│ updated_at      │    └─────────────────┘    │ order_index     │
└─────────────────┘             │             │ created_at      │
         │                      │             │ updated_at      │
         │                      │             └─────────────────┘
         │                      │                      │
         │               ┌──────▼──────┐               │
         │               │ ENROLLMENTS │               │
         │               ├─────────────┤               │
         │               │ id (PK)     │               │
         │               │ user_id(FK) │               │
         │               │ course_id(FK)│              │
         │               │ enrolled_at │               │
         │               │ progress    │               │
         │               │ status      │               │
         │               └─────────────┘               │
         │                                            │
         └────────────┐                    ┌──────────┘
                      │                    │
                      ▼                    ▼
         ┌─────────────────┐    ┌─────────────────┐
         │  USER_PROGRESS  │    │   RECORDINGS    │
         ├─────────────────┤    ├─────────────────┤
         │ id (PK)         │    │ id (PK)         │
         │ user_id (FK)    │    │ user_id (FK)    │
         │ lesson_id (FK)  │    │ lesson_id (FK)  │
         │ attempts        │    │ audio_file      │
         │ best_score      │    │ transcript      │
         │ last_attempt    │    │ score           │
         │ completed       │    │ pronunciation   │
         │ created_at      │    │ feedback        │
         │ updated_at      │    │ duration        │
         └─────────────────┘    │ recorded_at     │
                                └─────────────────┘
```

## 5. SƠ ĐỒ XỬ LÝ GIỌNG NÓI (SPEECH PROCESSING)

```
┌─────────────────┐
│  AUDIO INPUT    │
│  (Microphone)   │
└─────────────────┘
         │
         ▼
┌─────────────────┐
│ AUDIO CAPTURE   │
│ - Format: WAV   │
│ - Sample: 16kHz │
│ - Channels: Mono│
└─────────────────┘
         │
         ▼
┌─────────────────┐
│ PREPROCESSING   │
│ - Noise Filter  │
│ - Normalization │
│ - Silence Trim  │
└─────────────────┘
         │
         ▼
┌─────────────────┐
│ FEATURE         │
│ EXTRACTION      │
│ - MFCC Features │
│ - Spectogram    │
│ - Pitch/Tone    │
└─────────────────┘
         │
         ▼ ┌─────────────────┐
┌─────────────────┐ │  REFERENCE      │
│ SPEECH-TO-TEXT  │ │  PRONUNCIATION  │
│ - Google STT    │ │  - IPA Phonemes │
│ - Azure Speech  │ │  - Native Audio │
│ - Whisper AI    │ │  - Score Model  │
└─────────────────┘ └─────────────────┘
         │                   │
         └─────────┬─────────┘
                   ▼
         ┌─────────────────┐
         │ PRONUNCIATION   │
         │ ANALYSIS        │
         │ - Phoneme Match │
         │ - Timing Align  │
         │ - Accuracy Score│
         └─────────────────┘
                   │
                   ▼
         ┌─────────────────┐
         │ FEEDBACK        │
         │ GENERATION      │
         │ - Error Points  │
         │ - Suggestions   │
         │ - Visual Guide  │
         └─────────────────┘
                   │
                   ▼
         ┌─────────────────┐
         │ RESULT OUTPUT   │
         │ - Overall Score │
         │ - Word Scores   │
         │ - Improvements  │
         └─────────────────┘
```

## 6. 🎮 SƠ ĐỒ GIAO DIỆN NGƯỜI DÙNG (UI FLOW)

```
[Splash Screen]
       │
       ▼
[Login/Register] ──► [Forgot Password]
       │
       ▼
[Dashboard/Home]
       │
   ┌───┼───┐
   │   │   │
   ▼   ▼   ▼
[My    [Browse  [Profile]
Progress] Courses]   │
   │       │        │
   ▼       ▼        ▼
[Lesson  [Course   [Settings]
 History] Details]     │
   │       │           │
   ▼       ▼           ▼
[Review  [Start     [Account]
 Score]   Lesson]      │
           │           │
           ▼           ▼
      [Practice    [Logout]
       Screen]
           │
       ┌───┼───┐
       │   │   │
       ▼   ▼   ▼
   [Record] [Review] [Next]
      │      │       │
      ▼      ▼       │
   [Analysis] [Retry] │
      │      │       │
      ▼      └───────┤
   [Feedback]       │
      │             │
      └─────────────┘
```

## 7. 🔄 SƠ ĐỒ API ENDPOINTS

```
┌─────────────────────────────────────────────────────────────┐
│                        API ROUTES                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  🔐 AUTHENTICATION                                          
│  POST   /api/auth/register                                  │
│  POST   /api/auth/login                                     │
│  POST   /api/auth/logout                                    │
│  POST   /api/auth/refresh                                   │
│  POST   /api/auth/forgot-password                           │
│                                                             │
│  👤 USER MANAGEMENT                                         
│  GET    /api/users/profile                                  │
│  PUT    /api/users/profile                                  │
│  GET    /api/users/progress                                 │
│  GET    /api/users/achievements                             │
│                                                             │
│  📚 COURSE MANAGEMENT                                       
│  GET    /api/courses                                        │
│  GET    /api/courses/{id}                                   │
│  POST   /api/courses/{id}/enroll                            │
│  GET    /api/courses/{id}/lessons                           │
│                                                             │
│  📖 LESSON MANAGEMENT                                       
│  GET    /api/lessons/{id}                                   │
│  POST   /api/lessons/{id}/start                             │
│  POST   /api/lessons/{id}/complete                          │
│                                                             │
│  🎤 SPEECH PROCESSING                                       
│  POST   /api/speech/upload                                  │
│  POST   /api/speech/analyze                                 │
│  GET    /api/speech/pronunciation/{id}                      │
│  POST   /api/speech/compare                                 │
│                                                             │
│  📊 PROGRESS TRACKING                                       
│  GET    /api/progress/overview                              │
│  GET    /api/progress/lessons                               │
│  GET    /api/progress/statistics                            │
│  POST   /api/progress/update                                │
│                                                             │
│  🎯 SCORING & FEEDBACK                                      
│  POST   /api/scoring/evaluate                               │
│  GET    /api/feedback/{recording_id}                        │
│  POST   /api/feedback/save                                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 8. 🏭 SƠ ĐỒ DEPLOYMENT & INFRASTRUCTURE

```
┌─────────────────────────────────────────────────────────────┐
│                         USERS                               │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    LOAD BALANCER                            │
│                  (AWS ALB / Nginx)                          │
└─────────────────────────────────────────────────────────────┘
                            │
            ┌───────────────┼───────────────┐
            │               │               │
            ▼               ▼               ▼
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│   WEB SERVER    │ │   WEB SERVER    │ │   WEB SERVER    │
│   (Node.js)     │ │   (Node.js)     │ │   (Node.js)     │
│   Container 1   │ │   Container 2   │ │   Container 3   │
└─────────────────┘ └─────────────────┘ └─────────────────┘
            │               │               │
            └───────────────┼───────────────┘
                            │
            ┌───────────────┼───────────────┐
            │               │               │
            ▼               ▼               ▼
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│   REDIS CACHE   │ │   DATABASE      │ │   FILE STORAGE  │
│   (Session)     │ │  (PostgreSQL)   │ │   (AWS S3)      │
└─────────────────┘ └─────────────────┘ └─────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│              EXTERNAL SERVICES                              │
├─────────────────┬─────────────────┬─────────────────────────┤
│  Speech APIs    │  AI Services    │  Monitoring             │
│  - Google STT   │  - OpenAI GPT   │  - CloudWatch           │
│  - Azure Speech │  - Custom ML    │  - DataDog              │
│  - AWS Polly    │  - TensorFlow   │  - Sentry               │
└─────────────────┴─────────────────┴─────────────────────────┘
```