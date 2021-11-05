    function moneyConverterUSD(){
        usd=26.35;
        number=document.getElementById("input_dol");
        result=(number.value*usd).toFixed(2);
        document.getElementById("output_grn1").innerHTML=result
    }
    function moneyConverterEUR(){
        eur=30.52;
        number=document.getElementById("input_evro");
        result=(number.value*eur).toFixed(2);
        document.getElementById("output_grn2").innerHTML=result;
    }
    function moneyConverterPLN(){
        pln=6.64;
        number=document.getElementById("input_zloty");
        result=(number.value*6.64).toFixed(2);
        document.getElementById("output_grn3").innerHTML=result;
    }
    function moneyConverterBitcoin(){
        bitcoin=1645030.38;
        number=document.getElementById("input_bitcoin");
        result=(number.value*bitcoin).toFixed(2);
        document.getElementById("output_grn4").innerHTML=result;
    }

    var credentials = {
        login: 'admin',
        password: 'qwerty',
    };

  let div= document.createElement('div');
    function check() { 
        const login= document.getElementById("login").value;
        const password= document.getElementById("password").value;

        if (login==credentials.login&&password==credentials.password)
        {
            div.innerHTML = "You entered correct login and password!";
            document.querySelector('#correct').append(div);
        }
        else if( login==credentials.login){
        
            div.innerHTML = "You entered correct login, but wrong password!";
            document.querySelector('#wrong').append(div);
        }
        else if( password==credentials.password){
            div.innerHTML = "You entered correct password, but wrong login!";
            document.querySelector('#wrong').append(div);
        }
        else{
            div.innerHTML = "You entered wrong login and password!";
            document.querySelector('#wrong').append(div);
        }
            
        
    }
