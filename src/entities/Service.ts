import img1 from "../assets/Services/1735723278802_massage-body-2048x1365.jpg";
import img2 from "../assets/Services/1735723364407_spa01-4.png";
import img3 from "../assets/Services/1735723408385_spa01-14-1.png";
import img4 from "../assets/Services/1735723441560_triet-lông-scaled-e1602560282552.jpg";
import img5 from "../assets/Services/1735723484430_pexels-gustavo-fring-3985321-scaled-e1602560416309-2048x1333.jpg";

export default interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

export const sampleServices: Service[] = [
  {
    id: 1,
    name: "MASSAGE BODY",
    description:
      "Body massage helps you have moments of relaxation, mental comfort, social stress, a healthy body, full of vitality. There are many forms of body massage, depending on the needs and physical condition of customers – Beautify's consultants will advise the most suitable form of body massage so that customers have the most relaxing and comfortable moments.",
    price: 20,
    image: img1,
  },
  {
    id: 2,
    name: "FACIAL CARE",
    description:
      "Bio-light hair removal technology is the most advanced hair removal technology today: it ensures factors such as hair removal on all areas of the body, including sensitive areas such as the face, convex corners, thin skin, and weak capillaries. Effective for all hair types, all skin colors without causing side effects such as burns and rashes. The armpit area is completely reduced dark and rough (goosebumps) caused by a history of using tweezers. Dark armpit skin after childbirth when performing hair removal is also solved, especially the 2-3 hair roots are eradicated at the root and the pores are also reduced.",
    price: 15,
    image: img2,
  },
  {
    id: 3,
    name: "NOURISHING SHAMPOO",
    description:
      "Nurturing is a method of bringing physical and mental health. Different from normal shampooing, nourishing shampoo will focus on the acupuncture points on the top of the head and neck, shoulders, and neck. This gives you a healthier feeling and helps you get rid of tired headaches. Relieve your feelings",
    price: 10,
    image: img3,
  },
  {
    id: 4,
    name: "PERMANENT HAIR REMOVAL SERVICE",
    description:
      "Bio-light hair removal technology is the most advanced hair removal technology today: it ensures factors such as hair removal on all areas of the body, including sensitive areas such as the face, convex corners, thin skin, and weak capillaries. Effective for all hair types, all skin colors without causing side effects such as burns and rashes. The armpit area is completely reduced dark and rough (goosebumps) caused by a history of using tweezers. Dark armpit skin after childbirth when performing hair removal is also solved, especially the 2-3 hair roots are eradicated at the root and the pores are also reduced.",
    price: 35,
    image: img4,
  },
  {
    id: 5,
    name: "INTENSIVE SKIN TREATMENT",
    description:
      'Your skin is not smooth due to acne or caused by pitted scars after acne, keloid scars, sunken scars or freckles, wrinkles... all make us lack confidence in communication, work and life. You really "suffer" from having unsmooth skin. You want to quickly get rid of the skin problems you are having, to shake off the troubles that have been there for a long time. Come to Beautify specializing in the treatment of scarred skin, freckles, aging skin... With the method of removing scars, removing dark spots, removing wrinkles effectively, saving time and money to help you regain smooth and fresh skin.',
    price: 25,
    image: img5,
  },
];
