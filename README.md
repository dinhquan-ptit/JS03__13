# JS03__13 — Website Quán Phở Cồ Nam Định

Bài tập lớn môn **JS03**. Website nhà hàng phở gồm: trang chủ, giới thiệu, thực đơn, đặt bàn (kèm chọn món), đánh giá, ưu đãi.

Backend: **Node.js (Express) + Supabase (Postgres)**.

## Tính năng chính
- **Đặt bàn** (`datban.html`): form có kiểm tra dữ liệu (validate) + **chọn món, tính tổng tiền** → lưu vào Supabase.
- **Thực đơn** (`thucdon.html`): tick chọn món → bấm **"Đặt Món"**; nếu chưa đặt bàn sẽ chuyển sang trang đặt bàn (món được mang theo).
- **Đánh giá** (`danhgia.html`): gửi đánh giá (tên + nội dung + số sao) → lưu Supabase, tự tải lại khi mở trang.
- **Bản đồ**: bấm icon bản đồ hiện popup Google Maps.

## Cách chạy
> Chi tiết xem `HUONG_DAN_CHAY.md`.

1. Tạo project Supabase, chạy `supabase-schema.sql` trong SQL Editor để tạo 2 bảng `datban`, `danhgia`.
2. Tạo file `.env` từ `.env.example`, điền `SUPABASE_URL` và `SUPABASE_KEY` (service_role).
3. Cài đặt & chạy:
   ```bash
   npm install
   npm start
   ```
4. Mở trình duyệt: **http://localhost:3000**

## Cấu trúc
| File | Vai trò |
|------|---------|
| `*.html` | Các trang giao diện |
| `server.js` | Express: phục vụ web + API `/api/datban`, `/api/danhgia` |
| `supabase-schema.sql` | SQL tạo bảng trên Supabase |
| `.env.example` | Mẫu cấu hình key (tạo `.env` từ đây — **không commit `.env`**) |
| `HUONG_DAN_CHAY.md` | Hướng dẫn chạy chi tiết |

> Lưu ý: `.env` (chứa key) và `node_modules/` không được đẩy lên GitHub (xem `.gitignore`).
