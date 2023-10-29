import {
  pengecekanSelect,
  ubahFormatData, 
  pilihBulanIni,
  sortByTime, 
  tampilkanData,
  $,
  munculForm, 
  kategoriKetikaMasuk, 
  kategoriKetikaKeluar,
  cetakNominall,
  // pemasukanPerbulan,
  // saldo,
  // rupiah
} from './function.js';

//import {} from './prontEnd.js'

export let dataUang = JSON.parse(localStorage.getItem("dataUang")) || []


pengecekanSelect()

// ubah Array Data uang menjadi di rangkum berdasarkan tahun, bulan dan hari
const semuaData = ubahFormatData(dataUang)
// console.log(semuaData);
//memilih bulan sekarang saja untuk di tampilkan

const sekarang = new Date()
let tahunKlik = sekarang.getFullYear() ;
let bulanKlik = sekarang.getMonth() + 1;  

let thisMonth = pilihBulanIni(semuaData, tahunKlik, bulanKlik)

//membalikan urutan isi bulan sekarang dan mebakikannya
let thisMonthReverse = sortByTime(thisMonth)
if (thisMonthReverse && Array.isArray(thisMonthReverse)) {
  thisMonthReverse.reverse()
}

tampilkanData(thisMonthReverse)
// mencetak data.


cetakNominall(thisMonthReverse)
// $('.saldo').innerHTML = rupiah(saldo)
// $('.nominal-masuk').innerHTML = rupiah(pemasukanPerbulan)
// $('.nominal-keluar').innerHTML = rupiah( )


// console.log(semuaData)
 tahunKlik = 2023;
 bulanKlik = 10;
$('.tombol-pindah-waktu').addEventListener('click', e => {
  if (e.target.classList.contains('bi-chevron-left')) {
    bulanKlik--;
    if (bulanKlik < 1) {
      bulanKlik = 12;
      tahunKlik--;
    }
  } else if (e.target.classList.contains('bi-chevron-right')) {
    bulanKlik++;
    if (bulanKlik > 12) {
      bulanKlik = 1;
      tahunKlik++;
    }
  }
  // console.log(tahunKlik);
  // console.log(bulanKlik);
  thisMonthReverse = sortByTime(pilihBulanIni(semuaData, tahunKlik, bulanKlik));
  if (thisMonthReverse && Array.isArray(thisMonthReverse)) {
    thisMonthReverse.reverse();
  }
  tampilkanData(thisMonthReverse)
    
  cetakNominall(thisMonthReverse)
  // $  ('.saldo').innerHTML = rupiah(saldo)
  // $('.nominal-masuk').innerHTML = rupiah(pemasukanPerbulan)
  // $('.nominal-keluar').innerHTML = rupiah( )
})


//1. menambah fitur hapus dan edit
//2.   ~"~    dropdown seting
//3. membuat diagram garis



// Mendapatkan semua elemen <tr> dengan class "trs"
const trs = document.querySelectorAll(".trs");

// Menambahkan event listener untuk setiap elemen <tr>
trs.forEach((tr) => {
  tr.addEventListener("click", () => {
    
    // Mendapatkan nilai ID dari elemen <span> dalam elemen <td> terakhir dari blok <tr> yang diklik
    const idTransaksi = tr.querySelector(".id-transaksi").textContent;
     
    const dataArr = dataUang.filter(da => da.id === idTransaksi)[0]
    
    let id = dataUang.indexOf(dataArr)
    
    munculForm()
    $(".btn").classList.add('edit')
    $(".btn").setAttribute('data-id', id)
    $('.edit').textContent = 'Edit'
    $("#nominal").value = dataArr.nominal
    $(".tanggal").value = dataArr.tanggal
    $("textarea").value = dataArr.keterangan
    $("#jenis").value = dataArr.jenis

    $('.caption .trash').style.display = 'block'
    if(dataArr.jenis === 'masuk'){
      $("#kategori-masuk").value = dataArr.kategori
      kategoriKetikaMasuk()
    }else{
      $("#kategori-keluar").value = dataArr.kategori
      kategoriKetikaKeluar()
    }
  });
});


if($('.btn') !== null){
  $('.bi-trash').addEventListener('click',()=>{
    if (confirm("Apakah anda yakin ingin menghapus data ini?")) {
	    dataUang.splice($('.btn').getAttribute('data-id'), 1)
	  	localStorage.setItem("dataUang", JSON.stringify(dataUang))
	  	window.location = 'index.html'
	  	$('bi-trash').style.display = 'none'
	  }
  })
}

/*if(thisMonthReverse.length > 0) */

// localStorage.clear()
//  toggle
export {thisMonthReverse}
