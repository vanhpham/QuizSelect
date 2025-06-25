# Quiz App - Ứng dụng Quiz Kiến Thức

Ứng dụng web để tạo và thực hiện quiz từ file CSV. Được xây dựng với Next.js, TypeScript và Tailwind CSS.

## Tính năng

- ✅ Hiển thị từng câu hỏi một trang với các lựa chọn A, B, C, D
- ✅ Người dùng chọn đáp án và kiểm tra kết quả
- ✅ Hiển thị đáp án đúng sau khi trả lời
- ✅ Theo dõi tiến độ và điểm số
- ✅ Kết quả cuối cùng với phần trăm điểm
- ✅ Giao diện đẹp và responsive
- ✅ Hỗ trợ Docker

## Cấu trúc file CSV

File `question.csv` cần có cấu trúc như sau:

```csv
"Câu hỏi","Lựa chọn A","Lựa chọn B","Lựa chọn C","Lựa chọn D","Đáp án đúng"
"Câu hỏi 1?","Đáp án A","Đáp án B","Đáp án C","Đáp án D","A"
```

## Cài đặt và chạy

### Cách 1: Chạy trực tiếp

```bash
# Cài đặt dependencies
npm install

# Chạy ở chế độ development
npm run dev

# Hoặc build và chạy production
npm run build
npm start
```

Ứng dụng sẽ chạy tại: http://localhost:3000

### Cách 2: Sử dụng Docker

```bash
# Build và chạy với Docker Compose
docker-compose up --build

# Hoặc chạy với Docker trực tiếp
docker build -t quiz-app .
docker run -p 3000:3000 quiz-app
```

Ứng dụng sẽ chạy tại: http://localhost:3000

## Cấu trúc dự án

```
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── globals.css      # CSS toàn cục
│   │   ├── layout.tsx       # Layout chính
│   │   └── page.tsx         # Trang chủ
│   ├── components/          # React components
│   │   ├── Quiz.tsx         # Component quiz chính
│   │   ├── QuestionCard.tsx # Component hiển thị câu hỏi
│   │   ├── ResultDisplay.tsx # Component hiển thị kết quả
│   │   ├── ProgressBar.tsx  # Thanh tiến độ
│   │   └── FinalResults.tsx # Kết quả cuối cùng
│   ├── types/               # TypeScript types
│   │   └── quiz.ts          # Types cho quiz
│   └── utils/               # Utilities
│       └── csvParser.ts     # Parser CSV
├── public/
│   └── question.csv         # File câu hỏi
├── Dockerfile               # Docker configuration
├── docker-compose.yml       # Docker Compose configuration
└── package.json             # Dependencies và scripts
```

## Công nghệ sử dụng

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Papa Parse** - CSV parsing
- **Docker** - Containerization

## Hướng dẫn sử dụng

1. Khởi động ứng dụng
2. Đọc câu hỏi và các lựa chọn
3. Chọn đáp án bạn cho là đúng
4. Nhấn "Xác nhận đáp án"
5. Xem kết quả và đáp án đúng
6. Nhấn "Câu tiếp theo" để tiếp tục
7. Xem kết quả cuối cùng và điểm số

## Tùy chỉnh

- Thay đổi file `public/question.csv` để cập nhật câu hỏi
- Chỉnh sửa styles trong `tailwind.config.js`
- Thêm/sửa components trong thư mục `src/components/`

## License

MIT License
