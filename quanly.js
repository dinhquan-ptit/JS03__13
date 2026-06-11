// ============================================================
//  QUANLY.JS — Logic quản lý nhà hàng Phở Cồ Nam Định
//  Dữ liệu lưu bằng localStorage (không cần backend)
//  Phù hợp sinh viên mới học: code đơn giản, có comment đầy đủ
// ============================================================


// ============================================================
// PHẦN 1: CÁC HẰNG SỐ VÀ BIẾN TOÀN CỤC
// ============================================================

// Key dùng để lưu/đọc dữ liệu trong localStorage
var KEY_MON_AN   = 'qlnhahang_monan';
var KEY_BAN_AN   = 'qlnhahang_banan';
var KEY_DON_HANG = 'qlnhahang_donhang';

// Biến lưu dữ liệu trong bộ nhớ (array)
var dsMonAn   = [];   // Danh sách món ăn
var dsBanAn   = [];   // Danh sách bàn ăn
var dsDonHang = [];   // Danh sách đơn hàng

// Biến tạm: lưu món ăn đang được chọn khi TẠO ĐƠN
var donItems = [];

// Section (tab) đang hiển thị
var currentSection = 'tongquan';


// ============================================================
// PHẦN 2: LOCALSTORAGE — Đọc và ghi dữ liệu
// ============================================================

// Lưu toàn bộ dữ liệu vào localStorage
function saveData() {
  localStorage.setItem(KEY_MON_AN,   JSON.stringify(dsMonAn));
  localStorage.setItem(KEY_BAN_AN,   JSON.stringify(dsBanAn));
  localStorage.setItem(KEY_DON_HANG, JSON.stringify(dsDonHang));
}

// Đọc dữ liệu từ localStorage (nếu có)
function loadData() {
  var mon = localStorage.getItem(KEY_MON_AN);
  var ban = localStorage.getItem(KEY_BAN_AN);
  var don = localStorage.getItem(KEY_DON_HANG);

  // JSON.parse chuyển chuỗi JSON thành array/object
  dsMonAn   = mon ? JSON.parse(mon) : [];
  dsBanAn   = ban ? JSON.parse(ban) : [];
  dsDonHang = don ? JSON.parse(don) : [];
}


// ============================================================
// PHẦN 3: DỮ LIỆU MẪU — Tạo lần đầu nếu chưa có gì
// ============================================================

function initDefaultData() {

  // --- Món ăn mẫu ---
  if (dsMonAn.length === 0) {
    dsMonAn = [
      // Món chính — Phở
      { id: 1,  ten: 'Phở đặc biệt',      gia: 75000, loai: 'mon-chinh', mota: 'Đầy đủ topping, nước dùng đậm đà', hinh: 'monan/phodacbiet.png'   },
      { id: 2,  ten: 'Phở tái chín',       gia: 65000, loai: 'mon-chinh', mota: 'Thịt bò tái và chín thơm ngon',    hinh: 'monan/photaichin.jpg'   },
      { id: 3,  ten: 'Phở chín',           gia: 60000, loai: 'mon-chinh', mota: 'Phở bò chín truyền thống',         hinh: 'monan/phochin.jpg'      },
      { id: 4,  ten: 'Phở tái lăn',        gia: 65000, loai: 'mon-chinh', mota: 'Thịt tái lăn qua nước sôi',        hinh: 'monan/pho-tai-lan.jpg'  },
      { id: 5,  ten: 'Phở áp chảo',        gia: 70000, loai: 'mon-chinh', mota: 'Phở xào giòn rụm hấp dẫn',        hinh: 'monan/phoapchao.jpg'    },
      { id: 6,  ten: 'Phở tái gầu',        gia: 60000, loai: 'mon-chinh', mota: 'Kết hợp thịt tái và gầu giòn',    hinh: 'monan/photigau.jpg'     },
      { id: 7,  ten: 'Phở tái bắp',        gia: 60000, loai: 'mon-chinh', mota: 'Thịt tái và bắp bò dai ngon',     hinh: 'monan/photibap.jpg'     },
      { id: 8,  ten: 'Phở tái nạm',        gia: 60000, loai: 'mon-chinh', mota: 'Thịt tái kết hợp nạm mềm',        hinh: 'monan/photinam.jpg'     },
      { id: 9,  ten: 'Phở xào',            gia: 65000, loai: 'mon-chinh', mota: 'Phở xào với rau thơm và thịt bò', hinh: 'monan/phoxao.jpg'       },
      // Món chính — Cơm & Mỳ
      { id: 10, ten: 'Cơm rang dưa bò',    gia: 50000, loai: 'mon-chinh', mota: 'Cơm rang thơm với thịt bò',       hinh: 'monan/comrangduabo.jpg' },
      { id: 11, ten: 'Cơm rang dưa gà',    gia: 50000, loai: 'mon-chinh', mota: 'Cơm rang thơm với thịt gà',       hinh: 'monan/comrangduiga.jpg' },
      { id: 12, ten: 'Cơm rang thập cẩm',  gia: 55000, loai: 'mon-chinh', mota: 'Đầy đủ topping phong phú',        hinh: 'monan/comrangthapcam.jpg'},
      { id: 13, ten: 'Cơm rang trứng',     gia: 45000, loai: 'mon-chinh', mota: 'Cơm rang trứng đơn giản ngon',    hinh: 'monan/comrangtrung.jpg' },
      { id: 14, ten: 'Cơm rang xúc xích',  gia: 50000, loai: 'mon-chinh', mota: 'Cơm rang với xúc xích thơm',     hinh: 'monan/comrangxucxich.jpg'},
      { id: 15, ten: 'Cơm rang cải bò',    gia: 50000, loai: 'mon-chinh', mota: 'Cơm rang cải xanh và bò',        hinh: 'monan/comrangcaibo.jpg' },
      { id: 16, ten: 'Mỳ xào',             gia: 55000, loai: 'mon-chinh', mota: 'Mỳ xào rau củ và thịt',          hinh: 'monan/myxao.jpg'        },
      { id: 17, ten: 'Bò xào rau cải',     gia: 60000, loai: 'mon-chinh', mota: 'Bò xào với rau cải tươi',        hinh: 'monan/boxaoraucai.jpg'  },
      // Đồ uống
      { id: 18, ten: 'Pepsi',              gia: 20000, loai: 'do-uong',   mota: 'Nước ngọt có ga Pepsi lon',       hinh: 'monan/pepsi.jpg'        },
      { id: 19, ten: '7UP',                gia: 20000, loai: 'do-uong',   mota: 'Nước ngọt có ga 7UP lon',         hinh: 'monan/7up.jpg'          },
      { id: 20, ten: 'Mirinda',            gia: 20000, loai: 'do-uong',   mota: 'Nước ngọt Mirinda cam lon',       hinh: 'monan/mirinda.jpg'      },
      { id: 21, ten: 'Aquafina',           gia: 15000, loai: 'do-uong',   mota: 'Nước suối Aquafina 500ml',        hinh: 'monan/aquafina.jpg'     },
      { id: 22, ten: 'Nước tăng lực',      gia: 25000, loai: 'do-uong',   mota: 'Nước tăng lực tăng năng lượng',  hinh: 'monan/nuoctangluc.jpg'  },
      { id: 23, ten: 'Tea Plus',           gia: 20000, loai: 'do-uong',   mota: 'Trà Tea Plus thanh mát',          hinh: 'monan/teaplus.jpg'      },
      { id: 24, ten: 'Twister',            gia: 25000, loai: 'do-uong',   mota: 'Nước ép trái cây Twister',        hinh: 'monan/twister.jpg'      },
      { id: 25, ten: 'Rockstar',           gia: 30000, loai: 'do-uong',   mota: 'Nước tăng lực Rockstar',          hinh: 'monan/rockstar.jpg'     },
    ];
  }

  // --- Bàn ăn mẫu: 10 bàn ---
  if (dsBanAn.length === 0) {
    for (var i = 1; i <= 10; i++) {
      dsBanAn.push({
        id:        i,
        so_ban:    i,
        suc_chua:  (i <= 4) ? 2 : (i <= 8) ? 4 : 6, // bàn nhỏ/vừa/lớn
        trang_thai: 'trong'
      });
    }
  }

  // --- Đơn hàng mẫu ---
  if (dsDonHang.length === 0) {
    dsDonHang = [
      {
        id: 1,
        so_ban: 3,
        items: [
          { mon_id: 1,  ten_mon: 'Phở đặc biệt', gia: 75000, so_luong: 2 },
          { mon_id: 18, ten_mon: 'Pepsi',          gia: 20000, so_luong: 2 }
        ],
        tong_tien:  190000,
        trang_thai: 'hoan-thanh',
        created_at: new Date(Date.now() - 7200000).toISOString() // 2 giờ trước
      },
      {
        id: 2,
        so_ban: 7,
        items: [
          { mon_id: 2,  ten_mon: 'Phở tái chín',    gia: 65000, so_luong: 3 },
          { mon_id: 21, ten_mon: 'Aquafina',         gia: 15000, so_luong: 3 }
        ],
        tong_tien:  240000,
        trang_thai: 'dang-xu-ly',
        created_at: new Date(Date.now() - 1200000).toISOString() // 20 phút trước
      },
      {
        id: 3,
        so_ban: 5,
        items: [
          { mon_id: 10, ten_mon: 'Cơm rang dưa bò', gia: 50000, so_luong: 2 },
          { mon_id: 19, ten_mon: '7UP',              gia: 20000, so_luong: 2 }
        ],
        tong_tien:  140000,
        trang_thai: 'da-huy',
        created_at: new Date(Date.now() - 3600000).toISOString() // 1 giờ trước
      }
    ];

    // Đánh dấu bàn 7 đang phục vụ (phù hợp với đơn mẫu bên trên)
    var ban7 = dsBanAn.find(function(b) { return b.so_ban === 7; });
    if (ban7) ban7.trang_thai = 'dang-phuc-vu';
  }

  saveData(); // Lưu dữ liệu mẫu vào localStorage
}


// ============================================================
// PHẦN 4: HÀM TIỆN ÍCH (Utility Functions)
// ============================================================

// Định dạng số tiền → "75.000đ"
function fmtTien(so) {
  return so.toLocaleString('vi-VN') + 'đ';
}

// Định dạng ngày giờ từ chuỗi ISO → "10/06/2025 14:30"
function fmtNgayGio(dateStr) {
  if (!dateStr) return '—';
  var d = new Date(dateStr);
  return d.toLocaleString('vi-VN', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });
}

// Tạo ID mới = max(id hiện có) + 1
function nextId(arr) {
  if (!arr.length) return 1;
  return Math.max.apply(null, arr.map(function(x) { return x.id; })) + 1;
}

// Tạo HTML badge trạng thái đơn hàng
function badgeDon(tt) {
  var map = {
    'dang-xu-ly': ['badge-warning', '⏳ Đang xử lý'],
    'hoan-thanh': ['badge-success', '✅ Hoàn thành'],
    'da-huy':     ['badge-danger',  '❌ Đã huỷ']
  };
  var v = map[tt] || ['badge-warning', tt];
  return '<span class="badge ' + v[0] + '">' + v[1] + '</span>';
}

// Tạo HTML badge trạng thái bàn
function badgeBan(tt) {
  var map = {
    'trong':        ['badge-success', 'Trống'],
    'dang-phuc-vu': ['badge-warning', 'Phục vụ'],
    'da-dat':       ['badge-info',    'Đã đặt']
  };
  var v = map[tt] || ['badge-success', tt];
  return '<span class="badge ' + v[0] + '">' + v[1] + '</span>';
}

// Chuyển loại món → nhãn tiếng Việt
function labelLoai(loai) {
  var map = {
    'mon-chinh':  'Món chính',
    'do-uong':    'Đồ uống',
    'trang-miet': 'Tráng miệng'
  };
  return map[loai] || loai;
}

// Chuyển trạng thái bàn → nhãn tiếng Việt
function labelTrangThaiBan(tt) {
  var map = {
    'trong':        'Trống',
    'dang-phuc-vu': 'Đang phục vụ',
    'da-dat':       'Đã đặt'
  };
  return map[tt] || tt;
}


// ============================================================
// PHẦN 5: ĐIỀU HƯỚNG — Chuyển đổi giữa các section
// ============================================================

var sectionTitles = {
  tongquan: '📊 Tổng quan',
  monan:    '🍜 Quản lý món ăn',
  ban:      '🪑 Quản lý bàn ăn',
  donhang:  '📋 Quản lý đơn hàng'
};

// Gọi khi click vào nav item trong sidebar
function switchSection(name, btn) {
  // Ẩn tất cả các section
  document.querySelectorAll('.section').forEach(function(s) {
    s.classList.remove('show');
  });
  // Bỏ active toàn bộ nav item
  document.querySelectorAll('.nav-item').forEach(function(b) {
    b.classList.remove('active');
  });

  // Hiện section được chọn
  var el = document.getElementById('section-' + name);
  if (el) el.classList.add('show');

  // Đánh dấu nút active
  if (btn) btn.classList.add('active');

  // Cập nhật tiêu đề trên topbar
  document.getElementById('topbar-title').textContent = sectionTitles[name] || name;

  currentSection = name;

  // Render lại nội dung của section vừa chuyển sang
  if (name === 'tongquan') renderTongQuan();
  if (name === 'monan')    renderMonAn();
  if (name === 'ban')      renderBanAn();
  if (name === 'donhang')  renderDonHang();

  // Đóng sidebar (trên mobile)
  closeSidebar();
}


// ============================================================
// PHẦN 6: SIDEBAR MOBILE
// ============================================================

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('sidebar-overlay').classList.toggle('show');
}

function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebar-overlay').classList.remove('show');
}


// ============================================================
// PHẦN 7: TỔNG QUAN — Render dashboard
// ============================================================

function renderTongQuan() {
  // Cập nhật 4 con số thống kê
  document.getElementById('stat-monan').textContent   = dsMonAn.length;
  document.getElementById('stat-ban').textContent     = dsBanAn.length;
  document.getElementById('stat-donhang').textContent = dsDonHang.length;

  // Tổng doanh thu chỉ tính những đơn đã hoàn thành
  var tongDoanhThu = dsDonHang
    .filter(function(d) { return d.trang_thai === 'hoan-thanh'; })
    .reduce(function(tong, d) { return tong + d.tong_tien; }, 0);

  document.getElementById('stat-doanhthu').textContent = fmtTien(tongDoanhThu);

  // Vẽ sơ đồ bàn nhanh
  renderBanQuick();

  // Hiển thị 5 đơn hàng gần nhất
  renderRecentOrders();
}

// Vẽ ô nhỏ trạng thái bàn ở tổng quan
function renderBanQuick() {
  // Map màu theo trạng thái bàn
  var colorMap = {
    'trong':        'qb-green',
    'dang-phuc-vu': 'qb-yellow',
    'da-dat':       'qb-blue'
  };

  if (!dsBanAn.length) {
    document.getElementById('ban-quick-grid').innerHTML =
      '<div class="empty-msg-sm">Chưa có bàn nào</div>';
    return;
  }

  var html = '';
  dsBanAn.forEach(function(ban) {
    var cls  = 'ban-quick-item ' + (colorMap[ban.trang_thai] || 'qb-green');
    var nhan = labelTrangThaiBan(ban.trang_thai);
    html +=
      '<div class="' + cls + '">' +
        '<div class="ban-quick-num">B' + ban.so_ban + '</div>' +
        '<div class="ban-quick-tt">' + nhan + '</div>' +
      '</div>';
  });

  document.getElementById('ban-quick-grid').innerHTML = html;
}

// Hiển thị 5 đơn hàng gần nhất (mới nhất lên trên)
function renderRecentOrders() {
  // .slice() để không sửa array gốc, .reverse() đảo để mới nhất trên cùng
  var recent = dsDonHang.slice().reverse().slice(0, 5);

  if (!recent.length) {
    document.getElementById('recent-orders-wrap').innerHTML =
      '<div class="empty-msg-sm">Chưa có đơn hàng nào</div>';
    return;
  }

  var html =
    '<table><thead><tr>' +
      '<th>#</th><th>Bàn</th><th>Món đã gọi</th>' +
      '<th>Tổng tiền</th><th>Trạng thái</th><th>Thời gian</th>' +
    '</tr></thead><tbody>';

  recent.forEach(function(d) {
    // Gộp tên món thành chuỗi: "Phở đặc biệt x2, Pepsi x2"
    var tenMon = d.items.map(function(i) {
      return i.ten_mon + ' x' + i.so_luong;
    }).join(', ');

    html +=
      '<tr>' +
        '<td>#' + d.id + '</td>' +
        '<td><b>Bàn ' + d.so_ban + '</b></td>' +
        '<td class="td-truncate">' + tenMon + '</td>' +
        '<td>' + fmtTien(d.tong_tien) + '</td>' +
        '<td>' + badgeDon(d.trang_thai) + '</td>' +
        '<td>' + fmtNgayGio(d.created_at) + '</td>' +
      '</tr>';
  });

  html += '</tbody></table>';
  document.getElementById('recent-orders-wrap').innerHTML = html;
}


// ============================================================
// PHẦN 8: MÓN ĂN — Hiển thị, thêm, sửa, xóa
// ============================================================

// Render bảng danh sách món ăn (có lọc và tìm kiếm)
function renderMonAn() {
  var filterLoai = document.getElementById('filter-loai-mon').value;
  var search     = document.getElementById('search-mon').value.toLowerCase().trim();

  // Lọc theo loại và từ khóa tìm kiếm
  var rows = dsMonAn.filter(function(m) {
    if (filterLoai && m.loai !== filterLoai) return false;
    if (search && !m.ten.toLowerCase().includes(search)) return false;
    return true;
  });

  var wrap = document.getElementById('monan-table-wrap');

  if (!rows.length) {
    wrap.innerHTML = '<div class="empty-msg">Không tìm thấy món ăn nào.<br>Thử thay đổi bộ lọc hoặc thêm món mới!</div>';
    return;
  }

  var html =
    '<div class="table-wrap"><table>' +
    '<thead><tr>' +
      '<th style="width:64px">Ảnh</th>' +
      '<th>Tên món</th>' +
      '<th>Loại</th>' +
      '<th>Giá bán</th>' +
      '<th>Mô tả</th>' +
      '<th style="width:100px">Thao tác</th>' +
    '</tr></thead><tbody>';

  rows.forEach(function(m) {
    // Nếu có đường dẫn ảnh thì hiện ảnh, không thì hiện icon
    var hinhHtml = m.hinh
      ? '<img src="' + m.hinh + '" alt="' + m.ten + '" class="mon-thumb" onerror="this.style.display=\'none\'">'
      : '<div class="mon-thumb-placeholder">🍽</div>';

    html +=
      '<tr>' +
        '<td>' + hinhHtml + '</td>' +
        '<td><b>' + m.ten + '</b></td>' +
        '<td><span class="loai-badge loai-' + m.loai + '">' + labelLoai(m.loai) + '</span></td>' +
        '<td><b>' + fmtTien(m.gia) + '</b></td>' +
        '<td class="td-muted">' + (m.mota || '—') + '</td>' +
        '<td>' +
          '<div class="action-btns">' +
            // Truyền id vào hàm để biết sửa món nào
            '<button class="btn-icon" onclick="openModalMonAn(' + m.id + ')" title="Sửa">✏️</button>' +
            '<button class="btn-icon btn-icon-del" onclick="xoaMonAn(' + m.id + ')" title="Xoá">🗑️</button>' +
          '</div>' +
        '</td>' +
      '</tr>';
  });

  html += '</tbody></table></div>';
  wrap.innerHTML = html;
}

// Mở modal thêm hoặc sửa món ăn
// Nếu truyền id → chế độ SỬA, không truyền → chế độ THÊM MỚI
function openModalMonAn(id) {
  // Reset toàn bộ form về rỗng
  document.getElementById('mon-edit-id').value  = '';
  document.getElementById('mon-ten').value      = '';
  document.getElementById('mon-gia').value      = '';
  document.getElementById('mon-loai').value     = 'mon-chinh';
  document.getElementById('mon-hinh').value     = '';
  document.getElementById('mon-mota').value     = '';
  var prev = document.getElementById('mon-hinh-preview');
  prev.style.display = 'none';

  if (id) {
    // --- Chế độ SỬA ---
    document.getElementById('modal-monan-title').textContent = '✏️ Sửa món ăn';
    var mon = dsMonAn.find(function(m) { return m.id === id; });
    if (mon) {
      document.getElementById('mon-edit-id').value = mon.id;
      document.getElementById('mon-ten').value     = mon.ten;
      document.getElementById('mon-gia').value     = mon.gia;
      document.getElementById('mon-loai').value    = mon.loai;
      document.getElementById('mon-hinh').value    = mon.hinh || '';
      document.getElementById('mon-mota').value    = mon.mota || '';
      // Hiện preview nếu có ảnh
      if (mon.hinh) {
        prev.src          = mon.hinh;
        prev.style.display = 'block';
        prev.onerror      = function() { this.style.display = 'none'; };
      }
    }
  } else {
    // --- Chế độ THÊM MỚI ---
    document.getElementById('modal-monan-title').textContent = '➕ Thêm món ăn';
  }

  openModal('modal-monan');
}

// Lưu món ăn (xử lý cả thêm mới và sửa)
function saveMonAn() {
  var ten    = document.getElementById('mon-ten').value.trim();
  var gia    = parseInt(document.getElementById('mon-gia').value, 10);
  var loai   = document.getElementById('mon-loai').value;
  var hinh   = document.getElementById('mon-hinh').value;
  var mota   = document.getElementById('mon-mota').value.trim();
  var editId = document.getElementById('mon-edit-id').value; // rỗng = thêm mới

  // Kiểm tra dữ liệu bắt buộc
  if (!ten)        { alert('Vui lòng nhập tên món!'); return; }
  if (!gia || gia <= 0) { alert('Vui lòng nhập giá hợp lệ (lớn hơn 0)!'); return; }

  if (editId) {
    // --- CẬP NHẬT món ăn đã có ---
    var idx = dsMonAn.findIndex(function(m) { return m.id === parseInt(editId, 10); });
    if (idx >= 0) {
      dsMonAn[idx].ten  = ten;
      dsMonAn[idx].gia  = gia;
      dsMonAn[idx].loai = loai;
      dsMonAn[idx].hinh = hinh;
      dsMonAn[idx].mota = mota;
    }
  } else {
    // --- THÊM MÓN ĂN MỚI ---
    dsMonAn.push({
      id:   nextId(dsMonAn),
      ten:  ten,
      gia:  gia,
      loai: loai,
      hinh: hinh,
      mota: mota
    });
  }

  saveData();          // Lưu vào localStorage
  closeModal('modal-monan');
  renderMonAn();       // Render lại bảng
}

// Xóa món ăn theo id
function xoaMonAn(id) {
  var mon = dsMonAn.find(function(m) { return m.id === id; });
  if (!mon) return;
  if (!confirm('Xoá món "' + mon.ten + '"?\nThao tác này không thể hoàn tác.')) return;

  // Dùng filter để loại bỏ món có id đó
  dsMonAn = dsMonAn.filter(function(m) { return m.id !== id; });
  saveData();
  renderMonAn();
}

// Hiện ảnh preview khi người dùng chọn trong dropdown
function previewHinh(val) {
  var prev = document.getElementById('mon-hinh-preview');
  if (val) {
    prev.src          = val;
    prev.style.display = 'block';
    prev.onerror      = function() { this.style.display = 'none'; };
  } else {
    prev.style.display = 'none';
  }
}


// ============================================================
// PHẦN 9: BÀN ĂN — Hiển thị, thêm, đổi trạng thái, xóa
// ============================================================

// Render lưới các card bàn ăn
function renderBanAn() {
  var grid = document.getElementById('ban-grid');

  if (!dsBanAn.length) {
    grid.innerHTML = '<div class="empty-msg">Chưa có bàn nào. Hãy thêm bàn mới!</div>';
    return;
  }

  // Map class màu theo trạng thái
  var colorMap = {
    'trong':        'bc-green',
    'dang-phuc-vu': 'bc-yellow',
    'da-dat':       'bc-blue'
  };

  var html = '';
  dsBanAn.forEach(function(ban) {
    var colorCls = colorMap[ban.trang_thai] || 'bc-green';
    var tt       = ban.trang_thai;

    // Đếm số đơn đang xử lý của bàn này (để hiển thị thêm thông tin)
    var soDon = dsDonHang.filter(function(d) {
      return d.so_ban === ban.so_ban && d.trang_thai === 'dang-xu-ly';
    }).length;

    html +=
      '<div class="ban-card ' + colorCls + '">' +
        '<div class="ban-card-header">' +
          '<div class="ban-card-num">Bàn ' + ban.so_ban + '</div>' +
          badgeBan(tt) +
        '</div>' +
        '<div class="ban-card-info">' +
          '<span>👥 ' + ban.suc_chua + ' người</span>' +
          (soDon > 0 ? '<span>📋 ' + soDon + ' đơn đang xử lý</span>' : '') +
        '</div>' +
        '<div class="ban-card-actions">';

    // Hiện nút phù hợp với trạng thái hiện tại
    if (tt === 'trong') {
      html += '<button class="btn btn-sm btn-warning" onclick="doiTrangThaiBan(' + ban.id + ', \'dang-phuc-vu\')">🍽 Mở bàn</button>';
      html += '<button class="btn btn-sm btn-info"    onclick="doiTrangThaiBan(' + ban.id + ', \'da-dat\')">📅 Đặt trước</button>';
    }
    if (tt !== 'trong') {
      html += '<button class="btn btn-sm btn-success" onclick="doiTrangThaiBan(' + ban.id + ', \'trong\')">✓ Trả bàn</button>';
    }
    if (tt === 'da-dat') {
      html += '<button class="btn btn-sm btn-warning" onclick="doiTrangThaiBan(' + ban.id + ', \'dang-phuc-vu\')">🍽 Phục vụ</button>';
    }
    html += '<button class="btn btn-sm btn-danger" onclick="xoaBan(' + ban.id + ')">🗑</button>';

    html += '</div></div>';
  });

  grid.innerHTML = html;
}

// Đổi trạng thái bàn (mở bàn / trả bàn / đặt trước...)
function doiTrangThaiBan(id, trangThaiMoi) {
  var ban = dsBanAn.find(function(b) { return b.id === id; });
  if (!ban) return;

  ban.trang_thai = trangThaiMoi;
  saveData();
  renderBanAn(); // Render lại lưới bàn

  // Nếu đang ở màn tổng quan, cập nhật sơ đồ bàn nhanh luôn
  if (currentSection === 'tongquan') renderBanQuick();
}

// Mở modal thêm bàn
function openModalThemBan() {
  document.getElementById('ban-so').value        = '';
  document.getElementById('ban-suc-chua').value  = '4';
  openModal('modal-ban');
}

// Lưu bàn mới
function saveThemBan() {
  var soBan   = parseInt(document.getElementById('ban-so').value, 10);
  var sucChua = parseInt(document.getElementById('ban-suc-chua').value, 10) || 4;

  if (!soBan || soBan <= 0) {
    alert('Vui lòng nhập số bàn hợp lệ (số dương)!');
    return;
  }

  // Kiểm tra xem số bàn đó đã tồn tại chưa
  var trung = dsBanAn.find(function(b) { return b.so_ban === soBan; });
  if (trung) {
    alert('Bàn số ' + soBan + ' đã tồn tại! Vui lòng chọn số khác.');
    return;
  }

  dsBanAn.push({
    id:         nextId(dsBanAn),
    so_ban:     soBan,
    suc_chua:   sucChua,
    trang_thai: 'trong'
  });

  // Sắp xếp lại theo số bàn cho dễ nhìn
  dsBanAn.sort(function(a, b) { return a.so_ban - b.so_ban; });

  saveData();
  closeModal('modal-ban');
  renderBanAn();
}

// Xóa bàn
function xoaBan(id) {
  var ban = dsBanAn.find(function(b) { return b.id === id; });
  if (!ban) return;
  if (!confirm('Xoá bàn ' + ban.so_ban + '?\nThao tác này không thể hoàn tác.')) return;

  dsBanAn = dsBanAn.filter(function(b) { return b.id !== id; });
  saveData();
  renderBanAn();
}


// ============================================================
// PHẦN 10: ĐƠN HÀNG — Tạo, xem, xử lý, xóa đơn
// ============================================================

// Render bảng danh sách đơn hàng
function renderDonHang() {
  var filterTT = document.getElementById('filter-trang-thai-don').value;
  var search   = document.getElementById('search-don').value.trim();

  // Mới nhất lên trên, rồi mới lọc
  var rows = dsDonHang.slice().reverse().filter(function(d) {
    if (filterTT && d.trang_thai !== filterTT) return false;
    if (search && !String(d.so_ban).includes(search)) return false;
    return true;
  });

  var wrap = document.getElementById('donhang-table-wrap');

  if (!rows.length) {
    wrap.innerHTML = '<div class="empty-msg">Không có đơn hàng nào.<br>Bấm "+ Tạo đơn mới" để bắt đầu!</div>';
    return;
  }

  var html =
    '<div class="table-wrap"><table>' +
    '<thead><tr>' +
      '<th>#</th><th>Bàn</th><th>Số món</th>' +
      '<th>Tổng tiền</th><th>Trạng thái</th>' +
      '<th>Thời gian</th><th style="width:180px">Thao tác</th>' +
    '</tr></thead><tbody>';

  rows.forEach(function(d) {
    html +=
      '<tr>' +
        '<td>#' + d.id + '</td>' +
        '<td><b>Bàn ' + d.so_ban + '</b></td>' +
        '<td>' + d.items.length + ' món</td>' +
        '<td><b>' + fmtTien(d.tong_tien) + '</b></td>' +
        '<td>' + badgeDon(d.trang_thai) + '</td>' +
        '<td>' + fmtNgayGio(d.created_at) + '</td>' +
        '<td>' +
          '<div class="action-btns">' +
            '<button class="btn btn-sm btn-info"    onclick="xemChiTiet(' + d.id + ')">👁 Xem</button>' +
            // Chỉ hiện nút "Xong" và "Huỷ" khi đơn đang xử lý
            (d.trang_thai === 'dang-xu-ly'
              ? '<button class="btn btn-sm btn-success" onclick="hoanThanhDon(' + d.id + ')">✓ Xong</button>' +
                '<button class="btn btn-sm btn-warning" onclick="huyDon(' + d.id + ')">✕ Huỷ</button>'
              : '') +
            '<button class="btn btn-sm btn-danger"  onclick="xoaDon(' + d.id + ')">🗑</button>' +
          '</div>' +
        '</td>' +
      '</tr>';
  });

  html += '</tbody></table></div>';
  wrap.innerHTML = html;
}

// Mở modal tạo đơn hàng mới
function openModalTaoDon() {
  donItems = []; // Xóa danh sách món tạm của lần trước

  // Đổ danh sách bàn vào dropdown
  var selBan = document.getElementById('don-chon-ban');
  selBan.innerHTML = '<option value="">— Chọn bàn —</option>';
  dsBanAn.forEach(function(ban) {
    var opt  = document.createElement('option');
    opt.value       = ban.so_ban;
    opt.textContent = 'Bàn ' + ban.so_ban + ' (' + labelTrangThaiBan(ban.trang_thai) + ')';
    selBan.appendChild(opt);
  });

  // Đổ danh sách món ăn vào dropdown (nhóm theo loại)
  var selMon = document.getElementById('don-chon-mon');
  selMon.innerHTML = '<option value="">— Chọn món ăn —</option>';

  var loais = ['mon-chinh', 'do-uong', 'trang-miet'];
  var loaiLabels = { 'mon-chinh': 'Món chính', 'do-uong': 'Đồ uống', 'trang-miet': 'Tráng miệng' };

  loais.forEach(function(loai) {
    var monTrongLoai = dsMonAn.filter(function(m) { return m.loai === loai; });
    if (!monTrongLoai.length) return;

    // Tạo optgroup để phân nhóm trong dropdown
    var group = document.createElement('optgroup');
    group.label = loaiLabels[loai];

    monTrongLoai.forEach(function(m) {
      var opt        = document.createElement('option');
      opt.value      = m.id;
      opt.textContent = m.ten + ' — ' + fmtTien(m.gia);
      group.appendChild(opt);
    });

    selMon.appendChild(group);
  });

  document.getElementById('don-so-luong').value = 1;
  renderDonItems(); // Hiển thị danh sách rỗng ban đầu
  openModal('modal-taodon');
}

// Thêm món vào đơn tạm (khi bấm nút "Thêm" trong modal tạo đơn)
function themMonVaoDon() {
  var monId    = parseInt(document.getElementById('don-chon-mon').value, 10);
  var soLuong  = parseInt(document.getElementById('don-so-luong').value, 10) || 1;

  if (!monId)     { alert('Vui lòng chọn món ăn!'); return; }
  if (soLuong <= 0) { alert('Số lượng phải lớn hơn 0!'); return; }

  var mon = dsMonAn.find(function(m) { return m.id === monId; });
  if (!mon) return;

  // Nếu món đã có trong đơn → cộng thêm số lượng
  var existing = donItems.find(function(i) { return i.mon_id === monId; });
  if (existing) {
    existing.so_luong += soLuong;
  } else {
    donItems.push({
      mon_id:   mon.id,
      ten_mon:  mon.ten,
      gia:      mon.gia,
      so_luong: soLuong
    });
  }

  renderDonItems(); // Cập nhật bảng món trong modal
}

// Render bảng món đã chọn trong modal tạo đơn + tính tổng
function renderDonItems() {
  if (!donItems.length) {
    document.getElementById('don-items-list').innerHTML =
      '<div class="empty-msg-sm">Chưa có món nào. Chọn món ở trên và bấm "+ Thêm".</div>';
    document.getElementById('don-tong-tien').textContent = '0đ';
    return;
  }

  var tong = 0;
  var html =
    '<table class="don-table">' +
    '<thead><tr><th>Tên món</th><th>Đơn giá</th><th>SL</th><th>Thành tiền</th><th></th></tr></thead>' +
    '<tbody>';

  donItems.forEach(function(item, idx) {
    var thanhTien = item.gia * item.so_luong;
    tong += thanhTien;
    html +=
      '<tr>' +
        '<td>' + item.ten_mon + '</td>' +
        '<td>' + fmtTien(item.gia) + '</td>' +
        '<td>' + item.so_luong + '</td>' +
        '<td><b>' + fmtTien(thanhTien) + '</b></td>' +
        // Nút xóa từng dòng món, truyền index để biết xóa phần tử nào
        '<td><button class="btn-icon btn-icon-del" onclick="xoaItemDon(' + idx + ')">✕</button></td>' +
      '</tr>';
  });

  html += '</tbody></table>';
  document.getElementById('don-items-list').innerHTML = html;
  document.getElementById('don-tong-tien').textContent = fmtTien(tong);
}

// Xóa 1 món khỏi đơn tạm (khi bấm ✕ trong bảng)
function xoaItemDon(idx) {
  donItems.splice(idx, 1); // splice(vị trí, số phần tử cần xóa)
  renderDonItems();
}

// Lưu đơn hàng vào danh sách
function saveDonHang() {
  var soBan = parseInt(document.getElementById('don-chon-ban').value, 10);

  if (!soBan)         { alert('Vui lòng chọn bàn!'); return; }
  if (!donItems.length) { alert('Vui lòng thêm ít nhất 1 món!'); return; }

  // Tính tổng tiền
  var tongTien = donItems.reduce(function(sum, i) {
    return sum + i.gia * i.so_luong;
  }, 0);

  // Tạo đơn hàng mới
  var donMoi = {
    id:         nextId(dsDonHang),
    so_ban:     soBan,
    items:      donItems.slice(), // .slice() để tạo bản sao, tránh tham chiếu
    tong_tien:  tongTien,
    trang_thai: 'dang-xu-ly',
    created_at: new Date().toISOString()
  };

  dsDonHang.push(donMoi);

  // Cập nhật trạng thái bàn → đang phục vụ
  var ban = dsBanAn.find(function(b) { return b.so_ban === soBan; });
  if (ban) ban.trang_thai = 'dang-phuc-vu';

  saveData();
  closeModal('modal-taodon');
  renderDonHang();
}

// Xem chi tiết đơn hàng
function xemChiTiet(id) {
  var don = dsDonHang.find(function(d) { return d.id === id; });
  if (!don) return;

  var html =
    '<div class="chitiet-header">' +
      '<div><b>Đơn #' + don.id + '</b></div>' +
      '<div>🪑 Bàn ' + don.so_ban + '</div>' +
      '<div>' + badgeDon(don.trang_thai) + '</div>' +
      '<div>🕐 ' + fmtNgayGio(don.created_at) + '</div>' +
    '</div>' +
    '<table class="don-table">' +
    '<thead><tr><th>Tên món</th><th>Đơn giá</th><th>Số lượng</th><th>Thành tiền</th></tr></thead>' +
    '<tbody>';

  don.items.forEach(function(item) {
    html +=
      '<tr>' +
        '<td>' + item.ten_mon + '</td>' +
        '<td>' + fmtTien(item.gia) + '</td>' +
        '<td>' + item.so_luong + '</td>' +
        '<td><b>' + fmtTien(item.gia * item.so_luong) + '</b></td>' +
      '</tr>';
  });

  html +=
    '</tbody></table>' +
    '<div class="chitiet-total">Tổng tiền: <b>' + fmtTien(don.tong_tien) + '</b></div>';

  document.getElementById('modal-chitiet-body').innerHTML = html;
  openModal('modal-chitiet');
}

// Đánh dấu đơn hàng là Hoàn thành
function hoanThanhDon(id) {
  var don = dsDonHang.find(function(d) { return d.id === id; });
  if (!don) return;

  don.trang_thai = 'hoan-thanh';

  // Kiểm tra bàn đó còn đơn nào đang xử lý không
  // Nếu không còn đơn nào → trả bàn về trạng thái "trống"
  var conDonKhac = dsDonHang.some(function(d) {
    return d.so_ban === don.so_ban && d.trang_thai === 'dang-xu-ly' && d.id !== id;
  });
  if (!conDonKhac) {
    var ban = dsBanAn.find(function(b) { return b.so_ban === don.so_ban; });
    if (ban) ban.trang_thai = 'trong';
  }

  saveData();
  renderDonHang();
}

// Huỷ đơn hàng
function huyDon(id) {
  if (!confirm('Xác nhận huỷ đơn hàng này?')) return;

  var don = dsDonHang.find(function(d) { return d.id === id; });
  if (!don) return;

  don.trang_thai = 'da-huy';

  // Kiểm tra bàn → cập nhật trạng thái nếu không còn đơn nào
  var conDonKhac = dsDonHang.some(function(d) {
    return d.so_ban === don.so_ban && d.trang_thai === 'dang-xu-ly' && d.id !== id;
  });
  if (!conDonKhac) {
    var ban = dsBanAn.find(function(b) { return b.so_ban === don.so_ban; });
    if (ban && ban.trang_thai === 'dang-phuc-vu') ban.trang_thai = 'trong';
  }

  saveData();
  renderDonHang();
}

// Xóa đơn hàng hoàn toàn khỏi danh sách
function xoaDon(id) {
  if (!confirm('Xoá đơn hàng #' + id + '?\nThao tác này không thể hoàn tác.')) return;
  dsDonHang = dsDonHang.filter(function(d) { return d.id !== id; });
  saveData();
  renderDonHang();
}


// ============================================================
// PHẦN 11: MODAL — Mở và đóng
// ============================================================

function openModal(id) {
  document.getElementById(id).classList.add('show');
  document.body.classList.add('modal-open'); // Ngăn scroll trang chính
}

function closeModal(id) {
  document.getElementById(id).classList.remove('show');
  document.body.classList.remove('modal-open');
}

// Nhấn phím ESC để đóng modal đang mở
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.show').forEach(function(overlay) {
      overlay.classList.remove('show');
    });
    document.body.classList.remove('modal-open');
  }
});


// ============================================================
// PHẦN 12: ĐỒNG HỒ THỜI GIAN THỰC
// ============================================================

function updateClock() {
  var el = document.getElementById('current-time');
  if (!el) return;
  var now = new Date();
  el.textContent = now.toLocaleTimeString('vi-VN', {
    hour: '2-digit', minute: '2-digit', second: '2-digit'
  });
}


// ============================================================
// PHẦN 13: KHỞI ĐỘNG APP
// ============================================================

function init() {
  loadData();         // Đọc dữ liệu đã lưu trong localStorage
  initDefaultData();  // Tạo dữ liệu mẫu nếu chưa có
  renderTongQuan();   // Hiển thị trang tổng quan đầu tiên

  // Chạy đồng hồ ngay và cập nhật mỗi giây
  updateClock();
  setInterval(updateClock, 1000);
}

// Chạy init() khi toàn bộ trang HTML đã load xong
init();