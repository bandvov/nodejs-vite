import React, { useEffect, useState } from "react";
import { favoriteCar, getCars, searchCar } from "../../../api/cars.js";
import CarCard from "../CarCard/CarCard.js";
import "./Catalog.css";
import { useAuth } from "../../../providers/AuthProvider.js";

const Catalog = () => {
  const { user } = useAuth();
  const [cars, setCars] = useState([]);
  const [filters, setFilters] = useState({
    color: "",
    make: "",
    category: "",
  });

  useEffect(() => {
    const fetchCars = async () => {
      const carsFromServer = await getCars();
      setCars(carsFromServer);
    };

    fetchCars();
  }, []);

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (value) => {
    searchCar(value).then((res) => {
      setCars(res);
    });
  };

  return (
    <div className="Catalog">
      <div className="body">
        <div className="mainheading">Наші автомобілі</div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log({ e });
            handleSubmit(filters);
          }}
        >
          <div className="filters">
            <div className="filters__elem">
              <div className="h2">Колір</div>
              <select
                className="dropdown"
                name="color"
                value={filters.color}
                onChange={handleChange}
              >
                <option value="">Виберіть колір</option>
                <option value="Black">Чорний</option>
                <option value="White">Білий</option>
                <option value="Gray">Сірий</option>
                <option value="Blue">Синій</option>
                <option value="Red">Червоний</option>
              </select>
            </div>
            <div className="filters__elem">
              <div className="h2">Марка</div>
              <select
                className="dropdown"
                name="make"
                value={filters.make}
                onChange={handleChange}
              >
                <option value="">Виберіть марку</option>
                <option value="BMW">BMW</option>
                <option value="Toyota">Toyota</option>
                <option value="Tesla">Tesla</option>
                <option value="Mercedes">Mercedes</option>
                <option value="Honda">Honda</option>
              </select>
            </div>
            <div className="filters__elem">
              <div className="h2">Категорія</div>
              <select
                className="dropdown"
                name="category"
                value={filters.category}
                onChange={handleChange}
              >
                <option value="">Виберіть категорію</option>
                <option value="SUV">SUV</option>
                <option value="Sedan">Sedan</option>
                <option value="Coupe">Coupe</option>
                <option value="Van">Van</option>
                <option value="E-class">E-class</option>
              </select>
            </div>
            <div className="filters__elem">
              <button type="submit" name="filter">
                Застосувати фільтри
              </button>
            </div>
          </div>
        </form>
        <div className="blue-line"></div>
        <div className="body__content">
          <div className="content__body__elem">
            {cars?.map((car) => {
              const isFavorited = car.favorite_user_ids?.includes(+user?.id);
              return (
                <CarCard
                  favoriteHandler={async () =>
                    favoriteCar(
                      { car_id: car.id, user_id: user?.id },
                      isFavorited ? "DELETE" : "POST"
                    )
                  }
                  isFavorited={isFavorited}
                  key={car.id}
                  car={car}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalog;
