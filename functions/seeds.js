const admin = require("firebase-admin");
const db = admin.firestore();

const BOXES_COLLECTION = "boxes";
const CATEGORIES_COLLECTION = "categories";
const BRANDS_COLLECTION = "brands";
const PRODUCTS_COLLECTION = "products";
const AWARDS_CATEGORIES_COLLECTION = "awardCategories";
const AWARDS_COLLECTION = "awards";

const AWARD_CATEGORY_SPA = "spa";
const AWARD_CATEGORY_VACATION = "vacation";
const AWARD_CATEGORY_COSMETIC = "cosmetic";

const getAwardCategoryKey = (categoryKey) => db.doc(`${AWARDS_CATEGORIES_COLLECTION}/${categoryKey}`);

const AWARD_CATEGORIES_SEEDS = [{
  key: AWARD_CATEGORY_SPA,
  data: {
    value: AWARD_CATEGORY_SPA,
    name: {
      en: AWARD_CATEGORY_SPA,
    },
  },
},
{
  key: AWARD_CATEGORY_VACATION,
  data: {
    value: AWARD_CATEGORY_VACATION,
    name: {
      en: AWARD_CATEGORY_VACATION,
    },
  },
},
{
  key: AWARD_CATEGORY_COSMETIC,
  data: {
    value: AWARD_CATEGORY_COSMETIC,
    name: {
      en: AWARD_CATEGORY_COSMETIC,
    },
  },
},
];


const CATEGORY_SKIN = "skin";
const CATEGORY_NAILS = "nails";
const CATEGORY_FACE = "face";

const CATEGORIES_SEEDS = [{
  key: CATEGORY_SKIN,
  data: {
    value: CATEGORY_SKIN,
    name: {
      en: "skin",
    },
  },
},
{
  key: CATEGORY_NAILS,
  data: {
    value: CATEGORY_NAILS,
    name: {
      en: "nails",
    },
  },
},
{
  key: CATEGORY_FACE,
  data: {
    value: CATEGORY_FACE,
    name: {
      en: "face",
    },
  },
},
];
const STORAGE = admin.storage().bucket("unboxme-firebase-public");

const getCategoryKey = (categoryKey) => db.doc(`${CATEGORIES_COLLECTION}/${categoryKey}`);

const BRAND_CLINIQUE = "clinique";
const BRAND_DIOR = "dior";
const BRAND_CHANEL = "chanel";
const BRAND_LANCOME = "lancome";
const BRAND_LOREAL = "loreal";
const BRAND_SEPHORA = "esteeLauder";

const BRANDS_SEEDS = [{
  key: BRAND_DIOR,
  data: {
    value: BRAND_DIOR,
    name: {en: "Dior"},
    imageUrl: STORAGE.file("dior.png").publicUrl(),
    imageDarkUrl: STORAGE.file("dior-b.png").publicUrl(),
  },
},
{
  key: BRAND_CHANEL,
  data: {
    value: BRAND_CHANEL,
    name: {en: "Chanel"},
    imageUrl: STORAGE.file("chanel.png").publicUrl(),
    imageDarkUrl: STORAGE.file("chanel-b.png").publicUrl(),
  },
},
{
  key: BRAND_LANCOME,
  data: {
    value: BRAND_LANCOME,
    name: {en: "Lancome"},
    imageUrl: STORAGE.file("lancome.png").publicUrl(),
    imageDarkUrl: STORAGE.file("lancome-b.png").publicUrl(),
  },
},
{
  key: BRAND_LOREAL,
  data: {
    value: BRAND_LOREAL,
    name: {en: "Loreal"},
    imageUrl: STORAGE.file("loreal.png").publicUrl(),
    imageDarkUrl: STORAGE.file("loreal-b.png").publicUrl(),
  },
},
{
  key: BRAND_SEPHORA,
  data: {
    value: BRAND_SEPHORA,
    name: {en: "Sephora"},
    imageUrl: STORAGE.file("sephora.png").publicUrl(),
    imageDarkUrl: STORAGE.file("sephora-b.png").publicUrl(),
  },
}];
const getBrandKey = (brandKey) => db.doc(`${BRANDS_COLLECTION}/${brandKey}`);

const PRODUCT_1 = "product1";
const PRODUCT_2 = "product2";
const getProductKey = (productKey) => db.doc(`${PRODUCTS_COLLECTION}/${productKey}`);

const PRODUCTS_SEED = [{
  key: PRODUCT_1,
  data: {
    value: PRODUCT_1,
    name: {en: "La Roche-Posay Pure Vitamin C10 Serum"},
    brand: getBrandKey(BRAND_DIOR),
    category: getCategoryKey(CATEGORY_FACE),
    preDescription: {en: "Anti-aging, resurfacing and brightening face serum with 10% pure vitamin C, salicylic acid and hyaluronic acid"},
    description: {
      en: "A unique anti-aging, antioxidant renovating face serum with 10% pure vitamin C (L-ascorbic acid) to reduce imperfections and brighten skin. It helps target skin aging and improves skin quality. As a result, wrinkles look visibly reduced and skin texture and tone are more even and refined, revealing sensitive skin’s full radiance. It combines concentrated 10% pure vitamin C, salicylic acid and neurosensine in a serum at a physiological pH for optimal effectiveness, while also being suitable for sensitive skin.\n" +
          "\n" +
        "The fresh, rich and fast-absorbing water-gel texture leaves skin soft and hydrated to the touch.",
    },
    imageUrl: STORAGE.file("product-1.png").publicUrl(),
    available: true,
  },
},
{
  key: PRODUCT_2,
  data: {
    value: PRODUCT_2,
    name: {en: "Avène Cleanance Micellar Water 400ml"},
    brand: getBrandKey(BRAND_CHANEL),
    category: getCategoryKey(CATEGORY_SKIN),
    preDescription: {en: "Avène Cleanance Cleansing Water is recommended for cleaning and removing make-up of sensitive oily skin, prone to acne."},
    description: {en: "Avène Cleanance Cleansing Water is recommended for cleaning and removing make-up of sensitive oily skin, prone to acne. It removes make-up and impurities while regulating the production of sebum. The skin is purified, smoothed and matified. Apply Avène Cleanance Cleansing Water with the help of a cotton pad, removing all the dirt from the facial skin and eye contour."},
    imageUrl: STORAGE.file("product-2.png").publicUrl(),
    available: true,
  },
}];


const AWARD_1 = "award1";
const AWARD_2 = "award2";
const AWARD_3 = "award3";

const TIMESLOTS = {"8am - 1pm": ["X", "X", "X", "X", "X", "V", "V"], "1pm - 5pm": ["V", "V", "X", "V", "X", "V", "V"], "5pm -9pm": ["V", "V", "V", "V", "X", "X", "X"]};

const AWARDS_SEED = [{
  key: AWARD_1,
  data: {
    value: AWARD_1,
    name: {en: "SPA Weekend"},
    points: 130,
    category: getAwardCategoryKey(AWARD_CATEGORY_SPA),
    description: {
      en: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    imageUrl: STORAGE.file("award1-a.jpg").publicUrl(),
    images: [STORAGE.file("award1-a.jpg").publicUrl(), STORAGE.file("award1-b.jpg").publicUrl()],
    available: true,
    timeslots: TIMESLOTS,
  },
},
{
  key: AWARD_2,
  data: {
    value: AWARD_2,
    points: 200,
    name: {en: "Cosmetic gift"},
    category: getAwardCategoryKey(AWARD_CATEGORY_COSMETIC),
    description: {
      en: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    imageUrl: STORAGE.file("award1-a.jpg").publicUrl(),
    images: [STORAGE.file("award1-a.jpg").publicUrl(), STORAGE.file("award1-b.jpg").publicUrl()],
    available: true,
    timeslots: TIMESLOTS,
  },
},
{
  key: AWARD_3,
  data: {
    value: AWARD_3,
    points: 300,
    name: {en: "Vacation gift"},
    category: getAwardCategoryKey(AWARD_CATEGORY_VACATION),
    description: {
      en: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    imageUrl: STORAGE.file("vac1-a.png").publicUrl(),
    images: [STORAGE.file("vac1-a.png").publicUrl(), STORAGE.file("vac1-b.jpg").publicUrl()],
    available: true,
    timeslots: TIMESLOTS,
  },
}];

const BOX_1 = {
  data: {
    name: {en: "Seed box 1"},
    description: {en: "The October box is gonna be about the cure of your skin. Do you have a skin routine? This box is gonna help you start your personal skin building"},
    count: 50,
    left: 15,
    productsCount: 8,
    imageUrl: STORAGE.file("boxItems2.png").publicUrl(),
    categories: [getCategoryKey(CATEGORY_SKIN)],
    brands: [getBrandKey(BRAND_DIOR), getBrandKey(BRAND_SEPHORA)],
    extraProducts: [getProductKey(PRODUCT_1), getProductKey(PRODUCT_2)],
    visible: true,
  },
};

const BOX_2 = {
  data: {
    name: {en: "Seed box 2"},
    description: {en: "The October box is gonna be about the cure of your skin. Do you have a skin routine? This box is gonna help you start your personal skin building"},
    count: 100,
    left: 55,
    productsCount: 11,
    imageUrl: STORAGE.file("boxItems.png").publicUrl(),
    categories: [getCategoryKey(CATEGORY_NAILS), getCategoryKey(CATEGORY_FACE), getCategoryKey(CATEGORY_SKIN)],
    brands: [getBrandKey(BRAND_CHANEL), getBrandKey(BRAND_LANCOME), getBrandKey(BRAND_LOREAL), getBrandKey(BRAND_SEPHORA)],
    extraProducts: [getProductKey(PRODUCT_2), getProductKey(PRODUCT_1)],
    visible: true,
  },
};


exports.SEED_DATA = [{
  collection: BRANDS_COLLECTION,
  data: BRANDS_SEEDS,
},
{
  collection: CATEGORIES_COLLECTION,
  data: CATEGORIES_SEEDS,
},
{collection: PRODUCTS_COLLECTION, data: PRODUCTS_SEED},
{
  collection: BOXES_COLLECTION,
  data: [BOX_1, BOX_2],
},
{
  collection: AWARDS_CATEGORIES_COLLECTION,
  data: AWARD_CATEGORIES_SEEDS,
},
{
  collection: AWARDS_COLLECTION,
  data: AWARDS_SEED,
},
];
