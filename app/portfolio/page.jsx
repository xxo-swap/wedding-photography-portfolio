import SceneBuilder from "@/components/storyBoard/SceneBuilder";

const myProjectScenes = [
  {
    tag: "The Entry",
    title: "Vibrational Force",
    description:
      "The roar of the dhol sets the tempo. We focus on the erratic movement of the crowd against the steady, focused gaze of the groom.",
    image:
      "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1200", // Baraat energy
    type: "wide",
  },
  {
    tag: "The Ritual",
    title: "Sacred Geometry",
    description:
      "The exchange of garlands. A fracture in time where the surrounding noise fades, leaving only the alignment of the frame.",
    image:
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800", // Varmala detail
    type: "detail",
  },
  {
    tag: "The Flame",
    title: "Elemental Witness",
    description:
      "Centering the Agni. The heat distorts the air, creating a natural soft-focus that anchors the gravity of the seven steps.",
    image:
      "https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?auto=format&fit=crop&w=1200", // Pheras/Agni focus
    type: "wide",
  },
  {
    tag: "The Contrast",
    title: "Heavy Silk",
    description:
      "Texture study. The weight of the heritage fabric and the cold precision of the jewelry against the warmth of the skin.",
    image:
      "https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?auto=format&fit=crop&w=800", // Bridal jewelry/fabric detail
    type: "detail",
  },
  {
    tag: "The Exit",
    title: "Last Light",
    description:
      "The Vidaai. Wide-angle cinematography to capture the scale of the departure, emphasizing the space between the past and the future.",
    image:
      "https://images.unsplash.com/photo-1510076857177-7470076d4098?auto=format&fit=crop&w=1200", // Departure/Mood shot
    type: "wide",
  },
];

export default function Portfolio() {
  return (
    <main className="bg-bg">
      {/* Hero Section here */}
      <SceneBuilder scenes={myProjectScenes} />
    </main>
  );
}
