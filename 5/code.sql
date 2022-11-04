/*

User(id, firstName, lastName, phone, email, dateCreate, dateEdit)
Order(id, userId, value, dateCreate, dateEdit)
OrderItem(id, orderId, value, productId)
Product(id, name, price)


I
a) Prikazati korisnike koji su se prijavili u prethodna 2 dana
b) Prikazati ime i prezime korisnika, id porudzbine i ukupnu vrednost svih porudzbina

II
c) Prikazati korisnike koji su imali najmanje 2 porudzbine
d) Prikazati ime i prezime korisnika, id porudzbine i broj stavki za svaku porudzbinu
e) Prikazati ime i prezime korisnika, id porudzbine koja ima namanje 2 stavke
f) Prikazati sve korisnike koji su kupili najmanje 3 razlicita proizvoda u svim porudzbinama


*/
/* a */
select id from User
where DATEDIFF(day, GETDATE(), dateEdit) < 2


/* b */
/* Nisam sigurna kako je trebalo da tumacim polje value, pa sam uradila na vise nacina: 
ako value je deskriptor, sabiram cene proizvoda za svaki order*/
select U.firstName, U.lastName, O.id, SUM(p.price)
from User U join Order O on O.userId = U.id join OrderItem OI on O.id = OI.orderId join Product P on p.id = OI.productId
group by firstName, lastName, O.id
/* ako je value zbir cena proizvoda u tom orderu, ali ovde kao rezultat se mogu ponavljati korisnici koji imaju vise porudzbina*/
select U.firstName, U.lastName, O.id, O.value
from User U join Order O on U.id = O.userId 
/* ako je value zbir cena svih porudzbina i zelim da prikazem koliko je svaki od korisnika ukupno potrosio 
novca na sve porudzbine, ovde ne mogu prikazati orderId jer sabiram value polja razlicitih porudzbina */
select U.firstName, U.lastName, SUM(O.value)
from User U join Order O on U.id = O.userId
group by firstName, lastName

/* c */
select UserId from Order
group by UserId
having COUNT(*) >= 2

/* d */
select U.firstName, U.lastName, O.id, COUNT(*)
from User U join Order O on U.id=O.userId join OrderItem OI on O.id= OI.orderId
group by firstName, lastName, O.id

/* e */
select U.firstName, U.lastName, O.id, COUNT(*)
from User U join Order O on U.id=O.userId join OrderItem OI on O.id= OI.orderId
group by firstName, lastName, O.id
having COUNT(*) <=2

/* f */
select O.UserId 
from Order O join OrderItem OI on O.id = OI.orderId
group by O.userId
having COUNT(distinct(oi.productID)) >= 3