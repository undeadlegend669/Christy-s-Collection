

// Dark Mode Toggle
const darkToggle = document.getElementById("darkModeToggle");

// Load saved preference
if(localStorage.getItem('darkMode') === 'enabled'){
  document.body.classList.add('dark');
  darkToggle.checked = true;
}

darkToggle.addEventListener('change', () => {
  document.body.classList.toggle('dark');
  if(document.body.classList.contains('dark')){
    localStorage.setItem('darkMode','enabled');
  } else {
    localStorage.setItem('darkMode','disabled');
  }
});

const dropdown = document.querySelector(".dropdown");
const list = document.querySelector(".list");

list.addEventListener("click", () => {
  dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
});


document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.slide');
  const dotsContainer = document.querySelector('.dots');
  const titleEl = document.getElementById('slideTitle');
  const descEl = document.getElementById('slideDesc');
  let currentSlide = 0;
  let autoSlideInterval;

  slides.forEach((_, i) => {
    const dot = document.createElement('span');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });

  function showSlide(index) {
    slides.forEach(s => s.classList.remove('active'));
    slides[index].classList.add('active');

    const dots = dotsContainer.querySelectorAll('span');
    dots.forEach(d => d.classList.remove('active'));
    dots[index].classList.add('active');

    titleEl.textContent = slides[index].dataset.title || "";
    descEl.textContent = slides[index].dataset.desc || "";
  }

  document.querySelector('.prev').addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  });

  document.querySelector('.next').addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  });

  function goToSlide(index) {
    currentSlide = index;
    showSlide(currentSlide);
  }

  function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }, 3000);
  }

  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }

  document.querySelector('.slideshow-container').addEventListener('mouseenter', stopAutoSlide);
  document.querySelector('.slideshow-container').addEventListener('mouseleave', startAutoSlide);

  showSlide(currentSlide);
  startAutoSlide();
});



let itemsData = [
  {type:'image', src: '487223827_664245039546266_643052197982672591_n.jpg', name:'Dress A', price:100, company:'Brand X', sizes:['S','M','L']},
  {type:'video', src:'WhatsApp Video 2026-01-13 at 10.29.05 PM.mp4', name:'Hat B', price:50, company:'Brand Y', sizes:['M','L']},
  {type:'video', src:'WhatsAp Video 2026-01-13 at 10.29.01 PM.mp4', name:'Shoes C', price:120, company:'Brand Z', sizes:['38','39','40']},
  {type:'image', src:'488313132_664542842849819_2376410764984660544_n.jpg', name:'Bag D', price:80, company:'Brand Q', sizes:['One Size']},
  {type:'image', src:'488313132_664542842849819_2376410764984660544_n.jpg', name:'Bag D', price:80, company:'Brand Q', sizes:['One Size']},
  {type:'image', src:'488313132_664542842849819_2376410764984660544_n.jpg', name:'Bag D', price:80, company:'Brand Q', sizes:['One Size']},
  {type:'image', src:'488313132_664542842849819_2376410764984660544_n.jpg', name:'Bag D', price:80, company:'Brand Q', sizes:['One Size']},
  {type:'video', src:'WhatsApp Video 2026-01-13 at 10.29.05 PM.mp4', name:'Hat B', price:50, company:'Brand Y', sizes:['M','L']},
  {type:'video', src:'WhatsApp Video 2026-01-13 at 10.29.05 PM.mp4', name:'Hat B', price:50, company:'Brand Y', sizes:['M','L']},
  {type:'video', src:'WhatsApp Video 2026-01-13 at 10.29.05 PM.mp4', name:'Hat B', price:50, company:'Brand Y', sizes:['M','L']},
  {type:'video', src:'WhatsApp Video 2026-01-13 at 10.29.05 PM.mp4', name:'Hat B', price:50, company:'Brand Y', sizes:['M','L']},
  {type:'video', src:'WhatsApp Video 2026-01-13 at 10.29.05 PM.mp4', name:'Hat B', price:50, company:'Brand Y', sizes:['M','L']},
  {type:'video', src:'WhatsApp Video 2026-01-13 at 10.29.05 PM.mp4', name:'Hat B', price:50, company:'Brand Y', sizes:['M','L']},
  {type:'video', src:'WhatsApp Video 2026-01-13 at 10.29.05 PM.mp4', name:'Hat B', price:50, company:'Brand Y', sizes:['M','L']},
  {type:'video', src:'WhatsApp Video 2026-01-13 at 10.29.05 PM.mp4', name:'Hat B', price:50, company:'Brand Y', sizes:['M','L']},
  {type:'video', src:'WhatsApp Video 2026-01-13 at 10.29.05 PM.mp4', name:'Hat B', price:50, company:'Brand Y', sizes:['M','L']},  
];

// ===== Globals =====
const itemsSection = document.getElementById('itemsSection');
const itemPopup = document.getElementById('itemPopup');
const popupImg = document.getElementById('popupImg');
const popupVid = document.getElementById('popupVid');
const popupName = document.getElementById('popupName');
const popupCompany = document.getElementById('popupCompany');
const popupPrice = document.getElementById('popupPrice');
const sizesContainer = document.getElementById('sizesContainer');

const cartPopup = document.getElementById('cartPopup');
const cartCount = document.getElementById('cartCount');
const cartItemsDiv = document.getElementById('cartItems');
const grandTotalEl = document.getElementById('grandTotal');

let cart = JSON.parse(localStorage.getItem('cart')) || [];

// ===== Render Thumbnails =====
function renderThumbnails(){
  itemsSection.innerHTML='';
  itemsData.forEach((item,index)=>{
    const div = document.createElement('div');
    div.className='thumbnail-card';
    if(item.type==='image') div.innerHTML=`<img src="${item.src}">`;
    else div.innerHTML=`<video src="${item.src}" muted autoplay loop></video>`;
    div.addEventListener('click',()=>openPopup(item));
    itemsSection.appendChild(div);
  });
}
renderThumbnails();

// ===== Open Item Popup =====
function openPopup(item){
  if(item.type==='image'){
    popupImg.src=item.src;
    popupImg.style.display='block';
    popupVid.style.display='none';
  } else {
    popupVid.src=item.src;
    popupVid.style.display='block';
    popupImg.style.display='none';
  }
  popupName.textContent=item.name;
  popupCompany.textContent="Company: "+item.company;
  popupPrice.textContent="Price: $"+item.price;

  // Sizes + quantity inputs
  sizesContainer.innerHTML='';
  item.sizes.forEach(size=>{
    const div = document.createElement('div');
    div.innerHTML=`${size}: <input type="number" value="0" min="0" style="width:50px;">`;
    sizesContainer.appendChild(div);
  });

  itemPopup.style.display='flex';

  // Add to Cart button
  document.getElementById('addToCartBtn').onclick = ()=>{
    const sizeInputs = sizesContainer.querySelectorAll('input');
    const sizes = {};
    let totalQty=0;
    sizeInputs.forEach((input,i)=>{
      const qty=parseInt(input.value);
      if(qty>0){
        sizes[item.sizes[i]]=qty;
        totalQty+=qty;
      }
    });
    if(totalQty===0) {alert('Select quantity'); return;}
    const totalPrice=item.price*totalQty;
    const cartItem={...item, sizes, totalPrice};
    cart.push(cartItem);
    localStorage.setItem('cart',JSON.stringify(cart));
    cartCount.textContent=cart.length;
    itemPopup.style.display='none';
  }
}

// ===== Close Popups =====
document.querySelectorAll('.popup .close').forEach(btn=>{
  btn.addEventListener('click',()=>btn.parentElement.parentElement.style.display='none');
});

// ===== View Cart =====
document.getElementById('viewCartBtn').addEventListener('click',()=>{
  renderCart();
  cartPopup.style.display='flex';
});

function renderCart(){
  cartItemsDiv.innerHTML='';
  let grandTotal=0;
  cart.forEach((item,index)=>{
    const div=document.createElement('div');
    div.className='cart-item';
    let mediaHtml=item.type==='image'?`<img src="${item.src}">`:
                `<video src="${item.src}" muted controls style="width:50px;height:50px;"></video>`;
    let sizesHtml=Object.entries(item.sizes).map(([size,qty])=>`${size}: ${qty}`).join(', ');
    div.innerHTML=`
      ${mediaHtml} <span>${item.name} | ${sizesHtml} | $${item.totalPrice}</span>
      <button data-index="${index}">Remove</button>
    `;
    div.querySelector('button').addEventListener('click',(e)=>{
      cart.splice(index,1);
      localStorage.setItem('cart',JSON.stringify(cart));
      renderCart();
      cartCount.textContent=cart.length;
    });
    cartItemsDiv.appendChild(div);
    grandTotal+=item.totalPrice;
  });
  grandTotalEl.textContent=grandTotal;
}

// ===== Clear Cart =====
document.getElementById('clearCartBtn').addEventListener('click',()=>{
  if(confirm('This cannot be undone. Clear cart?')){
    cart=[];
    localStorage.removeItem('cart');
    cartCount.textContent=0;
    renderCart();
  }
});

// ===== Checkout =====
document.getElementById('checkoutBtn').addEventListener('click',()=>{
  alert('Proceed with checkout?');
});

// ===== Cart count on load =====
cartCount.textContent=cart.length;
