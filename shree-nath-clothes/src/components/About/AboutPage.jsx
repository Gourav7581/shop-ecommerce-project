import { ShieldCheck, HeartHandshake, Flower2, ArrowRight } from 'lucide-react';
import aboutHero from '../../../public/assets/images/AboutUs/about_us_hero_hd.png?url';
import darshanImage from '../../../public/assets/images/AboutUs/laddu_gopal_hd.png?url';
import './AboutPage.css';

const VALUES = [
  { title: 'Premium Quality', description: 'Carefully chosen fabrics and fine detailing', icon: ShieldCheck },
  { title: 'Handcrafted', description: 'Created with care, love and devotion', icon: HeartHandshake },
  { title: 'Devotional Trust', description: 'Thoughtfully made for your Thakur Ji', icon: Flower2 }
];

export default function AboutPage({ onExploreShop }) {
  return (
    <div className="snc-about-page">
      <section className="snc-about-hero" aria-labelledby="snc-about-title">
        <h1 className="snc-about-accessible" id="snc-about-title">About Shree Nath Clothes — With devotion, for your Thakur Ji</h1>
        <img src={aboutHero} alt="Laddu Gopal in a golden temple altar with peacock feathers and ornamental gold corners" className="snc-about-hero__img" fetchPriority="high" decoding="async" />
      </section>
      <div className="snc-about-container">
        <section className="snc-about-story" aria-labelledby="snc-about-story-title">
          <div className="snc-about-story-intro"><span className="snc-about-eyebrow">A LITTLE ABOUT OUR SEVA</span><h2 id="snc-about-story-title">Our Story</h2><img src="/assets/decor/ornamental-divider.svg" alt="" aria-hidden="true" /></div>
          <div className="snc-about-story-body">
            <p>Shree Nath Clothes is a humble initiative to bring the divine beauty of Laddu Gopal to every home. We specialize in designer poshak, mukut and shringar accessories, crafted with love and devotion.</p>
            <p>Our mission is to provide high-quality, handcrafted products that enhance the beauty and devotion of your Thakur Ji.</p>
          </div>
        </section>
        <section className="snc-about-values" aria-label="Our core values">
          {VALUES.map(({ title, description, icon: Icon }) => <div className="snc-about-value" key={title}><span className="snc-about-value-icon"><Icon size={26} strokeWidth={1.4} /></span><h3>{title}</h3><p>{description}</p></div>)}
        </section>
        <figure className="snc-about-darshan">
          <img src={darshanImage} alt="Laddu Gopal wearing red and gold poshak on a royal velvet singhasan" loading="lazy" decoding="async" />
          <figcaption><blockquote>“Seva hi hamaro dharm hai”</blockquote><img src="/assets/decor/ornamental-divider.svg" alt="" aria-hidden="true" /></figcaption>
        </figure>
        {onExploreShop && <div className="snc-about-cta"><button onClick={onExploreShop}>Explore Our Collection <ArrowRight size={17} strokeWidth={1.5} aria-hidden="true" /></button></div>}
      </div>
      <img className="snc-about-temple" src="/assets/decor/temple-line-art.svg" alt="" aria-hidden="true" />
    </div>
  );
}
