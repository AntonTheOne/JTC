import './Hero.css';

function Hero() {
  return (
    <section className="hero" style={{ backgroundImage: `url('/img/band-hero.jpg')` }}>
      <div className="hero-content">
        <h1>JTC Coverband</h1>
        <p>Vi spelar det du älskar</p>
      </div>
    </section>
  );
}

export default Hero;