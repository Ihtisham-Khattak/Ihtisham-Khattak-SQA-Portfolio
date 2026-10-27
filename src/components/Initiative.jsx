import { Reveal } from "./Reveal";
import banner1200 from "../assets/banner-keep-earth-green-1200.webp";
import banner2400 from "../assets/banner-keep-earth-green-2400.webp";
import "./Initiative.css";

const Initiative = ({ data }) => (
  <section className="initiative" aria-label="Keep the Earth green">
    <div className="container">
      <Reveal as="figure" className="initiative-banner">
        <img
          src={banner2400}
          srcSet={`${banner1200} 1200w, ${banner2400} 2400w`}
          sizes="(min-width: 1200px) 1200px, 100vw"
          width="2400"
          height="600"
          alt={data.alt}
          loading="lazy"
          decoding="async"
        />
      </Reveal>
    </div>
  </section>
);

export default Initiative;
