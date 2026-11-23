(()=>{'use strict';
const $=s=>document.querySelector(s),$$=s=>Array.from(document.querySelectorAll(s));
const money=n=>n===null?'Consultar precio':'S/ '+Number(n).toFixed(2);
const safe=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let cart=[];
try{
 const saved=JSON.parse(localStorage.getItem('mery-cart')||'[]');
 if(Array.isArray(saved)){
  cart=saved.flatMap(item=>{
   const product=CATALOG.find(p=>p.id===item?.id);
   if(!product)return [];
   return [product.cat==='Chupetes'?{...item,price:product.price}:item];
  });
 }
}catch{}
let activeCat='Todos',searchTerm='',selected=null,qty=1,chosenVariant='',chosenSize='',selectedFruit=[],selectedToppings=[],selectedSyrups=[],selectedExtras=[];
const categories=['Todos','Chupetes','Promociones','Waffles','Cremas con frutas','Cuchareables','Postres','Bebidas'];
const catImages={'Chupetes':'img/clasicos-1.jpg','Promociones':'img/promo.jpg','Waffles':'img/waffle-1.jpg','Cremas con frutas':'img/cremas-vainilla.jpg','Cuchareables':'img/cuchareables.jpg','Postres':'img/crema-volteada.jpg','Bebidas':'img/frappe-clasico.jpg'};
function open(id){$('#'+id).hidden=false;document.body.classList.add('lock')}
function close(id){$('#'+id).hidden=true;if(!$$('.overlay').some(e=>!e.hidden))document.body.classList.remove('lock')}
function toast(t){let e=$('#toast');e.textContent=t;e.classList.add('show');clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>e.classList.remove('show'),2700)}
function init(){ $('#year').textContent=new Date().getFullYear();$('#categoryTiles').innerHTML=categories.slice(1).filter(c=>c!=='Promociones').map(c=>`<button class="cat-tile" data-cat="${safe(c)}"><img loading="lazy" src="${catImages[c]}" alt=""><strong>${safe(c)}</strong></button>`).join(''); renderFilters();renderProducts();renderCart();
 $('#search').addEventListener('input',e=>{searchTerm=e.target.value.toLocaleLowerCase('es');renderProducts()});
 document.addEventListener('click',e=>{let cat=e.target.closest('[data-cat]');if(cat){activeCat=cat.dataset.cat;renderFilters();renderProducts();document.getElementById('catalogo').scrollIntoView({behavior:'smooth'});}let fil=e.target.closest('[data-filter]');if(fil){activeCat=fil.dataset.filter;renderFilters();renderProducts()}let p=e.target.closest('[data-product]');if(p)showProduct(p.dataset.product);let cl=e.target.closest('[data-close]');if(cl)close(cl.dataset.close);let rm=e.target.closest('[data-remove]');if(rm){cart.splice(+rm.dataset.remove,1);saveCart();renderCart()}let go=e.target.closest('[data-go]');if(go){activeCat=go.dataset.go;renderFilters();renderProducts()}});
 $$('.overlay').forEach(e=>e.addEventListener('mousedown',ev=>{if(ev.target===e)close(e.id)}));document.addEventListener('keydown',e=>{if(e.key==='Escape')$$('.overlay').filter(x=>!x.hidden).forEach(x=>close(x.id))});
 $('#cartTop').onclick=$('#cartMobile').onclick=()=>{renderCart();open('cartOverlay')};$('#checkoutBtn').onclick=()=>{if(!cart.length){toast('Agrega algo rico al carrito ♡');return}close('cartOverlay');open('checkoutOverlay')};$('#delivery').onchange=deliveryChange;$('#checkoutForm').onsubmit=submitOrder;$('#welcomeGo').onclick=()=>{close('welcomeOverlay');document.getElementById('catalogo').scrollIntoView({behavior:'smooth'})};
 try{if(!sessionStorage.getItem('mery-welcome')){setTimeout(()=>open('welcomeOverlay'),350);sessionStorage.setItem('mery-welcome','1')}}catch{}
}
function renderFilters(){$('#filters').innerHTML=categories.map(c=>`<button class="filter ${c===activeCat?'active':''}" data-filter="${safe(c)}">${safe(c)}</button>`).join('')}
function renderProducts(){let items=CATALOG.filter(p=>(activeCat==='Todos'||p.cat===activeCat)&&(!searchTerm||[p.title,p.subtitle,p.cat,...(p.variants||[]).map(v=>v.name)].join(' ').toLocaleLowerCase('es').includes(searchTerm)));$('#empty').hidden=items.length>0;$('#productGrid').innerHTML=items.map((p,i)=>`<article class="product-card" style="animation-delay:${Math.min(i*35,300)}ms"><div class="product-photo"><img src="${p.image}" loading="lazy" alt="${safe(p.title)}"><span class="tag">${safe(p.cat)}</span></div><div class="product-body"><h3>${safe(p.title)}</h3><p>${safe(p.subtitle)}</p><div class="product-foot"><strong class="price ${p.price===null?'ask':''}">${p.price===null?'Precio a consultar':(p.id==='cremas'?'Desde ':'')+money(p.price)}</strong><button class="add-button" data-product="${p.id}" aria-label="Ver ${safe(p.title)}">+</button></div></div></article>`).join('')}
function showProduct(id){selected=CATALOG.find(p=>p.id===id);if(!selected)return;qty=1;chosenVariant='';chosenSize=selected.sizes?.[0]?.name||'';selectedFruit=[];selectedToppings=[];selectedSyrups=[];selectedExtras=[];renderProductModal();open('productOverlay')}
function chips(label,key,values){
 const options=values.map(option=>{
  const price=option.price ? ' (+ '+money(option.price)+')' : '';
  return `<button type="button" class="modifier" data-chip="${key}" data-value="${safe(option.name)}" aria-pressed="false">${safe(option.name)}${price}</button>`;
 }).join('');
 return `<label class="choice-label">${label}</label><div class="modifiers">${options}</div>`;
}
function selectedFlavor(){
 return selected.variants?.find(option=>option.name===chosenVariant);
}
function previewOption(option){
 const preview=$('#variantPreview');
 const item=option||selectedFlavor();
 preview.src=item?.image||selected.image;
 preview.alt=item?.name||selected.title;
}
function renderProductModal(){let p=selected;if(!p)return;const img=p.variants?.find(v=>v.name===chosenVariant)?.image||p.image;$('#productModalBody').innerHTML=`<div class="modal-product"><div class="modal-image"><img id="variantPreview" src="${img}" alt="${safe(p.title)}"></div><div class="modal-details"><span class="eyebrow">${safe(p.cat)} ♡</span><h2 id="modalTitle">${safe(p.title)}</h2><p>${safe(p.subtitle)}</p><div class="modal-price" id="modalPrice">${money(calcPrice())}</div>${p.variants?`<label class="choice-label" for="variantSelect">${safe(p.choose||'Elige tu sabor')} <span class="required">*</span></label><select class="option-select" id="variantSelect" required><option value="">${p.id==='cremas'?'Selecciona una crema…':'Selecciona un sabor…'}</option>${p.variants.map(v=>`<option value="${safe(v.name)}">${safe(v.name)}</option>`).join('')}</select>`:''}${p.sizes?`<label class="choice-label" for="sizeSelect">Tamaño <span class="required">*</span></label><select class="option-select" id="sizeSelect">${p.sizes.map(v=>`<option value="${safe(v.name)}">${safe(v.name)} — ${money(v.price)}</option>`).join('')}</select>`:''}${p.fruit?chips('Frutas (elige las que quieras)','fruit',p.fruit):''}${p.toppings?chips('Toppings','toppings',p.toppings):''}${p.syrups?chips('Jarabes','syrups',p.syrups):''}${p.extras?chips('Adicionales','extras',p.extras):''}<div class="quantity-row"><strong>Cantidad</strong><div class="stepper"><button id="minusQty" aria-label="Restar">−</button><strong id="qtyDisplay">${qty}</strong><button id="plusQty" aria-label="Sumar">+</button></div></div><p class="error-message" id="optionError"></p><button class="btn primary full modal-add" id="addToCart">Agregar a mi carrito ♡</button></div></div>`;
 $('#minusQty').onclick=()=>{$('#qtyDisplay').textContent=qty=Math.max(1,qty-1)};$('#plusQty').onclick=()=>{$('#qtyDisplay').textContent=qty=Math.min(99,qty+1)};
 if(p.variants)$('#variantSelect').onchange=e=>{chosenVariant=e.target.value;previewOption();$('#optionError').textContent=''};
 if(p.sizes)$('#sizeSelect').onchange=e=>{chosenSize=e.target.value;previewOption(p.sizes.find(option=>option.name===chosenSize));$('#modalPrice').textContent=money(calcPrice())};
 $$('[data-chip]').forEach(el=>el.onclick=()=>{const key=el.dataset.chip;const val=el.dataset.value;const arr=key==='fruit'?selectedFruit:key==='toppings'?selectedToppings:key==='syrups'?selectedSyrups:selectedExtras;let at=arr.indexOf(val);if(at===-1)arr.push(val);else arr.splice(at,1);el.classList.toggle('selected',at===-1);el.setAttribute('aria-pressed',String(at===-1));previewOption(at===-1?p[key].find(option=>option.name===val):undefined);$('#modalPrice').textContent=money(calcPrice())});$('#addToCart').onclick=addItem;
}
function calcPrice(){if(!selected)return null;let price=selected.sizes?selected.sizes.find(s=>s.name===chosenSize)?.price:selected.price;if(price===null||price===undefined)return null;return price+(selected.extras||[]).filter(option=>selectedExtras.includes(option.name)).reduce((total,option)=>total+option.price,0)}
function addItem(){if(selected.variants&&!chosenVariant){$('#optionError').textContent=selected.id==='cremas'?'Elige una crema antes de agregar.':'Elige un sabor antes de agregar.';$('#variantSelect').focus();return}let img=selectedFlavor()?.image||selected.image;cart.push({id:selected.id,title:selected.title,variant:chosenVariant,size:chosenSize,fruit:[...selectedFruit],toppings:[...selectedToppings],syrups:[...selectedSyrups],extras:[...selectedExtras],qty,price:calcPrice(),image:img});saveCart();renderCart();close('productOverlay');toast('¡Qué rico! Agregado a tu carrito ♡')}
function saveCart(){try{localStorage.setItem('mery-cart',JSON.stringify(cart))}catch{}}
function renderCart(){const count=cart.reduce((n,i)=>n+i.qty,0);$('#countTop').textContent=$('#countMobile').textContent=count;const total=cart.reduce((n,i)=>n+(i.price||0)*i.qty,0);$('#cartTotal').textContent=money(total);$('#pendingNote').textContent=cart.some(i=>i.price===null)?'Hay productos con precio por confirmar. El total final se coordina por WhatsApp.':'';$('#cartItems').innerHTML=cart.length?cart.map((item,i)=>`<div class="cart-item"><img src="${item.image}" alt=""><div class="cart-item-detail"><h3>${safe(item.title)} × ${item.qty}</h3><p>${safe([item.variant,item.size,item.fruit?.length?'Frutas: '+item.fruit.join(', '):'',item.toppings?.length?'Toppings: '+item.toppings.join(', '):'',item.syrups?.length?'Jarabes: '+item.syrups.join(', '):'',item.extras?.length?'Extras: '+item.extras.join(', '):''].filter(Boolean).join(' · '))}</p><strong>${item.price===null?'Precio por confirmar':money(item.price*item.qty)}</strong></div><button class="remove" data-remove="${i}" aria-label="Quitar">✕</button></div>`).join(''):`<div class="cart-empty"><b>🧁</b><strong>Tu carrito está esperando dulzura</strong><p>¡Agrega tus favoritos para comenzar!</p></div>`;$('#checkoutBtn').disabled=!cart.length}
function deliveryChange(){const isDelivery=$('#delivery').value==='Delivery';$('#addressWrap').hidden=!isDelivery;$('#address').required=isDelivery}
function submitOrder(e){e.preventDefault();if(!cart.length)return;const form=new FormData(e.target);let total=cart.reduce((n,i)=>n+(i.price||0)*i.qty,0);let hasPending=cart.some(i=>i.price===null);let lines=['🍰 *PEDIDO MERY RAMOS* 💗','','👤 *Cliente:* '+form.get('name'),'📦 *Modalidad:* '+form.get('delivery')];if(form.get('delivery')==='Delivery')lines.push('📍 *Dirección:* '+form.get('address'));lines.push('💳 *Pago:* '+form.get('payment'),'','🛍️ *MIS PRODUCTOS:*');cart.forEach((i,index)=>{lines.push('',`${index+1}. *${i.title}* × ${i.qty}`);if(i.variant)lines.push('   Sabor: '+i.variant);if(i.size)lines.push('   Tamaño: '+i.size);for(const [label,arr] of [['Frutas',i.fruit],['Toppings',i.toppings],['Jarabes',i.syrups],['Adicionales',i.extras]])if(arr?.length)lines.push('   '+label+': '+arr.join(', '));lines.push('   '+(i.price===null?'Precio: a confirmar':'Subtotal: '+money(i.price*i.qty)))});lines.push('','💗 *Subtotal conocido:* '+money(total));if(hasPending)lines.push('⚠️ Incluye productos con precio por confirmar.');if(form.get('notes'))lines.push('📝 *Indicaciones:* '+form.get('notes'));lines.push('','¡Hola! Quiero confirmar este pedido. 🧁');const link='https://wa.me/51922961358?text='+encodeURIComponent(lines.join('\n'));window.open(link,'_blank','noopener,noreferrer');toast('Se abrió WhatsApp con tu pedido ♡')}
document.addEventListener('DOMContentLoaded',init);
})();
