var SUPABASE_URL = 'https://bdvzhcrwuivpzkzmczri.supabase.co';
var SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJkdnpoY3J3dWl2cHprem1jenJpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA5MDIwMTMsImV4cCI6MjA5NjQ3ODAxM30.rO5zV9oL8DHR30NjfEO72MmZcwviohxdTuiyKrC2m8g';
var db = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

var KEY_MON_AN   = 'qlnhahang_monan';
var KEY_BAN_AN   = 'qlnhahang_banan';
var KEY_DON_HANG = 'qlnhahang_donhang';

var dsMonAn   = [];
var dsBanAn   = [];
var dsDonHang = [];
var donItems  = [];
var currentSection = 'tongquan';

function saveData() {
  localStorage.setItem(KEY_MON_AN,   JSON.stringify(dsMonAn));
  localStorage.setItem(KEY_BAN_AN,   JSON.stringify(dsBanAn));
  localStorage.setItem(KEY_DON_HANG, JSON.stringify(dsDonHang));
}

function loadData() {
  var mon = localStorage.getItem(KEY_MON_AN);
  var ban = localStorage.getItem(KEY_BAN_AN);
  var don = localStorage.getItem(KEY_DON_HANG);
  dsMonAn   = mon ? JSON.parse(mon) : [];
  dsBanAn   = ban ? JSON.parse(ban) : [];
  dsDonHang = don ? JSON.parse(don) : [];
}

function initDefaultData() {
  if (dsMonAn.length === 0) {
    dsMonAn = [
      { id: 1,  ten: 'Phở đặc biệt',     gia: 75000, loai: 'mon-chinh', mota: 'Đầy đủ topping, nước dùng đậm đà', hinh: 'monan/phodacbiet.png'    },
      { id: 2,  ten: 'Phở tái chín',      gia: 65000, loai: 'mon-chinh', mota: 'Thịt bò tái và chín thơm ngon',    hinh: 'monan/photaichin.jpg'    },
      { id: 3,  ten: 'Phở chín',          gia: 60000, loai: 'mon-chinh', mota: 'Phở bò chín truyền thống',         hinh: 'monan/phochin.jpg'       },
      { id: 4,  ten: 'Phở tái lăn',       gia: 65000, loai: 'mon-chinh', mota: 'Thịt tái lăn qua nước sôi',        hinh: 'monan/pho-tai-lan.jpg'   },
      { id: 5,  ten: 'Phở áp chảo',       gia: 70000, loai: 'mon-chinh', mota: 'Phở xào giòn rụm hấp dẫn',        hinh: 'monan/phoapchao.jpg'     },
      { id: 6,  ten: 'Phở tái gầu',       gia: 60000, loai: 'mon-chinh', mota: 'Kết hợp thịt tái và gầu giòn',    hinh: 'monan/photigau.jpg'      },
      { id: 7,  ten: 'Phở tái bắp',       gia: 60000, loai: 'mon-chinh', mota: 'Thịt tái và bắp bò dai ngon',     hinh: 'monan/photibap.jpg'      },
      { id: 8,  ten: 'Phở tái nạm',       gia: 60000, loai: 'mon-chinh', mota: 'Thịt tái kết hợp nạm mềm',        hinh: 'monan/photinam.jpg'      },
      { id: 9,  ten: 'Phở xào',           gia: 65000, loai: 'mon-chinh', mota: 'Phở xào với rau thơm và thịt bò', hinh: 'monan/phoxao.jpg'        },
      { id: 10, ten: 'Cơm rang dưa bò',   gia: 50000, loai: 'mon-chinh', mota: 'Cơm rang thơm với thịt bò',       hinh: 'monan/comrangduabo.jpg'  },
      { id: 11, ten: 'Cơm rang dưa gà',   gia: 50000, loai: 'mon-chinh', mota: 'Cơm rang thơm với thịt gà',       hinh: 'monan/comrangduiga.jpg'  },
      { id: 12, ten: 'Cơm rang thập cẩm', gia: 55000, loai: 'mon-chinh', mota: 'Đầy đủ topping phong phú',        hinh: 'monan/comrangthapcam.jpg'},
      { id: 13, ten: 'Cơm rang trứng',    gia: 45000, loai: 'mon-chinh', mota: 'Cơm rang trứng đơn giản ngon',    hinh: 'monan/comrangtrung.jpg'  },
      { id: 14, ten: 'Cơm rang xúc xích', gia: 50000, loai: 'mon-chinh', mota: 'Cơm rang với xúc xích thơm',     hinh: 'monan/comrangxucxich.jpg'},
      { id: 15, ten: 'Cơm rang cải bò',   gia: 50000, loai: 'mon-chinh', mota: 'Cơm rang cải xanh và bò',        hinh: 'monan/comrangcaibo.jpg'  },
      { id: 16, ten: 'Mỳ xào',            gia: 55000, loai: 'mon-chinh', mota: 'Mỳ xào rau củ và thịt',          hinh: 'monan/myxao.jpg'         },
      { id: 17, ten: 'Bò xào rau cải',    gia: 60000, loai: 'mon-chinh', mota: 'Bò xào với rau cải tươi',        hinh: 'monan/boxaoraucai.jpg'   },
      { id: 18, ten: 'Pepsi',             gia: 20000, loai: 'do-uong',   mota: 'Nước ngọt có ga Pepsi lon',       hinh: 'monan/pepsi.jpg'         },
      { id: 19, ten: '7UP',               gia: 20000, loai: 'do-uong',   mota: 'Nước ngọt có ga 7UP lon',         hinh: 'monan/7up.jpg'           },
      { id: 20, ten: 'Mirinda',           gia: 20000, loai: 'do-uong',   mota: 'Nước ngọt Mirinda cam lon',       hinh: 'monan/mirinda.jpg'       },
      { id: 21, ten: 'Aquafina',          gia: 15000, loai: 'do-uong',   mota: 'Nước suối Aquafina 500ml',        hinh: 'monan/aquafina.jpg'      },
      { id: 22, ten: 'Nước tăng lực',     gia: 25000, loai: 'do-uong',   mota: 'Nước tăng lực tăng năng lượng',  hinh: 'monan/nuoctangluc.jpg'   },
      { id: 23, ten: 'Tea Plus',          gia: 20000, loai: 'do-uong',   mota: 'Trà Tea Plus thanh mát',          hinh: 'monan/teaplus.jpg'       },
      { id: 24, ten: 'Twister',           gia: 25000, loai: 'do-uong',   mota: 'Nước ép trái cây Twister',        hinh: 'monan/twister.jpg'       },
      { id: 25, ten: 'Rockstar',          gia: 30000, loai: 'do-uong',   mota: 'Nước tăng lực Rockstar',          hinh: 'monan/rockstar.jpg'      },
    ];
  }

  if (dsBanAn.length === 0) {
    for (var i = 1; i <= 10; i++) {
      dsBanAn.push({
        id: i, so_ban: i,
        suc_chua: (i <= 4) ? 2 : (i <= 8) ? 4 : 6,
        trang_thai: 'trong'
      });
    }
  }

  saveData();
}

function fmtTien(so) {
  return so.toLocaleString('vi-VN') + 'đ';
}

function fmtNgayGio(dateStr) {
  if (!dateStr) return '—';
  var d = new Date(dateStr);
  return d.toLocaleString('vi-VN', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });
}

function nextId(arr) {
  if (!arr.length) return 1;
  return Math.max.apply(null, arr.map(function(x) { return x.id; })) + 1;
}

function badgeDon(tt) {
  var map = {
    'dang-xu-ly': ['badge-warning', '⏳ Đang xử lý'],
    'hoan-thanh': ['badge-success', '✅ Hoàn thành'],
    'da-huy':     ['badge-danger',  '❌ Đã huỷ']
  };
  var v = map[tt] || ['badge-warning', tt];
  return '<span class="badge ' + v[0] + '">' + v[1] + '</span>';
}

function badgeBan(tt) {
  var map = {
    'trong':        ['badge-success', 'Trống'],
    'dang-phuc-vu': ['badge-warning', 'Phục vụ'],
    'da-dat':       ['badge-info',    'Đã đặt']
  };
  var v = map[tt] || ['badge-success', tt];
  return '<span class="badge ' + v[0] + '">' + v[1] + '</span>';
}

function labelLoai(loai) {
  var map = { 'mon-chinh': 'Món chính', 'do-uong': 'Đồ uống', 'trang-miet': 'Tráng miệng' };
  return map[loai] || loai;
}

function labelTrangThaiBan(tt) {
  var map = { 'trong': 'Trống', 'dang-phuc-vu': 'Đang phục vụ', 'da-dat': 'Đã đặt' };
  return map[tt] || tt;
}

var sectionTitles = {
  tongquan: '📊 Tổng quan',
  monan:    '🍜 Quản lý món ăn',
  ban:      '🪑 Quản lý bàn ăn',
  donhang:  '📋 Quản lý đơn hàng'
};

function switchSection(name, btn) {
  document.querySelectorAll('.section').forEach(function(s) { s.classList.remove('show'); });
  document.querySelectorAll('.nav-item').forEach(function(b) { b.classList.remove('active'); });
  var el = document.getElementById('section-' + name);
  if (el) el.classList.add('show');
  if (btn) btn.classList.add('active');
  document.getElementById('topbar-title').textContent = sectionTitles[name] || name;
  currentSection = name;
  if (name === 'tongquan') renderTongQuan();
  if (name === 'monan')    renderMonAn();
  if (name === 'ban')      renderBanAn();
  if (name === 'donhang')  { taiDonHangTuSupabase(); }
  closeSidebar();
}

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('sidebar-overlay').classList.toggle('show');
}

function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebar-overlay').classList.remove('show');
}

function renderTongQuan() {
  document.getElementById('stat-monan').textContent   = dsMonAn.length;
  document.getElementById('stat-ban').textContent     = dsBanAn.length;
  document.getElementById('stat-donhang').textContent = dsDonHang.length;
  var tongDoanhThu = dsDonHang
    .filter(function(d) { return d.trang_thai === 'hoan-thanh'; })
    .reduce(function(tong, d) { return tong + d.tong_tien; }, 0);
  document.getElementById('stat-doanhthu').textContent = fmtTien(tongDoanhThu);
  renderBanQuick();
  renderRecentOrders();
}

function renderBanQuick() {
  var colorMap = { 'trong': 'qb-green', 'dang-phuc-vu': 'qb-yellow', 'da-dat': 'qb-blue' };
  if (!dsBanAn.length) {
    document.getElementById('ban-quick-grid').innerHTML = '<div class="empty-msg-sm">Chưa có bàn nào</div>';
    return;
  }
  var html = '';
  dsBanAn.forEach(function(ban) {
    html += '<div class="ban-quick-item ' + (colorMap[ban.trang_thai] || 'qb-green') + '">' +
      '<div class="ban-quick-num">B' + ban.so_ban + '</div>' +
      '<div class="ban-quick-tt">' + labelTrangThaiBan(ban.trang_thai) + '</div>' +
    '</div>';
  });
  document.getElementById('ban-quick-grid').innerHTML = html;
}

function renderRecentOrders() {
  var recent = dsDonHang.slice().reverse().slice(0, 5);
  if (!recent.length) {
    document.getElementById('recent-orders-wrap').innerHTML = '<div class="empty-msg-sm">Chưa có đơn hàng nào</div>';
    return;
  }
  var html = '<table><thead><tr><th>#</th><th>Bàn</th><th>Món đã gọi</th><th>Tổng tiền</th><th>Trạng thái</th><th>Thời gian</th></tr></thead><tbody>';
  recent.forEach(function(d) {
    var tenMon = d.items.map(function(i) { return i.ten_mon + ' x' + i.so_luong; }).join(', ');
    html += '<tr><td>#' + d.id + '</td><td><b>Bàn ' + d.so_ban + '</b></td><td class="td-truncate">' + tenMon + '</td><td>' + fmtTien(d.tong_tien) + '</td><td>' + badgeDon(d.trang_thai) + '</td><td>' + fmtNgayGio(d.created_at) + '</td></tr>';
  });
  html += '</tbody></table>';
  document.getElementById('recent-orders-wrap').innerHTML = html;
}

function renderMonAn() {
  var filterLoai = document.getElementById('filter-loai-mon').value;
  var search     = document.getElementById('search-mon').value.toLowerCase().trim();
  var rows = dsMonAn.filter(function(m) {
    if (filterLoai && m.loai !== filterLoai) return false;
    if (search && !m.ten.toLowerCase().includes(search)) return false;
    return true;
  });
  var wrap = document.getElementById('monan-table-wrap');
  if (!rows.length) {
    wrap.innerHTML = '<div class="empty-msg">Không tìm thấy món ăn nào.</div>';
    return;
  }
  var html = '<div class="table-wrap"><table><thead><tr><th style="width:64px">Ảnh</th><th>Tên món</th><th>Loại</th><th>Giá bán</th><th>Mô tả</th><th style="width:100px">Thao tác</th></tr></thead><tbody>';
  rows.forEach(function(m) {
    var hinhHtml = m.hinh
      ? '<img src="' + m.hinh + '" alt="' + m.ten + '" class="mon-thumb" onerror="this.style.display=\'none\'">'
      : '<div class="mon-thumb-placeholder">🍽</div>';
    html += '<tr><td>' + hinhHtml + '</td><td><b>' + m.ten + '</b></td><td><span class="loai-badge loai-' + m.loai + '">' + labelLoai(m.loai) + '</span></td><td><b>' + fmtTien(m.gia) + '</b></td><td class="td-muted">' + (m.mota || '—') + '</td><td><div class="action-btns"><button class="btn-icon" onclick="openModalMonAn(' + m.id + ')" title="Sửa">✏️</button><button class="btn-icon btn-icon-del" onclick="xoaMonAn(' + m.id + ')" title="Xoá">🗑️</button></div></td></tr>';
  });
  html += '</tbody></table></div>';
  wrap.innerHTML = html;
}

function openModalMonAn(id) {
  document.getElementById('mon-edit-id').value = '';
  document.getElementById('mon-ten').value     = '';
  document.getElementById('mon-gia').value     = '';
  document.getElementById('mon-loai').value    = 'mon-chinh';
  document.getElementById('mon-hinh').value    = '';
  document.getElementById('mon-mota').value    = '';
  var prev = document.getElementById('mon-hinh-preview');
  prev.style.display = 'none';
  if (id) {
    document.getElementById('modal-monan-title').textContent = '✏️ Sửa món ăn';
    var mon = dsMonAn.find(function(m) { return m.id === id; });
    if (mon) {
      document.getElementById('mon-edit-id').value = mon.id;
      document.getElementById('mon-ten').value     = mon.ten;
      document.getElementById('mon-gia').value     = mon.gia;
      document.getElementById('mon-loai').value    = mon.loai;
      document.getElementById('mon-hinh').value    = mon.hinh || '';
      document.getElementById('mon-mota').value    = mon.mota || '';
      if (mon.hinh) { prev.src = mon.hinh; prev.style.display = 'block'; prev.onerror = function() { this.style.display = 'none'; }; }
    }
  } else {
    document.getElementById('modal-monan-title').textContent = '➕ Thêm món ăn';
  }
  openModal('modal-monan');
}

function saveMonAn() {
  var ten    = document.getElementById('mon-ten').value.trim();
  var gia    = parseInt(document.getElementById('mon-gia').value, 10);
  var loai   = document.getElementById('mon-loai').value;
  var hinh   = document.getElementById('mon-hinh').value;
  var mota   = document.getElementById('mon-mota').value.trim();
  var editId = document.getElementById('mon-edit-id').value;
  if (!ten)           { alert('Vui lòng nhập tên món!'); return; }
  if (!gia || gia <= 0) { alert('Vui lòng nhập giá hợp lệ!'); return; }
  if (editId) {
    var idx = dsMonAn.findIndex(function(m) { return m.id === parseInt(editId, 10); });
    if (idx >= 0) { dsMonAn[idx].ten = ten; dsMonAn[idx].gia = gia; dsMonAn[idx].loai = loai; dsMonAn[idx].hinh = hinh; dsMonAn[idx].mota = mota; }
  } else {
    dsMonAn.push({ id: nextId(dsMonAn), ten: ten, gia: gia, loai: loai, hinh: hinh, mota: mota });
  }
  saveData(); closeModal('modal-monan'); renderMonAn();
}

function xoaMonAn(id) {
  var mon = dsMonAn.find(function(m) { return m.id === id; });
  if (!mon) return;
  if (!confirm('Xoá món "' + mon.ten + '"?')) return;
  dsMonAn = dsMonAn.filter(function(m) { return m.id !== id; });
  saveData(); renderMonAn();
}

function previewHinh(val) {
  var prev = document.getElementById('mon-hinh-preview');
  if (val) { prev.src = val; prev.style.display = 'block'; prev.onerror = function() { this.style.display = 'none'; }; }
  else { prev.style.display = 'none'; }
}

function renderBanAn() {
  var grid = document.getElementById('ban-grid');
  if (!dsBanAn.length) { grid.innerHTML = '<div class="empty-msg">Chưa có bàn nào.</div>'; return; }
  var colorMap = { 'trong': 'bc-green', 'dang-phuc-vu': 'bc-yellow', 'da-dat': 'bc-blue' };
  var html = '';
  dsBanAn.forEach(function(ban) {
    var tt = ban.trang_thai;
    var soDon = dsDonHang.filter(function(d) { return d.so_ban === ban.so_ban && d.trang_thai === 'dang-xu-ly'; }).length;
    html += '<div class="ban-card ' + (colorMap[tt] || 'bc-green') + '">' +
      '<div class="ban-card-header"><div class="ban-card-num">Bàn ' + ban.so_ban + '</div>' + badgeBan(tt) + '</div>' +
      '<div class="ban-card-info"><span>👥 ' + ban.suc_chua + ' người</span>' + (soDon > 0 ? '<span>📋 ' + soDon + ' đơn đang xử lý</span>' : '') + '</div>' +
      '<div class="ban-card-actions">';
    if (tt === 'trong') {
      html += '<button class="btn btn-sm btn-warning" onclick="doiTrangThaiBan(' + ban.id + ',\'dang-phuc-vu\')">🍽 Mở bàn</button>';
      html += '<button class="btn btn-sm btn-info"    onclick="doiTrangThaiBan(' + ban.id + ',\'da-dat\')">📅 Đặt trước</button>';
    }
    if (tt !== 'trong') html += '<button class="btn btn-sm btn-success" onclick="doiTrangThaiBan(' + ban.id + ',\'trong\')">✓ Trả bàn</button>';
    if (tt === 'da-dat') html += '<button class="btn btn-sm btn-warning" onclick="doiTrangThaiBan(' + ban.id + ',\'dang-phuc-vu\')">🍽 Phục vụ</button>';
    html += '<button class="btn btn-sm btn-danger" onclick="xoaBan(' + ban.id + ')">🗑</button>';
    html += '</div></div>';
  });
  grid.innerHTML = html;
}

function doiTrangThaiBan(id, trangThaiMoi) {
  var ban = dsBanAn.find(function(b) { return b.id === id; });
  if (!ban) return;
  ban.trang_thai = trangThaiMoi;
  saveData(); renderBanAn();
  if (currentSection === 'tongquan') renderBanQuick();
}

function openModalThemBan() {
  document.getElementById('ban-so').value       = '';
  document.getElementById('ban-suc-chua').value = '4';
  openModal('modal-ban');
}

function saveThemBan() {
  var soBan   = parseInt(document.getElementById('ban-so').value, 10);
  var sucChua = parseInt(document.getElementById('ban-suc-chua').value, 10) || 4;
  if (!soBan || soBan <= 0) { alert('Vui lòng nhập số bàn hợp lệ!'); return; }
  if (dsBanAn.find(function(b) { return b.so_ban === soBan; })) { alert('Bàn số ' + soBan + ' đã tồn tại!'); return; }
  dsBanAn.push({ id: nextId(dsBanAn), so_ban: soBan, suc_chua: sucChua, trang_thai: 'trong' });
  dsBanAn.sort(function(a, b) { return a.so_ban - b.so_ban; });
  saveData(); closeModal('modal-ban'); renderBanAn();
}

function xoaBan(id) {
  var ban = dsBanAn.find(function(b) { return b.id === id; });
  if (!ban) return;
  if (!confirm('Xoá bàn ' + ban.so_ban + '?')) return;
  dsBanAn = dsBanAn.filter(function(b) { return b.id !== id; });
  saveData(); renderBanAn();
}

async function taiDonHangTuSupabase() {
  var el = document.getElementById('donhang-table-wrap');
  if (el) el.innerHTML = '<div class="empty-msg">⏳ Đang tải đơn hàng...</div>';

  var result = await db.from('orders').select('*').order('created_at', { ascending: false });

  if (result.error) {
    console.error('Lỗi tải đơn:', result.error);
    if (el) el.innerHTML = '<div class="empty-msg">❌ Lỗi tải đơn: ' + result.error.message + '</div>';
    return;
  }

  dsDonHang = result.data.map(function(row) {
    var tien = parseInt(String(row.gia).replace(/[^\d]/g, '')) || 0;
    var tt = row.trang_thai;
    if (tt === 'pending')   tt = 'dang-xu-ly';
    if (tt === 'done')      tt = 'hoan-thanh';
    if (tt === 'cancelled') tt = 'da-huy';
    return {
      id:         row.id,
      so_ban:     row.so_ban,
      items:      [{ ten_mon: row.ten_mon, gia: tien, so_luong: row.so_luong }],
      tong_tien:  tien,
      trang_thai: tt,
      created_at: row.created_at
    };
  });

  renderDonHang();
  renderTongQuan();
}

async function capNhatTrangThaiSupabase(id, trangThai) {
  var map = { 'hoan-thanh': 'done', 'da-huy': 'cancelled', 'dang-xu-ly': 'pending' };
  var result = await db.from('orders').update({ trang_thai: map[trangThai] || trangThai }).eq('id', id);
  if (result.error) console.error('Lỗi cập nhật:', result.error);
}

function renderDonHang() {
  var filterTT = document.getElementById('filter-trang-thai-don').value;
  var search   = document.getElementById('search-don').value.trim();
  var rows = dsDonHang.filter(function(d) {
    if (filterTT && d.trang_thai !== filterTT) return false;
    if (search && !String(d.so_ban).includes(search)) return false;
    return true;
  });
  var wrap = document.getElementById('donhang-table-wrap');
  if (!rows.length) { wrap.innerHTML = '<div class="empty-msg">Không có đơn hàng nào.</div>'; return; }
  var html = '<div class="table-wrap"><table><thead><tr><th>#</th><th>Bàn</th><th>Món gọi</th><th>Tổng tiền</th><th>Trạng thái</th><th>Thời gian</th><th style="width:180px">Thao tác</th></tr></thead><tbody>';
  rows.forEach(function(d) {
    var tenMon = d.items.map(function(i) { return i.ten_mon + ' x' + i.so_luong; }).join(', ');
    html += '<tr><td>#' + d.id + '</td><td><b>Bàn ' + d.so_ban + '</b></td><td class="td-truncate">' + tenMon + '</td><td><b>' + fmtTien(d.tong_tien) + '</b></td><td>' + badgeDon(d.trang_thai) + '</td><td>' + fmtNgayGio(d.created_at) + '</td><td><div class="action-btns"><button class="btn btn-sm btn-info" onclick="xemChiTiet(' + d.id + ')">👁 Xem</button>' +
      (d.trang_thai === 'dang-xu-ly'
        ? '<button class="btn btn-sm btn-success" onclick="hoanThanhDon(' + d.id + ')">✓ Xong</button><button class="btn btn-sm btn-warning" onclick="huyDon(' + d.id + ')">✕ Huỷ</button>'
        : '') +
      '<button class="btn btn-sm btn-danger" onclick="xoaDon(' + d.id + ')">🗑</button></div></td></tr>';
  });
  html += '</tbody></table></div>';
  wrap.innerHTML = html;
}

function openModalTaoDon() {
  donItems = [];
  var selBan = document.getElementById('don-chon-ban');
  selBan.innerHTML = '<option value="">— Chọn bàn —</option>';
  dsBanAn.forEach(function(ban) {
    var opt = document.createElement('option');
    opt.value = ban.so_ban;
    opt.textContent = 'Bàn ' + ban.so_ban + ' (' + labelTrangThaiBan(ban.trang_thai) + ')';
    selBan.appendChild(opt);
  });
  var selMon = document.getElementById('don-chon-mon');
  selMon.innerHTML = '<option value="">— Chọn món ăn —</option>';
  var loais = ['mon-chinh', 'do-uong'];
  var loaiLabels = { 'mon-chinh': 'Món chính', 'do-uong': 'Đồ uống' };
  loais.forEach(function(loai) {
    var monTrongLoai = dsMonAn.filter(function(m) { return m.loai === loai; });
    if (!monTrongLoai.length) return;
    var group = document.createElement('optgroup');
    group.label = loaiLabels[loai];
    monTrongLoai.forEach(function(m) {
      var opt = document.createElement('option');
      opt.value = m.id;
      opt.textContent = m.ten + ' — ' + fmtTien(m.gia);
      group.appendChild(opt);
    });
    selMon.appendChild(group);
  });
  document.getElementById('don-so-luong').value = 1;
  renderDonItems();
  openModal('modal-taodon');
}

function themMonVaoDon() {
  var monId   = parseInt(document.getElementById('don-chon-mon').value, 10);
  var soLuong = parseInt(document.getElementById('don-so-luong').value, 10) || 1;
  if (!monId)       { alert('Vui lòng chọn món ăn!'); return; }
  if (soLuong <= 0) { alert('Số lượng phải lớn hơn 0!'); return; }
  var mon = dsMonAn.find(function(m) { return m.id === monId; });
  if (!mon) return;
  var existing = donItems.find(function(i) { return i.mon_id === monId; });
  if (existing) { existing.so_luong += soLuong; }
  else { donItems.push({ mon_id: mon.id, ten_mon: mon.ten, gia: mon.gia, so_luong: soLuong }); }
  renderDonItems();
}

function renderDonItems() {
  if (!donItems.length) {
    document.getElementById('don-items-list').innerHTML = '<div class="empty-msg-sm">Chưa có món nào.</div>';
    document.getElementById('don-tong-tien').textContent = '0đ';
    return;
  }
  var tong = 0;
  var html = '<table class="don-table"><thead><tr><th>Tên món</th><th>Đơn giá</th><th>SL</th><th>Thành tiền</th><th></th></tr></thead><tbody>';
  donItems.forEach(function(item, idx) {
    var tt = item.gia * item.so_luong; tong += tt;
    html += '<tr><td>' + item.ten_mon + '</td><td>' + fmtTien(item.gia) + '</td><td>' + item.so_luong + '</td><td><b>' + fmtTien(tt) + '</b></td><td><button class="btn-icon btn-icon-del" onclick="xoaItemDon(' + idx + ')">✕</button></td></tr>';
  });
  html += '</tbody></table>';
  document.getElementById('don-items-list').innerHTML = html;
  document.getElementById('don-tong-tien').textContent = fmtTien(tong);
}

function xoaItemDon(idx) { donItems.splice(idx, 1); renderDonItems(); }

function saveDonHang() {
  var soBan = parseInt(document.getElementById('don-chon-ban').value, 10);
  if (!soBan)           { alert('Vui lòng chọn bàn!'); return; }
  if (!donItems.length) { alert('Vui lòng thêm ít nhất 1 món!'); return; }
  var tongTien = donItems.reduce(function(sum, i) { return sum + i.gia * i.so_luong; }, 0);
  dsDonHang.push({
    id: nextId(dsDonHang), so_ban: soBan, items: donItems.slice(),
    tong_tien: tongTien, trang_thai: 'dang-xu-ly', created_at: new Date().toISOString()
  });
  var ban = dsBanAn.find(function(b) { return b.so_ban === soBan; });
  if (ban) ban.trang_thai = 'dang-phuc-vu';
  saveData(); closeModal('modal-taodon'); renderDonHang();
}

function xemChiTiet(id) {
  var don = dsDonHang.find(function(d) { return d.id === id; });
  if (!don) return;
  var html = '<div class="chitiet-header"><div><b>Đơn #' + don.id + '</b></div><div>🪑 Bàn ' + don.so_ban + '</div><div>' + badgeDon(don.trang_thai) + '</div><div>🕐 ' + fmtNgayGio(don.created_at) + '</div></div>' +
    '<table class="don-table"><thead><tr><th>Tên món</th><th>Đơn giá</th><th>Số lượng</th><th>Thành tiền</th></tr></thead><tbody>';
  don.items.forEach(function(item) {
    html += '<tr><td>' + item.ten_mon + '</td><td>' + fmtTien(item.gia) + '</td><td>' + item.so_luong + '</td><td><b>' + fmtTien(item.gia * item.so_luong) + '</b></td></tr>';
  });
  html += '</tbody></table><div class="chitiet-total">Tổng tiền: <b>' + fmtTien(don.tong_tien) + '</b></div>';
  document.getElementById('modal-chitiet-body').innerHTML = html;
  openModal('modal-chitiet');
}

function hoanThanhDon(id) {
  var don = dsDonHang.find(function(d) { return d.id === id; });
  if (!don) return;
  don.trang_thai = 'hoan-thanh';
  capNhatTrangThaiSupabase(id, 'hoan-thanh');
  var conDon = dsDonHang.some(function(d) { return d.so_ban === don.so_ban && d.trang_thai === 'dang-xu-ly' && d.id !== id; });
  if (!conDon) { var ban = dsBanAn.find(function(b) { return b.so_ban === don.so_ban; }); if (ban) ban.trang_thai = 'trong'; }
  saveData(); renderDonHang();
}

function huyDon(id) {
  if (!confirm('Xác nhận huỷ đơn hàng này?')) return;
  var don = dsDonHang.find(function(d) { return d.id === id; });
  if (!don) return;
  don.trang_thai = 'da-huy';
  capNhatTrangThaiSupabase(id, 'da-huy');
  var conDon = dsDonHang.some(function(d) { return d.so_ban === don.so_ban && d.trang_thai === 'dang-xu-ly' && d.id !== id; });
  if (!conDon) { var ban = dsBanAn.find(function(b) { return b.so_ban === don.so_ban; }); if (ban && ban.trang_thai === 'dang-phuc-vu') ban.trang_thai = 'trong'; }
  saveData(); renderDonHang();
}

function xoaDon(id) {
  if (!confirm('Xoá đơn hàng #' + id + '?')) return;
  dsDonHang = dsDonHang.filter(function(d) { return d.id !== id; });
  saveData(); renderDonHang();
}

function openModal(id) { document.getElementById(id).classList.add('show'); document.body.classList.add('modal-open'); }
function closeModal(id) { document.getElementById(id).classList.remove('show'); document.body.classList.remove('modal-open'); }

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.show').forEach(function(o) { o.classList.remove('show'); });
    document.body.classList.remove('modal-open');
  }
});

function updateClock() {
  var el = document.getElementById('current-time');
  if (!el) return;
  var now = new Date();
  el.textContent = now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

function init() {
  loadData();
  initDefaultData();
  renderTongQuan();
  taiDonHangTuSupabase();
  updateClock();
  setInterval(updateClock, 1000);
  setInterval(taiDonHangTuSupabase, 30000);
}

init();
