# P2-Challenge-2 (Client Side)

- Tema Aplikasi: ...

Struktur Folder:

- server (PORT: 3000)
- client-public-cms

## W2D1

### Web Layouting

Buatlah web layouting menggunakan HTML dan CSS (boleh menggunakan CSS framework) untuk aplikasi client kamu meliputi halaman:

- [X] **Public site**
  - [X] Halaman Home/Landing Page
    - Halaman yang berfungsi untuk menampilkan data Entitas Utama berbentuk Card, tambahkan input search/filter dan pagination pada halaman ini, buatlah halaman ini dengan layout yang rapi dan semenarik mungkin.
  - [X] Halaman Detail
    - Buatlah Halaman yang berisi detail dari Entitas Utama.

- [X] **CMS site**
  - [X] Halaman Login
    Pada halaman ini buatlah sebuah form untuk menampung input email dan password user yang digunakan untuk masuk ke CMS
  - [X] Halaman list entitas utama . Tampilkan data entity dalam bentuk Tabel .
  - [X] Navbar / Sidebar yang berfungsi sebagai navigasi halaman.
  - [X] Halaman create entitas utama
    - Buatlah form yang berfungsi sebagai penampung input data entitas utama yang akan dibuat, sesuaikanlah input dengan dengan tipe yang sesuai. Untuk imgUrl buatlah input bertipe text saja.
  - [X] Halaman edit entitas utama
    - Buatlah form yang sama persis seperti pada halaman create dengan Judul halaman/form yang berbeda.
  - [X] Halaman upload image entitas utama
    - Buatlah sebuah halaman yang menampilkan nama/title entitas utama + gambar (yang akan diubah), beserta sebuah input berupa select File untuk property imgUrl.
  - [X] Halaman list untuk entitas kedua. Tampilkan data entity dalam bentuk Tabel .
  - [X] Halaman register staff
    - Pada halaman ini buatlah sebuah form untuk menampung input semua data user yang akan didaftarkan oleh admin.

## W2D2

### Generate React Project dengan build tools

Convert layout atau slicing template yang sudah dibuat ke dalam React.js:

- [X] Coba buat React pada project hasil generate Vite
- [X] Public site
  - [X] Halaman Home/Landing Page
  - [X] Halaman Detail (Public)

- [X] CMS site
  - [X] Halaman Login
  - [X] Halaman list entitas utama
  - [X] Halaman create entitas utama
  - [X] Halaman edit entitas utama
  - [X] Halaman upload image entitas utama
  - [X] Halaman list untuk entitas kedua
  - [X] Halaman register staff

## W2D3

### React Lifecycle

Integrasikan Halaman Web dengan server yang sudah kalian buat pada Challenge/Project 1 menggunakan `axios` sebagai HTTP Client. Jangan lupa untuk tampilkan pesan error dari server jika terjadi error di halaman web kalian. Untuk menampilkan pesan error / success bisa menggunakan package seperti SweetAlert dll.

Pastikan setiap pergantian tampilan terjadi secara reaktif dengan tidak me-refresh web browser mu. Pasca login berhasil, user akan dinavigasikan ke tampilan home/list.

- [X] Public site
  - [X] GET data entitas utama pada halaman Home/Landing Page (include: pagination, filter dan sort)
  - [X] GET data detail entitas utama pada halaman Detail

- [X] CMS site
  - [X] POST pada halaman Login
  - [ ] GET data entitas utama pada halaman list entitas utama (include: pagination, filter dan sort)
  - [X] POST pada halaman create entitas utama
  - [X] PUT pada halaman edit entitas utama
  - [X] DELETE untuk menghapus entitas utama
  - [X] PATCH untuk mengupload image / mengupdate imgUrl entitas utama
  - [X] GET data entitas kedua pada Halaman list entitas kedua
  - [X] POST pada Halaman register staff

## W2D4

### React Router

Project web-client kalian akan terdiri dari beberapa page/route. Silahkan Implementasikan routing pada project web-client kalian:

- [X] Public site
  - [X] Halaman Home/Landing Page
  - [X] Halaman Detail
- [X] CMS site
  - [X] Halaman Login
  - [X] Halaman list entitas utama
  - [X] Halaman create entitas utama (boleh menggunakan modal)
  - [X] Halaman edit entitas utama (boleh menggunakan modal)
  - [X] Halaman upload image untuk entitas utama (boleh menggunakan modal)
  - [X] Halaman list untuk entitas kedua
  - [X] Halaman register staff

### Deploy Client

Coba lakukan deployment untuk client (bisa coba deploy hal sederhana terlebih dahulu seperti halaman yang menampilkan ‘hello world’) menggunakan Firebase

- [X] Deploy client
