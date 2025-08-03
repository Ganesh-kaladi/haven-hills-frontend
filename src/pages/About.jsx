import image from "../assets/logo.png";

function About() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 mt-8 w-[90%] mx-auto">
      <div className="lg:col-span-1 text-gray-400 p-5 text-center">
        <h4 className="text-xl text-amber-500">what we provide?</h4>
        <p className="text-lg">
          Welcome to Haven Hills, where luxury meets nature in perfect harmony.
          Nestled in the heart of serene mountain landscapes, we offer premium
          rooms designed to provide unmatched comfort, breathtaking views, and
          an unforgettable escape from the chaos of city life. Whether you're
          here to relax, explore, or simply unwind, our rooms are thoughtfully
          crafted to bring you peace and privacy, surrounded by the beauty of
          nature.
        </p>
        <p className="text-lg mt-10">
          At Haven Hills, every stay is a curated experience. Wake up to
          panoramic mountain views, enjoy fresh air from your private balcony,
          and take advantage of our world-class amenities — from plush interiors
          to personalized service. Whether you're planning a romantic getaway, a
          work retreat, or a solo adventure, Haven Hills promises a unique blend
          of modern luxury and natural tranquility.
        </p>
      </div>
      <div className="lg:col-span-1 p-5 mx-auto">
        <img src={image} alt="" />
      </div>
    </div>
  );
}

export default About;
