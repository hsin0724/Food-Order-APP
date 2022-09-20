import React, { useEffect, useState } from "react";
import MealItem from "./MealItem/MealItem";
import Card from "../UI/Card";
import classes from "../Styles/AvailableMeals.module.css";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoading(true);

      const respone = await fetch(
        "https://food-order-app-f9bd3-default-rtdb.firebaseio.com/meals.json"
      );

      debugger;
      if (!respone.ok) {
        debugger;
        throw new Error("Something went wrong!");
      }

      const responeData = await respone.json();

      const loadedMeals = [];

      // Change object to array
      for (const key in responeData) {
        loadedMeals.push({
          id: key,
          name: responeData[key].name,
          description: responeData[key].description,
          price: responeData[key].price,
        });
      }

      setMeals(loadedMeals);
      setIsLoading(false);
    };

    fetchMeals().catch((error) => {
      debugger;
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={classes.mealsLoading}>
        <Card>
          <p>Loading...</p>
        </Card>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.mealsError}>
        <Card>
          <p>{httpError}</p>
        </Card>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
