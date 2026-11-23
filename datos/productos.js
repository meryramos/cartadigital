/* Catálogo editable. Precio null significa que no fue indicado por el negocio. */
const makeVariants=(names,prefix)=>names.map((name,i)=>({name,image:`img/${prefix}-${i+1}.jpg`}));
const cuchareableFlavors = [
  {"name": "Torta de chocolate con fresas", "image": "img/cuchareable-torta-chocolate-fresas.jpg"},
  {"name": "Chocoteja", "image": "img/cuchareable-chocoteja.jpg"},
  {"name": "Terremoto de lúcuma", "image": "img/cuchareable-terremoto-lucuma.jpg"},
  {"name": "Alfajor clásico", "image": "img/cuchareable-alfajor-clasico.jpg"},
  {"name": "Alfajor con fresas", "image": "img/cuchareable-alfajor-fresas.jpg"},
  {"name": "Cheesecake de Oreo", "image": "img/cuchareable-cheesecake-oreo.jpg"},
  {"name": "Cheesecake de fresa", "image": "img/cuchareable-cheesecake-fresa.jpg"},
  {"name": "Cheesecake de maracuyá", "image": "img/cuchareable-cheesecake-maracuya.jpg"},
  {"name": "Red velvet con mousse de nido", "image": "img/cuchareable-red-velvet-nido.jpg"},
  {"name": "Carrot cake", "image": "img/cuchareable-carrot-cake.jpg"},
];
const CATALOG=[
 {id:'clasicos',cat:'Chupetes',title:'Chupetes clásicos',subtitle:'Sabores de siempre, hechos con cariño',image:'img/clasicos-1.jpg',price:3,choose:'Elige tu sabor',variants:makeVariants(['Fresa','Fresa con leche','Lúcuma con leche','Mango','Maracuyá','Chicha','Coco con leche','Chocolate con leche','Maní con leche'],'clasicos')},
 {id:'gourmet',cat:'Chupetes',title:'Chupetes gourmet',subtitle:'Un gustito diferente en cada mordida',image:'img/gourmet1-1.jpg',price:3.5,choose:'Elige tu sabor',variants:[...makeVariants(['Cheesecake de fresa','Cheesecake de maracuyá','Pie de limón','Sublime','Oreo','Mágnum','Maracumango','Maracumenta','Frutos rojos'],'gourmet1'),...makeVariants(['Aguaje','Cocona','Gansito','Tres leches','Arroz con leche','Crema volteada','Mocaccino','Capuccino','Chicle Bubaloo'],'gourmet2')]},
 {id:'premium',cat:'Chupetes',title:'Chupetes premium',subtitle:'Para quienes aman consentirse',image:'img/premium-1.jpg',price:4,choose:'Elige tu sabor',variants:makeVariants(['Arándanos con leche','Pistacho','Crocante de maracuyá','Chocoteja','Chocobrownie','Morocha','Nutella','Cookies & Cream'],'premium')},
 {id:'chupachups',cat:'Chupetes',title:'Chupa Chups',subtitle:'Sabores especiales',image:'img/chupachups-1.jpg',price:4,choose:'Elige tu sabor',variants:makeVariants(['Ron con pasas','Baileys','Pisco sour','Maracuyá sour','Fresa sour','Piña colada','Vino','Cerveza'],'chupachups')},
 {id:'promo8',cat:'Promociones',title:'Pack 7 + 1 de regalo',subtitle:'8 chupetes en total · sabores a coordinar',image:'img/promo.jpg',price:27.50},
 {id:'promo15',cat:'Promociones',title:'Pack 14 + 1 de regalo',subtitle:'15 chupetes en total · sabores a coordinar',image:'img/promo.jpg',price:49},
 {id:'promo25',cat:'Promociones',title:'Pack 24 + 1 de regalo',subtitle:'25 chupetes en total · sabores a coordinar',image:'img/promo.jpg',price:79},
  {
    id: "cremas",
    cat: "Cremas con frutas",
    title: "Cremas con frutas",
    subtitle: "Arma tu vaso con crema, frutas, toppings y jarabes.",
    image: "img/cremas-vainilla.jpg",
    price: 6,
    choose: "Elige tu crema",
    variants: [
      {
        "name": "Tradicional (vainilla)",
        "image": "img/cremas-vainilla.jpg"
      },
      {
        "name": "Maracumango",
        "image": "img/cremas-maracumango.jpg"
      },
      {
        "name": "Oreo",
        "image": "img/cremas-oreo.jpg"
      }
    ],
    sizes: [
      {
        "name": "8 onzas",
        "image": "img/cremas-sizes-8-oz.jpg",
        "price": 6
      },
      {
        "name": "10 onzas",
        "image": "img/cremas-sizes-10-oz.jpg",
        "price": 10
      },
      {
        "name": "16 onzas",
        "image": "img/cremas-sizes-16-oz.jpg",
        "price": 15
      }
    ],
    fruit: [
      {
        "name": "Fresa",
        "image": "img/cremas-fruit-fresa.jpg"
      },
      {
        "name": "Mango",
        "image": "img/cremas-fruit-mango.jpg"
      },
      {
        "name": "Plátano",
        "image": "img/cremas-fruit-platano.jpg"
      }
    ],
    toppings: [
      {
        "name": "Chinchín",
        "image": "img/cremas-toppings-chinchin.jpg"
      },
      {
        "name": "Gomitas",
        "image": "img/cremas-toppings-gomitas.jpg"
      },
      {
        "name": "Burbujitas",
        "image": "img/cremas-toppings-burbujitas.jpg"
      },
      {
        "name": "Chispas de chocolate",
        "image": "img/cremas-toppings-chispas-chocolate.jpg"
      },
      {
        "name": "Chispas de chocolate blanco",
        "image": "img/cremas-toppings-chispas-chocolate-blanco.jpg"
      },
      {
        "name": "Doña Pepa",
        "image": "img/cremas-toppings-dona-pepa.jpg"
      },
      {
        "name": "Cúa Cúa",
        "image": "img/cremas-toppings-cua-cua.jpg"
      },
      {
        "name": "Chips Ahoy",
        "image": "img/cremas-toppings-chips-ahoy.jpg"
      },
      {
        "name": "Obsesión",
        "image": "img/cremas-toppings-obsesion.jpg"
      }
    ],
    syrups: [
      {
        "name": "Jalea de maracuyá",
        "image": "img/cremas-syrups-jalea-maracuya.jpg"
      },
      {
        "name": "Jalea de fresa",
        "image": "img/cremas-syrups-jalea-fresa.jpg"
      },
      {
        "name": "Leche condensada",
        "image": "img/cremas-syrups-leche-condensada.jpg"
      },
      {
        "name": "Manjar blanco",
        "image": "img/cremas-syrups-manjar-blanco.jpg"
      },
      {
        "name": "Fudge",
        "image": "img/cremas-syrups-fudge.jpg"
      }
    ],
    extras: [
      {
        "name": "Nutella",
        "image": "img/cremas-extras-nutella.jpg",
        "price": 1
      },
      {
        "name": "Topping",
        "image": "img/cremas-extras-topping.jpg",
        "price": 1
      }
    ],
  },
 ...[
 ['Waffle clásico',11,'Fresa y plátano · fudge · chispas de chocolate'],['Waffle Oreo',12.50,'Plátano · Oreo · chips de chocolate · fudge'],['Waffle Candy Chocolatosa',14,'Fresas · lentejitas · marshmallows · Doña Pepa · fudge · torta de chocolate'],['Waffle de Frutos Rojos',19,'Crema de cheesecake · mermelada · frutos rojos · helado'],['Waffle Dulce Tentación',19.50,'Jalea de frutos rojos y maracuyá · dulce de leche · durazno · helado'],['Waffle Cremoso',13.50,'Crema de tres leches · fresas · un topping a elección'],['Waffle Dulce Brownies',15,'Fresas · brownies · chantilly · Nutella']
 ].map(([title,price,subtitle],i)=>({id:`waffle${i+1}`,cat:'Waffles',title,price,subtitle,image:`img/waffle-${i+1}.jpg`})),
 {id:'crepe',cat:'Waffles',title:'Crêpe',subtitle:'Crêpe dulce · consulta sabores disponibles',image:'img/waffle-carta.jpg',price:null},
 {id:'frappe',cat:'Bebidas',title:'Frappés',subtitle:'Cremosos y refrescantes · 12 soles',image:'img/frappe-clasico.jpg',price:12,choose:'Elige tu sabor',variants:[['Clásico','clasico'],['Moka','moka'],['Caramelo','caramelo'],['Java Chip','java-chip'],['Matcha','matcha'],['Vainilla','vainilla'],['Oreo','oreo'],['Fresa','fresa'],['Mocaccino','mocaccino'],['Chocolate','chocolate'],['Mango','mango'],['Coco','coco'],['Cookies and Cream','cookies-cream'],['Nutella','nutella']].map(([name,key])=>({name,image:`img/frappe-${key}.jpg`}))},
 {id:'milkshake',cat:'Bebidas',title:'Milkshakes',subtitle:'Espesitos, dulces y deliciosos · 18 soles',image:'img/milkshake-oreo.jpg',price:18,choose:'Elige tu sabor',variants:[['Oreo','oreo'],['Chocolate','chocolate'],['Lúcuma','lucuma'],['Piña colada','pina-colada'],['Brownie','brownie']].map(([name,key])=>({name,image:`img/milkshake-${key}.jpg`}))},
 {id:'cuch8',cat:'Cuchareables',title:'Cuchareables · 8 oz',subtitle:'Postres de cuchara a tu gusto',image:'img/cuchareables.jpg',price:10.90,choose:'Elige tu sabor',variants:cuchareableFlavors},
 {id:'cuch12',cat:'Cuchareables',title:'Cuchareables · 12 oz',subtitle:'Una porción más grande de tu postre favorito',image:'img/cuchareables.jpg',price:15.90,choose:'Elige tu sabor',variants:cuchareableFlavors},
 {id:'cremav',cat:'Postres',title:'Crema volteada · porción',subtitle:'Deliciosa crema volteada artesanal',image:'img/crema-volteada.jpg',price:7.50},
 {id:'leche',cat:'Postres',title:'Leche asada',subtitle:'Porción individual',image:'img/leche-asada.jpg',price:3},
 {id:'keke',cat:'Postres',title:'Keke en tajada',subtitle:'Bizcochito casero',image:'img/keke.jpg',price:2.50},
 {id:'mazamorra',cat:'Postres',title:'Mazamorra con arroz con leche',subtitle:'Clásico postre peruano',image:'img/mazamorra.jpg',price:5},
 {id:'torta',cat:'Postres',title:'Torta de chocolate con fresas',subtitle:'Porción en envase individual',image:'img/torta-fresas.jpg',price:null},
];
