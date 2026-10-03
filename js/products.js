/* =====================================================================
   EDIT HERE: STORE SETTINGS, PRODUCT IMAGES, PRICES AND DETAILS
   - image / gallery : replace paths with your own files in images/products/
   - price / oldPrice: numbers (oldPrice optional; shows a discount badge)
   - featured:true   : appears on the home page "Featured Products"
   - category        : must match an id in CATEGORIES below
   ===================================================================== */
const CURRENCY = '$';
const FREE_SHIPPING_OVER = 100, SHIPPING_FEE = 7.99;

const CATEGORIES = [
  { id: 'mice',      name: 'Mice',             icon: '🖱️', image: 'images/categories/mice.jpg' },
  { id: 'keyboards', name: 'Keyboards',        icon: '⌨️', image: 'images/categories/keyboards.jpg' },
  { id: 'storage',   name: 'Storage',          icon: '💾', image: 'images/categories/storage.jpg' },
  { id: 'headphones',name: 'Headphones',       icon: '🎧', image: 'images/categories/headphones.jpg' },
  { id: 'speakers',  name: 'Speakers',         icon: '🔊', image: 'images/categories/speakers.jpg' },
  { id: 'cables',    name: 'Cables & Chargers',icon: '🔌', image: 'images/categories/cables.jpg' },
  { id: 'webcams',   name: 'Webcams',          icon: '📷', image: 'images/categories/webcams.jpg' },
  { id: 'gaming',    name: 'Gaming',           icon: '🎮', image: 'images/categories/gaming.jpg' }
];

const PRODUCTS = [
  { id: 1, name: 'Wireless Mouse', category: 'mice', price: 19.99, oldPrice: 24.99, rating: 4.5, reviews: 312, featured: true,
    image: 'images/products/wireless-mouse.jpg', gallery: ['images/products/wireless-mouse.jpg', 'images/products/wireless-mouse-2.jpg', 'images/products/wireless-mouse-3.jpg'],
    desc: 'Silent-click 2.4GHz wireless mouse with adjustable DPI and a 12-month battery life.', specs: { Connectivity: '2.4GHz USB receiver', DPI: '800 / 1200 / 1600', Battery: '1 x AA', Warranty: '1 year' } },
  { id: 2, name: 'Ergonomic Vertical Mouse', category: 'mice', price: 29.99, rating: 4.3, reviews: 98,
    image: 'images/products/vertical-mouse.jpg', desc: 'Reduces wrist strain with a natural handshake grip. Bluetooth and 2.4GHz dual mode.', specs: { Connectivity: 'Bluetooth 5.0 + 2.4GHz', DPI: 'Up to 2400', Battery: 'Rechargeable', Warranty: '1 year' } },
  { id: 3, name: 'RGB Gaming Mouse', category: 'mice', price: 34.99, oldPrice: 49.99, rating: 4.7, reviews: 540, featured: true,
    image: 'images/products/rgb-gaming-mouse.jpg', desc: '12,000 DPI optical sensor, 7 programmable buttons and customizable RGB lighting.', specs: { Sensor: 'Optical 12,000 DPI', Buttons: '7 programmable', Cable: '1.8m braided', Warranty: '2 years' } },
  { id: 4, name: 'Mechanical Keyboard', category: 'keyboards', price: 59.99, oldPrice: 79.99, rating: 4.8, reviews: 721, featured: true,
    image: 'images/products/mechanical-keyboard.jpg', desc: 'Full-size mechanical keyboard with blue switches, RGB backlight and aluminium top plate.', specs: { Switches: 'Blue mechanical', Layout: 'Full size 104 keys', Backlight: 'RGB', Warranty: '2 years' } },
  { id: 5, name: 'Wireless Slim Keyboard', category: 'keyboards', price: 39.99, rating: 4.2, reviews: 143,
    image: 'images/products/wireless-keyboard.jpg', desc: 'Ultra-thin quiet keyboard for office and home use. Connects to up to 3 devices.', specs: { Connectivity: 'Bluetooth + 2.4GHz', Layout: 'Full size', Battery: 'Rechargeable', Warranty: '1 year' } },
  { id: 6, name: 'Compact 60% Keyboard', category: 'keyboards', price: 49.99, oldPrice: 59.99, rating: 4.6, reviews: 209,
    image: 'images/products/60-keyboard.jpg', desc: 'Space-saving 60% hot-swappable mechanical keyboard for gaming and typing.', specs: { Switches: 'Red linear, hot-swap', Layout: '61 keys', Connectivity: 'USB-C', Warranty: '1 year' } },
  { id: 7, name: 'USB Flash Drive 64GB', category: 'storage', price: 12.99, rating: 4.4, reviews: 860,
    image: 'images/products/usb-drive-64gb.jpg', desc: 'Compact metal USB 3.0 flash drive with fast transfer speeds.', specs: { Capacity: '64GB', Interface: 'USB 3.0', 'Read speed': '100MB/s', Warranty: '5 years' } },
  { id: 8, name: 'USB 3.2 Flash Drive 256GB', category: 'storage', price: 29.99, oldPrice: 39.99, rating: 4.6, reviews: 305,
    image: 'images/products/usb-drive-256gb.jpg', desc: 'High-capacity USB 3.2 drive for backups, media and large files.', specs: { Capacity: '256GB', Interface: 'USB 3.2 Gen 1', 'Read speed': '200MB/s', Warranty: '5 years' } },
  { id: 9, name: 'External Hard Drive 2TB', category: 'storage', price: 74.99, oldPrice: 89.99, rating: 4.7, reviews: 1120, featured: true,
    image: 'images/products/external-hard-drive.jpg', desc: 'Portable 2TB hard drive with USB 3.0 and automatic backup software.', specs: { Capacity: '2TB', Interface: 'USB 3.0', Size: '2.5 inch', Warranty: '3 years' } },
  { id: 10, name: 'Portable SSD 1TB', category: 'storage', price: 99.99, oldPrice: 129.99, rating: 4.9, reviews: 654, featured: true,
    image: 'images/products/portable-ssd.jpg', desc: 'Shock-resistant pocket-sized SSD with blazing fast speeds and USB-C.', specs: { Capacity: '1TB', Interface: 'USB-C 3.2 Gen 2', 'Read speed': '1050MB/s', Warranty: '3 years' } },
  { id: 11, name: 'Internal NVMe SSD 512GB', category: 'storage', price: 54.99, rating: 4.7, reviews: 432,
    image: 'images/products/nvme-ssd.jpg', desc: 'M.2 NVMe SSD to speed up boot times and game loading.', specs: { Capacity: '512GB', Interface: 'PCIe Gen3 x4', 'Read speed': '3500MB/s', Warranty: '5 years' } },
  { id: 12, name: 'Wireless Headphones', category: 'headphones', price: 69.99, oldPrice: 89.99, rating: 4.5, reviews: 388, featured: true,
    image: 'images/products/wireless-headphones.jpg', desc: 'Over-ear Bluetooth headphones with deep bass and 40-hour battery.', specs: { Connectivity: 'Bluetooth 5.2', Battery: '40 hours', Microphone: 'Built-in', Warranty: '1 year' } },
  { id: 13, name: 'Noise Cancelling Headphones', category: 'headphones', price: 129.99, oldPrice: 169.99, rating: 4.8, reviews: 267,
    image: 'images/products/anc-headphones.jpg', desc: 'Active noise cancellation with premium sound and all-day comfort.', specs: { ANC: 'Hybrid active', Battery: '35 hours', Connectivity: 'Bluetooth 5.3', Warranty: '2 years' } },
  { id: 14, name: 'Bluetooth Speaker', category: 'speakers', price: 39.99, rating: 4.4, reviews: 512,
    image: 'images/products/bluetooth-speaker.jpg', desc: 'Waterproof portable speaker with powerful 360° sound.', specs: { Output: '20W', Battery: '12 hours', Rating: 'IPX7', Warranty: '1 year' } },
  { id: 15, name: 'Desktop Soundbar', category: 'speakers', price: 49.99, oldPrice: 64.99, rating: 4.3, reviews: 121,
    image: 'images/products/soundbar.jpg', desc: 'Slim USB-powered soundbar with clear stereo audio for PC and TV.', specs: { Output: '10W', Connectivity: 'USB + 3.5mm + Bluetooth', Lighting: 'RGB', Warranty: '1 year' } },
  { id: 16, name: 'USB-C Fast Charging Cable 2m', category: 'cables', price: 9.99, rating: 4.5, reviews: 940,
    image: 'images/products/usb-c-cable.jpg', desc: 'Durable braided nylon USB-C cable supporting 100W fast charging.', specs: { Length: '2m', Power: 'Up to 100W', Data: '480Mbps', Warranty: '1 year' } },
  { id: 17, name: 'HDMI 2.1 Cable 8K', category: 'cables', price: 14.99, rating: 4.6, reviews: 276,
    image: 'images/products/hdmi-cable.jpg', desc: 'Ultra high-speed HDMI cable for 8K 60Hz and 4K 120Hz.', specs: { Length: '2m', Bandwidth: '48Gbps', Resolution: '8K / 4K120', Warranty: '1 year' } },
  { id: 18, name: '65W GaN Fast Charger', category: 'cables', price: 34.99, oldPrice: 44.99, rating: 4.8, reviews: 410, featured: true,
    image: 'images/products/gan-charger.jpg', desc: 'Compact 3-port GaN charger for laptops, phones and tablets.', specs: { Power: '65W', Ports: '2 x USB-C + 1 x USB-A', Protocol: 'PD 3.0 / QC 4+', Warranty: '18 months' } },
  { id: 19, name: 'Full HD Webcam', category: 'webcams', price: 44.99, rating: 4.4, reviews: 233,
    image: 'images/products/hd-webcam.jpg', desc: '1080p webcam with autofocus, dual microphones and privacy cover.', specs: { Resolution: '1080p 30fps', Microphone: 'Dual stereo', Connection: 'USB-A', Warranty: '1 year' } },
  { id: 20, name: '4K Streaming Webcam', category: 'webcams', price: 89.99, oldPrice: 119.99, rating: 4.7, reviews: 87,
    image: 'images/products/4k-webcam.jpg', desc: 'Professional 4K webcam with HDR, auto light correction and wide angle lens.', specs: { Resolution: '4K 30fps', 'Field of view': '90°', HDR: 'Yes', Warranty: '2 years' } },
  { id: 21, name: 'Gaming Headset 7.1', category: 'gaming', price: 49.99, oldPrice: 69.99, rating: 4.6, reviews: 602, featured: true,
    image: 'images/products/gaming-headset.jpg', desc: '7.1 surround sound headset with noise-cancelling mic and RGB.', specs: { Audio: '7.1 virtual surround', Connection: 'USB', Microphone: 'Detachable', Warranty: '1 year' } },
  { id: 22, name: 'Gaming Mousepad XL', category: 'gaming', price: 17.99, rating: 4.5, reviews: 350,
    image: 'images/products/mousepad-xl.jpg', desc: 'Extended anti-slip mousepad with stitched edges and smooth surface.', specs: { Size: '900 x 400 mm', Thickness: '4mm', Base: 'Anti-slip rubber', Warranty: '6 months' } },
  { id: 23, name: 'Wireless Game Controller', category: 'gaming', price: 29.99, oldPrice: 39.99, rating: 4.4, reviews: 199,
    image: 'images/products/game-controller.jpg', desc: 'Ergonomic controller with dual vibration for PC and mobile.', specs: { Connectivity: 'Bluetooth + 2.4GHz', Battery: '20 hours', Compatibility: 'PC / Android', Warranty: '1 year' } }
];
/* ============================ END OF EDIT AREA ============================ */
