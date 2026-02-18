1 // Legacy JavaScript (pre -ES6 style ) for Lab 5.1
2 // Contains : var , global scope , constructor function , no modules
3
4 var taxRate = 0.08;
5 var currency = "USD ";
6
7 function Product ( id , name , price ) {
8 this . id = id ;
9 this . name = name ;
10 this . price = price ;
11 }
12
13 function Cart () {
14 this . items = [];
15 }
16 Cart . prototype . addItem = function ( product , quantity ) {
17 this . items . push ({ product : product , quantity : quantity }) ;
18 };
19 Cart . prototype . getSubtotal = function () {
20 var total = 0;
21 for ( var i = 0; i < this . items . length ; i ++) {
22 total += this . items [ i ]. product . price * this . items [ i ]. quantity ;
23 }
24 return total ;
25 };
26 Cart . prototype . getTax = function () {
27 return this . getSubtotal () * taxRate ;
28 };
29 Cart . prototype . getTotal = function () {
30 return this . getSubtotal () + this . getTax () ;
31 };
32
33 function formatPrice ( amount ) {
34 return currency + " " + amount . toFixed (2) ;
35 }
36
37 var cart = new Cart () ;
38 var p1 = new Product (1 , " Widget ", 10.99) ;
39 cart . addItem ( p1 , 2) ;
40 console . log (" Total : " + formatPrice ( cart . getTotal () ) ) ;
