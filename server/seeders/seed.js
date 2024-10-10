const db = require('../config/connection');
const { User, Event } = require('../models');
const userSeeds = require('./userSeeds.json');

const events = [
  { title: 'Book-a-Palooza', date: '10-17-2024', description: 'A book lover dream with authors, book signings, book vendors, kid zone, and contests.', image: '/bookpalooza.png', price: 20.00 },
  { title: 'Earring Making Workshop', date: '10-23-2024', description: 'Come join us for a fun afternoon of crafting your own unique earrings.', image: '/earringclass.png', price: 40.00 },
  { title: 'Halloween on the Rooftop', date: '10-31-2024', description: 'Trick or Treat! Put on your best costumes and do not miss the hauntingly good time we have planned for you.', image: '/halloween.png', price: 25.00 },
  { title: 'Fall Festival', date: '11-17-2024', description: 'Get ready to embrace the amazing beauty of fall. Enjoy a fun-filled evening with something to do fo all ages.', image: '/fallfestival.png', price: 10.00 },
  { title: 'Thanksgiving Meal Pick-up', date: '11-28-2024', description: 'Take the stress out of Thanksgiving. Making a Thanksgiving meal takes a lot of prep and work! Thanksgiving meals for 1-10 people available for pre-order! Meal pick-ups will be available on Thanksgiving Day.', image: '/Thanksgiving.png', price: 50.00 },
  { title: 'Brunch With Santa', date: '12-21-2024', description: 'A fun-filled brunch with Santa where kids can enjoy a delicious brunch and festive activities in honor of Christmas time!', image: '/santa.png', price: 30.00},
];

db.once('open', async () => {
  try {
    await User.deleteMany({});
    await User.create(userSeeds);
    await Event.deleteMany({});
    await Event.create(events);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
  process.exit(0);
});
