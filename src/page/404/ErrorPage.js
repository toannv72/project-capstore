function ErrorPage() {
  const bgImageStyle = {
    background:
      "url('https://colorlib.com/etc/404/colorlib-error-404-10/img/bg.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  };
  return (
    <section className="relative page_404 bg-white py-10 font-serif">
      <div className="flex justify-center">
        <div className="w-full max-w-3xl text-center">
          <div className="relative">
            <h1
              className=" text-80 font-montserrat font-black bg-no-repeat bg-center"
              style={bgImageStyle}
            >
              Oops!
            </h1>
          </div>
          <img
            src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
            alt="404 background"
            className="w-full h-82 object-cover"
          />

          <div className="mb-6">
            <h3 className="text-6xl">Looks like you are lost</h3>
            <p className="font-sans">
              The page you are looking for is not available!
            </p>
          </div>
          <a
            href="/"
            className="text-white px-4 py-2 bg-green-500 hover:bg-green-600 inline-block"
          >
            Go to Home
          </a>
        </div>
      </div>
    </section>
  );
}

export default ErrorPage;
