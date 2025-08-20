import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ContainerScroll } from "../ui/ContainerScrollAnimation";
import SlideSkeleton from "../skeleton/SlideSkeleton";
import { useDispatch, useSelector } from "react-redux";
import { fetchRandomPosts } from "../../redux/post/postSlice";

const Slides = () => {
  const dispatch = useDispatch();

  const { randomPosts, loading } = useSelector((state) => state.post);
  const [currentIndex, setCurrentIndex] = useState(null);

  useEffect(() => {
    dispatch(fetchRandomPosts());
  }, [dispatch]);

  useEffect(() => {
    if (randomPosts.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % randomPosts.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [randomPosts]);

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  if (loading) {
    return <SlideSkeleton />;
  }

  return (
    <ContainerScroll>
      <div className="relative w-full max-h-11/12 h-full overflow-hidden rounded-2xl shadow-2xl">
        {randomPosts.map((post, index) => (
          <div
            key={post._id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              currentIndex === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <Link
              to={`/post/${post.slug}`}
              className="absolute bottom-0 left-0 p-8 text-white w-full"
            >
              <h2 className="text-3xl font-bold mb-2 hover:underline">
                {post.title}
              </h2>
            </Link>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-3 mt-7">
        {randomPosts.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full cursor-pointer transition-colors duration-300 ${
              currentIndex === index
                ? "bg-white"
                : "bg-white/50 hover:bg-white/75"
            }`}
          ></button>
        ))}
      </div>
    </ContainerScroll>
  );
};

export default Slides;
