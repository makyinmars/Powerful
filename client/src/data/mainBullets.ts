interface Bullet {
  id: number;
  alt: string;
  src: string;
  text: string;
}

export const mainBullets: Bullet[] = [
  {
    id: 1,
    alt: "Fitness 1",
    src: "/fitness/fitness-1.png",
    text: "Learn how to be more active, with this new fitness app",
  },
  {
    id: 2,
    alt: "Fitness 2",
    src: "/fitness/fitness-2.png",
    text: "Add new workouts with ease, you can create as many exercises and sets as you like for each workout!",
  },
  {
    id: 3,
    alt: "Fitness 3",
    src: "/fitness/fitness-3.png",
    text: "Add you progress with your weight and an image to keep track of you fit journey",
  },
  {
    id: 4,
    alt: "Fitness 4",
    src: "/fitness/fitness-4.png",
    text: "Enjoy the application, I had a lot of fun working on this project and I might add new features",
  },
];
