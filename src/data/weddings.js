import { generateSlug } from "../utils/slug";


export const weddings = [
  {
    slug: generateSlug("Shilpa", "Ankush"),
    brideName: "Shilpa",
    groomName: "Ankush",
    folder: "/client1",
    images: [
      "/client1/1.webp",
      "/client1/2.JPG",
      "/client1/3.webp",
      "/client1/4.JPG",
      "/client1/5.JPG",
      "/client1/6.JPG",
      "/client1/7.JPG",
      "/client1/8.JPG",
      "/client1/9.JPG",
      "/client1/10.JPG",
      "/client1/11.webp",
    ],
    testimonial: {
      caption: "The most beautiful day of our lives!",
      coverImage: "/client1/3.webp",
    }
  },
  {
    slug: generateSlug("Rakul", "Rahul"),
    brideName: "Rakul",
    groomName: "Rahul",
    folder: "/client2",
    images: [
      "/client2/1.JPG",
      "/client2/1.webp",
      "/client2/2.JPG",
      "/client2/3.JPG",
      "/client2/4.JPG",
      "/client2/5.JPG",
      "/client2/6.JPG",
      "/client2/7.JPG",
      "/client2/8.JPG",
      "/client2/9.JPG",
      "/client2/10.JPG",
    ],
    testimonial: {
      caption: "Absolutely magical!",
      coverImage: "/client2/1.webp",
    }
  }
];
