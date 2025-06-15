import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Image
              src="https://myawsbucket79403825.s3.eu-north-1.amazonaws.com/sherry1.png"
              alt="Sherry's Restaurant"
              width={200}
              height={200}
              className="mx-auto rounded-full shadow-lg"
            />
          </div>

          <h1 className="text-4xl font-bold mb-4">
            Welcome to Sherrys Sabor Sabroso
          </h1>
          <p className="text-xl mb-8 text-gray-600 dark:text-gray-300">
            Share your dining experience and help us serve you better
          </p>

          <div className="grid gap-6 md:grid-cols-2 max-w-2xl mx-auto">
            <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-colors">
              <h2 className="text-2xl font-semibold mb-3">
                Rate Your Experience
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Tell us how we did! Rate your meal and service from 1 to 5
                stars.
              </p>
              <a
                href="/api/rating-app"
                className="inline-block px-6 py-3 bg-foreground text-background rounded-full hover:bg-[#383838] dark:hover:bg-[#ccc] transition-colors"
              >
                Rate Now
              </a>
            </div>

            <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-colors">
              <h2 className="text-2xl font-semibold mb-3">
                Update Your Review
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Changed your mind? Update your previous rating or feedback.
              </p>
              <div className="flex gap-4 justify-center">
                <a
                  href="/api/rating-app"
                  className="inline-block px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  Update Feedback
                </a>
                <a
                  href="/api/rating-app"
                  className="inline-block px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  Update Rating
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="p-8 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto text-center text-gray-600 dark:text-gray-400">
          <p>© 2024 Sabor Sabroso. All rights reserved.</p>
          <p className="mt-2">Your feedback helps us improve!</p>
        </div>
      </footer>
    </div>
  );
}
