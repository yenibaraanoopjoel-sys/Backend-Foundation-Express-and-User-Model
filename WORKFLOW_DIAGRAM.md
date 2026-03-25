# Visual Workflow Diagrams

## 🎯 Complete System Workflow

```mermaid
graph TB
    Start([User Opens App]) --> Auth{Authenticated?}
    Auth -->|No| Login[Login/Register Page]
    Auth -->|Yes| Dashboard[Dashboard]
    
    Login --> |Success| Dashboard
    
    Dashboard --> CreatePost[Click Create Post]
    CreatePost --> SelectImage{Want to add image?}
    
    SelectImage -->|No| FillForm1[Fill Title & Content]
    FillForm1 --> Submit1[Submit Post]
    Submit1 --> SaveDB1[(Save to MongoDB)]
    SaveDB1 --> Redirect1[Redirect to Dashboard]
    
    SelectImage -->|Yes| ChooseFile[Choose Image File]
    ChooseFile --> Preview[Show Preview]
    Preview --> UploadBtn[Click Upload to Cloudinary]
    UploadBtn --> CloudUpload{{Upload to Cloudinary}}
    CloudUpload --> GetURL[Get secure_url]
    GetURL --> FillForm2[Fill Title & Content]
    FillForm2 --> Submit2[Submit Post with URL]
    Submit2 --> SaveDB2[(Save to MongoDB with coverImage)]
    SaveDB2 --> Redirect2[Redirect to Dashboard]
    
    Redirect1 --> Display[Display All Posts]
    Redirect2 --> Display
    
    Display --> Render{Has coverImage?}
    Render -->|Yes| ShowImage[Display with Image]
    Render -->|No| ShowText[Display Text Only]
    
    style CloudUpload fill:#ff9900
    style SaveDB1 fill:#00cc66
    style SaveDB2 fill:#00cc66
    style Display fill:#3498db
```

## 📤 Two-Step Upload Flow

```mermaid
sequenceDiagram
    actor User
    participant UI as React Frontend
    participant API as Express Backend
    participant Cloud as Cloudinary
    participant DB as MongoDB

    Note over User,DB: Step 1: Image Upload
    User->>UI: Select Image File
    UI->>UI: Validate File (type, size)
    UI->>UI: Create Preview
    User->>UI: Click "Upload to Cloudinary"
    UI->>UI: Create FormData
    UI->>API: POST /api/upload (multipart/form-data)
    API->>API: Multer receives file
    API->>Cloud: Stream upload with transformations
    Cloud-->>API: Return secure_url
    API-->>UI: Return { secure_url }
    UI->>UI: Store URL in state
    UI->>User: Show success message

    Note over User,DB: Step 2: Post Creation
    User->>UI: Fill Title & Content
    User->>UI: Click "Create Post"
    UI->>API: POST /api/posts { title, content, coverImage: URL }
    API->>DB: Save Post with coverImage
    DB-->>API: Confirm saved
    API-->>UI: Return created post
    UI->>User: Redirect to Dashboard
```

## 🔐 Authentication Flow

```mermaid
sequenceDiagram
    actor User
    participant UI as Frontend
    participant API as Backend
    participant DB as MongoDB

    Note over User,DB: Registration
    User->>UI: Enter name, email, password
    UI->>API: POST /api/auth/register
    API->>API: Validate input
    API->>API: Hash password (bcrypt)
    API->>DB: Save user
    API->>API: Generate JWT token
    API-->>UI: Return { user, token }
    UI->>UI: Store token in localStorage
    UI-->>User: Redirect to Dashboard

    Note over User,DB: Login
    User->>UI: Enter email, password
    UI->>API: POST /api/auth/login
    API->>DB: Find user by email
    API->>API: Compare password
    API->>API: Generate JWT token
    API-->>UI: Return { user, token }
    UI->>UI: Store token in localStorage
    UI-->>User: Redirect to Dashboard

    Note over User,DB: Protected Request
    User->>UI: Access protected page
    UI->>API: GET /api/posts (with Bearer token)
    API->>API: Verify JWT token
    API->>DB: Fetch data
    DB-->>API: Return data
    API-->>UI: Return response
    UI-->>User: Display data
```

## 🖼️ Image Upload Component Flow

```mermaid
stateDiagram-v2
    [*] --> NoImage: Component Mounted
    
    NoImage --> FileSelected: User selects file
    FileSelected --> Validating: Validate file
    
    Validating --> Error: Invalid (type/size)
    Validating --> Preview: Valid file
    
    Error --> NoImage: User removes
    
    Preview --> Uploading: Click Upload
    Preview --> NoImage: Click Remove
    
    Uploading --> UploadSuccess: Upload successful
    Uploading --> UploadError: Upload failed
    
    UploadSuccess --> NoImage: Click Remove
    UploadError --> Preview: Retry
    
    UploadSuccess --> [*]: Parent gets URL
```

## 📊 Data Structure Relationships

```mermaid
erDiagram
    USER ||--o{ POST : creates
    POST ||--o| CLOUDINARY_IMAGE : "has (optional)"
    
    USER {
        ObjectId _id PK
        string name
        string email UK
        string password "hashed"
        date createdAt
        date updatedAt
    }
    
    POST {
        ObjectId _id PK
        string title
        string content
        string coverImage "Cloudinary URL or null"
        ObjectId author FK
        date createdAt
        date updatedAt
    }
    
    CLOUDINARY_IMAGE {
        string public_id
        string secure_url
        int width
        int height
        string format
    }
```

## 🏗️ System Architecture

```mermaid
graph LR
    subgraph Frontend
        A[React App] --> B[Components]
        B --> C[Pages]
        C --> D[Context/State]
    end
    
    subgraph Backend
        E[Express Server] --> F[Routes]
        F --> G[Controllers]
        G --> H[Models]
    end
    
    subgraph External
        I[(MongoDB)]
        J[Cloudinary CDN]
    end
    
    D -->|HTTP/HTTPS| E
    H -->|Mongoose| I
    G -->|SDK| J
    
    style Frontend fill:#3498db,color:#fff
    style Backend fill:#2ecc71,color:#fff
    style External fill:#e74c3c,color:#fff
```

## 🔄 Request-Response Cycle

```mermaid
graph TB
    subgraph Client
        UI[User Interface]
        State[React State]
    end
    
    subgraph Server
        Routes[API Routes]
        Auth[Auth Middleware]
        Upload[Upload Middleware]
        Controller[Controllers]
    end
    
    subgraph Storage
        DB[(MongoDB)]
        Cloud{{Cloudinary}}
    end
    
    UI -->|1. Request| Routes
    Routes -->|2. Verify| Auth
    Auth -->|3. Check Token| Auth
    Auth -->|4. Process| Upload
    Upload -->|5. Validate| Upload
    Upload -->|6. Execute| Controller
    Controller -->|7a. Upload| Cloud
    Controller -->|7b. Save| DB
    Cloud -->|8a. URL| Controller
    DB -->|8b. Data| Controller
    Controller -->|9. Response| UI
    UI -->|10. Update| State
    
    style Client fill:#ecf0f1
    style Server fill:#95a5a6
    style Storage fill:#34495e,color:#fff
```

## 📱 Component Interaction

```mermaid
graph TD
    App[App.jsx] --> AuthProvider[AuthProvider]
    AuthProvider --> Router[React Router]
    
    Router --> Navbar[Navbar]
    Router --> Home[Home]
    Router --> Login[Login]
    Router --> Register[Register]
    Router --> Dashboard[Dashboard]
    Router --> CreatePost[CreatePost]
    
    CreatePost --> ImageUpload[ImageUpload]
    ImageUpload -.->|URL| CreatePost
    
    AuthProvider -.->|user, token| Navbar
    AuthProvider -.->|user, token| CreatePost
    AuthProvider -.->|user, token| Dashboard
    
    Dashboard --> API1[GET /api/posts]
    CreatePost --> API2[POST /api/posts]
    ImageUpload --> API3[POST /api/upload]
    Login --> API4[POST /api/auth/login]
    Register --> API5[POST /api/auth/register]
    
    style App fill:#3498db,color:#fff
    style AuthProvider fill:#e74c3c,color:#fff
    style ImageUpload fill:#f39c12,color:#fff
```

## ✅ Testing Flow

```mermaid
graph TB
    Start([Start Testing]) --> Register[1. Register User]
    Register --> Login[2. Login]
    Login --> CreateNoImg[3. Create Post Without Image]
    CreateNoImg --> CheckDB1{Check MongoDB}
    CheckDB1 -->|coverImage: null| Pass1[✓ Pass]
    
    Pass1 --> CreateWithImg[4. Create Post With Image]
    CreateWithImg --> UploadImg[Upload Image]
    UploadImg --> CheckCloud{Check Cloudinary}
    CheckCloud -->|Image exists| Pass2[✓ Pass]
    
    Pass2 --> SubmitPost[Submit Post]
    SubmitPost --> CheckDB2{Check MongoDB}
    CheckDB2 -->|coverImage: URL| Pass3[✓ Pass]
    
    Pass3 --> ViewDash[5. View Dashboard]
    ViewDash --> CheckDisplay{Images Display?}
    CheckDisplay -->|Both posts visible| Pass4[✓ Pass]
    
    Pass4 --> End([Testing Complete ✅])
    
    style Pass1 fill:#2ecc71,color:#fff
    style Pass2 fill:#2ecc71,color:#fff
    style Pass3 fill:#2ecc71,color:#fff
    style Pass4 fill:#2ecc71,color:#fff
    style End fill:#27ae60,color:#fff
```

---

## 📖 How to Use These Diagrams

These diagrams visualize:

1. **Complete System Workflow** - Overall user journey
2. **Two-Step Upload Flow** - Detailed sequence of image upload
3. **Authentication Flow** - User registration and login
4. **Image Upload Component** - State machine of upload component
5. **Data Relationships** - Database schema relationships
6. **System Architecture** - High-level system structure
7. **Request-Response Cycle** - API communication flow
8. **Component Interaction** - React component hierarchy
9. **Testing Flow** - Testing procedure

To view these diagrams:
- GitHub automatically renders mermaid diagrams in markdown
- VS Code: Install "Markdown Preview Mermaid Support" extension
- Online: Copy to https://mermaid.live/

---

*These diagrams complement the written documentation and provide visual understanding of the system.*
