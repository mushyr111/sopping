const imgsOptions = document.querySelectorAll('.imgsOptions');
const displayImg = document.getElementById('display-img');
const lists = document.querySelectorAll('.list-side');

const sizing = document.getElementById('sizing');
const numberInput = document.getElementById('numberInput');
const addToCart = document.getElementById('addToCart');
const price = document.getElementById('price');
const totalCost = document.getElementById('totalCost');
const description = document.querySelector('.description');
const stars = document.querySelector('.stars');
const ratings = document.querySelectorAll('.ratings-btns button')

let myColor;
let mysizing;
let count;
let myPrice ;


let myArray ;
let pr = localStorage.myProdutes
pr? myArray = JSON.parse(pr) : myArray = [];

imgsOptions.forEach(e=>{
    e.addEventListener('click', e=>{
        displayImg.src =`./imgs/${e.target.dataset.color}.png `
        myColor = e.target.dataset.color
        
    })
})



function increaseNumber() {
    var numberInput = document.getElementById("numberInput");
    var currentValue = parseInt(numberInput.value);
    numberInput.value = currentValue + 1;
  }

  function decreaseNumber() {
    var numberInput = document.getElementById("numberInput");
    var currentValue = parseInt(numberInput.value);
    if (currentValue > 0) {
      numberInput.value = currentValue - 1;
    }
  }

  addToCart.addEventListener('click', ()=>{
    sizing.value ? mysizing = sizing.value : mysizing = 'Small';
    count = numberInput.value;
    myPrice = price.textContent;
    myPrice = Math.floor( myPrice * count );
    myColor != undefined ? myColor = myColor : myColor = 'white'


    
let myObject = {
  sizing:mysizing,
  count:count,
  price:myPrice,
  color:myColor,
}

myArray.unshift(myObject);
localStorage.setItem('myProdutes' , JSON.stringify(myArray) );
    
    
creatBasket();
sizing.value = '';
numberInput.value = 1;
displayImg.src = './imgs/white.png'


  })


  
function creatBasket(){
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
creatBasket();

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

function showPrice(){
  
let saleTotal =  myArray.reduce((accumulator, currentElement) => accumulator + currentElement.price, 0);

totalCost.innerHTML = saleTotal
}




const scrollContainer2 = document.querySelector('.scroll-container2');
const prev2 = document.getElementById('prev2');
const next2 = document.getElementById('next2');
const cart2 = document.querySelectorAll('.scroll-snap .snap-cart'); // تحديد جميع الصور
let currentImageIndex2 = 0;




  
prev2.addEventListener('click', () => {
  currentImageIndex2 = Math.max(currentImageIndex2 - 10, 0); // تجنب القيم السالبة
  scrollContainer2.scrollLeft = cart2[currentImageIndex2].parentNode.offsetLeft;
  
});

next2.addEventListener('click', () => {
  currentImageIndex2 = Math.min(currentImageIndex2 + 10, cart2.length - 1); // تجنب الفوق الحد الأقصى
  scrollContainer2.scrollLeft = cart2[currentImageIndex2].parentNode.offsetLeft;
});

ratings.forEach((e)=>{
  e.addEventListener('click' , e=>{
    description.classList.add('none');
    stars.classList.add('none');
    let id = e.target.dataset.btn;
    document.querySelector(id).classList.remove('none');
  })
})


lists.forEach(e =>{
  e.addEventListener('click',()=>{
    document.querySelector('.side').classList.toggle('show-s')
  })
})
