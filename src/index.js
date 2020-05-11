import "./style/expensesStyle.scss"
import "./style/categoryStyle.scss"
import "./style/globalStyle.scss"
import "./style/mainStyle.scss"

import Navigo from "navigo";
import Handlebars from "handlebars";
import "./js/main";

import mainHtml from "./partials/main.html";
import categoryHtml from "./partials/category.html";
import expensesHtml from "./partials/expenses.html";

import { categories } from "./data.js";

let root = null;
let useHash = true;
let router = new Navigo(root, useHash);
console.log(categories);

// Handlebars.registerHelper('listItem', function (from, to, context, options){
//   var item = "";
//   for (var i = from, j = to; i < j; i++) {
//       item = item + options.fn(context[i]);
//   }
//   return item;
// });

const initializeLocalStorage = () => {
  let cats = JSON.parse(localStorage.getItem("data"));
  if (!cats) {
    localStorage.setItem("data", JSON.stringify(categories));
    cats = categories;
  }
  return cats;
};

router
  .on("/", () => {
    const currentCategories = initializeLocalStorage();
    let totalExpenses = 0;
    currentCategories.map(c => (totalExpenses += c.totalCost));

    const mainTemplate = Handlebars.compile(mainHtml);
    const mainTemplateRendered = mainTemplate({
      categories: currentCategories,
      totalExpenses
    });
    document.querySelector(".js-app").innerHTML = mainTemplateRendered;
  })
  .on("/category/:id", ({ id }) => {
    const data = JSON.parse(localStorage.getItem("data"));
    const selected = data.find(category => category.id === id);

    const categoryTemplate = Handlebars.compile(categoryHtml);
    const categoryTemplateRendered = categoryTemplate({
      category: selected
    });

    document.querySelector(".js-app").innerHTML = categoryTemplateRendered;
  })
  .on("/expenses/add/:id", ({ id }) => {
    const history = JSON.parse(localStorage.getItem(`${id}History`));

    const expensesTemplate = Handlebars.compile(expensesHtml);
    const expensesTemplateRendered = expensesTemplate({
      history,
      id     
    });
  
    document.querySelector(".js-app").innerHTML = expensesTemplateRendered;
  })
  .resolve();
