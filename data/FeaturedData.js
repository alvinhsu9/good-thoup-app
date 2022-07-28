export function getFeaturedData(){
    return FeaturedData;
}

export function getFeaturedDataById(id){

    return FeaturedData.find(item => item.id === id);    
}

export const FeaturedData = [
    {
      id: '001',
      title: 'Beef Bourguignon',
      imageUri: 'https://www.themealdb.com/images/media/meals/vtqxtu1511784197.jpg',
    },
    {
        id: '002',
        title: 'Apple & Blackberry Crumble',
        imageUri: 'https://www.themealdb.com/images/media/meals/xvsurr1511719182.jpg',
    },
    {
      id: '003',
      title: 'Croatian Bean Stew',
      imageUri: 'https://www.themealdb.com/images/media/meals/tnwy8m1628770384.jpg',
    },
    {
      id: '004',
      title: 'Mushroom soup with buckwheat',
      imageUri: 'https://www.themealdb.com/images/media/meals/1ngcbf1628770793.jpg',
    },
    {
      id: '005',
      title: 'Grilled Mac and Cheese Sandwich',
      imageUri: 'https://www.themealdb.com/images/media/meals/xutquv1505330523.jpg',
    },
    {
      id: '006',
      title: 'Rigatoni with fennel sausage sauce',
      imageUri: 'https://www.themealdb.com/images/media/meals/qtqvys1468573168.jpg',
    },
];
