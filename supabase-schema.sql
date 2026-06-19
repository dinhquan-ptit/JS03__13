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

-- Bảng đơn gọi món tại bàn (từ trang thucdon.html qua QR code)
create table if not exists orders (
  id         bigint generated always as identity primary key,
  so_ban     int         not null,
  ten_mon    text        not null,
  so_luong   int         not null default 1,
  gia        text,
  trang_thai text        not null default 'pending',
  created_at timestamptz default now()
);

-- Cho phép anon key đọc/ghi các bảng này (cần bật RLS + policy khi dùng anon key từ trình duyệt)
alter table datban  enable row level security;
alter table danhgia enable row level security;
alter table orders  enable row level security;

-- Policy: cho phép insert từ client (anon)
create policy "allow_insert_datban"  on datban  for insert to anon with check (true);
create policy "allow_insert_danhgia" on danhgia for insert to anon with check (true);
create policy "allow_insert_orders"  on orders  for insert to anon with check (true);

-- Policy: cho phép đọc đánh giá từ client
create policy "allow_select_danhgia" on danhgia for select to anon using (true);
