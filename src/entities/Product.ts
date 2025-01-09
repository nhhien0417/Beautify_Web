import ProductReview from "./ProductReview";

export default interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  quantity: number;
  sold: number;
  brand: string;
  description: string;
  images: string[];
  reviews: ProductReview[];
}

export const calculateAverageRating = (product: Product): number => {
  if (product.reviews.length === 0) return 0;

  const totalRatings = product.reviews.reduce(
    (sum, review) => sum + review.rating,
    0
  );
  return +(totalRatings / product.reviews.length).toFixed(1);
};

export const sampleProducts: Product[] = [
  {
    id: 1,
    name: "UV Expert Defense SPF 50+",
    price: 60,
    category: "Sunscreen",
    quantity: 2,
    sold: 0,
    brand: "Lancôme",
    description:
      "Part facial sunscreen, part moisturizer, and part makeup primer, this non-greasy, breathable formula absorbs quickly without leaving a white residue behind. It combines SPF 50, vitamin E, moringa extract, and edelweiss to deliver a hydrated, healthy-looking glow while helping prevent sunburn and decreasing the risk of sun-related aging.",
    images: [],
    reviews: [],
  },
  {
    id: 2,
    name: "Dreamskin Fresh & Perfect Face Cushion SPF 50",
    price: 90,
    category: "Sunscreen",
    quantity: 8,
    sold: 0,
    brand: "Dior",
    description:
      "The formula visibly corrects an uneven complexion, dark spots, pores, redness, dryness, dullness, and wrinkles. Beneath foundation, skin appears more luminous, smoothed, and more beautiful every day. Dreamskin comes in refillable packaging for sustainable use, and individual refills are available separately.",
    images: [],
    reviews: [],
  },
  {
    id: 3,
    name: "Mineral Unseen Sunscreen SPF 40",
    price: 40,
    category: "Sunscreen",
    quantity: 4,
    sold: 0,
    brand: "Supergoop!",
    description:
      "Mineral Unseen glides smoothly onto skin and softly blends in sheer for a dream-like feel with expert SPF protection to protect against UV rays. This mineral sunscreen formula is recommended for all skin types, including sensitive. Plus, it doubles as a makeup-gripping primer with a natural finish.",
    images: [],
    reviews: [],
  },
  {
    id: 4,
    name: "Advanced Génifique Radiance Boosting Face Serum",
    price: 160,
    category: "Serum",
    quantity: 4,
    sold: 0,
    brand: "Lancôme",
    description:
      "Powered by bifidus prebiotic and vitamin CG—a water-soluble, stable vitamin C derivative known to be gentle on skin and not as prone to degradation when exposed to air, heat, or light—this serum supports a strong barrier by locking in hydration and defending against external aggressors, including pollution and dry weather. It also tightens the look of skin and visibly improves fine lines for healthy-, radiant-looking skin in just seven days.",
    images: [],
    reviews: [],
  },
  {
    id: 5,
    name: "Capture Totale Le Sérum Anti-Aging Serum",
    price: 125,
    category: "Serum",
    quantity: 5,
    sold: 0,
    brand: "Dior",
    description:
      "This hydrating serum is skincare routine essential to target signs of aging. In just one week, skin looks twice as firm. In one month, expression lines, wrinkles, visible pores, unevenness, and loss of elasticity are visibly reduced, while radiance, firmness, and plumpness are visibly enhanced.",
    images: [],
    reviews: [],
  },
  {
    id: 6,
    name: "GOOPGENES All-In-One Super Nutrient Face Serum",
    price: 105,
    category: "Serum",
    quantity: 3,
    sold: 0,
    brand: "Supergoop!",
    description:
      "This restorative oil made with nine powerful, nutrient-dense oils (including bakuchiol, cacay, and amla) and extracts like schisandra fruit and squalane that work together to diminish the appearance of fine lines and wrinkles, improve visible firmness, smooth texture, soften, hydrate, and increase your glow.",
    images: [],
    reviews: [],
  },
  {
    id: 7,
    name: "The Dewy Serum Resurfacing and Plumping Treatment",
    price: 89,
    category: "Serum",
    quantity: 9,
    sold: 0,
    brand: "Tatcha",
    description:
      "This formula contains lactic acid from Hadasei-3™ and is balanced by squalane and hyaluronic acid—two substances native to skin from birth that diminish with age. Together, these replenishing ingredients work to make your skin look smoother, plumper, and dewier.",
    images: [],
    reviews: [],
  },
  {
    id: 8,
    name: "Clarifique Double Treatment Hydrating & Exfoliating Essence",
    price: 95,
    category: "Serum",
    quantity: 4,
    sold: 0,
    brand: "Lancôme",
    description:
      "This essence acts as a primer for your skincare and combines four exfoliating acids and hydrating oils to improve skin texture and tone. This 96 percent natural-origin formula combines water and oil in two key phases. The first phase exfoliates and visibly brightens, while the second phase soothes and hydrates skin.",
    images: [],
    reviews: [],
  },
  {
    id: 9,
    name: "Advanced Génifique Night Cream with Triple Ceramide Complex",
    price: 100,
    category: "Skincare",
    quantity: 5,
    sold: 0,
    brand: "Lancôme",
    description:
      "This night cream restores hydration and radiance for youthful-looking skin while you sleep. It reduces the appearance of fine lines and wrinkles and delivers rich moisture while melting onto skin without a greasy or oily feel.",
    images: [],
    reviews: [],
  },
  {
    id: 10,
    name: "Bi-Facil Double-Action Eye Makeup Remover",
    price: 45,
    category: "Makeup Remover",
    quantity: 6,
    sold: 0,
    brand: "Lancôme",
    description:
      "An oil-based makeup remover designed with a Bi-Phase formula that's great for sensitive skin or contact lens wearers. The oily phase uses lipid concentrate to lift makeup while the water phase uses emollients to leave skin feeling cleansed. It removes all eye makeup including waterproof.",
    images: [],
    reviews: [],
  },
  {
    id: 11,
    name: "La Vie Est Belle Fragrance",
    price: 120,
    category: "Fragrance",
    quantity: 0,
    sold: 0,
    brand: "Lancôme",
    description:
      "La vie est belle, a French expression meaning life is beautiful, is about choosing your own path to happiness and inspiring others. This is a timeless fragrance exclusively crafted by two renowned French perfumers, Anne Flipo and Dominique Ropion, where each spray will unlock a beautiful day.",
    images: [],
    reviews: [],
  },
  {
    id: 12,
    name: "La Mousse OFF/ON Foaming Face Cleanser",
    price: 52,
    category: "Cleanser",
    quantity: 5,
    sold: 0,
    brand: "Dior",
    description:
      "Composed of 90 percent natural-origin ingredients, this gentle cleanser is infused with purifying water lily from the Dior gardens. With a light, airy texture, this two-in-one foaming facial cleanser delivers cleansing and skincare. OFF means purifying, ON means soothing.",
    images: [],
    reviews: [],
  },
  {
    id: 13,
    name: "Capture Totale Hyalushot: Wrinkle Corrector with Hyaluronic Acid",
    price: 85,
    category: "Skincare",
    quantity: 3,
    sold: 0,
    brand: "Dior",
    description:
      "Powered by a hyaluronic acid duo, this formula targets eight types of face wrinkles: worry lines, frown lines, bunny lines, smile lines, smoker 's lines, marionette lines, tear-trough lines, and crow 's feet lines.",
    images: [],
    reviews: [],
  },
  {
    id: 14,
    name: "Miss Dior Parfum",
    price: 175,
    category: "Fragrance",
    quantity: 6,
    sold: 0,
    brand: "Dior",
    description:
      "An intense and luminous perfume, this contemporary chypre reinvents the original 1947 perfume, curated for the modern spirit. It reflects its time with delectable tones of a jasmine characterized by wild strawberry facets…a fragrance that is excessively round, yet highly architectural",
    images: [],
    reviews: [],
  },
  {
    id: 15,
    name: "Superscreen Rich Hydrating Cream SPF 40 Moisturizer Face Sunscreen",
    price: 62,
    category: "Sunscreen",
    quantity: 5,
    sold: 0,
    brand: "Supergoop!",
    description:
      "This formula sinks in effortlessly, delivering rich hydration with algae extract, ectoin, ceramide, and expert SPF protection. Ideal for normal to dry skin, it protects against dehydrating UV rays while visibly restoring moisture and safeguarding against future damage.",
    images: [],
    reviews: [],
  },
  {
    id: 16,
    name: "The Silk Sunscreen SPF 50 Weightless Mineral Sunscreen",
    price: 72,
    category: "Sunscreen",
    quantity: 5,
    sold: 0,
    brand: "Tatcha",
    description:
      "This sunscreen is powered by potent antioxidants and KLEAIR™ zinc oxide, which is proven to be 2.45 times more effective at protecting against free radicals, which are shown to cause loss of elasticity, fine lines, and wrinkles. KLEAIR is a high-transparency mineral filter that blends more easily into skin.",
    images: [],
    reviews: [],
  },
  {
    id: 17,
    name: "The Matcha Cleanse Daily Clarifying Gel Cleanser",
    price: 58,
    category: "Cleanser",
    quantity: 5,
    sold: 0,
    brand: "Tatcha",
    description:
      "Meet the first daily clarifying gel cleanser to purify and prime skin for makeup, without drying, morning and night. This non-stripping formula lathers from gel to refreshing foam to decongest pores for a visibly clear, matte canvas, and reduces makeup slip-off and improves all-day wear by controlling oil.",
    images: [],
    reviews: [],
  },
  {
    id: 18,
    name: "The Indigo Cleansing Balm Moisturizing Makeup Remover",
    price: 48,
    category: "Makeup Remover",
    quantity: 5,
    sold: 0,
    brand: "Tatcha",
    description:
      "The critical first step in caring for sensitive skin is choosing the correct cleanser—one that won’t steal essential moisture or irritate with friction, leaving skin even more vulnerable than before. This fragrance-free formula gently washes away makeup—not moisture—for clean yet calm skin.",
    images: [],
    reviews: [],
  },
  {
    id: 19,
    name: "Luminous Dewy Skin Mist",
    price: 72,
    category: "Skincare",
    quantity: 5,
    sold: 0,
    brand: "Tatcha",
    description:
      "The Dewy Skin Mist's super-fine sprayer only takes two to three spritzes for your whole face. Use right before applying makeup for flawless application and a dewy, glowing look. Take it with you for easy touch-ups on the go to refresh skin and give it an extra glow. You can also mist it over makeup to replenish moisture and prevent caking. It won't disturb makeup, so you can use it anytime, anywhere.s",
    images: [],
    reviews: [],
  },
];

const getAllImages = (): string[] => {
  const imageList = [
    "/src/assets/Products/1735713215410_s2741510-main-zoom.png",
    "/src/assets/Products/1735713215430_s2741510-av-4-zoom.png",
    "/src/assets/Products/1735713215444_s2741510-av-7-zoom.png",
    "/src/assets/Products/1735713215467_s2741510-av-8-zoom.png",
    "/src/assets/Products/1735713456499_s2145340-main-zoom.png",
    "/src/assets/Products/1735713456509_s2145340-av-01-zoom.png",
    "/src/assets/Products/1735713456520_p435806-av-03-zoom.png",
    "/src/assets/Products/1735713456528_p435806-av-05-zoom.png",
    "/src/assets/Products/1735713626752_s2773299-main-zoom.webp",
    "/src/assets/Products/1735713626758_s2773299-av-17-zoom.webp",
    "/src/assets/Products/1735713626764_s2773299-av-15-zoom.webp",
    "/src/assets/Products/1735713626769_s2773299-av-14-zoom.webp",
    "/src/assets/Products/1735713924211_s2291813-main-zoom.webp",
    "/src/assets/Products/1735713924217_p379510-av-37-zoom.webp",
    "/src/assets/Products/1735713924223_p379510-av-33-zoom.webp",
    "/src/assets/Products/1735713924228_p379510-av-35-zoom.webp",
    "/src/assets/Products/1735714089444_s2642684-main-zoom.webp",
    "/src/assets/Products/1735714089450_p503999-av-18-zoom.webp",
    "/src/assets/Products/1735714089457_p503999-av-16-zoom.webp",
    "/src/assets/Products/1735714089463_p503999-av-17-zoom.webp",
    "/src/assets/Products/1735714325072_s2433159-main-zoom.webp",
    "/src/assets/Products/1735714325083_s2433159-av-6-zoom.webp",
    "/src/assets/Products/1735714325086_s2433159-av-01-zoom.webp",
    "/src/assets/Products/1735714325092_s2433159-av-02-zoom.webp",
    "/src/assets/Products/1735714466699_s2406858-main-zoom.webp",
    "/src/assets/Products/1735714466699_s2406858-av-13-zoom.webp",
    "/src/assets/Products/1735714466706_s2406858-av-8-zoom.webp",
    "/src/assets/Products/1735714466712_s2406858-av-01-zoom.webp",
    "/src/assets/Products/1735714618738_1.webp",
    "/src/assets/Products/1735714618745_2.webp",
    "/src/assets/Products/1735714618751_4.webp",
    "/src/assets/Products/1735714618751_s2742484-av-6-zoom.webp",
    "/src/assets/Products/1735714726162_1.webp",
    "/src/assets/Products/1735714726163_2.webp",
    "/src/assets/Products/1735714726177_3.webp",
    "/src/assets/Products/1735714726184_4.webp",
    "/src/assets/Products/1735714821579_1.webp",
    "/src/assets/Products/1735714821585_2.webp",
    "/src/assets/Products/1735714821587_3.webp",
    "/src/assets/Products/1735714821594_4.webp",
    "/src/assets/Products/1735714917515_1.webp",
    "/src/assets/Products/1735714917518_2.webp",
    "/src/assets/Products/1735714917528_3.webp",
    "/src/assets/Products/1735714917533_4.webp",
    "/src/assets/Products/1735715036362_1.webp",
    "/src/assets/Products/1735715036362_p481972-av-10-zoom.webp",
    "/src/assets/Products/1735715036362_p481972-av-7-zoom.webp",
    "/src/assets/Products/1735715036362_p481972-av-9-zoom.webp",
    "/src/assets/Products/1735715212566_s2695021-main-zoom.webp",
    "/src/assets/Products/1735715212572_s2695021-av-6-zoom.webp",
    "/src/assets/Products/1735715212579_s2695021-av-3-zoom.webp",
    "/src/assets/Products/1735715212586_s2695021-av-5-zoom.webp",
    "/src/assets/Products/1735715359955_s2747194-main-zoom.webp",
    "/src/assets/Products/1735715359962_s2747194-av-05-zoom.webp",
    "/src/assets/Products/1735715359969_s2747194-av-02-zoom.webp",
    "/src/assets/Products/1735715359989_s2747194-av-04-zoom.webp",
    "/src/assets/Products/1735715542092_s2735017-main-zoom.webp",
    "/src/assets/Products/1735715542092_s2735017-av-2-zoom.webp",
    "/src/assets/Products/1735715542102_s2735017-av-5-zoom.webp",
    "/src/assets/Products/1735715542109_s2735017-av-3-zoom.webp",
    "/src/assets/Products/1735715754749_s2761708-main-zoom.webp",
    "/src/assets/Products/1735715754749_s2761708-av-14-zoom.webp",
    "/src/assets/Products/1735715754763_s2761708-av-12-zoom.webp",
    "/src/assets/Products/1735715754769_s2761708-av-16-zoom.webp",
    "/src/assets/Products/1735715845743_s2750065-main-zoom.webp",
    "/src/assets/Products/1735715845745_s2750065-av-7-zoom.webp",
    "/src/assets/Products/1735715845750_s2750065-av-2-zoom.webp",
    "/src/assets/Products/1735715845757_s2750065-av-5-zoom.webp",
    "/src/assets/Products/1735715941315_s2846012-av-3-zoom.webp",
    "/src/assets/Products/1735715941332_s2846012-av-1-zoom.webp",
    "/src/assets/Products/1735715941332_s2846012-av-6-zoom.webp",
    "/src/assets/Products/1735715941346_s2846012-av-5-zoom.webp",
    "/src/assets/Products/1735716039818_s1742337-main-zoom.webp",
    "/src/assets/Products/1735716039818_s1742337-av-9-zoom.webp",
    "/src/assets/Products/1735716039824_s1742337-av-4-zoom.webp",
    "/src/assets/Products/1735716039831_s1742337-av-7-zoom.webp",
  ];
  return imageList;
};

const assignImagesToProducts = (
  products: Product[],
  images: string[]
): void => {
  const numberOfImagesPerProduct = 4;
  let imageIndex = 0;

  products.forEach((product) => {
    const productImages = images.slice(
      imageIndex,
      imageIndex + numberOfImagesPerProduct
    );
    product.images = productImages;
    imageIndex += numberOfImagesPerProduct;
  });
};

const allImages = getAllImages();
assignImagesToProducts(sampleProducts, allImages);
