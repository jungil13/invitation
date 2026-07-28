import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { supabase, GalleryPhoto } from "../../lib/supabase";

const DEFAULT_PHOTOS = [
  {
    url: "https://scontent.fceb6-4.fna.fbcdn.net/v/t1.15752-9/751124645_27202828222733788_3982278696220130260_n.jpg?stp=dst-jpg_tt6&cstp=mx1023x1537&ctp=s1023x1537&_nc_cat=109&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeELtKamVHqVPynXNmQoWLMvl9v0i8XNpqeX2_SLxc2mp79YN6ocVhx4BXZFST2M_-MlpOUQUChaSsgLPUaKlLlp&_nc_ohc=1UgaLwoGLpUQ7kNvwEsi1r_&_nc_oc=AdqdouHUPSk91PKbia1U0qQDgYBqLgfnkNd7IZJvqDg85ltBPXG7FoEwjqJ6Z8E_U7E&_nc_zt=23&_nc_ht=scontent.fceb6-4.fna&_nc_ss=7b2a8&oh=03_Q7cD5wHJp0eRCeQMDrGLmJK4GyYqihZnOodPJLEuzcj1Q3ZTrQ&oe=6A8FA7F0",
    alt: "Young woman in elegant blue ballgown with tiara",
  },
  {
    url: "https://scontent.fceb6-4.fna.fbcdn.net/v/t1.15752-9/753204407_1001736439519629_3129899837514425152_n.jpg?stp=dst-jpg_tt6&cstp=mx1023x1537&ctp=s1023x1537&_nc_cat=111&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeGREIXMDTebADpSIUEoTRVSXor4W9iXAxteivhb2JcDGwJkL7KFIt57UMcIIf_IITPSenysL03fQlHDQFyMCjT2&_nc_ohc=mAGI_jgGYrMQ7kNvwHK_H9S&_nc_oc=AdoP6IgBJQ2xZ7ZCGcqyADGoFXWP-lTZO1Jj9CWSQE8gYXv6m4ifQHeynQ8HJyZvzsA&_nc_zt=23&_nc_ht=scontent.fceb6-4.fna&_nc_ss=7b2a8&oh=03_Q7cD5wG3Nl7PwF_MEGob8gBbh_CGiM1H5KG9o81O4uDf-QmhUA&oe=6A8F86DB",
    alt: "Woman in light blue ballgown holding a bouquet",
  },
  {
    url:"https://scontent.fceb6-3.fna.fbcdn.net/v/t1.15752-9/747624989_3201850113346370_2406600321061629938_n.jpg?stp=dst-jpg_tt6&cstp=mx1023x1537&ctp=s1023x1537&_nc_cat=106&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeFG81ApZ-JG1hEBGibKIIiDMrW_DFD-MEIytb8MUP4wQl6nOWh4SlQ_8KD_PPZa0fmEuv0A6OcGurZgWTQTvY7b&_nc_ohc=zkzzPs5FBXUQ7kNvwHaWPnV&_nc_oc=Ado0gNFJ9V0NALpBeX7n8BSI4y0LEyBE5Xtmnkcdak4hL1Aiwvw3zhPZhDbRQc_rRrs&_nc_zt=23&_nc_ht=scontent.fceb6-3.fna&_nc_ss=7b2a8&oh=03_Q7cD5wFcWg-KChXgDPU5iMkN9lQmCcPnJoitv7GaXAQIFvhsXQ&oe=6A8FA536",
    alt: "Woman in pink off-shoulder dress",
  },
  {
    url: "https://scontent.fceb2-2.fna.fbcdn.net/v/t1.15752-9/748175654_1768415424516957_3737807801274025996_n.jpg?stp=dst-jpg_tt6&cstp=mx1023x1537&ctp=s1023x1537&_nc_cat=110&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeHbJhvdpEpFwlh_ebd2Oi_dmEkcRVM_9S-YSRxFUz_1Lzc31TJ2SO0EnsUQIN9BcLBRfwt3gjZPGikcaIMWEHgy&_nc_ohc=ecMwWvyCLoYQ7kNvwEYU8rn&_nc_oc=Adr6jL-t-u2KY398wiaFKmqlMJflH9rilubk1MPX4Br7yzVq5XBHiDIMNJGVmS5QlvY&_nc_zt=23&_nc_ht=scontent.fceb2-2.fna&_nc_ss=7b2a8&oh=03_Q7cD5wHs_iDDvQslYuaLdWqwv7-DZA8gD5kBdn_SeZULqWP_Nw&oe=6A8F8DE7",
    alt: "Woman in dress holding a bouquet of flowers",
  },
  {
    url: "https://scontent.fceb2-2.fna.fbcdn.net/v/t1.15752-9/748465805_2216507662514892_2689172503818739716_n.jpg?stp=dst-jpg_tt6&cstp=mx1023x1537&ctp=s1023x1537&_nc_cat=102&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeFsFzIWiJU_5_zw8RBzsJhamd2WVsynJAqZ3ZZWzKckClfGzwvWrBBPDvdwoUOmOrXUhCTVwgxN3HwdFg8ZquCD&_nc_ohc=EdOXqB2OiqoQ7kNvwELO0Kx&_nc_oc=AdpSFVrJ19PnY3YIxOefKEmetjG9lPpI7CvwZdzuU0zajZ3ucbavkAYRkZTNPILoqU0&_nc_zt=23&_nc_ht=scontent.fceb2-2.fna&_nc_ss=7b2a8&oh=03_Q7cD5wF6rGxzmokpMIIzWPav0RnxOQbwK5F9YIjPP6WVWth_eg&oe=6A8F84AB",
    alt: "Young woman in blue ballgown holding a bouquet",
  },
  {
    url: "https://scontent.fceb2-2.fna.fbcdn.net/v/t1.15752-9/756629105_2425776051166888_8413336606704977630_n.png?stp=dst-png&cstp=mx1023x1537&ctp=s1023x1537&_nc_cat=107&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeHeHFBGG8poNxNUepbB3bYKz-h9WUgUshLP6H1ZSBSyEgIl4hPO1oxj2ZcdTbwlEoCAIeZH13BUbWhCtyhSzUqM&_nc_ohc=OjKk56cQoLQQ7kNvwEvdmfU&_nc_oc=AdqCAAs9mSOg9q2Dja9Bz9ymOtv8Qu65M6ZfMZccFaKp998EFvm2ETXypln4Wn_nIoI&_nc_zt=23&_nc_ht=scontent.fceb2-2.fna&_nc_ss=7b2a8&oh=03_Q7cD5wEyaRgiMxiz8ZxrrW6S3eQPmyWgYpwINfhVpt28RGph5w&oe=6A8F9A09",
    alt: "Young woman in blue ballgown inside church",
  },
  {
    url: "https://scontent.fceb6-3.fna.fbcdn.net/v/t1.15752-9/757880361_1640432154589954_5297347361170338870_n.png?stp=dst-png&cstp=mx1023x1537&ctp=s1023x1537&_nc_cat=104&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeGY5Ma89ZuHLqbrgKx5bo-csLdlxRi9ZUiwt2XFGL1lSBKPNM2YUJJGNMSK5e9KcHHWiJtz038uGg97X2m5JwlY&_nc_ohc=IG6cyiTPRx8Q7kNvwECLkIG&_nc_oc=AdoGyp_vdU2_0Q1vPfd2SB-AocgIE_kGPBE-1WlXi2OBgvyxKeHbkRMnWnA8-TDGKok&_nc_zt=23&_nc_ht=scontent.fceb6-3.fna&_nc_ss=7b2a8&oh=03_Q7cD5wGcRKTuKF1OcuAqqsNx7L1GTcJ5yDll3EH6xMzpcfqhhQ&oe=6A8FAA5A",
    alt: "Woman in elegant white dress",
  },
  {
    url: "https://scontent.fceb2-1.fna.fbcdn.net/v/t1.15752-9/757480007_27260388593662379_7057836417339409633_n.png?stp=dst-png&cstp=mx1023x1537&ctp=s1023x1537&_nc_cat=108&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeE4NFtkJsvYgUEtVj4_IkGHL_fGP2xDDTAv98Y_bEMNMAssoVoIMtDClwl65SLhhgFz-ZThdiMoZaslgdbXl9Pf&_nc_ohc=rqvUtVI-u3QQ7kNvwGLD5Rq&_nc_oc=AdoUKPcl6MgD2olAR616F_C_lA46dQ1gflL_ev0ZFf3p11mNDoblWenl4Ou--0tv_h8&_nc_zt=23&_nc_ht=scontent.fceb2-1.fna&_nc_ss=7b2a8&oh=03_Q7cD5wF9Y67-TuRgnMOP8omtO5NyGPTaO-3vYJQ4VNosXIanUA&oe=6A8FB4D6",
    alt: "Woman in white long sleeve dress portrait",
  },
  {
    url: "https://scontent.fceb6-3.fna.fbcdn.net/v/t1.15752-9/758853733_1541481081106936_927987468062934195_n.png?stp=dst-png&cstp=mx1024x1536&ctp=s1024x1536&_nc_cat=106&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeEDHJ2ep63KYjFomRv0A5WPlJUhlqTTeCeUlSGWpNN4JxL-2020gfHQ00htaaP7JoaeQGwxnrLDgH8-qH7jloyd&_nc_ohc=Dq1wTDqlIUUQ7kNvwFWFIGk&_nc_oc=Adp4evatTkS_-vOxQnvqFJorPXJcRR4O0YGNFfQILV8JIXEJuK-cNyIutBNnbfmdIIk&_nc_zt=23&_nc_ht=scontent.fceb6-3.fna&_nc_ss=7b2a8&oh=03_Q7cD5wEBJgMmttTEqJPcM_LBAlDwuX1LfS4GFftnnrUTat2lfQ&oe=6A8F9279",
    alt: "Woman celebrating with candles",
  },
  {
    url: "https://scontent.fceb2-2.fna.fbcdn.net/v/t1.15752-9/754935629_1363254881800414_4978228216729181909_n.png?stp=dst-png&cstp=mx1024x1536&ctp=s1024x1536&_nc_cat=107&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeFxk0S8EugmMcdf41mjUf3bgj0zH-6eS5CCPTMf7p5LkOora8CPpA2eW41xiya5RJmoODsNqFaju85v8K-l0k_k&_nc_ohc=fIMENHS8DMAQ7kNvwEEOHiU&_nc_oc=AdpYbTQEyCyURWNrMPDFwPBOybMMJQowyHw9fbS9xtYmPT_6yLXO98hdkMQbpAh0vVg&_nc_zt=23&_nc_ht=scontent.fceb2-2.fna&_nc_ss=7b2a8&oh=03_Q7cD5wFV2gqIKX0CiwgMH1QJwauHBM42z87j9nKcGHPfPmpMtw&oe=6A8F9B9B",
    alt: "Woman celebrating with candles",
  },
  {
    url: "https://scontent.fceb2-2.fna.fbcdn.net/v/t1.15752-9/756524088_1033844752966830_5486581426630296585_n.png?stp=dst-png&cstp=mx1024x1536&ctp=s1024x1536&_nc_cat=102&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeGZEldaSTwrxye4Vrw1cyAinrIwOUmVSbeesjA5SZVJt9HincyLmN9TlyW7gP96OqhtkDvNq6hvGrnsQz6ujTgn&_nc_ohc=jxZu3wj3I8YQ7kNvwGjYw-K&_nc_oc=AdqxpcIugtxJGOHd9AUDp-uaESbs7OVeV-4rnWqR09lBf0JrBqwVUxl5j1Z6LSSPu2Y&_nc_zt=23&_nc_ht=scontent.fceb2-2.fna&_nc_ss=7b2a8&oh=03_Q7cD5wHQ8skTg8Fz5egAcRfLvOfs47vYC5fN1ky2EMh0pWByoQ&oe=6A8F9F45",
    alt: "Woman celebrating with candles",
  },
  {
    url: "https://scontent.fceb6-4.fna.fbcdn.net/v/t1.15752-9/756332665_1932837797702759_5172683130849371507_n.png?stp=dst-png&cstp=mx1024x1536&ctp=s1024x1536&_nc_cat=111&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeGhO7oXv9CTzy7XgnDX9It2z7FWjGVvrPXPsVaMZW-s9Rl8c64_iogepNgbOWl3V6g3vcIcV8dGyFEsXeUxIYAE&_nc_ohc=GVM7vWTrShsQ7kNvwGUp88P&_nc_oc=AdqyU1T-j3n55nPdwgfBSZ7c1oQjNOTPBVEhTzaFH1SfcWpUomwcFQWFk5N-KpGkVKc&_nc_zt=23&_nc_ht=scontent.fceb6-4.fna&_nc_ss=7b2a8&oh=03_Q7cD5wF3FDFCcJQVJEgiTwjKc53xZd2ZmiwNYJeEUjquRjVDrQ&oe=6A8FBAC6",
    alt: "Woman celebrating with candles",
  },
  {
    url: "https://scontent.fceb6-4.fna.fbcdn.net/v/t1.15752-9/757920032_1756578572207375_4672574233052714268_n.png?stp=dst-png&cstp=mx1023x1537&ctp=s1023x1537&_nc_cat=111&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeF-xQfbs4CYjnR8AWgSC4pRF1GyT1UhS0oXUbJPVSFLShpXLoYnQ1RQe8wn4kcqESCw3Q8spmhM3kN1-XOMniWt&_nc_ohc=7i-3Uq-2rIYQ7kNvwEpQFL1&_nc_oc=AdpWG5G8slfnBDXfyBgW58-GI0HIqktqLWy7dCjA9ZHGH57Q5Qjix0DbtkAF-1pVEKc&_nc_zt=23&_nc_ht=scontent.fceb6-4.fna&_nc_ss=7b2a8&oh=03_Q7cD5wHr4keJtCqric97sFIRT_zREUj8KsYyzXRJr9TMNCnHyg&oe=6A8F8D11",
    alt: "Woman celebrating with candles",
  },
  {
    url: "https://scontent.fceb6-3.fna.fbcdn.net/v/t1.15752-9/757830893_2128764881379413_3218993263203825177_n.png?stp=dst-png&cstp=mx1023x1537&ctp=s1023x1537&_nc_cat=104&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeFNi-r7uDur8nU6VMlV6wRzI98MBdPHXMkj3wwF08dcyf6y0mXa1QeN2j7ZwTV4e31VCX735e7zPcR_F0a6ECdG&_nc_ohc=EHlCW8SmSSYQ7kNvwFSh4OO&_nc_oc=AdoFhZbzmKR8VcWEeZF2q7XMouUW3xZOLE7EjVL1hXTrv2BSzaD-QoQGSgFnB0OK3iw&_nc_zt=23&_nc_ht=scontent.fceb6-3.fna&_nc_ss=7b2a8&oh=03_Q7cD5wFEzXbdZjTFsktV6fcLnFSjLo3C_CR7hANLBm__WOnETA&oe=6A8FB654",
    alt: "Woman celebrating with candles",
  },
];

export function GallerySection() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>(DEFAULT_PHOTOS.map((p, i) => ({ id: String(i), ...p, position: i })));
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    supabase.from("gallery_photos").select("*").order("position")
      .then(({ data }) => { if (data && data.length > 0) setPhotos(data); });
  }, []);

  return (
    <section
      id="gallery"
      className="py-24 px-6"
      style={{ background: "linear-gradient(180deg, #FFF8F4 0%, #FDF6F0 100%)" }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="text-center mb-16"
        >
          <p
            style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: "0.75rem",
              letterSpacing: "0.35em",
              color: "#FFA500",
              fontWeight: 600,
              textTransform: "uppercase",
              marginBottom: "1rem",
            }}
          >
            ✦ Through the Lens ✦
          </p>
          <h2
            style={{
              fontFamily: "'Great Vibes', cursive",
              fontSize: "clamp(3rem, 8vw, 5rem)",
              color: "#FFA500",
              lineHeight: 1.2,
            }}
          >
            The Photoshoot
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div style={{ height: "1px", background: "linear-gradient(to right, transparent, #FFD700)", width: "60px" }} />
            <span style={{ color: "#FFD700" }}>✦</span>
            <div style={{ height: "1px", background: "linear-gradient(to left, transparent, #FFD700)", width: "60px" }} />
          </div>
          <p
            style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: "1rem",
              color: "#8B5563",
              fontWeight: 300,
              marginTop: "1rem",
              lineHeight: 1.7,
            }}
          >
            A glimpse of the moments that captured her grace and beauty
          </p>
        </motion.div>

        {/* Photo grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {photos.map((photo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
              className="relative overflow-hidden rounded-2xl cursor-pointer group"
              style={{
                aspectRatio: i === 0 || i === 5 ? "4/5" : "3/4",
                boxShadow: "0 4px 20px rgba(183, 110, 121, 0.15)",
              }}
              onClick={() => setSelected(i)}
            >
              <img
                src={photo.url}
                alt={photo.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                style={{ background: "#F4DFE4" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                <span
                  style={{
                    fontFamily: "'Raleway', sans-serif",
                    fontSize: "0.75rem",
                    color: "#ffffff",
                    letterSpacing: "0.15em",
                    fontWeight: 500,
                  }}
                >
                  VIEW
                </span>
              </div>
              {/* Rose gold frame accent */}
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ border: "2px solid rgba(212,175,55,0.6)" }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selected !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(61, 31, 42, 0.95)" }}
          onClick={() => setSelected(null)}
        >
          <button
            className="absolute top-4 right-4 text-white text-2xl"
            onClick={() => setSelected(null)}
            style={{ fontFamily: "'Raleway', sans-serif", background: "none", border: "none", cursor: "pointer" }}
          >
            ✕
          </button>
          <img
            src={photos[selected].url.replace("w=800&h=1100", "w=1200&h=1600")}
            alt={photos[selected].alt}
            className="max-h-[90vh] max-w-full rounded-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
