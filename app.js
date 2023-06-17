


let coinNames=[]
let coinDatas=[]
let cdata =""

const btnDelCoin=document.querySelector(".coins")

const options = {
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': 'coinranking775d2c4c49d929be4db341eb41310e9c9123b7f1ccfe5921',
    },
};
  

window.addEventListener('load',()=>{


    getCoins()
})



const getCoins=async ()=>{


    try {
        const res =await fetch('https://api.coinranking.com/v2/coins/',options)

        if(!res.ok){
            throw new Error('hata var')
        }

        const data = await res.json()

        write(data)

    } catch (error) {
        console.log(error);
    }
    

}

//? apiden gelen değerleri parse yap
const write=(gelenDeger)=>{

    cdata = gelenDeger

    gelenDeger.data.coins.forEach((element) => {
        
        coinNames.push(element.name)

    });

    //? select box func. çalıştır
    sendDropDown()

    console.log(cdata);

}



//? coin isimlerini dropdown elementine gönder
const sendDropDown=()=>{



    coinNames.forEach(elements =>{


        const coinNames = document.getElementById('select')

        coinNames.innerHTML +=`
        
        <option value="${elements}">${elements}</option>
        `

    })

}



// select den gelen değer

document.getElementById('select').addEventListener('change',()=>{

    const coinName_=document.getElementById('select').value

    if(coinName_){

        let selected = cdata.data.coins.filter((obj) => obj.name === coinName_)

        renderCoin(selected[0])




    }
    

    
})



//coin bilgilerini ekrana bas

const renderCoin=(data)=>{

    

    const {
        name,
        color,
        iconUrl,
        price,
        symbol,
        change
    }=data

    let changeColor = ""
    let emoji = ""
    let coin = "🪙"
    let status =""
  
    if (change>0) {
      changeColor = "green"
      status = "📈"
    }
    else {
      changeColor = "red"
      status = "📉"
    }



    document.querySelector('.coins').innerHTML +=`
    

        <div class="card">
            <div class="card_main">
                <div class="card_top">
                    <p>${name}</p>
                    <p class="coinSymbol" style="background-color:${color}">${symbol}</p>
                    <!-- <button class="card_remove">X</button> -->
                    <i class="fa-solid fa-xmark" id=""del></i>
                </div>
                <p>$ ${price}</p>
                <img src="${iconUrl}" alt="">
                <p id="coinChange" style="color:${changeColor}">${status+" "+"%"+ change}%</p>
            </div>
        </div>

    `



}



// card clası içidneki delete butonu
btnDelCoin.addEventListener('click',e=>{


    if(e.target.classList.value=="fa-solid fa-xmark"){

        e.target.closest(".card").remove()
    }

})


const container=document.querySelector('.container')

container.addEventListener('click',e=>{

    const cards = document.querySelector(".coins")


    if(e.target.getAttribute("id")=="clearAll"){

        cards.innerHTML=""
       
    }


})