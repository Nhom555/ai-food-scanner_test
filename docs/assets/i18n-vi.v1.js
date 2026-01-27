/* Runtime Vietnamese translations (best-effort shim).
   This script replaces common English UI strings with Vietnamese equivalents
   at runtime. It does not modify the app bundle; it maps and replaces text
   nodes and some attributes. Runs repeatedly to handle SPA renders.
*/(function(){
  console.log('[i18n-vi] loaded');
  const MAP = {
    "Welcome to Food Scanner":"Chào mừng đến với Ứng dụng Quét Nhãn Thực Phẩm",
    "Protect your health with smart food choices":"Bảo vệ sức khỏe của bạn với lựa chọn thực phẩm thông minh",
    "Select Your Allergies":"Chọn dị ứng của bạn",
    "Help us keep you safe":"Giúp chúng tôi giữ bạn an toàn",
    "Dietary Preferences":"Sở thích ăn uống",
    "Customize for your lifestyle":"Tùy chỉnh theo lối sống của bạn",
    "Health Conditions":"Tình trạng sức khỏe",
    "Get personalized recommendations":"Nhận khuyến nghị cá nhân",
    "Preferred Language":"Ngôn ngữ ưu tiên",
    "Scan Label":"Quét Nhãn",
    "Camera OCR":"Máy ảnh (OCR)",
    "Smart Scan Food Label":"Quét nhãn thông minh",
    "Detect allergens instantly":"Phát hiện dị nguyên ngay lập tức",
    "Get personalized health insights":"Nhận thông tin sức khỏe cá nhân",
    "Find healthy alternatives":"Tìm lựa chọn thay thế lành mạnh",
    "Good Morning! 🌅":"Chào buổi sáng! 🌅",
    "Ready to make healthy choices?":"Sẵn sàng cho lựa chọn lành mạnh?",
    "Search products, ingredients, or brands...":"Tìm sản phẩm, thành phần hoặc thương hiệu...",
    "Get Started":"Bắt đầu",
    "Continue":"Tiếp tục",
    "Scan Results":"Kết quả quét",
    "Analysis complete":"Phân tích hoàn tất",
    "Ingredients Analysis":"Phân tích thành phần",
    "Nutrition Facts":"Thông tin dinh dưỡng",
    "Find Healthier Alternatives":"Tìm lựa chọn lành mạnh",
    "Community":"Cộng đồng",
    "Analytics":"Phân tích",
    "Recent Scans":"Lần quét gần đây",
    "Smart Scan Food Label":"Quét nhãn thông minh",
    "Install Food Scanner for a better experience!":"Cài đặt Ứng dụng Quét Nhãn để trải nghiệm tốt hơn!",
    "Settings":"Cài đặt",
    "Language":"Ngôn ngữ",
    "Export My Data":"Xuất dữ liệu của tôi",
    "Clear All Data":"Xóa tất cả dữ liệu",
    "Feedback & Support":"Phản hồi & Hỗ trợ",
    "Privacy & Data":"Riêng tư & Dữ liệu",
    "Your Feedback":"Phản hồi của bạn",
    "Scan Another Product":"Quét sản phẩm khác",
    "View Details":"Xem chi tiết",
    "Compare":"So sánh",
    "Find Healthier Alternatives":"Tìm lựa chọn thay thế lành mạnh",
    "No alternatives found for this filter.":"Không tìm thấy lựa chọn thay thế cho bộ lọc này.",
    "Install":"Cài đặt",
    "Later":"Lúc khác"
  };

  // Sort keys by length desc to avoid partial replacements
  const KEYS = Object.keys(MAP).sort((a,b)=>b.length-a.length);

  function replaceInTextNode(node){
    let text = node.nodeValue;
    if(!text || !text.trim()) return;
    let changed = false;
    for(const k of KEYS){
      if(text.includes(k)){
        text = text.split(k).join(MAP[k]);
        changed = true;
      }
    }
    if(changed) node.nodeValue = text;
  }

  function walkAndReplace(root=document.body){
    if(!root) return;
    const it = document.createNodeIterator(root, NodeFilter.SHOW_TEXT, null);
    let node;
    while(node=it.nextNode()){
      replaceInTextNode(node);
    }

    // Replace common attributes like placeholder, title, aria-label
    const attrs = ["placeholder","title","aria-label","alt"];
    const all = root.querySelectorAll("*[placeholder],*[title],*[aria-label],img[alt]");
    all.forEach(el=>{
      attrs.forEach(a=>{
        if(el.hasAttribute(a)){
          const v = el.getAttribute(a);
          if(!v) return;
          for(const k of KEYS){ if(v.includes(k)){ el.setAttribute(a, v.split(k).join(MAP[k])); } }
        }
      });
    });
  }

  // Run immediately and repeatedly to catch SPA renders
  let runs = 0;
  const maxRuns = 50;
  const interval = setInterval(()=>{
    walkAndReplace(document.body);
    runs++;
    if(runs===1) console.log('[i18n-vi] initial pass done');
    if(runs>maxRuns) clearInterval(interval);
  }, 250);

  // Also run on DOMContentLoaded and on navigation events
  document.addEventListener('DOMContentLoaded', ()=>walkAndReplace(document.body));
  window.addEventListener('load', ()=>walkAndReplace(document.body));
  // for single-page navs: detect body subtree changes and translate
  const obs = new MutationObserver((records)=>{ walkAndReplace(document.body); });
  obs.observe(document.body, { childList: true, subtree: true });
})();
