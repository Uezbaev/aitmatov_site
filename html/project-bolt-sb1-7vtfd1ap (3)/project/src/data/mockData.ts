// Agricultural Regions
// src/data/mockData.ts

export const agriculturalRegions = [
  {
    id: 1,
    name: "Чуйская область",
    coordinates: [42.8700, 74.6000],
    mainCrops: ["Пшеница", "Ячмень", "Картофель"],
    production: 820000,
    area: 1200000,
    growingSeason: "Апрель – Октябрь",
    climate: "Умеренно-континентальный",
    soilType: "Суглинистые",
    irrigationSystem: "Канальная и капельная",
    challenges: ["Засуха", "Износ ирригационной инфраструктуры"],
    yearlyProduction: [
      { year: "2021", production: 750000 },
      { year: "2022", production: 780000 },
      { year: "2023", production: 790000 },
      { year: "2024", production: 820000 },
    ],
    cropDistribution: [
      { name: "Пшеница", value: 40 },
      { name: "Ячмень", value: 30 },
      { name: "Картофель", value: 20 },
      { name: "Прочее", value: 10 },
    ]
  },
  {
    id: 2,
    name: "Ошская область",
    coordinates: [40.5300, 72.8000],
    mainCrops: ["Кукуруза", "Овощи", "Фрукты"],
    production: 760000,
    area: 1100000,
    growingSeason: "Март – Ноябрь",
    climate: "Субтропический",
    soilType: "Суглинистые и песчаные",
    irrigationSystem: "Канальная",
    challenges: ["Наводнения", "Засоление почв"],
    yearlyProduction: [
      { year: "2021", production: 700000 },
      { year: "2022", production: 720000 },
      { year: "2023", production: 740000 },
      { year: "2024", production: 760000 },
    ],
    cropDistribution: [
      { name: "Кукуруза", value: 35 },
      { name: "Овощи", value: 30 },
      { name: "Фрукты", value: 25 },
      { name: "Прочее", value: 10 },
    ]
  },
  {
    id: 3,
    name: "Джалал-Абадская область",
    coordinates: [41.1200, 72.4500],
    mainCrops: ["Пшеница", "Фрукты", "Овощи"],
    production: 680000,
    area: 1000000,
    growingSeason: "Март – Октябрь",
    climate: "Умеренно-континентальный",
    soilType: "Суглинистые",
    irrigationSystem: "Канальная",
    challenges: ["Эрозия почв", "Недостаток техники"],
    yearlyProduction: [
      { year: "2021", production: 640000 },
      { year: "2022", production: 660000 },
      { year: "2023", production: 670000 },
      { year: "2024", production: 680000 },
    ],
    cropDistribution: [
      { name: "Пшеница", value: 40 },
      { name: "Фрукты", value: 30 },
      { name: "Овощи", value: 20 },
      { name: "Прочее", value: 10 },
    ]
  },
  {
    id: 4,
    name: "Иссык-Кульская область",
    coordinates: [42.4800, 78.3900],
    mainCrops: ["Картофель", "Фрукты", "Овощи"],
    production: 620000,
    area: 900000,
    growingSeason: "Май – Сентябрь",
    climate: "Горный",
    soilType: "Супесчаные и суглинистые",
    irrigationSystem: "Канальная",
    challenges: ["Короткий вегетационный период", "Заморозки"],
    yearlyProduction: [
      { year: "2021", production: 580000 },
      { year: "2022", production: 600000 },
      { year: "2023", production: 610000 },
      { year: "2024", production: 620000 },
    ],
    cropDistribution: [
      { name: "Картофель", value: 50 },
      { name: "Фрукты", value: 30 },
      { name: "Овощи", value: 15 },
      { name: "Прочее", value: 5 },
    ]
  },
  {
    id: 5,
    name: "Нарынская область",
    coordinates: [41.4300, 75.9900],
    mainCrops: ["Ячмень", "Пшеница", "Картофель"],
    production: 580000,
    area: 850000,
    growingSeason: "Май – Сентябрь",
    climate: "Горный",
    soilType: "Суглинистые",
    irrigationSystem: "Канальная",
    challenges: ["Короткий вегетационный период", "Ограниченные водные ресурсы"],
    yearlyProduction: [
      { year: "2021", production: 540000 },
      { year: "2022", production: 550000 },
      { year: "2023", production: 570000 },
      { year: "2024", production: 580000 },
    ],
    cropDistribution: [
      { name: "Ячмень", value: 45 },
      { name: "Пшеница", value: 35 },
      { name: "Картофель", value: 15 },
      { name: "Прочее", value: 5 },
    ]
  },
  {
    id: 6,
    name: "Таласская область",
    coordinates: [42.5200, 72.2400],
    mainCrops: ["Пшеница", "Ячмень", "Картофель"],
    production: 600000,
    area: 880000,
    growingSeason: "Апрель – Октябрь",
    climate: "Умеренно-континентальный",
    soilType: "Суглинистые",
    irrigationSystem: "Канальная",
    challenges: ["Засуха", "Эрозия почв"],
    yearlyProduction: [
      { year: "2021", production: 560000 },
      { year: "2022", production: 580000 },
      { year: "2023", production: 590000 },
      { year: "2024", production: 600000 },
    ],
    cropDistribution: [
      { name: "Пшеница", value: 50 },
      { name: "Ячмень", value: 30 },
      { name: "Картофель", value: 15 },
      { name: "Прочее", value: 5 },
    ]
  },
  {
    id: 7,
    name: "Баткенская область",
    coordinates: [40.0600, 70.8200],
    mainCrops: ["Фрукты", "Овощи", "Кукуруза"],
    production: 550000,
    area: 800000,
    growingSeason: "Март – Ноябрь",
    climate: "Субтропический",
    soilType: "Суглинистые и песчаные",
    irrigationSystem: "Канальная",
    challenges: ["Засуха", "Пограничные конфликты"],
    yearlyProduction: [
      { year: "2021", production: 510000 },
      { year: "2022", production: 530000 },
      { year: "2023", production: 540000 },
      { year: "2024", production: 550000 },
    ],
    cropDistribution: [
      { name: "Фрукты", value: 40 },
      { name: "Овощи", value: 30 },
      { name: "Кукуруза", value: 20 },
      { name: "Прочее", value: 10 },
    ]
  }
];
// Crop production trend over time
export const cropProductionTrend = [
  { name: "2017", Corn: 9200, Soybeans: 1500, Wheat: 12800, Cotton: 4100 },
  { name: "2018", Corn: 9500, Soybeans: 1650, Wheat: 13050, Cotton: 4200 },
  { name: "2019", Corn: 9800, Soybeans: 1700, Wheat: 13500, Cotton: 4300 },
  { name: "2020", Corn: 10000, Soybeans: 1800, Wheat: 13800, Cotton: 4400 },
  { name: "2021", Corn: 10400, Soybeans: 1900, Wheat: 14000, Cotton: 4500 },
  { name: "2022", Corn: 10750, Soybeans: 1950, Wheat: 14200, Cotton: 4600 },
  { name: "2023", Corn: 11000, Soybeans: 2000, Wheat: 14500, Cotton: 4700 },
];

// Regional crop comparison 
export const regionalCropComparison = [
  { name: "Чуйская область", Fruits: 6000, Vegetables: 8500, Nuts: 1200, Grains: 10500 },
  { name: "Ошская область", Fruits: 7500, Vegetables: 9300, Nuts: 1400, Grains: 8800 },
  { name: "Джалал-Абадская область", Fruits: 7000, Vegetables: 9100, Nuts: 1350, Grains: 9200 },
  { name: "Иссык-Кульская область", Fruits: 7800, Vegetables: 8700, Nuts: 1100, Grains: 7000 },
  { name: "Баткенская область", Fruits: 8000, Vegetables: 7500, Nuts: 1000, Grains: 6500 },
];

// Weather impact on yields
export const weatherImpactData = [
  { name: "Янв", Temperature: -5, Rainfall: 30, YieldIndex: 40 },
  { name: "Фев", Temperature: 0, Rainfall: 35, YieldIndex: 45 },
  { name: "Мар", Temperature: 7, Rainfall: 60, YieldIndex: 60 },
  { name: "Апр", Temperature: 15, Rainfall: 80, YieldIndex: 80 },
  { name: "Май", Temperature: 20, Rainfall: 90, YieldIndex: 95 },
  { name: "Июн", Temperature: 25, Rainfall: 70, YieldIndex: 100 },
  { name: "Июл", Temperature: 28, Rainfall: 50, YieldIndex: 90 },
  { name: "Авг", Temperature: 27, Rainfall: 40, YieldIndex: 85 },
  { name: "Сен", Temperature: 22, Rainfall: 60, YieldIndex: 80 },
  { name: "Окт", Temperature: 14, Rainfall: 70, YieldIndex: 70 },
  { name: "Ноя", Temperature: 5, Rainfall: 55, YieldIndex: 55 },
  { name: "Дек", Temperature: -2, Rainfall: 40, YieldIndex: 45 },
];

// National crop distribution
export const nationalCropDistribution = [
  { name: "Пшеница", value: 35 },
  { name: "Кукуруза", value: 20 },
  { name: "Картофель", value: 15 },
  { name: "Фрукты", value: 10 },
  { name: "Овощи", value: 10 },
  { name: "Орехи", value: 5 },
  { name: "Хлопок", value: 5 },
];

// Dashboard statistics
export const dashboardStats = [
  {
    id: 1,
    title: "Общий объем производства",
    value: "9.8 млн. тонн",
    change: 2.4,
    description: "Общее производство сельскохозяйственной продукции по стране",
  },
  {
    id: 2,
    title: "Площадь посевов",
    value: "1.35 млн. гектаров",
    change: 1.2,
    description: "Общая площадь земель под сельхозкультурами",
  },
  {
    id: 3,
    title: "Эффективность урожая",
    value: "72%",
    change: 3.5,
    description: "Средняя урожайность относительно потенциальной",
  },
  {
    id: 4,
    title: "Потребление воды",
    value: "1.1 млрд. куб. м",
    change: -1.8,
    description: "Годовое потребление воды для сельского хозяйства",
  },
];