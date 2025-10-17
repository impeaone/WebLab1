let dishesFirst = [
    {
        keyword: 'gaspacho',
        name: 'Гаспачо',
        price: 195,
        category: 'soup',
        count: '350 г',
        image: 'https://i.pinimg.com/736x/02/41/fa/0241facf66794e38da927a9caa62b459.jpg',
        kind: 'veg'
    },
    {
        keyword: 'mushroom',
        name: 'Грибной суп-пюре',
        price: 185,
        category: 'soup',
        count: '330 г',
        image: 'https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_6840580854d4be1a51d40a4e_68405821b0625b5b96d602cd/scale_1200',
        kind: 'veg'
    },
    {
        keyword: 'norway',
        name: 'Норвежский суп',
        price: 270,
        category: 'soup',
        count: '330 г',
        image: 'https://i.kafushka.ru/i/9b/a8/9ba813beca6fa3d7bf624f83facf69e0.jpg',
        kind: 'fish'
    },
    {
        keyword: 'ramen',
        name: 'Рамен',
        price: 375,
        category: 'soup',
        count: '425 г',
        image: 'https://scdn.chibbis.ru/live/products/3c5c5a2e132c78f5fa3c2c83ea36141f.jpeg',
        kind: 'meat'
    },
    {
        keyword: 'tom-yam',
        name: 'Том ям с креветками',
        price: 650,
        category: 'soup',
        count: '500 г',
        image: 'https://avatars.mds.yandex.net/i?id=278a5dbca9b1e254c216601026b504192e391741-5484118-images-thumbs&n=13',
        kind: 'fish'
    },
    {
        keyword: 'chicken-soup',
        name: 'Куриный суп',
        price: 330,
        category: 'soup',
        count: '350 г',
        image: 'https://avatars.mds.yandex.net/i?id=48c21ea9ba46ffb2c5406bf7b5c6b555e1c7147f-5250085-images-thumbs&n=13',
        kind: 'meat'
    },

    {
        keyword: 'potato',
        name: 'Жареная картошка с грибами',
        price: 150,
        category: 'main',
        count: '250 г',
        image: 'https://fb.ru/misc/i/gallery/2/3460546.jpg',
        kind: 'veg'
    },
    {
        keyword: 'lazanya',
        name: 'Лазанья',
        price: 385,
        category: 'main',
        count: '310 г',
        image: 'https://i.pinimg.com/originals/17/29/e8/1729e876bef1dd8157f00445e4f8e217.png',
        kind: 'meat'
    },
    {
        keyword: 'kotleti',
        name: 'Котлеты из курицы с картофельным пюре',
        price: 220,
        category: 'main',
        count: '280 г',
        image: 'https://yandex-images.clstorage.net/X5D2Ul200/5ff30ekXBx/7HWj4pmea8yx8SDo8yx4dOkj3PnWZ46-p1toYU6Wke-69jUiTAm0uphRjH9Xn-Ya9BLBewTPhDejtwc31otqdvx24K7e33eU7Lc2vPsvfXb0fp_oyj2K470ZND9YzMznuvUPHz9wl4PkNvcMKLWpTa1ExTAb2MNez_QwaPDmEmTTXoHxibgJzrv6Z_fdEV1c_krTyfUwluK6dTMzbqXht8KJGBUmZbOG2QvMADu9vUSydvAdVuLRRP-tIkPTyxJU8EaQ8IKfNMC55FrS5Tt5fMdmwd7kJ7DXuHkQGkOf9LjTljYwM3Oxm8IX6B0XqYBcpHLWHXjE-0DfriNm9tAqSOlenOylhS_VpvVr9PYPWl_rX_T39Cyj2bRnGhdQo_GI5ZA9BjldtLfGNfc9MLC2QZB3xgV72NVG264SV8zGJlftQ7TzmaIG06fbS__5M1tW1E77yPcJpembbiEjQ7bpm_ihGQcxQbes6RTIJTWVhUqaQ-E8e-zYe_-fCEf70jxW9XqN8oKqNs6Wzl3B-ztsVOdA_8bJOqrTol4nBkuv17XPtwUwNHmUr9Mo8gMSiIJut2_wD0z781ffsCde9uoseeNypNO9tTbMgeF999kkWHP2T_fo7COC6rdFORF-nNiO6aEJByR-jbDnAPYlKKm-aYpZ1TJm48VU6rkzT93MDHzDc7vog7go8IH0ZOvZOE1-4G7a3tU_jPKqSiULR7nUo_-HGww4QIaazRDNHhGNhVuMRfI9VPLudvqsPHfD0g5R1XyD6aCZI8Sk4UHZwQVkVsJ0wvTKHq7OmH40NlyQ0LDunBsDGESis_o02BoPuIdAlEzBOUDN7kb4kBd-2PwvetxdgemElC3Fofpt3f0IVFPVQdT77zyAzqdvOSRBvuCR-6U-FjlBuJbhBs4fC7ChZqxV8C5f4_RH85sCY-HOMFL2QITNjaEO76P1X8XYO35w4kbCytI-heWbTi00Qpk',
        kind: 'meat'
    },
    {
        keyword: 'fish-cutlet',
        name: 'Рыбная котлета с рисом и спаржей',
        price: 320,
        category: 'main',
        count: '270 г',
        image: 'https://avatars.mds.yandex.net/i?id=6f37610e4234d42cae2d0e00c1a9a6254e4d9737-10803542-images-thumbs&n=13',
        kind: 'fish'
    },
    {
        keyword: 'pizza',
        name: 'Пицца Маргарита',
        price: 450,
        category: 'main',
        count: '470 г',
        image: 'https://avatars.mds.yandex.net/i?id=abcaa2cbd931f69cc6ac5d082a91f53ffd69e601-10653027-images-thumbs&n=13',
        kind: 'veg'
    },
    {
        keyword: 'pasta-shrimp',
        name: 'Паста с креветками',
        price: 340,
        category: 'main',
        count: '280 г',
        image: 'https://avatars.mds.yandex.net/i?id=31a96e770162653fab05f158665049baca1a4cb2-5231826-images-thumbs&n=13',
        kind: 'fish'
    },

    {
        keyword: 'korean-salad',
        name: 'Корейский салат с овощами и яйцом',
        price: 330,
        category: 'salad',
        count: '250 г',
        image: 'https://yandex-images.clstorage.net/DZ4j8E266/1dfd5cgxo/7Y3CiJrN3Bsxv2IQNHKtfS-jvY_cUjjsAO-l8_v26eh6rYCe9lhcG-jDp2IIuWTNFThaRpQkVGXDNFkuJ6JlQbXAp4Gr1NRyXP5KbWRSoWkn1siDmCNQ_XSGrIPfo4CMQq2tBhORjfJIdjvTyAXR_EkJFxOgRUV4WoA4--LH2TB1eUIAGg2ND9GjD2D8Ksll8w4Ra8QjuFW4ExxvC3J8maO45dprfYH-LPan81iZJcR1jWefKbm9gPohLONmcylo7WECXD69Ufcdk88g6NaZ1ffSzXfc20ytLGNwD3Nu_In7_L3Wx5nR7gRSsxdg-aUoWf0jRwHNveiiqWjPSjt93P2ZVpzSLYGDIffvhNRGua0bFjXr5OdcKVyj3MsjRqSZ7_h5crMFxf7wDifj9Ik5QCnpA2PZYaHkRskcizKHJfDVeWKAFpn1y7nzjxicMh3xN-4VD_C3VOGsB4i7__Jc6XNQLUqnOWHOqJpHZ3S1zVxBOQ9LWW3VyJq5XNOSs_XgKe0GuPo59YvRE88UcPK1IXdGpTOQGxzBcNsoIwNKILkrKKGuL41Z0jBumzP08b00-QUPP0mZifBy3ZADVmclmCnpVvgCMRmPXb-TTHTyUanv3iFfaGu0CTgHvNfbenwxOwzZqmfZnbJsajufBCXJVG01v6_ZKTXwvqUcj-L3uVx1EVrcPjUZA1mL62QIvn2J78o1U4gPuPFk33Crx0Zo4QPsvfbTPbVC4JJP-1Dt7QSZLc9bWTE5EBoxgHciP1FQRbX-DH4VzRtRt4PIxHqN3VsCObMM65CNlN-ICze-6BkvbPU-45Gh3rBWYztIbQ2I_X1Hl2XRRYw65Tz7qqc1UPXlVmyqzRmf4TNrDGAyIYkTdtnT8AcoRTQfsAPjwvzVc3y1kssNTWrwepMXSKnhWFlVu5fhXQEIKl3oixbzIfBZ8ZbcUmWVewErq4RgTlXdp4bVe4jHUE30H7AbQ9aM',
        kind: 'veg'
    },
    {
        keyword: 'tuna-salad',
        name: 'Салат с тунцом',
        price: 480,
        category: 'salad',
        count: '250 г',
        image: 'https://avatars.mds.yandex.net/i?id=23ce8ec4134f54a368c081c6ed328a2c7e4f7d4b-4350902-images-thumbs&n=13',
        kind: 'fish'
    },
    {
        keyword: 'caesar',
        name: 'Цезарь с цыпленком',
        price: 370,
        category: 'salad',
        count: '220 г',
        image: 'https://avatars.mds.yandex.net/i?id=d6a80deaf8fe475cbe1b471b840a9aaa76fdc407-9181478-images-thumbs&n=13',
        kind: 'meat'
    },
    {
        keyword: 'fries-caesar',
        name: 'Картофель фри с соусом Цезарь',
        price: 280,
        category: 'salad',
        count: '235 г',
        image: 'https://avatars.mds.yandex.net/i?id=950ba5280bc1918d3d7757ad0f77b136ef44e12a-5233195-images-thumbs&n=13',
        kind: 'veg'
    },
    {
        keyword: 'caprese',
        name: 'Капрезе с моцареллой',
        price: 350,
        category: 'salad',
        count: '235 г',
        image: 'https://avatars.mds.yandex.net/i?id=6e9aa3c0bce753ee743a52a5aac3a50c0dc870e4-5873671-images-thumbs&n=13',
        kind: 'veg'
    },
    {
        keyword: 'fries-ketchup',
        name: 'Картофель фри с кетчупом',
        price: 260,
        category: 'salad',
        count: '235 г',
        image: 'https://avatars.mds.yandex.net/i?id=c67baf349f5d71aff3a96de20fb9b79c584809fc-5531667-images-thumbs&n=13',
        kind: 'veg'
    },
    {
        keyword: 'orange',
        name: 'Апельсиновый сок',
        price: 120,
        category: 'drink',
        count: '300 мл',
        image: 'https://i.pinimg.com/originals/76/ba/be/76babebd4643daa5cfe37451cbaa28f3.jpg',
        kind: 'cold'
    },
    {
        keyword: 'apple',
        name: 'Яблочный сок',
        price: 90,
        category: 'drink',
        count: '300 мл',
        image: 'https://www.zastavki.com/pictures/1024x1024/2018Food___Drinks_Apple_juice_in_a_glass_on_a_table_with_fresh_apples_on_a_gray_background_123147_31.jpg',
        kind: 'cold'
    },
    {
        keyword: 'carrot',
        name: 'Морковный сок',
        price: 110,
        category: 'drink',
        count: '300 мл',
        image: 'https://avatars.mds.yandex.net/i?id=14b243c79f11411a18c07ba9945907f64cb79721-4599018-images-thumbs&n=13',
        kind: 'cold'
    },
    {
        keyword: 'cappuccino',
        name: 'Капучино',
        price: 180,
        category: 'drink',
        count: '300 мл',
        image: 'https://avatars.mds.yandex.net/i?id=73b97f5c0896228a4395fc4283960cccef8b3124-5236166-images-thumbs&n=13',
        kind: 'hot'
    },
    {
        keyword: 'green-tea',
        name: 'Зеленый чай',
        price: 100,
        category: 'drink',
        count: '300 мл',
        image: 'https://avatars.mds.yandex.net/i?id=ce47b28a421fd55861590e407e92d84681dcc950-8331156-images-thumbs&n=13',
        kind: 'hot'
    },
    {
        keyword: 'black-tea',
        name: 'Черный чай',
        price: 90,
        category: 'drink',
        count: '300 мл',
        image: 'https://avatars.mds.yandex.net/i?id=463dde34a0697ea800c7be93204913755db73d29-9095503-images-thumbs&n=13',
        kind: 'hot'
    },
    {
        keyword: 'baklava',
        name: 'Пахлава',
        price: 220,
        category: 'dessert',
        count: '300 г',
        image: 'https://avatars.mds.yandex.net/i?id=c3db2240e97e8439dc6ce71c62933d56fa6f7305-5669589-images-thumbs&n=13',
        kind: 'small'
    },
    {
        keyword: 'cheesecake',
        name: 'Чизкейк',
        price: 240,
        category: 'dessert',
        count: '125 г',
        image: 'https://avatars.mds.yandex.net/i?id=694c52543d08e5140dd05d773b4733818a8efaec-5293409-images-thumbs&n=13',
        kind: 'small'
    },
    {
        keyword: 'chocolate-cheesecake',
        name: 'Шоколадный чизкейк',
        price: 260,
        category: 'dessert',
        count: '125 г',
        image: 'https://yandex-images.clstorage.net/DZ4j8E266/1dfd5cgxo/7Y3CiJrN3Bsxv2IQNHKtfS-jvY_cUjjsAO-l8r_64fR-iaivonEcOq2a5j4QsXmRDGECQqA4WHyydHRuM7M8GaHNz4Wr4NRGZOpyZWRSoWkn1siDmCNQ_XSGrIPfo4CMQq2tBhORjfJIdjvTyAXR_EkJFxOgRUV4WoA4--LH2TB1eUIAGg2ND9GjD2D8Ksll8w4Ra8QjuFW4ExxvC3J8maO45dprfYH-LPan81iZJcR1jWefKbm9gPohLONmcylo7WECXD69Ufcdk88g6NaZ1ffSzXfc20ytLGNwD3Nu_In7_L3Wx5nR7gRSsxdg-aUoWf0jRwHNveiiqWjPSjt93P2ZVpzSLYGDIffvhNRGua0bFjXr5OdcKVyj3MsjRqSZ7_h5crMFxf7wDifj9Ik5QCnpA2PZYaHkRskcizKHJfDVeWKAFpn1y7nzjxicMh3xN-4VD_C3VOGsB4i7__Jc6XNQLUqnOWHOqJpHZ3S1zVxBOQ9LWW3VyJq5XNOSs_XgKe0GuPo59YvRE88UcPK1IXdGpTOQGxzBcNsoIwNKILkrKKGuL41Z0jBumzP08b00-QUPP0mZifBy3ZADVmclmCnpVvgCMRmPXb-TTHTyUanv3iFfaGu0CTgHvNfbenwxOwzZqmfZnbJsajufBCXJVG01v6_ZKTXwvqUcj-L3uVx1EVrcPjUZA1mL62QIvn2J78o1U4gPuPFk33Crx0Zo4QPsvfbTPbVC4JJP-1Dt7QSZLc9bWTE5EBoxgHciP1FQRbX-DH4VzRtRt4PIxHqN3VsCObMM65CNlN-ICze-6BkvbPU-45Gh3rBWYztIbQ2I_X1Hl2XRRYw65Tz7qqc1UPXlVmyqzRmf4TNrDGAyIYkTdtnT8AcoRTQfsAPjwvzVc3y1kssNTWrwepMXSKnhWFlVu5fhXQEIKl3oixbzIfBZ8ZbcUmWVewErq4RgTlXdp4bVe4jHUE30H7AbQ9aM',
        kind: 'small'
    },
    {
        keyword: 'chocolate-cake',
        name: 'Шоколадный торт',
        price: 270,
        category: 'dessert',
        count: '140 г',
        image: 'https://avatars.mds.yandex.net/i?id=d0887dd8b420445e167a11ec1854e4813ff53a1f-4576532-images-thumbs&n=13',
        kind: 'medium'
    },
    {
        keyword: 'donuts-3',
        name: 'Пончики (3 штуки)',
        price: 410,
        category: 'dessert',
        count: '350 г',
        image: 'https://avatars.mds.yandex.net/i?id=a8dada8caa114d517d95e9edbc6f1e75e85e82e5-4145971-images-thumbs&n=13',
        kind: 'medium'
    },
    {
        keyword: 'donuts-6',
        name: 'Пончики (6 штук)',
        price: 650,
        category: 'dessert',
        count: '700 г',
        image: 'https://avatars.mds.yandex.net/i?id=eca6475a1c1269ad7ef39f64a8f1c8cb71b8ed7a-9226866-images-thumbs&n=13',
        kind: 'large'
    }
];

const dishes = dishesFirst.sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
});