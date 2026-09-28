
const SUPABASE_URL = "https://fcotmdzjlvpqwniykce.supabase.co";
const SUPABASE_KEY = "sb_publishable_175PowMk_CNR1lFmVxFzvA_durKEUqJ";


const supabaseClient =
    supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );


/* =====================================================
   LOAD PRODUCTS
===================================================== */

async function loadProducts() {

    console.log("กำลังโหลดสินค้า...");

    const { data, error } = await supabaseClient
        .from("products")
        .select("*")
        .order("id", { ascending: true });


    /* ตรวจสอบ Error */
    if (error) {

        console.error(
            "❌ Supabase Error:",
            error
        );

        return;
    }


    console.log(
        "✅ Products:",
        data
    );


    const productList =
        document.getElementById("product-list");


    if (!productList) {

        console.error(
            "❌ ไม่พบ #product-list"
        );

        return;
    }


    /* ล้างข้อมูล */
    productList.innerHTML = "";


    /* ถ้าไม่มีสินค้า */
    if (!data || data.length === 0) {

        productList.innerHTML = `
            <p style="padding:20px;">
                ยังไม่มีสินค้าในระบบ
            </p>
        `;

        return;
    }


    /* สร้างสินค้า */
    data.forEach(product => {

        const item =
            document.createElement("div");


        item.className =
            "product-items";


        item.dataset.id =
            product.id;


        item.innerHTML = `

            <p>
                ${product.name}
            </p>

            <img
                class="product-img"
                src="${product.image}"
                alt="${product.name}"
            >

            <strong>
                ${Number(product.price).toLocaleString()}
                บาท
            </strong>

        `;


        productList.appendChild(item);

    });

}


/* =====================================================
   BANNER SLIDER
===================================================== */

let currentBanner = 0;


const banners =
    document.querySelectorAll(
        ".banner-slide"
    );


const bannerDots =
    document.querySelectorAll(
        ".banner-dot"
    );


function showBanner(index) {

    if (banners.length === 0) {
        return;
    }


    /* ถ้าเกินจำนวนรูป */
    if (index >= banners.length) {

        currentBanner = 0;

    }


    /* ถ้าน้อยกว่า 0 */
    else if (index < 0) {

        currentBanner =
            banners.length - 1;

    }


    else {

        currentBanner = index;

    }


    /* ซ่อนรูปทั้งหมด */
    banners.forEach((banner) => {

        banner.classList.remove(
            "active"
        );

    });


    /* ปิดจุดทั้งหมด */
    bannerDots.forEach((dot) => {

        dot.classList.remove(
            "active"
        );

    });


    /* แสดงรูปปัจจุบัน */
    banners[currentBanner]
        .classList.add("active");


    /* แสดงจุดปัจจุบัน */
    if (bannerDots[currentBanner]) {

        bannerDots[currentBanner]
            .classList.add("active");

    }

}


/* =====================================================
   CHANGE BANNER
===================================================== */

function changeBanner(direction) {

    showBanner(
        currentBanner + direction
    );

}


/* =====================================================
   AUTO SLIDE
===================================================== */

setInterval(() => {

    changeBanner(1);

}, 5000);


/* =====================================================
   START
===================================================== */

loadProducts();