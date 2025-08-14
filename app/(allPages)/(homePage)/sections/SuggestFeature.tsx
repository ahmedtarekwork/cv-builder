import Image from "next/image";

const SuggestFeature = () => {
  return (
    <div id="suggest-feature" className="homepage-section">
      <h2 className="title">Suggest a new feature</h2>

      <p className="text-center font-bold text-slate-700">
        contact us on this platforms and tell us your suggestion or idea that
        improves our service.
      </p>

      <ul className="flex items-center flex-wrap gap-4 justify-center mt-6">
        <li>
          <a
            style={{
              backgroundImage: `linear-gradient( 135deg, hsl(127.2, 83.1%, 25.5%), hsl(var(--secondary)))`,
            }}
            href="https://wa.me/201284059026"
            target="_blank"
            rel="noreferrer"
            className="contact-card"
          >
            <Image
              className="invert"
              src="/whatsapp.svg"
              alt="whatsapp icon"
              width={40}
              height={40}
            />
          </a>
        </li>

        <li>
          <a
            style={{
              backgroundImage: `linear-gradient( 135deg, hsl(0, 80.2%, 19.8%), hsl(0, 100%, 43.9%))`,
            }}
            href="mailto:ahmedtareka777@gmail.com"
            target="_blank"
            rel="noreferrer"
            className="contact-card"
          >
            <Image
              className="invert"
              src="/email.svg"
              alt="email icon"
              width={40}
              height={40}
            />
          </a>
        </li>

        <li>
          <a
            href="https://www.linkedin.com/in/ahmed-tarek-099618209"
            target="_blank"
            rel="noreferrer"
            className="contact-card"
            style={{
              backgroundImage: `linear-gradient(135deg, rgb(10, 45, 91), rgb(0, 98, 224))`,
            }}
          >
            <Image
              className="invert"
              src="/linkedin.png"
              alt="linkedin icon"
              width={40}
              height={40}
            />
          </a>
        </li>
      </ul>
    </div>
  );
};
export default SuggestFeature;
