import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/category/categorySlice";
import { HoverEffect } from "../ui/CardHover";
import { useEffect } from "react";

const CategorySection = () => {
  const dispatch = useDispatch();

  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCategories({ limit: 6 }));
  }, [dispatch]);

  return (
    <div className="container mx-auto py-20">
      <h2 className="text-3xl md:text-4xl text-center font-bold text-gray-900 dark:text-white mb-15">
        دسته بندی ها
      </h2>
      <div className="">
        <HoverEffect items={categories} className={"text-white"} />
      </div>
    </div>
  );
};

export default CategorySection;
