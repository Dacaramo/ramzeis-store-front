import { Product } from '../model/Product';

const testProducts: Array<Product> = [
  {
    pk: 'product|123',
    name: 'Flexible office lamp',
    slides: [
      {
        productSlide: 'https://m.media-amazon.com/images/1',
        effectSlide: 'https://m.media-amazon.com/images/2',
      },
      {
        productSlide: 'https://m.media-amazon.com/images/3',
        effectSlide: 'https://m.media-amazon.com/images/4',
      },
    ],
    details: [
      {
        title: '🚀 Exceptional Performance',
        description:
          'Equipped with high-quality mechanical switches, the Keychron Keyboard delivers a tactile and responsive typing experience. Choose from a variety of switch options to match your preference, whether you crave the satisfying click of Blue switches or the smooth actuation of Red switches.',
        image: 'https://m.media-amazon.com/images/5',
      },
      {
        title: '⚡ Wireless Freedom',
        description:
          'Cut the cords and embrace a clutter-free workspace. With Bluetooth 5.0 connectivity, the Keychron Keyboard ensures a stable and seamless connection, allowing you to type with freedom and flexibility. Connect  up to three devices simultaneously, effortlessly switching between them at the touch of a button.',
        image: 'https://m.media-amazon.com/images/6',
      },
      {
        title: '🌈 Customizable RGB Backlighting',
        description:
          "Express your personality and enhance your workspace with the customizable RGB backlighting. Choose from a spectrum of vibrant colors and dynamic lighting effects to create a keyboard that matches your mood and style. The Keychron Keyboard isn't just a tool; it's a statement.",
        image: 'https://m.media-amazon.com/images/7',
      },
    ],
    previewImages: [
      'https://m.media-amazon.com/images/I/41M3XqlGPsL._AC_SX425_.jpg',
      'https://m.media-amazon.com/images/I/61e14ToV5qL._AC_SX522_.jpg',
    ],
    colorId: '#000000',
    price: 7500,
    isVisible: true,
    categoryId: 'for-my-setup',
    subcategoryId: 'keyboards',
    stock: -1,
    supportedLocales: ['en', 'es-CO'],
    isForDropshipping: true,
  },
  {
    pk: 'product|456',
    name: 'Ergonomic wireless mouse',
    slides: [
      {
        productSlide: 'https://m.media-amazon.com/images/10',
        effectSlide: 'https://m.media-amazon.com/images/11',
      },
      {
        productSlide: 'https://m.media-amazon.com/images/12',
        effectSlide: 'https://m.media-amazon.com/images/13',
      },
    ],
    details: [
      {
        title: 'Comfort for Hours',
        description:
          'The Ergonomic Wireless Mouse is designed to fit your hand naturally and reduce strain on your wrist and fingers, even during long periods of use. Its contoured shape and soft-touch finish provide a comfortable grip, while its precision tracking ensures smooth and accurate cursor control.',
        image: 'https://m.media-amazon.com/images/14',
      },
      {
        title: '⚡ Wireless Convenience',
        description:
          'Enjoy the freedom of wireless connectivity with the reliable 2.4GHz wireless connection. Eliminate clutter and enjoy a clean workspace with up to 30 feet of wireless range.',
        image: 'https://m.media-amazon.com/images/15',
      },
      {
        title: 'Silent Clicks',
        description:
          "Stay focused and productive with silent clicks that won't disturb you or those around you. The Ergonomic Wireless Mouse features quiet buttons that provide a satisfying tactile feel without the noise.",
        image: 'https://m.media-amazon.com/images/16',
      },
    ],
    previewImages: [
      'https://m.media-amazon.com/images/I/51fJ+t9mJ4L._AC_SX466_.jpg',
      'https://m.media-amazon.com/images/I/61ds2H1dj3L._AC_SX466_.jpg',
    ],
    colorId: '#FFFFFF',
    price: 5990,
    isVisible: true,
    categoryId: 'for-my-setup',
    subcategoryId: 'mouses',
    stock: -1,
    supportedLocales: ['en', 'es-CO'],
    isForDropshipping: true,
  },
  {
    pk: 'product|789',
    name: 'Spacious & Stylish Backpack',
    slides: [
      {
        productSlide: 'https://m.media-amazon.com/images/19',
        effectSlide: 'https://m.media-amazon.com/images/20',
      },
      {
        productSlide: 'https://m.media-amazon.com/images/21',
        effectSlide: 'https://m.media-amazon.com/images/22',
      },
    ],
    details: [
      {
        title: 'Multipurpose Compartments',
        description:
          'The Spacious & Stylish Backpack boasts multiple compartments to keep your belongings organized and easily accessible. The main compartment is spacious enough for textbooks, laptops up to 15 inches, and other essentials. Additional compartments include a padded laptop sleeve, a fleece-lined pocket for sunglasses or electronics, and organizer pockets for pens, pencils, and other small items.',
        image: 'https://m.media-amazon.com/images/23',
      },
      {
        title: 'Durable & Comfortable',
        description:
          'Made from high-quality materials, the Spacious & Stylish Backpack is built to last. The padded shoulder straps and back panel ensure comfortable carrying, even when loaded down with heavy books or gear. The backpack also features breathable mesh lining to keep you cool and dry.',
        image: 'https://m.media-amazon.com/images/24',
      },
      {
        title: 'Sleek & Stylish Design',
        description:
          'The Spacious & Stylish Backpack combines functionality with fashion. The minimalist design and clean lines make it a versatile accessory that complements any outfit. Choose from a variety of colors to find the perfect match for your personal style.',
        image: 'https://m.media-amazon.com/images/25',
      },
    ],
    previewImages: [
      'https://m.media-amazon.com/images/I/512s-SRV6WL._AC_SX679_.jpg',
      'https://m.media-amazon.com/images/I/41CirEKeRwL._AC_SX679_.jpg',
    ],
    colorId: '#008000',
    price: 9999,
    isVisible: true,
    categoryId: 'for-my-style',
    subcategoryId: 'accessories',
    stock: 200,
    supportedLocales: ['en', 'es-CO'],
    isForDropshipping: true,
  },
  {
    pk: 'product|012',
    name: 'Noise cancelling wireless headphones',
    slides: [
      {
        productSlide: 'https://m.media-amazon.com/images/28',
        effectSlide: 'https://m.media-amazon.com/images/29',
      },
      {
        productSlide: 'https://m.media-amazon.com/images/30',
        effectSlide: 'https://m.media-amazon.com/images/31',
      },
    ],
    details: [
      {
        title: 'Immerse Yourself in Sound',
        description:
          'Escape the hustle and bustle of everyday life with the Noise-Cancelling Wireless Headphones. Advanced active noise cancellation technology effectively blocks out ambient noise, letting you focus on your music, audiobooks, or podcasts. Enjoy rich, immersive sound thanks to high-quality audio drivers and support for aptX codecs.',
        image: 'https://m.media-amazon.com/images/32',
      },
      {
        title: 'Crystal-Clear Calls',
        description:
          'Make clear and seamless calls, even in noisy environments. The Noise-Cancelling Wireless Headphones feature built-in microphones with noise reduction technology that ensures your voice is heard loud and clear on the other end of the line.',
        image: 'https://m.media-amazon.com/images/33',
      },
      {
        title: 'All-Day Comfort',
        description:
          'Listen in comfort for hours on end. The Noise-Cancelling Wireless Headphones feature soft, memory foam ear cushions and a lightweight, adjustable headband that provides a secure and comfortable fit. The headphones also boast long battery life, allowing you to enjoy your music or calls without interruption.',
        image: 'https://m.media-amazon.com/images/34',
      },
    ],
    previewImages: [
      'https://m.media-amazon.com/images/I/51mb-i8N5tL._AC_SX466_.jpg',
      'https://m.media-amazon.com/images/I/61R9g7K+0HL._AC_SX466_.jpg',
    ],
    colorId: '#008000',
    price: 14990,
    isVisible: true,
    categoryId: 'for-my-setup',
    subcategoryId: 'other',
    stock: -1,
    supportedLocales: ['en', 'es-CO'],
    isForDropshipping: true,
  },
  {
    pk: 'product|345',
    name: 'Smartwatch with fitness tracking',
    slides: [
      {
        productSlide: 'https://m.media-amazon.com/images/37',
        effectSlide: 'https://m.media-amazon.com/images/38',
      },
      {
        productSlide: 'https://m.media-amazon.com/images/39',
        effectSlide: 'https://m.media-amazon.com/images/40',
      },
    ],
    details: [
      {
        title: ' Stay Active and Motivated',
        description:
          'The Smartwatch with Fitness Tracking is your perfect companion for staying active and achieving your fitness goals. Track your steps, heart rate, calories burned, and more with built-in sensors. Set goals, monitor your progress, and stay motivated with the easy-to-use app.',
        image: 'https://m.media-amazon.com/images/41',
      },
      {
        title: ' Smart Notifications & Connectivity',
        description:
          'Stay connected and informed with the Smartwatch. Receive notifications for calls, texts, emails, and social media updates right on your wrist. Control your music, check the weather, and even use your watch to pay for purchases with contactless NFC.',
        image: 'https://m.media-amazon.com/images/42',
      },
      {
        title: ' Stylish & Durable Design',
        description:
          'The Smartwatch combines style and functionality. The sleek and stylish design makes it a perfect everyday accessory, while the durable construction ensures it can withstand your active lifestyle. The watch is also water-resistant, so you can wear it rain or shine.',
        image: 'https://m.media-amazon.com/images/43',
      },
    ],
    previewImages: [
      'https://m.media-amazon.com/images/I/61vAeqTFgwL._AC_SX466_.jpg',
      'https://m.media-amazon.com/images/I/710ruFlPndL._AC_SX466_.jpg',
    ],
    colorId: '#808080',
    price: 19990,
    isVisible: true,
    categoryId: 'for-my-style',
    subcategoryId: 'accessories',
    stock: -1,
    supportedLocales: ['en', 'es-CO'],
    isForDropshipping: true,
  },
  {
    pk: 'product|678',
    name: 'Portable instant coffee maker',
    slides: [
      {
        productSlide: 'https://m.media-amazon.com/images/46',
        effectSlide: 'https://m.media-amazon.com/images/47',
      },
      {
        productSlide: 'https://m.media-amazon.com/images/48',
        effectSlide: 'https://m.media-amazon.com/images/49',
      },
    ],
    details: [
      {
        title: 'Enjoy Coffee Anywhere, Anytime',
        description:
          "The Portable Instant Coffee Maker is your perfect solution for enjoying delicious coffee on the go. Whether you're camping, traveling, or just need a quick pick-me-up at the office, this handy gadget lets you brew your favorite instant coffee in minutes. Simply add hot water, your favorite instant coffee, and press the button - a steaming cup of coffee is ready in no time.",
        image: 'https://m.media-amazon.com/images/50',
      },
      {
        title: 'Compact & Lightweight Design',
        description:
          "The Portable Instant Coffee Maker is compact and lightweight, making it easy to take with you wherever you go. It's perfect for travel, camping, hiking, or even just keeping in your desk drawer for a quick coffee break.",
        image: 'https://m.media-amazon.com/images/51',
      },
      {
        title: 'Easy to Use & Clean',
        description:
          "The Portable Instant Coffee Maker is incredibly easy to use and clean. Simply add water and coffee, press the button, and enjoy. The machine is also easy to clean - just rinse it with water and it's ready for your next cup.",
        image: 'https://m.media-amazon.com/images/52',
      },
    ],
    previewImages: [
      'https://m.media-amazon.com/images/I/51YDSvdAT4L._AC_SX679_.jpg',
      'https://m.media-amazon.com/images/I/51GOHWkYStL._AC_SX679_.jpg',
    ],
    colorId: '#000000',
    price: 3990,
    isVisible: true,
    categoryId: 'for-the-ambience',
    subcategoryId: 'other',
    stock: -1,
    supportedLocales: ['en', 'es-CO'],
    isForDropshipping: true,
  },
  {
    pk: 'product|901',
    name: 'Wireless charging stand',
    slides: [
      {
        productSlide: 'https://m.media-amazon.com/images/55',
        effectSlide: 'https://m.media-amazon.com/images/56',
      },
      {
        productSlide: 'https://m.media-amazon.com/images/57',
        effectSlide: 'https://m.media-amazon.com/images/58',
      },
    ],
    details: [
      {
        title: 'Power Up Your Devices Wirelessly',
        description:
          'The Wireless Charging Stand is the perfect way to charge your Qi-compatible smartphones and other devices wirelessly. Simply place your device on the stand and watch it start charging automatically. No more fumbling with cables - the Wireless Charging Stand makes charging your devices convenient and hassle-free.',
        image: 'https://m.media-amazon.com/images/59',
      },
      {
        title: 'Sleek & Stylish Design',
        description:
          'The Wireless Charging Stand features a sleek and stylish design that complements any home or office décor. The stand is made from high-quality materials and is available in a variety of colors to match your style.',
        image: 'https://m.media-amazon.com/images/60',
      },
      {
        title: 'Safe & Reliable',
        description:
          'The Wireless Charging Stand is safe and reliable. It features built-in over-temperature, over-current, and over-voltage protection to ensure your devices are safe while charging.',
        image: 'https://m.media-amazon.com/images/61',
      },
    ],
    previewImages: [
      'https://m.media-amazon.com/images/I/61HFYuEYY8L._AC_SX466_.jpg',
      'https://m.media-amazon.com/images/I/61ICyiZ7pvL._AC_SX466_.jpg',
    ],
    colorId: '#000000',
    price: 2990,
    isVisible: true,
    categoryId: 'for-my-setup',
    subcategoryId: 'other',
    stock: -1,
    supportedLocales: ['en', 'es-CO'],
    isForDropshipping: true,
  },
  {
    pk: 'product|555',
    name: 'Travel Toiletry Bag',
    slides: [
      {
        productSlide: 'https://m.media-amazon.com/images/71',
        effectSlide: 'https://m.media-amazon.com/images/72',
      },
      {
        productSlide: 'https://m.media-amazon.com/images/73',
        effectSlide: 'https://m.media-amazon.com/images/74',
      },
    ],
    details: [
      {
        title: 'Stay Organized on the Go',
        description:
          "The Travel Toiletry Bag is the perfect way to keep your toiletries organized and within reach when you're traveling. The bag features multiple compartments and pockets to keep your essentials neat and tidy. It also has a water-resistant lining to prevent spills and leaks.",
        image: 'https://m.media-amazon.com/images/75',
      },
      {
        title: 'Compact & Lightweight Design',
        description:
          "The Travel Toiletry Bag is compact and lightweight, making it easy to pack in your suitcase or carry-on bag. It's also made from durable materials that can withstand the rigors of travel.",
        image: 'https://m.media-amazon.com/images/76',
      },
      {
        title: 'Stylish & Functional',
        description:
          "The Travel Toiletry Bag is not only functional, but it's also stylish. It comes in a variety of colors and designs to match your personal style.",
        image: 'https://m.media-amazon.com/images/77',
      },
    ],
    previewImages: [
      'https://m.media-amazon.com/images/I/7131kbYuxwL._AC_SX466_.jpg',
      'https://m.media-amazon.com/images/I/81tHZ+PWcZL._AC_SX466_.jpg',
    ],
    colorId: '#0047AB',
    price: 2490,
    isVisible: true,
    categoryId: 'for-the-ambience',
    subcategoryId: 'other',
    stock: -1,
    supportedLocales: ['en', 'es-CO'],
    isForDropshipping: true,
  },
  {
    pk: 'product|890',
    name: 'Instant pot pressure cooker',
    slides: [
      {
        productSlide: 'https://m.media-amazon.com/images/80',
        effectSlide: 'https://m.media-amazon.com/images/81',
      },
      {
        productSlide: 'https://m.media-amazon.com/images/82',
        effectSlide: 'https://m.media-amazon.com/images/83',
      },
    ],
    details: [
      {
        title: ' Cook Meals in Minutes',
        description:
          "The Instant Pot Pressure Cooker is a versatile kitchen appliance that can cook a variety of meals in minutes. With its multiple cooking functions, you can pressure cook, slow cook, steam, rice, yogurt, and more. The Instant Pot also features a convenient keep-warm function that keeps your food warm until you're ready to serve it.",
        image: 'https://m.media-amazon.com/images/84',
      },
      {
        title: ' Easy to Use & Clean',
        description:
          'The Instant Pot is easy to use, even for beginners. The digital control panel makes it simple to select your desired cooking function and time. The pot is also dishwasher-safe, making cleanup a breeze.',
        image: 'https://m.media-amazon.com/images/85',
      },
      {
        title: ' One-Pot Meals',
        description:
          'The Instant Pot is perfect for making one-pot meals. Simply add all of your ingredients to the pot and let it do the work. This is a great way to save time and cleanup.',
        image: 'https://m.media-amazon.com/images/86',
      },
    ],
    previewImages: [
      'https://m.media-amazon.com/images/I/81MXavhztlL._AC_SX679_.jpg',
      'https://m.media-amazon.com/images/I/813gIBGWL6L._AC_SX679_.jpg',
    ],
    colorId: '#808080',
    price: 9999,
    isVisible: true,
    categoryId: 'for-the-ambience',
    subcategoryId: 'other',
    stock: -1,
    supportedLocales: ['en', 'es-CO'],
    isForDropshipping: true,
  },
  {
    pk: 'product|999',
    name: 'Air Purifier with HEPA Filter',
    slides: [
      {
        productSlide: 'https://m.media-amazon.com/images/89',
        effectSlide: 'https://m.media-amazon.com/images/90',
      },
      {
        productSlide: 'https://m.media-amazon.com/images/91',
        effectSlide: 'https://m.media-amazon.com/images/92',
      },
    ],
    details: [
      {
        title: ' Breathe Clean Air',
        description:
          'The Air Purifier with HEPA Filter is designed to remove dust, pollen, pet dander, smoke, and other airborne allergens from your home. The HEPA filter captures 99.97% of airborne particles as small as 0.3 microns, creating a healthier and more comfortable environment for you and your family.',
        image: 'https://m.media-amazon.com/images/93',
      },
      {
        title: ' Quiet Operation',
        description:
          'The Air Purifier operates quietly, so you can enjoy clean air without the noise. It features multiple fan speeds to choose from, so you can adjust the noise level to your preference.',
        image: 'https://m.media-amazon.com/images/94',
      },
      {
        title: ' Easy to Use & Maintain',
        description:
          'The Air Purifier is easy to use and maintain. The filter can be replaced easily, and the unit is also easy to clean.',
        image: 'https://m.media-amazon.com/images/95',
      },
    ],
    previewImages: [
      'https://m.media-amazon.com/images/I/512XFmwxF1L._AC_SX679_.jpg',
      'https://m.media-amazon.com/images/I/71q9HUfi1+L._AC_SX679_.jpg',
    ],
    colorId: '#0047AB',
    price: 12990,
    isVisible: true,
    categoryId: 'for-the-ambience',
    subcategoryId: 'other',
    stock: -1,
    supportedLocales: ['en', 'es-CO'],
    isForDropshipping: true,
  },
  {
    pk: 'product|888',
    name: 'Mechanical keyboard',
    slides: [
      {
        productSlide: 'https://m.media-amazon.com/images/98',
        effectSlide: 'https://m.media-amazon.com/images/99',
      },
      {
        productSlide: 'https://m.media-amazon.com/images/100',
        effectSlide: 'https://m.media-amazon.com/images/101',
      },
    ],
    details: [
      {
        title: 'Experience the Difference',
        description:
          'Upgrade your typing experience with the Mechanical Keyboard. This keyboard features mechanical switches that provide a satisfying tactile feedback and clicky sound, making typing more enjoyable and efficient. The keyboard also has a durable construction and a stylish design that will look great on any desk.',
        image: 'https://m.media-amazon.com/images/102',
      },
      {
        title: 'Customizable RGB Lighting',
        description:
          'The Mechanical Keyboard features customizable RGB lighting that lets you personalize your setup. Choose from a variety of colors and effects to create the perfect look for you.',
        image: 'https://m.media-amazon.com/images/103',
      },
      {
        title: 'Built to Last',
        description:
          'The Mechanical Keyboard is built with high-quality materials that are designed to last. The keyboard has a metal frame and keycaps that can withstand years of use.',
        image: 'https://m.media-amazon.com/images/104',
      },
    ],
    previewImages: [
      'https://m.media-amazon.com/images/I/61oBDqjxreL._AC_SX466_.jpg',
      'https://m.media-amazon.com/images/I/61iUiMTqXXL._AC_SX466_.jpg',
    ],
    colorId: '#0047AB',
    price: 14999,
    isVisible: true,
    categoryId: 'for-my-setup',
    subcategoryId: 'keyboards',
    stock: -1,
    supportedLocales: ['en', 'es-CO'],
    isForDropshipping: true,
  },
  {
    pk: 'product|098',
    name: 'Fitness tracker with heart rate monitor',
    slides: [
      {
        productSlide: 'https://m.media-amazon.com/images/107',
        effectSlide: 'https://m.media-amazon.com/images/108',
      },
      {
        productSlide: 'https://m.media-amazon.com/images/109',
        effectSlide: 'https://m.media-amazon.com/images/110',
      },
    ],
    details: [
      {
        title: ' Track Your Fitness Goals',
        description:
          'The Fitness Tracker with Heart Rate Monitor is your perfect companion for reaching your fitness goals. Track your steps, distance, calories burned, heart rate, and more with this versatile tracker. The tracker also features sleep tracking, so you can monitor your sleep quality and improve your sleep habits.',
        image: 'https://m.media-amazon.com/images/111',
      },
      {
        title: ' Stay Motivated & Connected',
        description:
          'The Fitness Tracker keeps you motivated with its goal setting and progress tracking features. You can also receive notifications for calls, texts, and social media updates right on your wrist. The tracker is also water-resistant, so you can wear it while swimming or showering.',
        image: 'https://m.media-amazon.com/images/112',
      },
      {
        title: ' Stylish & Lightweight Design',
        description:
          'The Fitness Tracker is stylish and lightweight, making it comfortable to wear all day long. The tracker comes in a variety of colors and styles to match your personal taste.',
        image: 'https://m.media-amazon.com/images/113',
      },
    ],
    previewImages: [
      'https://m.media-amazon.com/images/I/71dL7XMdfbL._AC_SX466_.jpg',
      'https://m.media-amazon.com/images/I/71oxm9uuCyL._AC_SX466_.jpg',
    ],
    colorId: '#008000',
    price: 7990,
    isVisible: true,
    categoryId: 'wearables',
    subcategoryId: 'fitness',
    stock: -1,
    supportedLocales: ['en', 'es-CO'],
    isForDropshipping: true,
  },
  {
    pk: 'product|99976',
    name: 'Cozy Cat Hoodie',
    slides: [
      {
        productSlide: 'https://m.media-amazon.com/images/116',
        effectSlide: 'https://m.media-amazon.com/images/117',
      },
      {
        productSlide: 'https://m.media-amazon.com/images/118',
        effectSlide: 'https://m.media-amazon.com/images/119',
      },
    ],
    details: [
      {
        title: 'Purr-fectly Comfortable',
        description:
          'Made from ultra-soft fleece, this adorable cat hoodie will keep your feline friend warm and cozy all winter long. The cute cat ear hood and paw print pockets add an extra touch of purr-sonality.',
        image: 'https://m.media-amazon.com/images/120',
      },
      {
        title: 'Adjustable Fit',
        description:
          "The hoodie features an adjustable drawstring hood and ribbed cuffs for a secure and comfortable fit. It's also machine-washable for easy care.",
        image: 'https://m.media-amazon.com/images/121',
      },
      {
        title: 'The Purr-fect Gift for Cat Lovers',
        description:
          "This hoodie makes the purr-fect gift for any cat lover. It's available in a variety of sizes and colors to suit any kitty.",
        image: 'https://m.media-amazon.com/images/122',
      },
    ],
    previewImages: [
      'https://m.media-amazon.com/images/I/51T5sZ8kPuL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/61mMEUwE+8L._AC_SL1499_.jpg',
    ],
    colorId: '#000000',
    price: 2499,
    isVisible: true,
    categoryId: 'for-my-style',
    subcategoryId: 'hoodies',
    stock: 150,
    supportedLocales: ['en', 'es-CO'],
    isForDropshipping: false,
  },
  {
    pk: 'product|1001',
    name: 'Cozy sherpa blanket',
    slides: [
      {
        productSlide: 'https://m.media-amazon.com/images/134',
        effectSlide: 'https://m.media-amazon.com/images/135',
      },
      {
        productSlide: 'https://m.media-amazon.com/images/136',
        effectSlide: 'https://m.media-amazon.com/images/137',
      },
    ],
    details: [
      {
        title: 'Cuddle Up in Comfort',
        description:
          'This luxuriously soft sherpa blanket is perfect for snuggling up on the couch, reading in bed, or taking a nap. The plush sherpa fleece is soft and warm, making it ideal for cold winter nights.',
        image: 'https://m.media-amazon.com/images/138',
      },
      {
        title: 'Reversible Design',
        description:
          'The blanket is reversible, featuring a soft sherpa fleece on one side and a smooth microfleece on the other. This gives you two different textures to choose from, depending on your preference.',
        image: 'https://m.media-amazon.com/images/139',
      },
      {
        title: 'Machine Washable',
        description:
          "The blanket is machine washable and dryer-safe for easy care. It's also lightweight and portable, making it easy to take with you wherever you go.",
        image: 'https://m.media-amazon.com/images/140',
      },
    ],
    previewImages: [
      'https://m.media-amazon.com/images/I/71jZp7cam5L._AC_SX679_.jpg',
      'https://m.media-amazon.com/images/I/71l0O7cledL._AC_SX679_.jpg',
    ],
    colorId: '#808080',
    price: 3990,
    isVisible: true,
    categoryId: 'for-the-ambience',
    subcategoryId: 'other',
    stock: 200,
    supportedLocales: ['en', 'es-CO'],
    isForDropshipping: false,
  },
  {
    pk: 'product|1002',
    name: 'Motivational water bottle',
    slides: [
      {
        productSlide: 'https://m.media-amazon.com/images/143',
        effectSlide: 'https://m.media-amazon.com/images/144',
      },
      {
        productSlide: 'https://m.media-amazon.com/images/145',
        effectSlide: 'https://m.media-amazon.com/images/146',
      },
    ],
    details: [
      {
        title: 'Stay Hydrated & Motivated',
        description:
          "This motivational water bottle is designed to help you stay hydrated and on track with your fitness goals. The bottle features inspirational quotes and time markers to remind you to drink water throughout the day. It's also made from BPA-free, eco-friendly materials and is leak-proof.",
        image: 'https://m.media-amazon.com/images/147',
      },
      {
        title: 'Multiple Sizes & Colors',
        description:
          "The water bottle comes in a variety of sizes and colors to suit your needs and style. It's also dishwasher-safe for easy cleaning.",
        image: 'https://m.media-amazon.com/images/148',
      },
      {
        title: 'Perfect for Any Activity',
        description:
          "This water bottle is perfect for taking to the gym, work, school, or on the go. It's a great way to stay hydrated and motivated throughout your day.",
        image: 'https://m.media-amazon.com/images/149',
      },
    ],
    previewImages: [
      'https://m.media-amazon.com/images/I/61y7dJo8c0L._AC_SX679_.jpg',
      'https://m.media-amazon.com/images/I/614q9SR6NwL._AC_SX679_.jpg',
    ],
    colorId: '#0047AB',
    price: 1990,
    isVisible: true,
    categoryId: 'for-my-style',
    subcategoryId: 'accessories',
    stock: 120,
    supportedLocales: ['en'],
    isForDropshipping: false,
  },
  {
    pk: 'product|1003',
    name: 'Cozy fleece hooded sweatshirt',
    slides: [
      {
        productSlide: 'https://m.media-amazon.com/images/152',
        effectSlide: 'https://m.media-amazon.com/images/153',
      },
      {
        productSlide: 'https://m.media-amazon.com/images/154',
        effectSlide: 'https://m.media-amazon.com/images/155',
      },
    ],
    details: [
      {
        title: 'Ultimate Comfort & Warmth',
        description:
          'Made from super-soft fleece, this hooded sweatshirt is perfect for keeping you cozy and warm on chilly days. The relaxed fit and kangaroo pocket are perfect for lounging around the house or running errands.',
        image: 'https://m.media-amazon.com/images/156',
      },
      {
        title: 'Stylish & Versatile',
        description:
          "This sweatshirt comes in a variety of colors and styles to match your taste. It's also versatile enough to be dressed up or down.",
        image: 'https://m.media-amazon.com/images/157',
      },
      {
        title: 'Machine Washable & Easy Care',
        description:
          "This sweatshirt is machine washable and dryer-safe for easy care. It's also made from durable materials that will last for years to come.",
        image: 'https://m.media-amazon.com/images/158',
      },
    ],
    previewImages: [
      'https://m.media-amazon.com/images/I/815zxnmxzyL._AC_SL1500_.jpg',
      'https://m.media-amazon.com/images/I/711Lt-TttrL._AC_SL1500_.jpg',
    ],
    colorId: '#808080',
    price: 2990,
    isVisible: true,
    categoryId: 'for-my-style',
    subcategoryId: 'sweatshirts',
    stock: 80,
    supportedLocales: ['en', 'es-CO'],
    isForDropshipping: false,
  },
  {
    pk: 'product|1004',
    name: 'Minimalist desk organizer',
    slides: [
      {
        productSlide: 'https://m.media-amazon.com/images/161',
        effectSlide: 'https://m.media-amazon.com/images/162',
      },
      {
        productSlide: 'https://m.media-amazon.com/images/163',
        effectSlide: 'https://m.media-amazon.com/images/164',
      },
    ],
    details: [
      {
        title: 'Declutter & Organize Your Desk',
        description:
          'This minimalist desk organizer is designed to help you keep your workspace clutter-free and organized. It features multiple compartments for pens, pencils, notebooks, and other office supplies. The sleek and modern design complements any desk setup.',
        image: 'https://m.media-amazon.com/images/165',
      },
      {
        title: 'Made from Sustainable Materials',
        description:
          "This organizer is made from bamboo, a sustainable and eco-friendly material. It's also durable and easy to clean.",
        image: 'https://m.media-amazon.com/images/166',
      },
      {
        title: 'Boosts Productivity & Focus',
        description:
          'By keeping your desk organized, you can improve your productivity and focus. This organizer will help you find what you need quickly and easily, so you can spend less time searching and more time getting things done.',
        image: 'https://m.media-amazon.com/images/167',
      },
    ],
    previewImages: [
      'https://m.media-amazon.com/images/I/71s3tmssFFL._AC_SX679_.jpg',
      'https://m.media-amazon.com/images/I/710Xo+NpTvL._AC_SX679_.jpg',
    ],
    colorId: '#F2E0BF',
    price: 1499,
    isVisible: true,
    categoryId: 'for-my-setup',
    subcategoryId: 'other',
    stock: 50,
    supportedLocales: ['en', 'es-CO'],
    isForDropshipping: false,
  },
  {
    pk: 'product|1006',
    name: 'Motivational sticky notes',
    slides: [
      {
        productSlide: 'https://m.media-amazon.com/images/179',
        effectSlide: 'https://m.media-amazon.com/images/180',
      },
      {
        productSlide: 'https://m.media-amazon.com/images/181',
        effectSlide: 'https://m.media-amazon.com/images/182',
      },
    ],
    details: [
      {
        title: 'Stay Inspired & Organized',
        description:
          'These motivational sticky notes are designed to help you stay inspired and organized throughout your day. Each note features a different inspirational quote or message to help you stay on track with your goals. The bright and colorful designs are sure to brighten your day.',
        image: 'https://m.media-amazon.com/images/183',
      },
      {
        title: 'Multiple Sizes & Designs',
        description:
          "These sticky notes come in a variety of sizes and designs to suit your needs. They're also repositionable and removable, so you can easily move them around without damaging your surfaces.",
        image: 'https://m.media-amazon.com/images/184',
      },
      {
        title: 'Perfect for Planners & Bullet Journals',
        description:
          "These sticky notes are perfect for using in planners, bullet journals, and notebooks. They're also great for leaving yourself little reminders or messages throughout the day.",
        image: 'https://m.media-amazon.com/images/185',
      },
    ],
    previewImages: [
      'https://m.media-amazon.com/images/I/71TmI7P4lmL._AC_SX679_.jpg',
      'https://m.media-amazon.com/images/I/71h32CfAEXL._AC_SX679_.jpg',
    ],
    colorId: '#0047AB',
    price: 599,
    isVisible: true,
    categoryId: 'for-my-setup',
    subcategoryId: 'stickers',
    stock: 250,
    supportedLocales: ['en', 'es-CO'],
    isForDropshipping: false,
  },
  {
    pk: 'product|1009',
    name: 'Moon Lamp with Constellation Projector',
    slides: [
      {
        productSlide: 'https://m.media-amazon.com/images/206', // Replace with actual product image URL
        effectSlide: 'https://m.media-amazon.com/images/207', // Replace with actual effect image URL
      },
      {
        productSlide: 'https://m.media-amazon.com/images/208', // Replace with actual product image URL
        effectSlide: 'https://m.media-amazon.com/images/209', // Replace with actual effect image URL
      },
    ],
    details: [
      {
        title: 'Transform Your Room into a Starry Nightscape',
        description:
          'Create a mesmerizing ambiance with this moon lamp and constellation projector. The lamp casts a soft, warm glow, while the projector creates a realistic constellation display. Perfect for relaxation, romance, or sparking curiosity about the night sky.',
        image: 'https://m.media-amazon.com/images/210', // Replace with actual image URL
      },
      {
        title: 'Multiple Moon Phases & Customizable Constellations',
        description:
          'Switch between full moon, crescent, and other phases. Choose from pre-programmed constellations or create your own personalized display.',
        image: 'https://m.media-amazon.com/images/211', // Replace with actual image URL
      },
      {
        title: 'Adjustable Brightness & Colors & Remote Control',
        description:
          'Customize the ambiance with adjustable brightness and color options. Conveniently control everything from a distance using the remote.',
        image: 'https://m.media-amazon.com/images/212', // Replace with actual image URL
      },
    ],
    previewImages: [
      'https://m.media-amazon.com/images/I/71skv-ZX37L._AC_SX522_.jpg', // Replace with actual preview image URL
      'https://m.media-amazon.com/images/I/71f20pYUhWL._AC_SX522_.jpg', // Replace with actual preview image URL
    ],
    colorId: '#FFFFFF',
    price: 3999,
    isVisible: true,
    categoryId: 'for-the-ambience',
    subcategoryId: 'other',
    stock: 200,
    supportedLocales: ['en', 'es-CO'],
    isForDropshipping: false,
  },
  {
    pk: 'product|1010',
    name: 'Portable Stainless Steel Water Bottle with Infuser',
    slides: [
      {
        productSlide: 'https://m.media-amazon.com/images/215', // Replace with actual product image URL
        effectSlide: 'https://m.media-amazon.com/images/216', // Replace with actual effect image URL
      },
      {
        productSlide: 'https://m.media-amazon.com/images/217', // Replace with actual product image URL
        effectSlide: 'https://m.media-amazon.com/images/218', // Replace with actual effect image URL
      },
    ],
    details: [
      {
        title: 'Hydrate in Style & Flavor',
        description:
          'This stylish and functional water bottle is perfect for staying hydrated on the go. Made from durable stainless steel, it keeps your drinks hot or cold for hours. The built-in infuser lets you add fruits, herbs, or other flavorings to your water for a refreshing and healthy twist.',
        image: 'https://m.media-amazon.com/images/219', // Replace with actual image URL
      },
      {
        title: 'Leakproof & Easy to Clean',
        description:
          'The double-walled insulation ensures your drinks stay at the perfect temperature without sweating or condensation. The leakproof lid prevents spills, while the wide mouth opening makes it easy to clean and add ice cubes.',
        image: 'https://m.media-amazon.com/images/220', // Replace with actual image URL
      },
      {
        title: 'Multiple Sizes & Colors',
        description:
          "This water bottle comes in a variety of sizes and colors to suit your needs and style. It's also BPA-free and dishwasher-safe for added convenience.",
        image: 'https://m.media-amazon.com/images/221', // Replace with actual image URL
      },
    ],
    previewImages: [
      'https://m.media-amazon.com/images/I/51iJYmgu5mS._AC_SX679_.jpg', // Replace with actual preview image URL
      'https://m.media-amazon.com/images/I/610ze32WGyS._AC_SX679_.jpg', // Replace with actual preview image URL
    ],
    colorId: '#008000',
    price: 1999,
    isVisible: true,
    categoryId: 'for-my-style',
    subcategoryId: 'accessories',
    stock: -1,
    supportedLocales: ['en', 'es-CO'],
    isForDropshipping: true,
  },
  {
    pk: 'product|1011',
    name: 'Miniature Zen Garden',
    slides: [
      {
        productSlide: 'https://m.media-amazon.com/images/224', // Replace with actual product image URL
        effectSlide: 'https://m.media-amazon.com/images/225', // Replace with actual effect image URL
      },
      {
        productSlide: 'https://m.media-amazon.com/images/226', // Replace with actual product image URL
        effectSlide: 'https://m.media-amazon.com/images/227', // Replace with actual effect image URL
      },
    ],
    details: [
      {
        title: 'Find Inner Peace on Your Desk',
        description:
          'Cultivate mindfulness and reduce stress with this miniature Zen garden. Featuring sand, rocks, a mini rake, and a serene landscape, it creates a calming environment on your desk or tabletop. Raking the sand and arranging the rocks creates a meditative experience, helping you find inner peace and focus throughout the day.',
        image: 'https://m.media-amazon.com/images/228', // Replace with actual image URL
      },
      {
        title: 'Multiple Designs & Portable Size',
        description:
          'This Zen garden comes in a variety of designs to match your style and preference. Its compact size makes it perfect for any desk or workspace, bringing a touch of tranquility wherever you go.',
        image: 'https://m.media-amazon.com/images/229', // Replace with actual image URL
      },
      {
        title: 'Low Maintenance & Relaxing Activity',
        description:
          'This Zen garden requires minimal maintenance, making it ideal for busy individuals. Simply rake the sand occasionally to create new patterns and find moments of relaxation throughout your day.',
        image: 'https://m.media-amazon.com/images/230', // Replace with actual image URL
      },
    ],
    previewImages: [
      'https://m.media-amazon.com/images/I/61pyyACx-nL._AC_SX679_.jpg', // Replace with actual preview image URL
      'https://m.media-amazon.com/images/I/61HPSTaqKML._AC_SX679_.jpg', // Replace with actual preview image URL
    ],
    colorId: '#000000',
    price: 1499,
    isVisible: true,
    categoryId: 'for-my-setup',
    subcategoryId: 'other',
    stock: -1,
    supportedLocales: ['en', 'es-CO'],
    isForDropshipping: true,
  },
];

export default testProducts;
