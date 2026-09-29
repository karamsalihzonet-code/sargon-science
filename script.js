const WHATSAPP="9647876832447";
const books=[
{id:1,title:"المبادئ الأساسية لنظرية الكم",price:10000,category:"فيزياء",desc:"مدخل إلى المبادئ الأساسية لميكانيكا الكم والمفاهيم التي تقوم عليها النظرية.",image:"https://i.ibb.co/GZBGSGK/file-00000000875c820a8c2e08c3ec732585.png"},
{id:2,title:"الجغرافيا الفلكية",price:10000,category:"فلك",desc:"مدخل إلى العلاقة بين الجغرافيا وعلم الفلك والمفاهيم المرتبطة بالسماء والأرض.",image:"https://i.ibb.co/DPkSTqL3/file-00000000b1f481f4857e763c350d7075.png"},
{id:3,title:"الفيزياء الفلكية والميثولوجيا القديمة",price:10000,category:"فلك",desc:"رحلة تجمع بين مفاهيم الفيزياء الفلكية وبعض الأساطير والميثولوجيا القديمة المرتبطة بالسماء.",image:"https://i.ibb.co/LWd5MtD/file-0000000011248243a5cc116ec58ee65b.png"},
{id:4,title:"دليل المفاعلات النووية",price:10000,category:"علوم",desc:"مرجع تعريفي حول المفاعلات النووية ومبادئ عملها ومفاهيم الطاقة النووية.",image:"https://i.ibb.co/nsqrcBBQ/file-000000005ddc8210b7ede897cc472d55.png"}
];
let cart=JSON.parse(localStorage.getItem("sargonCart")||"[]"),activeFilter="all";
const money=n=>n.toLocaleString("ar-IQ")+" د.ع";
function save(){localStorage.setItem("sargonCart",JSON.stringify(cart));updateCartCount()}
function renderBooks(){
 const list=activeFilter==="all"?books:books.filter(b=>b.category===activeFilter);
 document.getElementById("bookCount").textContent=`${list.length} كتب`;
 document.getElementById("booksGrid").innerHTML=list.map(b=>`
 <article class="book"><div class="cover"><img src="${b.image}" alt="${b.title}" loading="lazy"></div>
 <div class="book-info"><div class="meta">${b.category}</div><h3>${b.title}</h3><p>${b.desc}</p><div class="price">${money(b.price)}</div>
 <div class="book-actions"><button class="outline" onclick="showDetails(${b.id})">التفاصيل</button><button class="add-btn" onclick="addToCart(${b.id})">أضف للسلة</button></div></div></article>`).join("");
}
function showDetails(id){
 const b=books.find(x=>x.id===id);
 document.getElementById("detailsContent").innerHTML=`<div class="detail-layout"><img class="detail-cover" src="${b.image}" alt="${b.title}"><div><span class="eyebrow">${b.category}</span><h2 class="details-title">${b.title}</h2><p class="details-desc">${b.desc}</p><div class="details-price">${money(b.price)}</div><button class="primary-btn" onclick="addToCart(${b.id});closeDetails();openCart()">إضافة إلى السلة</button></div></div>`;
 document.getElementById("detailsModal").classList.remove("hidden");
}
function closeDetails(){document.getElementById("detailsModal").classList.add("hidden")}
function addToCart(id){if(!cart.includes(id))cart.push(id);save();alert("تمت إضافة الكتاب إلى السلة")}
function removeFromCart(id){cart=cart.filter(x=>x!==id);save();renderCart()}
function updateCartCount(){document.getElementById("cartCount").textContent=cart.length}
function openCart(){renderCart();document.getElementById("cartModal").classList.remove("hidden")}
function closeCart(){document.getElementById("cartModal").classList.add("hidden")}
function renderCart(){
 const items=books.filter(b=>cart.includes(b.id)),box=document.getElementById("cartItems");
 box.innerHTML=items.length?items.map(b=>`<div class="cart-row"><span>${b.title}</span><span>${money(b.price)} <button class="remove" onclick="removeFromCart(${b.id})">حذف</button></span></div>`).join(""):`<p class="note">السلة فارغة حاليًا.</p>`;
 document.getElementById("cartTotal").textContent=money(items.reduce((s,b)=>s+b.price,0));
}
function checkout(){
 const items=books.filter(b=>cart.includes(b.id));if(!items.length){alert("أضف كتابًا إلى السلة أولًا.");return}
 const total=items.reduce((s,b)=>s+b.price,0),list=items.map((b,i)=>`${i+1}. ${b.title} — ${money(b.price)}`).join("\n");
 const msg=`مرحبًا Sargon Science، أريد طلب الكتب التالية:\n\n${list}\n\nالمجموع: ${money(total)}\n\nأرجو تزويدي بتفاصيل الدفع والتسليم.`;
 window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`,"_blank");
}
document.querySelectorAll(".filter").forEach(btn=>btn.onclick=()=>{document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));btn.classList.add("active");activeFilter=btn.dataset.filter;renderBooks()});
renderBooks();updateCartCount();
