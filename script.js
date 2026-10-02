document.addEventListener('DOMContentLoaded', () => {
    const formMasuk = document.getElementById('formLogin');
    const areaLogin = document.getElementById('area-login');
    
    // Cek ada data user gak di browser
    let orangLogin = sessionStorage.getItem('userKakap');

    // Fungsi buat ngatur tombol di pojok kanan atas
    const aturNavbar = () => {
        if(orangLogin) {
            // Kalau udah login, ubah jadi nama dia
            areaLogin.innerHTML = `
                <div class="dropdown">
                    <button class="btn kotak-brutal fw-bold px-4 dropdown-toggle" style="background-color: #c1ff72; border: 3px solid #111;" type="button" data-bs-toggle="dropdown">
                        👤 ${orangLogin}
                    </button>
                    <ul class="dropdown-menu kotak-brutal mt-2 border-dark border-3 rounded-0">
                        <li><a class="dropdown-item fw-bold hover-garis" href="#">Profil Gw</a></li>
                        <li><a class="dropdown-item fw-bold hover-garis" href="#">Riwayat</a></li>
                        <li><hr class="dropdown-divider border-dark border-2"></li>
                        <li><a class="dropdown-item fw-black text-danger hover-garis" href="#" id="tombolKeluar">Logout</a></li>
                    </ul>
                </div>
            `;
            
            // Aksi kalau tombol logout dipencet
            document.getElementById('tombolKeluar').addEventListener('click', (e) => {
                e.preventDefault();
                sessionStorage.removeItem('userKakap');
                orangLogin = null;
                aturNavbar(); // Refresh tampilan navbar
            });

        } else {
            // Kalau belum login, balikin tombol awal
            areaLogin.innerHTML = `
                <button class="btn btn-gas px-4" data-bs-toggle="modal" data-bs-target="#modalLogin">Login</button>
            `;
        }
    };

    // Langsung jalanin pas web dibuka
    if (areaLogin) aturNavbar();

    // Pas form login di-submit
    if(formMasuk) {
        formMasuk.addEventListener('submit', (e) => {
            e.preventDefault(); 
            
            let ketikan = document.getElementById('inputUser').value;
            
            // Simpen namanya
            sessionStorage.setItem('userKakap', ketikan);
            orangLogin = ketikan;
            
            // Nutup pop-up
            let popUp = document.getElementById('modalLogin');
            let instance = bootstrap.Modal.getInstance(popUp);
            instance.hide();
            
            formMasuk.reset();
            aturNavbar();
        });
    }
});