/* =====================================================
   Server Node.js + Supabase cho BTL JS03 (Quán Phở)
   - Phục vụ luôn các trang HTML (static) ngay tại đây.
   - API: /api/datban, /api/danhgia (POST = lưu, GET = danh sách)
   - Dữ liệu lưu ở Supabase (Postgres) qua @supabase/supabase-js.
   Chạy:  npm install  ->  npm start  ->  http://localhost:3000
   ===================================================== */

require('dotenv').config();
const express = require('express');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const { SUPABASE_URL, SUPABASE_KEY, PORT = 3000 } = process.env;

if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error('⚠️  Thiếu SUPABASE_URL / SUPABASE_KEY. Hãy tạo file .env (xem .env.example).');
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const app = express();
app.use(express.json());
app.use(express.static(__dirname)); // phục vụ index.html, ảnh, ...

const emailOk = e => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e || '');
const sdtOk   = s => /^0\d{9}$/.test(s || '');

/* ===================== ĐẶT BÀN ===================== */
app.post('/api/datban', async (req, res) => {
    const { ho_ten, sdt, email, so_nguoi, ngay, gio, ghi_chu, mon, tong_tien } = req.body;

    if (!ho_ten || !sdtOk(sdt) || !emailOk(email) ||
        !(so_nguoi >= 1 && so_nguoi <= 50) || !ngay || !gio) {
        return res.status(400).json({ ok: false, error: 'Dữ liệu đặt bàn không hợp lệ.' });
    }

    const { data, error } = await supabase
        .from('datban')
        .insert({
            ho_ten, sdt, email,
            so_nguoi, ngay, gio,
            ghi_chu: ghi_chu || '',
            mon: mon || [],
            tong_tien: tong_tien || 0
        })
        .select('id')
        .single();

    if (error) return res.status(500).json({ ok: false, error: error.message });
    res.json({ ok: true, id: data.id });
});

app.get('/api/datban', async (req, res) => {
    const { data, error } = await supabase
        .from('datban').select('*').order('created_at', { ascending: false });
    if (error) return res.status(500).json({ ok: false, error: error.message });
    res.json({ ok: true, data });
});

/* ===================== ĐÁNH GIÁ ===================== */
app.post('/api/danhgia', async (req, res) => {
    const { ten, noidung, sao } = req.body;

    if (!ten || !noidung || !(sao >= 1 && sao <= 5)) {
        return res.status(400).json({ ok: false, error: 'Dữ liệu đánh giá không hợp lệ.' });
    }

    const { data, error } = await supabase
        .from('danhgia')
        .insert({ ten, noidung, sao })
        .select('id')
        .single();

    if (error) return res.status(500).json({ ok: false, error: error.message });
    res.json({ ok: true, id: data.id });
});

app.get('/api/danhgia', async (req, res) => {
    const { data, error } = await supabase
        .from('danhgia').select('*').order('created_at', { ascending: false });
    if (error) return res.status(500).json({ ok: false, error: error.message });
    res.json({ ok: true, data });
});

app.listen(PORT, () => {
    console.log(`✅ Server chạy tại: http://localhost:${PORT}`);
});
