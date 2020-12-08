window.onload = function () {
    // Variables
    let baseDeDatos = [
        {
            id: 1,
            nombre: 'Funda celeste',
            precio: 80,
            imagen: 'https://ae01.alicdn.com/kf/HTB1ADqBaIfrK1Rjy0Fmq6xhEXXaR/Novedad-de-2019-funda-de-guitarra-negra-m-s-estable-con-correa-fija-antivibraci-n.jpg'
        },
        {
            id: 2,
            nombre: 'Uña de guitarra',
            precio: 20,
            imagen: 'https://m.media-amazon.com/images/I/41um2jm7QqL.jpg'
        },
        {
            id: 3,
            nombre: 'Amplificador',
            precio: 140.50,
            imagen: 'https://www.musik-produktiv.es/pic-010106631xxl/marshall-mg101gfx.jpg'
        },
        {
            id: 4,
            nombre: 'Guitarra',
            precio: 360.90,
            imagen: 'https://i.linio.com/p/271d03dc869b387ace0747ab3111b8bf-zoom.jpg'
        }

    ]
    let $items = document.querySelector('#items');
    let carrito = [];
    let total = 0;
    let $carrito = document.querySelector('#carrito');
    let $total = document.querySelector('#total');
  
    function renderItems () {
        for (let info of baseDeDatos) {
         
            let miNodo = document.createElement('div');
            miNodo.classList.add('card', 'col-sm-5');
        
            let miNodoCardBody = document.createElement('div');
            miNodoCardBody.classList.add('card-body');
      
            let miNodoTitle = document.createElement('h5');
            miNodoTitle.classList.add('card-title');
            miNodoTitle.textContent = info['nombre'];
        
            let miNodoImagen = document.createElement('img');
            miNodoImagen.classList.add('img-fluid');
            miNodoImagen.setAttribute('src', info['imagen']);
            
            let miNodoPrecio = document.createElement('p');
            miNodoPrecio.classList.add('card-text');
            miNodoPrecio.textContent = 'S/' + info['precio'] ;
            
            let miNodoBoton = document.createElement('button');
            miNodoBoton.classList.add('btn', 'btn-primary');
            miNodoBoton.textContent = 'Añadir a carrito';
            miNodoBoton.setAttribute('marcador', info['id']);
            miNodoBoton.addEventListener('click', añadircarrito);
            
            miNodoCardBody.appendChild(miNodoImagen);
            miNodoCardBody.appendChild(miNodoTitle);
            miNodoCardBody.appendChild(miNodoPrecio);
            miNodoCardBody.appendChild(miNodoBoton);
            miNodo.appendChild(miNodoCardBody);
            $items.appendChild(miNodo);
        }
    }

    function añadircarrito () {
        
        carrito.push(this.getAttribute('marcador'))
        
        calcularTotal();
      
        renderizarCarrito();
    }

    function renderizarCarrito () {
       
        $carrito.textContent = '';
        
        let carritoSinDuplicados = [...new Set(carrito)];
       
        carritoSinDuplicados.forEach(function (item, indice) {
            
            let miItem = baseDeDatos.filter(function(itemBaseDatos) {
                return itemBaseDatos['id'] == item;
            });
           
            let numeroUnidadesItem = carrito.reduce(function (total, itemId) {
                return itemId === item ? total += 1 : total;
            }, 0);
           
            let miNodo = document.createElement('li');
            miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
            miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0]['nombre']} - S/${miItem[0]['precio']}`;
           
            let miBoton = document.createElement('button');
            miBoton.classList.add('btn', 'btn-danger', 'mx-5');
            miBoton.textContent = 'X';
            miBoton.style.marginLeft = '1rem';
            miBoton.setAttribute('item', item);
            miBoton.addEventListener('click', borrarItemCarrito);
        
            miNodo.appendChild(miBoton);
            $carrito.appendChild(miNodo);
        })
    }

    function borrarItemCarrito () {
        console.log()
   
        let id = this.getAttribute('item');

        carrito = carrito.filter(function (carritoId) {
            return carritoId !== id;
        });

        renderizarCarrito();

        calcularTotal();
    }

    function calcularTotal () {
 
        total = 0;
 
        for (let item of carrito) {

            let miItem = baseDeDatos.filter(function(itemBaseDatos) {
                return itemBaseDatos['id'] == item;
            });
            total = total + miItem[0]['precio'];
        }

        let totalDosDecimales = total.toFixed(2);

        $total.textContent = totalDosDecimales;

        document.getElementById('costo').innerHTML=' '+total;
    }
    renderItems();

} 

function guardarDato() {
    var nombre = document.getElementById("nombre").value; 
    var correo = document.getElementById("correo").value;

    localStorage.setItem(nombre, correo); 
    document.getElementById("nombre").value = ""; 
    document.getElementById("correo").value = "";


    document.getElementById('name').innerHTML=' '+nombre;
    document.getElementById('ce').innerHTML=' '+correo;
}
