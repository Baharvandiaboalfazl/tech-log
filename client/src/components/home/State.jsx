import { useSelector } from "react-redux";
import { FiClipboard, FiEye, FiList, FiUserCheck } from "react-icons/fi";

const State = () => {
  const { totalUsers } = useSelector((state) => state.user);
  const { totalPosts } = useSelector((state) => state.post);
  const { categories } = useSelector((state) => state.category);

  const stats = [
    { label: "مقاله منتشر شده", value: totalPosts, icon: FiClipboard },
    { label: "کاربر فعال", value: totalUsers, icon: FiUserCheck },
    { label: "بازدید ماهانه", value: "2500", icon: FiEye },
    { label: "دسته‌بندی ها", value: categories.length, icon: FiList },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={stat.label} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-cyan-600 to-indigo-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-300">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default State;
