import img1 from "../assets/Users/1735619980418_91131bf3b61c0e42570d.jpg";
import img2 from "../assets/Users/1735716503959_download (1).jpg";
import img3 from "../assets/Users/1735716973799_maxresdefault-6-17149913074951921629326.webp";
import img4 from "../assets/Users/1735717079344_Chill-guy-la-gi-750x450.jpg";
import img5 from "../assets/Users/1735717213823_crying-cat-meme-template-full-719a53dc.webp";

export default interface User {
  id: string;
  email: string;
  name: string;
  phoneNumber: string;
  birthday?: string;
  address: string;
  image: string;
}

export const sampleUsers: User[] = [
  {
    id: "1",
    email: "admin@gmail.com",
    name: "NHHien",
    phoneNumber: "0985796809",
    birthday: "2024-12-31T17:00:00.000Z",
    address: "Viet Nam",
    image: img1,
  },
  {
    id: "2",
    email: "customer@gmail.com",
    name: "Shiba Inu",
    phoneNumber: "0000000000",
    birthday: "2024-12-31T17:00:00.000Z",
    address: "Japan",
    image: img2,
  },
  {
    id: "3",
    email: "hien@gmail.com",
    name: "Moral Beaver",
    phoneNumber: "1111111111",
    birthday: "2024-12-31T17:00:00.000Z",
    address: "China",
    image: img3,
  },
  {
    id: "4",
    email: "staff@gmail.com",
    name: "Chill Guy",
    phoneNumber: "5555555555",
    birthday: "2024-12-31T17:00:00.000Z",
    address: "Chill~~~",
    image: img4,
  },
  {
    id: "5",
    email: "hien20040908@gmail.com",
    name: "Crying Cat",
    phoneNumber: "8888888888",
    birthday: "2024-12-31T17:00:00.000Z",
    address: "US",
    image: img5,
  },
];
