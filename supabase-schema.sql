-- =====================================================
--  Chạy trong Supabase Dashboard -> SQL Editor -> New query -> Run
--  Tạo 2 bảng: datban, danhgia
-- =====================================================

create table if not exists datban (
  id         bigint generated always as identity primary key,
  ho_ten     text        not null,
  sdt        text        not null,
  email      text        not null,
  so_nguoi   int         not null,
  ngay       date        not null,
  gio        time        not null,
  ghi_chu    text,
  mon        jsonb       default '[]'::jsonb,  -- danh sách món đã gọi
  tong_tien  int         default 0,
  created_at timestamptz default now()
);

create table if not exists danhgia (
  id         bigint generated always as identity primary key,
  ten        text        not null,
  noidung    text        not null,
  sao        smallint    not null,            -- 1..5
  created_at timestamptz default now()
);

-- Server dùng key service_role nên bỏ qua RLS, không cần policy.
-- (Nếu sau này muốn gọi trực tiếp từ trình duyệt bằng anon key thì mới cần bật RLS + policy.)
