const shopping = document.querySelectorAll('.toShop');
const lists = document.querySelectorAll('.list-side');
const totalCost = document.getElementById('totalCost');
const navBar = document.querySelector(('.navbar'))

const scrollContainer = document.querySelector('.scroll-container');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const images = document.querySelectorAll('.snap-area img');
let currentImageIndex = 0;


const scrollContainer2 = document.querySelector('.scroll-container2');
const prev2 = document.getElementById('prev2');
const next2 = document.getElementById('next2');
const cart2 = document.querySelectorAll('.scroll-snap .snap-cart'); // تحديد جميع الصور
let currentImageIndex2 = 0;



shopping.forEach(e=>{
e.addEventListener('click',()=>{
   // window.open('shoping.html' , '_blank' , 'width=1000,height=710,left=100,bottom=0')
   window.location.href ='shoping.html'
});
})




let myArray ;
function creatBasket(){

let pr = localStorage.myProdutes
pr? myArray = JSON.parse(pr) : myArray = [];

    let myHTML = '';
  
    myArray.map((item , index) => {
        myHTML += `
        
        <tr>
        <td class="t-flex">
          <div class="cartImg"><img src="./imgs/${item.color}.png" alt=""></div>
          <div class="productName"><h2>T-Shirt Summer Vibes</h2></div>
        </td>
        <td>${item.color}</td>
        <td>${item.sizing}</td>
        <td>${item.count}</td>
        <td>$ ${item.price}</td>
        <td onclick="productDelete(${index})" class="cartDelete">X</td>
      </tr>
  
        `
       
    })
   document.getElementById('tbody').innerHTML = myHTML;
    document.getElementById('countPro').innerHTML = myArray.length;
    showPrice()
  }
  
  //localStorage.removeItem('myProdutes')
  
  document.querySelectorAll('.cartShoping').forEach((e)=>{
    e.addEventListener('click',()=>{
      document.getElementById('cart').classList.toggle('show')
      creatBasket()
    });
  });
  
  function productDelete(i){
    myArray.splice(i , 1);
    localStorage.setItem('myProdutes' , JSON.stringify(myArray));
    creatBasket();
  }
  creatBasket();

  
  prevButton.addEventListener('click', () => {
    currentImageIndex = Math.max(currentImageIndex - 1, 0); // تجنب القيم السالبة
    scrollContainer.scrollLeft = images[currentImageIndex].parentNode.offsetLeft;
    executeAction(currentImageIndex); // تنفيذ الأمر المعين
  });
  
  nextButton.addEventListener('click', () => {
    currentImageIndex = Math.min(currentImageIndex + 1, images.length - 1); // تجنب الفوق الحد الأقصى
    scrollContainer.scrollLeft = images[currentImageIndex].parentNode.offsetLeft;
    executeAction(currentImageIndex); // تنفيذ الأمر المعين
  });
  
  function executeAction(index) {
    if(index == 0){
        prevButton.classList.remove('active')
        nextButton.classList.add('active')
        prevButton.style.pointerEvents = 'none'
        nextButton.style.pointerEvents = 'all'
    }
    if(index == 2){
        prevButton.classList.add('active')
        nextButton.classList.remove('active')
        prevButton.style.pointerEvents = 'all'
        nextButton.style.pointerEvents = 'none'
    }
    if(index < 2 && index > 0){
        prevButton.classList.add('active')
        nextButton.classList.add('active')
        nextButton.style.pointerEvents = 'all'
        prevButton.style.pointerEvents = 'all'
    }
    document.querySelectorAll('.navigation span').forEach(e=>{
      e.classList.remove('spanActive')
    })
    document.getElementById(`span${index}`).classList.add('spanActive');

  }
  executeAction(currentImageIndex);




  
  prev2.addEventListener('click', () => {
    currentImageIndex2 = Math.max(currentImageIndex2 - 10, 0); // تجنب القيم السالبة
    scrollContainer2.scrollLeft = cart2[currentImageIndex2].parentNode.offsetLeft;
    
  });
  
  next2.addEventListener('click', () => {
    currentImageIndex2 = Math.min(currentImageIndex2 + 10, cart2.length - 1); // تجنب الفوق الحد الأقصى
    scrollContainer2.scrollLeft = cart2[currentImageIndex2].parentNode.offsetLeft;
  });
  


  

  lists.forEach(e =>{
    e.addEventListener('click',()=>{
      document.querySelector('.side').classList.toggle('show-s')
    })
  })

  
function showPrice(){
  
  let saleTotal =  myArray.reduce((accumulator, currentElement) => accumulator + currentElement.price, 0);
  
  totalCost.innerHTML = saleTotal
  }
  
  
  window.addEventListener('scroll' , ()=>{
    if(scrollY >= 580){
      navBar.classList.add('black2')
    }else{
      navBar.classList.remove('black2')
    }
  })