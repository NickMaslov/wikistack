const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack',{logging: false});


const Page = db.define('page', {
  title: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: true,
      },
      allowNull: false
  },
  urlTitle: {
      type: Sequelize.STRING,
      allowNull: false,
      // validate: {
      //   isUrl: true
      // }
  },
  content: {
      type: Sequelize.TEXT,
      allowNull: false
  },
  status: {
      type: Sequelize.ENUM('open', 'closed')
  },
  date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  }
  }, 
  { 
    getterMethods: {
      route() {
        return '/wiki/' + this.urlTitle
      }
    }
    
  }
//   ,
// {
//   hooks: {
//     beforeValidate: (page, options) => {
//      page.urlTitle = generateUrlTitle(page.title);
//     }
//   }
// }
);

Page.hook('beforeValidate', (page)=>{

      page.urlTitle = generateUrlTitle(page.title)

})

const User = db.define('user', {
  name: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: true,
      },
      allowNull: false
  },
  email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
  }
});

Page.belongsTo(User, { as: 'author' });

function generateUrlTitle (title) {
  console.log("hello hook")
  if (title) {
    // Removes all non-alphanumeric characters from title
    // And make whitespace underscore
    return title.replace(/\s+/g, '_').replace(/\W/g, '');
  } else {
    // Generates random 5 letter string
    return Math.random().toString(36).substring(2, 7);
  }
}

module.exports = {
Page: Page,
User: User,
db: db,
generateUrlTitle : generateUrlTitle
};
