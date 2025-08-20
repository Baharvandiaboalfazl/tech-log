const ArticleCardSkeleton = () => (
  <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md overflow-hidden p-4">
    <div className="bg-gray-300 dark:bg-gray-700 h-48 w-full rounded-lg animate-pulse"></div>
    <div className="p-4">
      <div className="h-6 w-3/4 mb-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
      <div className="h-4 w-full mb-2 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
      <div className="h-4 w-5/6 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
    </div>
  </div>
);

const AuthorPageSkeleton = () => {
  return (
    <div className="bg-slate-100 dark:bg-slate-900 min-h-screen">
      <div className="container mx-auto p-4 md:p-6">
        <main>
          <section className="relative bg-gradient-to-r from-blue-800 via-indigo-400 to-blue-800 rounded-t-2xl p-6 md:p-8 text-center mt-20">
            <div className="relative flex flex-col items-center -mt-20">
              <div className="w-32 h-32 rounded-full bg-gray-300 dark:bg-gray-700 border-4 border-white dark:border-slate-800 shadow-lg animate-pulse"></div>

              <div className="h-9 w-48 mt-4 bg-gray-300 dark:bg-gray-600 rounded-lg animate-pulse"></div>

              <div className="h-5 w-32 mt-2 bg-gray-400 dark:bg-gray-700 rounded-lg animate-pulse"></div>

              <div className="mt-4 max-w-2xl mx-auto w-full space-y-2">
                <div className="h-4 w-full bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                <div className="h-4 w-5/6 mx-auto bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
              </div>

              <div className="flex justify-center gap-4 mt-5">
                <div className="w-10 h-10 rounded-full bg-gray-400 dark:bg-gray-700 animate-pulse"></div>
                <div className="w-10 h-10 rounded-full bg-gray-400 dark:bg-gray-700 animate-pulse"></div>
                <div className="w-10 h-10 rounded-full bg-gray-400 dark:bg-gray-700 animate-pulse"></div>
              </div>
            </div>
          </section>

          <section className="mt-12">
            <div className="h-8 w-72 mb-6 bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ArticleCardSkeleton />
              <ArticleCardSkeleton />
              <ArticleCardSkeleton />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default AuthorPageSkeleton;
