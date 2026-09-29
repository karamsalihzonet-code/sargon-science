const WHATSAPP = "9647876832447";

const books = [
  {id:1,title:"دليل المفاعلات النووية",price:10000,desc:"مرجع تعريفي حول المفاعلات النووية ومبادئ عملها ومفاهيم الطاقة النووية.",meta:"علوم نووية"},
  {id:2,title:"الجغرافيا الفلكية",price:10000,desc:"مدخل إلى العلاقة بين الجغرافيا وعلم الفلك والمفاهيم المرتبطة بالسماء والأرض.",meta:"فلك وعلوم"},
  {id:3,title:"أسرار الفيزياء الفلكية",price:10000,desc:"رحلة مبسطة في الفيزياء الفلكية والظواهر الكونية والمفاهيم الأساسية للكون.",meta:"فيزياء وفلك"},
  {id:4,title:"المبادئ الأساسية لنظرية الكم",price:10000,desc:"مدخل إلى المبادئ الأساسية لميكانيكا الكم والمفاهيم التي تقوم عليها النظرية.",meta:"فيزياء"},
];

let cart = JSON.parse(localStorage.getItem("sargonCart") || "[]");

const money = n => n.toLocaleString("ar-IQ") + " د.ع";

function save(){localStorage.setItem("sargonCart",JSON.stringify(cart)); updateCartCount();}

function renderBooks(){
  document.getElementById("bookCount").textContent = `${books.length} كتب`;
  document.getElementById("booksGrid").innerHTML = books.map(b=>`
    <article class="book">
      <div class="cover"><div class="cover-title">${b.title}</div></div>
      <div class="book-info">
        <h3>${b.title}</h3><p>${b.desc}</p>
        <div class="price">${money(b.price)}</div>
        <div class="book-actions">
          <button class="outline" onclick="showDetails(${b.id})">التفاصيل</button>
          <button class="add-btn" onclick="addToCart(${b.id})">أضف للسلة</button>
        </div>
      </div>
    </article>`).join("");
}

function showDetails(id){
  const b=books.find(x=>x.id===id);
  document.getElementById("detailsContent").innerHTML=`
    <span class="eyebrow">${b.meta}</span>
    <h2 class="details-title">${b.title}</h2>
    <p class="details-desc">${b.desc}</p>
    <div class="details-price">${money(b.price)}</div>
    <button class="primary-btn" onclick="addToCart(${b.id});closeDetails();openCart()">إضافة إلى السلة</button>`;
  document.getElementById("detailsModal").classList.remove("hidden");
}
function closeDetails(){document.getElementById("detailsModal").classList.add("hidden")}
function addToCart(id){if(!cart.includes(id)) cart.push(id); save();}
function removeFromCart(id){cart=cart.filter(x=>x!==id);save();renderCart();}
function updateCartCount(){document.getElementById("cartCount").textContent=cart.length}
function openCart(){renderCart();document.getElementById("cartModal").classList.remove("hidden")}
function closeCart(){document.getElementById("cartModal").classList.add("hidden")}

function renderCart(){
  const items=books.filter(b=>cart.includes(b.id));
  const box=document.getElementById("cartItems");
  box.innerHTML=items.length ? items.map(b=>`
    <div class="cart-row"><span>${b.title}</span><span>${money(b.price)} <button class="remove" onclick="removeFromCart(${b.id})">حذف</button></span></div>`).join("") : `<p class="note">السلة فارغة حاليًا.</p>`;
  document.getElementById("cartTotal").textContent=money(items.reduce((s,b)=>s+b.price,0));
}
function checkout(){
  const items=books.filter(b=>cart.includes(b.id));
  if(!items.length){alert("أضف كتابًا إلى السلة أولًا.");return}
  const total=items.reduce((s,b)=>s+b.price,0);
  const list=items.map((b,i)=>`${i+1}. ${b.title} — ${money(b.price)}`).join("\n");
  const msg=`مرحبًا Sargon Science، أريد طلب الكتب التالية:\n\n${list}\n\nالمجموع: ${money(total)}\n\nأرجو تزويدي بتفاصيل الدفع والتسليم.`;
  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`,"_blank");
}
renderBooks();updateCartCount();
