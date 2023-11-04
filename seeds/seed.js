const mysql = require("mysql2");
const axios = require("axios");

const connection = mysql.createConnection(process.env.DATABASE_URL);

function getImageURL() {
  return axios
    .get(
      "https://api.unsplash.com/search/photos?page=1&query=food&client_id=8p0HjQTAGay4jtPLaIu4_yBP516C1Iuj4K8J1fc9k-Q"
    )

    .then(function (res) {
      const imageURL = res.data.results[0].urls.regular;
      const imageURL2 = res.data.results[1].urls.regular;
      const imageURL3 = res.data.results[2].urls.regular;
      const imageURL4 = res.data.results[3].urls.regular;
      const imageURL5 = res.data.results[4].urls.regular;
      return { imageURL, imageURL2, imageURL3, imageURL4, imageURL5 };
    })
    .catch(function (error) {
      console.error("Error retrieving imageURL:", error);
      throw error;
    });
}

exports.seed = function () {
  connection
    .query("DELETE FROM articles")
    .then(function () {
      return getImageURL().then(function ({
        imageURL,
        imageURL2,
        imageURL3,
        imageURL4,
        imageURL5,
      }) {
        return connection.query(
          "INSERT INTO articles (id, introduction, content, title, image, author) VALUES (?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?)",
          [
            {
              id: "2922c286-16cd-4d43-ab98-c79f698aeab0",
              introduction:
                "Finding time to prepare a nutritious meal on a busy weeknight can be challenging. However, with these ten easy and healthy recipes, you can enjoy delicious meals without spending hours in the kitchen. Let's dive into these quick and wholesome options!",
              content:
                "1. Quick Quinoa Stir-Fry: A colorful medley of veggies, protein-rich quinoa, and flavorful spices come together in this satisfying stir-fry. \n2. One-Pot Chicken and Vegetable Pasta: This recipe combines tender chicken, fresh vegetables, and pasta, all cooked in a single pot for minimal cleanup. \n3. Sheet Pan Salmon with Roasted Vegetables: A simple yet elegant dish where salmon fillets and vibrant veggies are roasted together to create a flavorful and nutritious dinner. \n4. Veggie Packed Turkey Meatballs: These turkey meatballs are loaded with veggies, making them a nutritious and kid-friendly option. Serve with whole grain pasta or on a bed of zucchini noodles. \n5. Mexican Stuffed Sweet Potatoes: Sweet potatoes are roasted and then filled with a hearty mixture of black beans, corn, avocado, and spices, creating a satisfying and healthy meal. \n6. Quickest Chickpea Curry: This flavorful curry comes together in no time, thanks to the use of canned chickpeas and a blend of aromatic spices. \n7. Caprese Chicken Skillet: Juicy chicken breasts are cooked in a skillet with tomato slices, fresh mozzarella, and basil, resulting in a delightful Italian-inspired dish. \n8. Greek Salad Wraps: A refreshing and light option, these wraps feature crisp lettuce, juicy tomatoes, cucumbers, tangy feta cheese, and olives, all drizzled with a zesty dressing. \n9. Turkey Taco Lettuce Wraps: Swap the tortillas for lettuce cups in these delicious and healthier turkey taco wraps, topped with your favorite taco fixings. \n10. Berry Quinoa Parfait: A nutritious and delightful dessert or breakfast option, this parfait layers cooked quinoa, Greek yogurt, and fresh berries for a burst of flavors.",
              title: "10 Easy and Healthy Recipes for Busy Weeknights",
              image: imageURL,
              author: "Emma Collins",
            },
            {
              id: "5bf7bd6c-2b16-4129-bddc-9d37ff8539e9",
              introduction:
                "Embark on a gastronomic adventure as we explore ten unique and flavorful dishes from around the world. From spicy curries to aromatic stir-fries, these recipes will transport your taste buds to distant lands. Let's embark on this culinary journey together!",
              content:
                "1. Thai Green Curry: Experience the vibrant flavors of Thailand with this aromatic and spicy green curry, featuring a harmonious blend of coconut milk, Thai basil, and lemongrass. \n2. Mexican Chicken Enchiladas: Indulge in the rich and comforting flavors of Mexico with these cheesy and saucy chicken enchiladas, topped with tangy salsa and creamy guacamole. \n3. Indian Butter Chicken: Delve into the aromatic world of Indian cuisine with this velvety and buttery chicken dish, simmered in a tomato-based sauce enriched with spices and cream. \n4. Japanese Sushi Rolls: Get hands-on with sushi making as you craft your own rolls filled with fresh fish, crunchy vegetables, and seasoned rice, then slice them into bite-sized pieces. \n5. Moroccan Lamb Tagine: Transport your senses to the bustling markets of Morocco with this slow-cooked lamb tagine, flavored with a blend of spices, dried fruits, and preserved lemons. \n6. Italian Margherita Pizza: Simple yet divine, this classic pizza features a thin crust topped with tangy tomato sauce, fresh mozzarella cheese, and fragrant basil leaves. \n7.Chinese Kung Pao Chicken: Savor the bold and spicy flavors of Sichuan cuisine with this stir-fried chicken dish, featuring peanuts, chili peppers, and a savory sauce. \n8. Spanish Paella: Enjoy the flavors of the Mediterranean with this vibrant and flavorful rice dish, packed with succulent seafood, juicy chicken, and aromatic saffron. \n9. Lebanese Falafel: Experience the Middle Eastern delight of crispy falafel, made from chickpeas, herbs, and spices, and served in warm pita bread with creamy tahini sauce. \n10. French Crème Brûlée: End your culinary journey on a sweet note with this classic French dessert, featuring a rich and silky custard topped with a caramelized sugar crust. ",
              title:
                "Exploring Exotic Flavors: A Culinary Journey Around the World",
              image: imageURL2,
              author: "Benjamin Hayes",
            },
            {
              id: "90ac3319-70d1-4a51-b91d-ba6c2464408c",
              introduction:
                "In recent years, plant-based diets have gained popularity due to their health and environmental benefits. Whether you're a vegan, vegetarian, or simply looking to incorporate more plant-based meals into your routine, these ten delicious recipes will delight your taste buds and nourish your body. Let's explore the world of plant-based cuisine together!",
              content:
                "1. Lentil and Vegetable Curry: This hearty curry combines protein-packed lentils, a medley of colorful vegetables, and aromatic spices, creating a satisfying and flavorful dish. \n2. Chickpea and Spinach Stew: Get a dose of iron and fiber with this comforting stew, featuring tender chickpeas, leafy spinach, and a blend of spices in a tomato-based broth. \n3. Mushroom and Walnut Bolognese: Replace traditional meat with a mixture of mushrooms and walnuts in this rich and savory bolognese sauce, perfect for serving over pasta or zucchini noodles. \n4. Sweet Potato and Black Bean Tacos: These vibrant and flavorful tacos feature roasted sweet potatoes, seasoned black beans, and an array of fresh toppings for a satisfying meal. \n5. Cauliflower 'Steak' with Chimichurri Sauce: Transform cauliflower into a delicious and hearty main course by roasting thick slices until tender and serving them with a tangy chimichurri sauce. \n6. Quinoa-Stuffed Bell Peppers: Colorful bell peppers are filled with a mixture of fluffy quinoa, sautéed vegetables, and herbs, then baked to perfection for a nutritious and satisfying meal. \n7.Tofu Stir-Fry with Ginger and Garlic: Discover the versatility of tofu in this flavorful stir-fry, featuring marinated tofu cubes, crisp vegetables, and a zesty ginger-garlic sauce. \n8. Vegan Spinach and Artichoke Dip: Indulge in a creamy and cheesy dip without the dairy. This vegan version combines cashews, spinach, and artichokes for a flavorful and guilt-free appetizer. \n9.Zucchini Noodle Pad Thai: Swap traditional noodles with zucchini noodles (zoodles) in this lighter version of the classic Pad Thai dish, packed with veggies and topped with peanuts. \n10. Jackfruit Pulled 'Pork' Sandwiches: Experience the meaty texture and flavor of jackfruit in this vegan twist on pulled pork. Shredded jackfruit is simmered in a tangy barbecue sauce and served on a bun.",
              title:
                "The Rise of Plant-Based Diets: Delicious Alternatives for Vegans and Vegetarians",
              image: imageURL5,
              author: "Olivia Ramirez",
            },
            {
              id: "bfc9bea7-66f1-44e9-879b-4d363a888eb4",
              introduction:
                "Sometimes, you just need a little indulgence in the form of a delicious dessert. From rich chocolate treats to creamy delights, these ten recipes will satisfy your sweet tooth and leave you craving more. Get ready to indulge in these decadent delights!",
              content:
                "1. Molten Lava Cakes: Dive into pure chocolate bliss with theseX individual cakes featuring a warm and gooey chocolate center that oozes out when you take a bite. \n2. Classic New York Cheesecake: Indulge in the velvety smooth texture and rich flavor of a classic New York-style cheesecake, topped with your choice of fruit compote or chocolate ganache. \n3. Salted Caramel Brownies: Experience the perfect combination of sweet and salty with these fudge brownies swirled with luscious salted caramel sauce and topped with a sprinkle of sea salt. \n4. Tiramisu: Transport yourself to Italy with this elegant and creamy dessert featuring layers of espresso-soaked ladyfingers and mascarpone cream, dusted with cocoa powder. \n5. Triple Chocolate Mousse Cake: Dive into layers of dark, milk, and white chocolate mousse in this show-stopping cake that is sure to impress any chocolate lover. \n6. Crème-Brûlée: Indulge in the velvety custard topped with a crackling caramelized sugar crust in this classic French dessert that never goes out of style. \n7. Peanut Butter Cupcakes: Enjoy the perfect blend of sweet and nutty with these moist peanut butter cupcakes topped with creamy peanut butter frosting and a mini peanut butter cup. \n8. Red Velvet Whoopie Pies: Delight in these soft and cakey sandwich cookies filled with a luscious cream cheese filling, perfect for a special treat or gift. \n9. Chocolate Dipped Strawberries: Elevate the simplicity of fresh strawberries by dipping them in melted chocolate and adding toppings like crushed nuts or shredded coconut. \n10. Banoffee Pie: Indulge in this heavenly combination of bananas, toffee, and whipped cream atop a buttery biscuit crust in this irresistible British dessert.",
              title:
                "Indulgent Desserts: Satisfy Your Sweet Tooth with These Decadent Delights",
              image: imageURL4,
              author: "Bob Mitchell",
            },
            {
              id: "89898957-04ba-4bd0-9f5c-a7aea7447963",
              introduction:
                "Farm-to-table cuisine emphasizes the use of locally sourced ingredients to create fresh, flavorful, and sustainable meals. In this article, we will explore the benefits of supporting local farmers and share ten delicious recipes that showcase the best of farm-to-table cooking. Let's dive in!",
              content:
                "1. Farmers Market Salad: Celebrate the bounty of the season with a vibrant salad featuring fresh greens, colorful vegetables, and a tangy homemade vinaigrette made with locally produced ingredients. \n2. Grilled Vegetable Skewers: Create a medley of grilled vegetables sourced from local farms, such as bell peppers, zucchini, eggplant, and cherry tomatoes, for a healthy and flavorful side dish. \n3. Herb-Roasted Chicken with Local Potatoes: Enjoy a succulent roasted chicken paired with locally grown potatoes seasoned with fragrant herbs, creating a comforting and wholesome meal. \n4. Fresh Herb Pesto Pasta: Elevate your pasta dish with a homemade pesto sauce made from locally grown herbs, garlic, nuts, and olive oil, resulting in a burst of flavors. \n5. Seasonal Fruit Crumble: Delight in a warm and comforting fruit crumble made with locally harvested fruits, such as apples, berries, or stone fruits, topped with a crispy and buttery oat topping. \n6. Tomato and Basil Bruschetta: Experience the vibrant flavors of summer with a classic bruschetta featuring ripe local tomatoes, fresh basil, garlic, and a drizzle of extra-virgin olive oil. \n7. Local Fish Tacos: Support sustainable seafood practices by using locally caught fish in these flavorful tacos, topped with a zesty slaw and homemade salsa. \n8. Roasted Beet and Goat Cheese Salad: Celebrate the earthy sweetness of roasted beets by pairing them with tangy goat cheese, toasted nuts, and a bed of mixed greens sourced from local farms. \n9. Heirloom Tomato Caprese Skewers: Experience the full flavor of heirloom tomatoes in these bite-sized skewers, alternating with creamy mozzarella and fresh basil leaves, drizzled with balsamic glaze. \n10. Honey-Lavender Ice Cream: Savor a scoop of homemade ice cream infused with local honey and fragrant lavender, a delightful combination that highlights the beauty of natural ingredients.",
              title:
                "Farm-to-Table Cuisine: Exploring the Benefits of Locally Sourced Ingredients",
              image: imageURL3,
              author: "Sophia Parker",
            },
          ]
        );
      });
    })

    .catch(function (error) {
      console.error(error);
    });
};

exports.seed = function () {
  connection.query("DELETE FROM user");

  return connection.query(
    "INSERT INTO user (id, user_name, user_password, user_email, user_password, phone_number),VALUES (?, ?, ?, ?, ?, ?)",
    [
      {
        id: "0bae167c-42e5-11ee-be56-0242ac120002",
        user_name: "test",
        user_email: "test@email.com",
        uswer_password: "1234",
        phone_number: "905-456-3214",
      },
    ]
  );
};
